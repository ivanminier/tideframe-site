import axe from 'axe-core'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { routeMeta } from '../../src/data/routeMeta'
import { renderRoute } from './test-utils'

describe('public routes', () => {
  for (const path of Object.keys(routeMeta)) {
    it(`renders ${path}`, () => {
      renderRoute(path)
      expect(screen.getByRole('main')).not.toBeEmptyDOMElement()
      expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
    })
  }

  it('renders a noindex 404 and returns home', async () => {
    const user = userEvent.setup()
    renderRoute('/not-a-real-page')
    expect(screen.getByRole('heading', { name: /couldn't find/i })).toBeVisible()
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow'))
    await user.click(screen.getByRole('link', { name: /return home/i }))
    expect(screen.getByRole('heading', { name: /tideframe labs makes thoughtful native software for the mac/i })).toBeVisible()
  })

  it('has no important automated accessibility violations on primary pages', async () => {
    for (const path of ['/', '/modeboard', '/support', '/privacy', '/terms']) {
      const view = renderRoute(path)
      const results = await axe.run(view.container, { rules: { 'color-contrast': { enabled: false } } })
      expect(results.violations.map((violation) => violation.id)).toEqual([])
      view.unmount()
    }
  })
})

describe('navigation', () => {
  it('opens, closes with Escape, and follows mobile navigation links', async () => {
    const user = userEvent.setup()
    const view = renderRoute('/')
    const menu = view.container.querySelector<HTMLButtonElement>('.menu-button')
    expect(menu).not.toBeNull()
    if (!menu) throw new Error('Mobile menu button was not rendered')
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    await user.click(within(screen.getByRole('navigation', { name: /primary/i })).getByRole('link', { name: 'Products' }))
    expect(screen.getByRole('heading', { name: 'Products' })).toBeVisible()
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports keyboard traversal into navigation', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    await user.tab()
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveFocus()
    await user.tab()
    expect(within(screen.getByRole('banner')).getByRole('link', { name: /tideframe labs/i })).toHaveFocus()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('heading', { level: 1, name: /modeboard for mac/i })).toBeVisible()
  })

  it('publishes the download while keeping unconfigured checkout unavailable', () => {
    renderRoute('/modeboard')
    const downloads = screen.getAllByRole('link', { name: /download modeboard 1\.0\.1/i })
    expect(downloads).toHaveLength(2)
    for (const download of downloads) {
      expect(download).toHaveAttribute('href', 'https://tideframelabs.com/downloads/modeboard/Modeboard-1.0.1-8.dmg')
    }
    expect(screen.getByRole('button', { name: /purchase coming soon/i })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /buy for \$14\.99/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /download modeboard 1\.0\.1 for mac/i })).toBeVisible()
    expect(screen.getByText(/notarized by apple and stapled for gatekeeper/i)).toBeVisible()
    expect(screen.getByText(/up-to-date result as a failed update check/i)).toBeVisible()
  })
})

describe('metadata', () => {
  it('sets Modeboard metadata and canonical URL', async () => {
    renderRoute('/modeboard')
    await waitFor(() => expect(document.title).toBe(routeMeta['/modeboard'].title))
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://tideframelabs.com/modeboard')
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://tideframelabs.com/modeboard-social-preview.png')
    // The rendered description must match the pre-rendered static HTML, which is
    // generated from route-meta.json — otherwise hydration contradicts the crawler.
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', routeMeta['/modeboard'].description)
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute('content', routeMeta['/modeboard'].title)
  })

  it('canonicalizes the homepage with a trailing slash, matching the sitemap', async () => {
    renderRoute('/')
    await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://tideframelabs.com/'))
  })

  it('advertises exactly one slash-free canonical per route', async () => {
    const seen = new Set<string>()
    for (const path of Object.keys(routeMeta)) {
      const view = renderRoute(path)
      const expected = `https://tideframelabs.com${path}`
      await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', expected))
      expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
      if (path !== '/') {
        expect(expected, `${path} canonical must not carry a trailing slash`).not.toMatch(/\/$/)
      }
      // A slash and non-slash variant of one route would be two indexable URLs.
      expect(seen.has(expected)).toBe(false)
      seen.add(expected)
      view.unmount()
    }
  })

  it('publishes verified Modeboard release data without inventing an offer', async () => {
    renderRoute('/modeboard')
    await waitFor(() => expect(document.querySelector('script#page-jsonld')).not.toBeNull())
    const schema = JSON.parse(document.querySelector('script#page-jsonld')?.textContent ?? '{}')

    expect(schema['@type']).toBe('SoftwareApplication')
    expect(schema.name).toBe('Modeboard')
    expect(schema.url).toBe('https://tideframelabs.com/modeboard')
    expect(schema.applicationCategory).toBe('UtilitiesApplication')
    expect(schema.operatingSystem).toBe('macOS 15.0 or later')
    expect(schema.author['@id']).toBe('https://tideframelabs.com/#organization')
    expect(schema.publisher['@id']).toBe('https://tideframelabs.com/#organization')

    expect(schema.softwareVersion).toBe('1.0.1')
    expect(schema.downloadUrl).toBe('https://tideframelabs.com/downloads/modeboard/Modeboard-1.0.1-8.dmg')
    for (const withheld of ['offers', 'aggregateRating', 'review']) {
      expect(schema, `${withheld} must stay absent without verified commerce`).not.toHaveProperty(withheld)
    }
  })

  it('publishes WebSite and Organization structured data on the homepage', async () => {
    renderRoute('/')
    await waitFor(() => expect(document.querySelector('script#page-jsonld')).not.toBeNull())
    const website = JSON.parse(document.querySelector('script#page-jsonld')?.textContent ?? '{}')
    const organization = JSON.parse(document.querySelector('script#org-jsonld')?.textContent ?? '{}')

    expect(website['@type']).toBe('WebSite')
    expect(website.name).toBe('Tideframe Labs')
    expect(website.url).toBe('https://tideframelabs.com/')
    expect(website.publisher['@id']).toBe('https://tideframelabs.com/#organization')

    expect(organization['@type']).toBe('Organization')
    expect(organization['@id']).toBe('https://tideframelabs.com/#organization')
    expect(organization.name).toBe('Tideframe Labs')
    expect(organization.url).toBe('https://tideframelabs.com/')
    expect(organization.logo).toBe('https://tideframelabs.com/tideframe-icon-glossy.png')
    expect(organization.email).toBe('support@tideframelabs.com')

    // Unverifiable properties must never be invented to chase a rich result.
    for (const withheld of ['address', 'telephone', 'foundingDate', 'numberOfEmployees', 'sameAs', 'award']) {
      expect(organization, `${withheld} is not verified`).not.toHaveProperty(withheld)
    }
  })

  it('gives every indexable route a unique title and description', () => {
    const titles = Object.values(routeMeta).map((entry) => entry.title)
    const descriptions = Object.values(routeMeta).map((entry) => entry.description)
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
    for (const entry of Object.values(routeMeta)) {
      expect(entry.title.length).toBeLessThanOrEqual(70)
      expect(entry.description.length).toBeGreaterThanOrEqual(50)
      expect(entry.description.length).toBeLessThanOrEqual(160)
    }
  })
})
