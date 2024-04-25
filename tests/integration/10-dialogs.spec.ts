import { test } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')
    await clickLink(page, 'Alerts')
  })

  test('Handling Dialogs', async ({ page }) => {
    // page.on('dialog', async(dialog) => {

    // 	const type = await dialog.type()
    // 	const message = await dialog.message()

    // 	await dialog.accept()

    // 	console.log(type)
    // 	console.log(message)

    // 	expect(message).toBe('You are on TechGlobal Training application.')
    // })

    // page.on("dialog", async (dialog) => {
    //   const type = await dialog.type();

    //   if (type === "alert") {
    //     await dialog.accept();
    //   } else if (type === "confirm") {
    //     await dialog.dismiss();
    //   } else {
    //     await dialog.accept("My Message");
    //   }

    //   console.log(dialog.message());
    // });

    page.once('dialog', async (dialog) => {
      await dialog.accept()

      console.log(dialog.message())
    })

    await clickButton(page, 'Warning alert')

    page.once('dialog', async (dialog) => {
      await dialog.dismiss()

      console.log(dialog.message())
    })
    await clickButton(page, 'Confirmation alert')

    page.once('dialog', async (dialog) => {
      await dialog.accept('My Message')

      console.log(dialog.message())
    })
    await clickButton(page, 'Prompt alert')
  })
})
