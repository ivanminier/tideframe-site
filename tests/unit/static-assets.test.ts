import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import { routeMeta } from '../../src/data/routeMeta'
import worker from '../../worker/index.js'

const APPCAST_PATH = '/updates/modeboard/appcast.xml'

/** A stand-in for the Workers static-assets binding, so fall-through is observable. */
function assetsEnv() {
  const fetchAsset = vi.fn(
    async (request: Request) => new Response(`asset:${new URL(request.url).pathname}`, { status: 200 }),
  )
  return { env: { ASSETS: { fetch: fetchAsset } }, fetchAsset }
}

function get(path: string) {
  return new Request(`https://tideframelabs.com${path}`)
}

describe('static deployment files', () => {
  it('keeps sitemap routes consistent with registered public metadata', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    const urls = [...sitemap.matchAll(/<loc>https:\/\/tideframelabs\.com(.*?)<\/loc>/g)].map((match) => match[1] || '/')
    expect(new Set(urls)).toEqual(new Set(Object.keys(routeMeta)))
  })

  it('lists every sitemap URL without a trailing slash, except the root', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

    expect(locs).toContain('https://tideframelabs.com/')
    expect(locs).toContain('https://tideframelabs.com/modeboard')
    for (const loc of locs) {
      expect(loc.startsWith('https://tideframelabs.com')).toBe(true)
      if (loc !== 'https://tideframelabs.com/') {
        expect(loc, `${loc} must not carry a trailing slash`).not.toMatch(/\/$/)
      }
    }
    // A slash and non-slash variant of the same route would be two indexable URLs.
    expect(new Set(locs).size).toBe(locs.length)
    expect(locs).not.toContain('https://tideframelabs.com/modeboard/')
  })

  it('keeps the HTML template defaults in sync with the "/" route metadata', () => {
    // generate-static-meta.mjs rewrites these per route, but the template is what a
    // crawler sees for any path the generator does not pre-render.
    const html = readFileSync('index.html', 'utf8')
    const home = routeMeta['/']
    expect(html).toContain(`<title>${home.title}</title>`)
    expect(html).toContain(`<meta name="description" content="${home.description}" />`)
    expect(html).toContain(`<meta property="og:title" content="${home.title}" />`)
    expect(html).toContain(`<meta property="og:description" content="${home.description}" />`)
    expect(html).toContain('<link rel="canonical" href="https://tideframelabs.com/" />')
    expect(html).not.toMatch(/pages\.dev|workers\.dev/)
  })

  it('declares a square favicon Google can fetch', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/tideframe-mark.svg" />')
    // Raster fallback: 512×512, square, and not blocked by robots.txt.
    expect(html).toContain('<link rel="icon" type="image/png" sizes="512x512" href="/tideframe-icon-glossy.png" />')
    expect(existsSync('public/tideframe-icon-glossy.png')).toBe(true)
    expect(readFileSync('public/robots.txt', 'utf8')).not.toMatch(/^Disallow: \/\s*$/m)
  })

  it('ships metadata assets and an installable manifest', () => {
    const manifest = JSON.parse(readFileSync('public/site.webmanifest', 'utf8')) as { icons: Array<{ src: string }> }
    expect(manifest.icons.some((icon) => icon.src === '/tideframe-mark.svg')).toBe(true)
    expect(readFileSync('public/robots.txt', 'utf8')).toContain('https://tideframelabs.com/sitemap.xml')
    expect(readFileSync('public/favicon.svg', 'utf8')).toContain('<svg')
    expect(existsSync('public/tideframe-icon-glossy.png')).toBe(true)
    expect(existsSync('public/social-preview.png')).toBe(true)
    expect(readFileSync('design-source/social-preview-source/card.html', 'utf8')).not.toContain('In development')
  })

  it('ships only the curated public Modeboard screenshots', () => {
    const required = [
      'modeboard-profile-overview',
      'modeboard-appearance-dock',
      'modeboard-menu-bar-desktop',
      'modeboard-getting-started',
      'modeboard-onboarding-focus',
      'modeboard-onboarding-ready',
      'modeboard-backups-restore',
    ]

    for (const name of required) {
      expect(existsSync(`public/screenshots/${name}.png`)).toBe(true)
      expect(existsSync(`public/screenshots/${name}-800.png`)).toBe(true)
    }
    expect(existsSync('public/screenshots/modeboard-menu-bar-menu.png')).toBe(true)
    expect(existsSync('public/screenshots/modeboard-diagnostics.png')).toBe(false)
  })

  it('uses a restrictive static-asset security policy', () => {
    const headers = readFileSync('public/_headers', 'utf8')
    expect(headers).toContain("default-src 'self'")
    expect(headers).toContain("frame-ancestors 'none'")
    expect(headers).toContain('X-Content-Type-Options: nosniff')
    expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin')
    expect(headers).toContain('Permissions-Policy:')
    expect(headers).not.toMatch(/default-src[^\n]*\*/)
    // tideframelabs.com is the only host that serves this site, so there is no
    // Cloudflare-generated hostname left to scope a noindex rule to.
    expect(headers).not.toContain('pages.dev')
    expect(headers).not.toContain('workers.dev')
  })

  it('does not reintroduce the obsolete _redirects appcast implementation', () => {
    // The appcast is now failed closed in worker/index.js. A Pages-era `_redirects`
    // file would reintroduce a second, conflicting routing layer (and, with a
    // catch-all rule, an SPA redirect loop), so it must stay absent.
    expect(existsSync('public/_redirects')).toBe(false)
    expect(existsSync('dist/_redirects')).toBe(false)
    expect(existsSync('public/updates/modeboard/appcast-unavailable.txt')).toBe(false)
    expect(existsSync('public/updates/modeboard/appcast.xml')).toBe(false)
  })
})

describe('appcast Worker route', () => {
  it('fails the exact appcast path closed with a plain-text, uncacheable 404', async () => {
    const { env, fetchAsset } = assetsEnv()
    const response = await worker.fetch(get(APPCAST_PATH), env)

    expect(response.status).toBe(404)
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')

    const body = await response.text()
    expect(body).toContain('not available')
    expect(body).not.toContain('<?xml')
    expect(body).not.toContain('<rss')
    expect(fetchAsset).not.toHaveBeenCalled()
  })

  it('still fails closed when Sparkle appends a query string', async () => {
    const { env, fetchAsset } = assetsEnv()
    const response = await worker.fetch(get(`${APPCAST_PATH}?appVersion=1.0.0`), env)

    expect(response.status).toBe(404)
    expect(fetchAsset).not.toHaveBeenCalled()
  })

  it('passes ordinary website requests through to the static-assets binding', async () => {
    for (const path of ['/', '/modeboard', '/support', '/sitemap.xml', '/screenshots/modeboard-profile-overview.png']) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)

      expect(fetchAsset).toHaveBeenCalledTimes(1)
      expect(response.status).toBe(200)
      expect(await response.text()).toBe(`asset:${path}`)
    }
  })

  it('intercepts only the exact appcast path, never a near match', async () => {
    for (const path of [
      '/updates/modeboard/appcast.xml/',
      '/updates/modeboard/appcast.xml.bak',
      '/updates/modeboard/appcast.XML',
      '/updates/modeboard/appcast.rss',
      '/updates/modeboard/',
      '/updates/modeboard',
      '/updates/appcast.xml',
      '/appcast.xml',
    ]) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)

      expect(fetchAsset, `${path} should fall through to ASSETS`).toHaveBeenCalledTimes(1)
      expect(response.status).toBe(200)
    }
  })

  it('configures Wrangler to run the Worker first for the appcast route', () => {
    const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8')) as {
      main?: string
      workers_dev?: boolean
      preview_urls?: boolean
      route?: unknown
      routes?: unknown
      assets?: {
        directory?: string
        binding?: string
        html_handling?: string
        not_found_handling?: string
        run_worker_first?: string[]
      }
      pages_build_output_dir?: string
    }

    expect(wrangler.main).toBe('./worker/index.js')
    expect(wrangler.assets?.directory).toBe('./dist')
    expect(wrangler.assets?.binding).toBe('ASSETS')
    expect(wrangler.assets?.not_found_handling).toBe('single-page-application')
    expect(wrangler.assets?.run_worker_first).toContain(APPCAST_PATH)
    // A broad `run_worker_first` would push every asset request through the Worker.
    expect(wrangler.assets?.run_worker_first).not.toContain('/*')
    expect(wrangler.pages_build_output_dir).toBeUndefined()
  })

  it('serves each pre-rendered route at its canonical, slash-free path', () => {
    const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8')) as {
      assets?: { html_handling?: string; not_found_handling?: string }
    }

    // Every route except "/" is generated as dist/<route>/index.html. Under the
    // default "auto-trailing-slash", Cloudflare 307s /modeboard -> /modeboard/,
    // which contradicts the canonical and the sitemap. "drop-trailing-slash"
    // serves that file at /modeboard and redirects the slashed form back to it.
    expect(wrangler.assets?.html_handling).toBe('drop-trailing-slash')
    expect(wrangler.assets?.not_found_handling).toBe('single-page-application')

    // The canonical each route advertises must be the slash-free form the
    // sitemap lists, so there is exactly one indexable URL per route.
    for (const path of Object.keys(routeMeta)) {
      if (path === '/') continue
      expect(path).not.toMatch(/\/$/)
    }
  })

  it('serves the site only from the custom production domain', () => {
    const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8')) as {
      workers_dev?: boolean
      preview_urls?: boolean
      route?: unknown
      routes?: unknown
    }

    // No second, indexable copy of the site on a Cloudflare-generated hostname.
    expect(wrangler.workers_dev).toBe(false)
    expect(wrangler.preview_urls).toBe(false)
    // tideframelabs.com is attached as a custom domain in the Cloudflare
    // dashboard. Declaring a route here would take over that binding.
    expect(wrangler.route).toBeUndefined()
    expect(wrangler.routes).toBeUndefined()
  })
})
