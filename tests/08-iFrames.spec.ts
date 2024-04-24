import { test, expect } from '@playwright/test'
import { clickLink } from '../helpers/clickHelpers'

test.describe('iFrames', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')
    await clickLink(page, 'IFrames')
  })

  test('iFrames Example', async ({ page }) => {
    // Use frameLocator() API to target iFrame instead of locator
    const frameLocator = page.frameLocator('#form_frame')

    // After you target the iframe, you can use locator() API method and chain it with the frameLocator
    // to target any element you want inside the iframe
    await frameLocator.locator('#first_name').fill('TechGlobal')
  })

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "IFrames" card
   * Enter "John" into the first name input box
   * Enter "Doe" into the last name input box
   * Click on the "SUBMIT" button
   * Validate the result equals "You entered: John Doe"
   */

  test('iFrames Test Case', async ({ page }) => {

    const frameLocator = page.frameLocator('#form_frame')
    const inputFields = frameLocator.locator('#first_name, #last_name')

    await inputFields.last().scrollIntoViewIfNeeded()

    await inputFields.last().waitFor({ state: 'visible' })

    const inputFieldsCount = await inputFields.count()

    const submitBtn = frameLocator.locator('#submit')
    const result = page.locator('#result')

    const name = 'John'
    const lastName = 'Doe'
    
    for(let i = 0; i < inputFieldsCount; i++) {
      await inputFields.nth(i).fill(i === 0 ? name : lastName)
    }

    await submitBtn.click()

    await expect(result).toHaveText(`You entered: ${name} ${lastName}`)
  })
})
