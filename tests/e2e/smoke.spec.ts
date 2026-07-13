import { expect, test } from '@playwright/test'

const routes = ['/', '/products', '/modeboard', '/support', '/privacy', '/terms', '/changelog', '/about', '/brand', '/acknowledgments']

for (const route of routes) {
  test(`${route} renders from the production build`, async ({ page }) => {
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)
    await expect(page.locator('h1')).toBeVisible()
  })
}

test('navigation and pre-release download guard work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Modeboard' }).click()
  await expect(page).toHaveURL(/\/modeboard$/)
  await expect(page.getByRole('button', { name: 'Coming Soon' }).first()).toBeDisabled()
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

test('unknown routes show the custom 404', async ({ page }) => {
  await page.goto('/not-a-real-page')
  await expect(page.getByRole('heading', { name: /couldn't find/i })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
})
