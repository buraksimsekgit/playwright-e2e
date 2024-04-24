import { test } from '@playwright/test'

test.describe('Playwright Locators', () => {
  test('Playwright Locator API', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/')

    await page.locator('#logo').click()
    await page.click('#logo')

    const myLogo = page.locator('#logo')

    await myLogo.click()
  })

  test('Playwright - Custom Pseudo Classes', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')

    // These are two same ways to locate the element by their visibile text on the UI
    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.locator('a:has-text("Html elements")').click()

    await page.locator('button:text("Register")').click()
    await page.locator('button:has-text("Sign in"):visible').click()

    console.log(await page.locator('#radio-button-group > div').count())

    console.log(await page.locator('#radio-button-group > div', { has: page.locator('#java_radio') }).count())
  })

  test('Playwright - Chaining the Locators', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/frontend')

    await page.locator('a:has-text("Html elements")').click()

    // const item_1 = page.locator('#unordered_list_item1')

    const unorderedList = page.locator('#unordered_list')

    // const childItem = page.locator('#unordered_list_item1')
    const childItem = unorderedList.locator('#unordered_list_item1')
  })

  test('Playwright - Handling multiple elements', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/frontend')
    await page.locator('a:has-text("Html elements")').click()

    const unorderedList = page.locator('#unordered_list > li')

    await unorderedList.first().click()
    await unorderedList.nth(1).click()
    await unorderedList.last().click()

    // This will return a failure because Playwright will find more than 1 element
    // await unorderedList.click()

    const checkboxGroup = page.locator('[data-identifier="Checkboxes"] input')
    const checkboxCount = await checkboxGroup.count()

    console.log(typeof checkboxGroup + ' TYPE OF THE ELEMENT')

    for(let i = 0; i < checkboxCount; i++) {
      await checkboxGroup.nth(i).click()
    }

    const checkboxGroup2 = await page.locator('[data-identifier="Checkboxes"] input').all()
 
    for(const checkbox of checkboxGroup2) {
      await checkbox.click()
    }
  })

  test('Playwright - Built-in locators', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/frontend')

    // await page.locator('a:has-text("Html elements")').click();
    await page.getByRole('link', { name: 'Html Elements' }).click()

    await page.getByRole('heading', { name: 'Unordered List'}).click()

    await page.getByRole('button', { name: 'Register'}).click()

    await page.getByPlaceholder('Enter text here').fill('TechGlobal')
  })

  test('Playwright - filter() locator API', async ({ page }) => {

    await page.goto('https://www.techglobal-training.com/frontend')

    // await page.locator('a:has-text("Html elements")').click();
    await page.getByRole('link', { name: 'Html Elements' }).click()

    const testingParagraps = page.locator('p').filter({ hasText: 'testing'})
    await testingParagraps.highlight()

    const languageHeadings = await page.locator('label').count()

    console.log(`Amount of elements with label tag is: ${languageHeadings}`)

    const noneLanguageHeadings = await page.locator('label').filter({ hasNotText: 'Java' }).count()

    console.log(`Amount of elements with label tag is but Java: ${noneLanguageHeadings}`)

    const wrappers = await page.locator('[data-identifier*="a"]').count()

    console.log(`Locaterd wrappers are: ${wrappers}`)

    const uniqueWrapper = await page.locator('[data-identifier*="a"]').filter({ has: page.locator('#java_radio') }).count()

    console.log(`Locaterd wrapper is: ${uniqueWrapper}`)


  })
})
