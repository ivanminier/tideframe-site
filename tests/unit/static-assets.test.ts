import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { routeMeta } from '../../src/data/routeMeta'

describe('static deployment files', () => {
  it('keeps sitemap routes consistent with registered public metadata', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    const urls = [...sitemap.matchAll(/<loc>https:\/\/tideframelabs\.com(.*?)<\/loc>/g)].map((match) => match[1] || '/')
    expect(new Set(urls)).toEqual(new Set(Object.keys(routeMeta)))
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
    expect(headers).toContain('https://tideframe-site.pages.dev/*')
  })

  it('keeps the production appcast path fail-closed instead of serving the SPA shell', () => {
    const redirects = readFileSync('public/_redirects', 'utf8')
    expect(redirects.split('\n')[0]).toBe('/updates/modeboard/appcast.xml /updates/modeboard/appcast-unavailable.txt 404')
    expect(readFileSync('public/updates/modeboard/appcast-unavailable.txt', 'utf8')).not.toContain('<?xml')
  })

  it('configures Wrangler for the existing static-assets Worker', () => {
    const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8')) as {
      assets?: {
        directory?: string
        not_found_handling?: string
      }
      pages_build_output_dir?: string
    }

    expect(wrangler.assets?.directory).toBe('./dist')
    expect(wrangler.assets?.not_found_handling).toBe('single-page-application')
    expect(wrangler.pages_build_output_dir).toBeUndefined()
  })
})
