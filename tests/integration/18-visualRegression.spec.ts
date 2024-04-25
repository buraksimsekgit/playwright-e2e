import { test, expect } from '@playwright/test'
import takeAndCompareScreenshot from '../../helpers/takeAndCompareScreenshot'

test.describe('Visual Regression', async () => {

  test('should take a screenshot', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveScreenshot('homepage.png')
  })

  test('should take a screenshot of an element', async({ page }, testInfo) => {
    await page.goto('/')

    const sect = page.locator('.HomePage_innerHero__VRFkI')

    await expect(sect).toHaveScreenshot([testInfo.title, 'section.png'])
  })

  test('should take a screenshot of a full page', async({ page }) => {
    await page.goto('/')

    await expect(page).toHaveScreenshot('fullHomePage.png', { fullPage: true })
  })

  test('should atke a screenshot of a page but ignore some elements', async({ page }) => {
    await page.goto('/frontend')

    const card8 = page.locator('#card-8')
    const card13 = page.locator('#card-13')
    const card15Text = page.locator('#card-15 .undefined')

    await expect(page).toHaveScreenshot('frontendPage.png', { mask: [card8, card13, card15Text]})
  })

  test('take a screenshot and validate', async({ page }) => {
    await page.goto('/frontend')

    const cards = page.locator('.SubPageLayout_wrapper__hs6Iw')
    const card8 = page.locator('#card-8')
    const card13 = page.locator('#card-13')

    const snap = await cards.screenshot({mask: [card8, card13], maskColor: 'yellow'})

    expect(snap).toMatchSnapshot('frontendCards_2.png')
  })

  test('should compare screenshot using method', async({ page }) => {
    await page.goto('/frontend')

    const cards = page.locator('.SubPageLayout_wrapper__hs6Iw')
    const card8 = page.locator('#card-8')

    await takeAndCompareScreenshot(cards, 'allCards.png')

    await takeAndCompareScreenshot(cards, 'allCardsMasked.png',{ mask: [card8]})

    await takeAndCompareScreenshot.call(this, page)
  })
})
