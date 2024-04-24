import { test } from '@playwright/test'
import { clickLink } from '../helpers/clickHelpers'

test.describe('Element State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')
    await clickLink(page, 'Html Elements')
  })

  test('Getting Element State', async({ page }) => {

    const registerButton = page.getByRole('button', { name: 'Register' })
    const signinButton = page.getByRole('button', { name: 'Sign in' })

    const buttonMessage = page.locator('.mt-1')

    // lets say, we only want to click register button when its enabled, and click on the sign in when the message is visible

    const registerButtonState = await registerButton.isEnabled()
    const isMessageVisible = await buttonMessage.isVisible()

    if(registerButtonState) {
        await registerButton.click()
    }

    isMessageVisible ? await signinButton.click() : await registerButton.click()
  })

  test('Getting Element State - Checkbox and Radio Buttons', async({ page }) => {
    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    // const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    await apple.check()
    const isAppleChecked = await apple.isChecked()

    if(isAppleChecked) {
        await microsoft.check()
    } else {
        await apple.check()
    }
  })
})