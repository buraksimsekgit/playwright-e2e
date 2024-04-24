import { test, expect } from '@playwright/test'

test.describe('First test suite', () => {
  test('Refresh, navigate back and forward', async ({ page }) => {

    // Navigate to a page
    await page.goto('https://www.techglobal-training.com/')

    // Refresh the page
    await page.reload()

    // Navigate to another page
    await page.goto('https://www.techglobal-training.com/frontend')

    // Navigating back
    await page.goBack()

    // Navigating forward
    await page.goForward()
  })

  test('Validate page Title', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/')

    // const title = page.title()

    // console.log(title, ' MY PAGE TITLE')

    // // 1st way to assert Title
    // expect(title).toBe('TechGlobal Training | Home')

    // 2nd way to assert Title
    await expect(page).toHaveTitle('TechGlobal Training | Home')
  })

  test('Validate the page URL', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/')

    // const url = page.url()
    // console.log(url, ' MY PAGE TITLE')
    // expect(url).toBe('https://www.techglobal-training.com/')

    await expect(page).toHaveURL('https://www.techglobal-training.com/')
  })

  test('My First Test', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/')

    // await page.click('#logo')

    const myLogo = page.locator('#logo')

    await myLogo.click()

    await expect(myLogo).toBeVisible()
  })
})
