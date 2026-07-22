import { createHash } from 'node:crypto'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import { routeMeta } from '../../src/data/routeMeta'
import worker from '../../worker/index.js'

const APPCAST_PATH = '/updates/modeboard/appcast.xml'
const UPDATE_PREFIX = '/updates/modeboard/'
const CURRENT_DOWNLOAD_PATH = '/downloads/modeboard/Modeboard-1.0.1-8.dmg'
const PREVIOUS_DOWNLOAD_PATH = '/downloads/modeboard/Modeboard-1.0.0-7.dmg'

/** A stand-in for the Workers static-assets binding, so fall-through is observable. */
function assetsEnv(responseForRequest?: (request: Request) => Response) {
  const fetchAsset = vi.fn(
    async (request: Request) => responseForRequest?.(request) ?? new Response(
      `asset:${new URL(request.url).pathname}`,
      { status: 200, headers: { 'Content-Type': 'application/octet-stream' } },
    ),
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

  it('ships the exact signed Sparkle feed files without a competing _redirects layer', () => {
    expect(existsSync('public/_redirects')).toBe(false)
    expect(existsSync('dist/_redirects')).toBe(false)
    expect(existsSync('public/updates/modeboard/appcast-unavailable.txt')).toBe(false)

    const appcast = readFileSync('public/updates/modeboard/appcast.xml', 'utf8')
    const enclosure = appcast.match(/<enclosure url="https:\/\/tideframelabs\.com\/updates\/modeboard\/(Modeboard-[^"]+\.zip)" length="(\d+)"[^>]+sparkle:edSignature="([^"]+)"/)
    const notes = appcast.match(/sparkle:releaseNotesLink sparkle:edSignature="([^"]+)" sparkle:length="(\d+)">https:\/\/tideframelabs\.com\/updates\/modeboard\/(Modeboard-[^<]+\.md)</)

    expect(appcast).toContain('sparkle-signatures:')
    expect(appcast).not.toContain('.dmg')
    expect(enclosure).not.toBeNull()
    expect(notes).not.toBeNull()
    expect(enclosure?.[1]).toBe('Modeboard-1.0.1-8.zip')
    expect(notes?.[3]).toBe('Modeboard-1.0.1-8.md')
    expect(appcast).toContain('<sparkle:version>8</sparkle:version>')
    expect(appcast).toContain('<sparkle:shortVersionString>1.0.1</sparkle:shortVersionString>')
    expect(appcast).toContain('<sparkle:minimumSystemVersion>15.0</sparkle:minimumSystemVersion>')
    expect(8).toBeGreaterThan(7)

    const zipPath = `public/updates/modeboard/${enclosure?.[1]}`
    const notesPath = `public/updates/modeboard/${notes?.[3]}`
    expect(existsSync(zipPath)).toBe(true)
    expect(existsSync(notesPath)).toBe(true)
    expect(statSync(zipPath).size).toBe(Number(enclosure?.[2]))
    expect(statSync(notesPath).size).toBe(Number(notes?.[2]))
    expect(Buffer.from(enclosure?.[3] ?? '', 'base64')).toHaveLength(64)
    expect(Buffer.from(notes?.[1] ?? '', 'base64')).toHaveLength(64)
  })

  it('preserves the published 1.0.0 release assets byte-for-byte', () => {
    const expected = [
      [
        `public${PREVIOUS_DOWNLOAD_PATH}`,
        6_170_974,
        '9310287038060fe96413a6fc6ea43627f1d1c7fba64263ee2ef69a40856969e5',
      ],
      [
        'public/updates/modeboard/Modeboard-1.0.0-7.zip',
        6_268_917,
        'e83b58d360f0078bbd475af60e7efb67f0277dcdb2ab71e2c82bb752b70058cf',
      ],
      [
        'public/updates/modeboard/Modeboard-1.0.0-7.md',
        293,
        '45f1631e4537729a69ed8dda60b3b60ed314598ccde9a05ca565bf207ac7e5c0',
      ],
    ] as const

    for (const [path, size, sha256] of expected) {
      expect(statSync(path).size).toBe(size)
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(sha256)
    }
  })

  it('ships the exact notarized Modeboard DMG declared by release metadata', () => {
    const product = JSON.parse(readFileSync('src/data/modeboard-product.json', 'utf8')) as {
      release: { downloadUrl: string; fileSizeBytes: number; sha256: string }
    }
    const dmgPath = `public${CURRENT_DOWNLOAD_PATH}`
    const digest = createHash('sha256').update(readFileSync(dmgPath)).digest('hex')

    expect(existsSync(dmgPath)).toBe(true)
    expect(product.release.downloadUrl).toBe(`https://tideframelabs.com${CURRENT_DOWNLOAD_PATH}`)
    expect(statSync(dmgPath).size).toBe(product.release.fileSizeBytes)
    expect(digest).toBe(product.release.sha256)
  })
})

describe('download Worker route', () => {
  it('serves current and previous versioned DMGs as immutable attachments', async () => {
    for (const path of [PREVIOUS_DOWNLOAD_PATH, CURRENT_DOWNLOAD_PATH]) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('application/x-apple-diskimage')
      expect(response.headers.get('Content-Disposition')).toContain(path.split('/').at(-1))
      expect(response.headers.get('Cache-Control')).toContain('immutable')
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex')
      expect(await response.text()).toBe(`asset:${path}`)
      expect(fetchAsset).toHaveBeenCalledTimes(1)
    }
  })

  it('fails missing or malformed download paths closed instead of serving HTML', async () => {
    for (const path of [
      '/downloads/modeboard',
      '/downloads/modeboard/',
      '/downloads/modeboard/Modeboard-latest.dmg',
      '/downloads/modeboard/Modeboard-1.0.0-7.zip',
    ]) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)
      expect(response.status).toBe(404)
      expect(fetchAsset).not.toHaveBeenCalled()
    }

    const { env } = assetsEnv(() => new Response('<!doctype html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }))
    const missing = await worker.fetch(get(CURRENT_DOWNLOAD_PATH), env)
    expect(missing.status).toBe(503)
    expect(await missing.text()).toContain('download file is not available')
  })
})

describe('appcast Worker route', () => {
  it('serves the signed appcast as uncacheable XML without changing its body', async () => {
    const { env, fetchAsset } = assetsEnv()
    const response = await worker.fetch(get(APPCAST_PATH), env)

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('application/xml; charset=utf-8')
    expect(response.headers.get('Cache-Control')).toBe('no-cache, no-store, must-revalidate')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex')
    expect(await response.text()).toBe(`asset:${APPCAST_PATH}`)
    expect(fetchAsset).toHaveBeenCalledTimes(1)
  })

  it('still serves the appcast when Sparkle appends a query string', async () => {
    const { env, fetchAsset } = assetsEnv()
    const response = await worker.fetch(get(`${APPCAST_PATH}?appVersion=1.0.0`), env)

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toContain('application/xml')
    expect(fetchAsset).toHaveBeenCalledTimes(1)
  })

  it('serves current and previous versioned update files with immutable caching', async () => {
    for (const release of ['Modeboard-1.0.0-7', 'Modeboard-1.0.1-8']) {
      const zipPath = `${UPDATE_PREFIX}${release}.zip`
      const notesPath = `${UPDATE_PREFIX}${release}.md`

      const zip = await worker.fetch(get(zipPath), assetsEnv().env)
      expect(zip.status).toBe(200)
      expect(zip.headers.get('Content-Type')).toBe('application/zip')
      expect(zip.headers.get('Content-Disposition')).toContain(`${release}.zip`)
      expect(zip.headers.get('Cache-Control')).toContain('immutable')

      const notes = await worker.fetch(get(notesPath), assetsEnv().env)
      expect(notes.status).toBe(200)
      expect(notes.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
      expect(notes.headers.get('Cache-Control')).toContain('immutable')
    }
  })

  it('fails closed if an allowlisted update file falls through to the SPA shell', async () => {
    const { env } = assetsEnv(() => new Response('<!doctype html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }))
    const response = await worker.fetch(get(APPCAST_PATH), env)

    expect(response.status).toBe(503)
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.text()).toContain('not available')
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

  it('fails unknown update paths closed instead of serving the SPA shell', async () => {
    for (const path of [
      '/updates/modeboard/appcast.xml/',
      '/updates/modeboard/appcast.xml.bak',
      '/updates/modeboard/appcast.XML',
      '/updates/modeboard/appcast.rss',
      '/updates/modeboard/',
      '/updates/modeboard',
    ]) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)

      expect(fetchAsset, `${path} must not reach ASSETS`).not.toHaveBeenCalled()
      expect(response.status).toBe(404)
    }
  })

  it('does not capture appcast-like paths outside the Modeboard update directory', async () => {
    for (const path of ['/updates/appcast.xml', '/appcast.xml']) {
      const { env, fetchAsset } = assetsEnv()
      const response = await worker.fetch(get(path), env)

      expect(fetchAsset).toHaveBeenCalledTimes(1)
      expect(response.status).toBe(200)
    }
  })

  it('configures Wrangler to run the Worker first for downloads and updates', () => {
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
    expect(wrangler.assets?.run_worker_first).toContain('/downloads/modeboard')
    expect(wrangler.assets?.run_worker_first).toContain('/downloads/modeboard/*')
    expect(wrangler.assets?.run_worker_first).toContain('/updates/modeboard')
    expect(wrangler.assets?.run_worker_first).toContain('/updates/modeboard/*')
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
