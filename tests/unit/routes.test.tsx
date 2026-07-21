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
    expect(screen.getByRole('heading', { name: /switch your whole mac workspace with one profile/i })).toBeVisible()
  })

  it('keeps both launch actions unavailable while preserving a working updates email', () => {
    renderRoute('/modeboard')
    const launchLink = screen.getAllByRole('link', { name: /get launch updates/i })[0]
    expect(launchLink).toHaveAttribute('href', expect.stringContaining('subject=Modeboard%20launch%20updates'))
    expect(launchLink).toHaveAttribute('href', expect.stringContaining('please%20let%20me%20know%20when%20Modeboard%20becomes%20available'))
    expect(screen.getByRole('button', { name: /download free trial — coming soon/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /buy for \$14\.99 — coming soon/i })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /download free trial|buy for \$14\.99/i })).not.toBeInTheDocument()
  })
})

describe('metadata', () => {
  it('sets Modeboard metadata and canonical URL', async () => {
    renderRoute('/modeboard')
    await waitFor(() => expect(document.title).toBe(routeMeta['/modeboard'].title))
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://tideframelabs.com/modeboard')
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://tideframelabs.com/modeboard-social-preview.png')
    expect(document.querySelector('script#page-jsonld')).toHaveTextContent('SoftwareApplication')
    expect(document.querySelector('script#page-jsonld')).not.toHaveTextContent('InStock')
    expect(document.querySelector('script#page-jsonld')).not.toHaveTextContent('operatingSystem')
  })
})
