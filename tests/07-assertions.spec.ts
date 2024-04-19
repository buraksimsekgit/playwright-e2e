import { test, expect } from "@playwright/test";
import { clickButton, clickLink } from "../helpers/clickHelpers";

test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Html Elements");
  });

  test('Auto-retry, web-first - async locator assertions', async({ page }) => {

    const mainHeading = page.locator('#main_heading')

    // Check if element is visible
    await expect(mainHeading).toBeVisible()

    // Check if element is attach to the DOM
    await expect(mainHeading).toBeAttached()

    // Check if element have 'Html Elements' test
    await expect(mainHeading).toHaveText('Html Elements')

    // Check if element contains 'Html Elements' text
    await expect(mainHeading).toContainText('Elements')

    // Check if element has attribute, or attribute and its value
    await expect(mainHeading).toHaveAttribute('id')
    await expect(mainHeading).toHaveAttribute('id', 'main_heading')

    // Check the amount of element your locator returns
    await expect(mainHeading).toHaveCount(1)

    const checkbox1 = page.locator('#checkbox_1')

    await expect(checkbox1).toBeEnabled()

    await checkbox1.check()
    await expect(checkbox1).toBeChecked()

    const textInput = page.locator('#text_input1')
    await expect(textInput).toBeEmpty()

    await textInput.fill('TechGlobal')
    await expect(textInput).toHaveValue('TechGlobal')

    await expect(mainHeading).toHaveCSS('color', 'rgb(105, 105, 105)')

    const orderedList = page.locator('#ordered_list li')

    const arr = ['Cypress', 'Playwright', 'Selenium Webdriver']

    // for(let i = 0; i < await orderedList.count(); i++) {
    //     await expect(orderedList.nth(i)).toHaveText(arr[i])
    // }

    await expect(orderedList).toHaveText(arr)
  })

  test('Non-retry Assertions', async({ page }) => {

    expect(true).toBe(true)

    const num = 1

    expect(num).toBe(1)

    expect(num).toBeLessThan(2)

    expect(num).toBeLessThanOrEqual(1)

    expect(num).toBeGreaterThan(0)

    expect(num).toEqual(1)
    
    const mainHeading = page.locator('#main_heading')

    const mainHeadingText = await mainHeading.textContent()

    expect(mainHeadingText).toBe('Html Elements')
  })

  test('Creating custom assertions', async({ page }) => {

    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Project - Infinite Scroll");

    const articles = page.locator('.infinite-scroll-component > div')
    const articlesCount = await articles.count()

    console.log(articlesCount + ' is the count of the articles')

    await articles.last().scrollIntoViewIfNeeded()


    await expect(async () => {
        const newCount = await articles.count()
        console.log('Trying here! ' + newCount)
        expect(newCount).toBeGreaterThan(articlesCount)
    }).toPass({
        // Using 'toPass()' will force assertion to retry here for 3 seconds.
        timeout: 3000,
    })
  })

  test('Soft Assertions', async({ page }) => {

    // const mainHeading = page.locator('#main_heading')
    // await expect.soft(mainHeading).toHaveText('Html Elementslasmndlsald')

    const checkboxGroup = await page.locator('#checkbox-button-group input').all()

    for(const checkbox of checkboxGroup) {
        await checkbox.check()
        console.log('Checked')
    //     await expect(checkbox).not.toBeChecked()
    }
  })

})