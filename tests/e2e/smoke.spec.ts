import { expect, test } from '@playwright/test'
import { resolve } from 'node:path'

const routes = ['/', '/products', '/modeboard', '/support', '/privacy', '/terms', '/changelog', '/about', '/brand', '/acknowledgments']

for (const route of routes) {
  test(`${route} renders from the production build`, async ({ page }) => {
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)
    await expect(page.locator('h1')).toBeVisible()
  })
}

test('navigation and public download action work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Modeboard' }).click()
  await expect(page).toHaveURL(/\/modeboard$/)
  const download = page.getByRole('link', { name: 'Download Modeboard 1.0.0' }).first()
  await expect(download).toHaveAttribute('href', 'https://tideframelabs.com/downloads/modeboard/Modeboard-1.0.0-7.dmg')
  await expect(page.getByRole('button', { name: 'Purchase coming soon' })).toBeDisabled()
  await expect(page.getByRole('heading', { name: 'Download Modeboard 1.0.0 for Mac.' })).toBeVisible()
})

test('mobile navigation opens, follows a link, and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Toggle navigation' })
  await expect(menu).toBeVisible()
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Products' }).click()
  await expect(page).toHaveURL(/\/products$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('critical pages stay within the viewport and load their images', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport)
    for (const route of ['/', '/modeboard', '/support']) {
      await page.goto(route)
      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(hasHorizontalOverflow, `${route} overflows at ${viewport.width}px`).toBe(false)
      const images = page.locator('img')
      await expect(images).not.toHaveCount(0)
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded()
        await expect(image).toHaveJSProperty('complete', true)
      }
      const brokenImages = await images.evaluateAll((loadedImages) =>
        loadedImages.filter((image) => (image as HTMLImageElement).naturalWidth === 0).length,
      )
      expect(brokenImages, `${route} has broken images at ${viewport.width}px`).toBe(0)
    }
  }
})

test('critical pages remain usable at 200% text size', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  for (const route of ['/', '/modeboard', '/support', '/privacy', '/terms']) {
    await page.goto(route)
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(hasHorizontalOverflow, `${route} overflows with 200% text`).toBe(false)
    await expect(page.locator('h1')).toBeVisible()
  }
})

test('primary pages have no automated browser accessibility violations', async ({ page }) => {
  for (const route of ['/', '/modeboard', '/support', '/privacy', '/terms']) {
    await page.goto(route)
    await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') })
    const violations = await page.evaluate(async () => {
      const axe = (window as typeof window & {
        axe: { run: (root: Document) => Promise<{ violations: Array<{ id: string }> }> }
      }).axe
      const result = await axe.run(document)
      return result.violations.map((violation) => violation.id)
    })
    expect(violations, `${route} accessibility violations`).toEqual([])
  }
})

test('homepage remains legible in dark appearance', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Tideframe Labs makes thoughtful native software for the Mac/i })).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(16, 24, 32)')
})

test('unknown routes show the custom 404', async ({ page }) => {
  await page.goto('/not-a-real-page')
  await expect(page.getByRole('heading', { name: /couldn't find/i })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
})
