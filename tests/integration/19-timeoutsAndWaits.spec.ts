import { test, expect } from '../../fixtures/page-object-fixtures'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Timeouts & Waits', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend', { timeout: 20000 })
    await clickLink(page, 'Waits')
  })

  // test('should wait for an element to be visible', async ({ page, waitsPage }) => {
  // test.setTimeout(8000)
  // await waitsPage.redBoxButton.click({ timeout: 40000})
  // await waitsPage.redBox.click({ timeout: 11000})
  // await expect(waitsPage.redBox).toBeVisible()
  // })

  test('Waits', async ({ page, dynamicTablesPage }) => {
    await page.goto('/frontend/project-4')

    await dynamicTablesPage.clickAddProductButton()

    // 1st Way
    // await page.waitForSelector('#locator', { state: 'visible'})
    await dynamicTablesPage.productModal.waitFor({ state: 'visible' })
    // await page.waitForLoadState('domcontentloaded')

    await page.pause()
    await dynamicTablesPage.closeProductModal()

    await dynamicTablesPage.productModal.waitFor({ state: 'hidden' })
  })
})
