import { readFileSync } from 'node:fs'
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
  })

  it('uses a restrictive Cloudflare Pages security policy', () => {
    const headers = readFileSync('public/_headers', 'utf8')
    expect(headers).toContain("default-src 'self'")
    expect(headers).toContain("frame-ancestors 'none'")
    expect(headers).toContain('X-Content-Type-Options: nosniff')
    expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin')
    expect(headers).toContain('Permissions-Policy:')
    expect(headers).not.toMatch(/default-src[^\n]*\*/)
    expect(headers).toContain('https://tideframe-site.pages.dev/*')
  })

  it('configures Wrangler for Pages rather than a standalone Worker', () => {
    const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8')) as Record<string, unknown>
    expect(wrangler.pages_build_output_dir).toBe('./dist')
    expect(wrangler.assets).toBeUndefined()
  })
})
