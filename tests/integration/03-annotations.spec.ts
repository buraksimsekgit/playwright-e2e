import { test, expect } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Annotations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')

    // await page.getByRole('link', { name: 'Html Elements' }).click()
    await clickLink(page, 'Html Elements')
  })

  // test.fail("Annotations - fail", async ({ page }) => {

  // 	// test.fail()

  //   const heading = page.locator("#main_heading");

  //   await expect(heading).toHaveText("aslkndakslndklsankldsa");
  // });

  // test.fixme("Annotations - fixme", async ({ page }) => {

  // 	// test.fail()

  //   const heading = page.locator("#main_heading");

  //   await expect(heading).toHaveText("aslkndakslndklsankldsa");
  // });

  // test("Annotations - slow", async ({ page }) => {
  //   // This will triple the timeout for this test only
  //   test.slow();

  //   const heading = page.locator("asdasdasd");

  //   await heading.click();
  // });

  /**
   * 1. Go to 'https://techglobal-training.com/frontend'
   * 2. Click on the 'Html Elements' card
   * 3. From the Paragraphs heading
   * 4. Validate Hello World and I Like automation testing! texts are visible
   * 5. Validate their texts are equal to expected texts
   * 6. Validate their id and value
   */

	test('Annotations - step @smoke', async ({ page }, testInfo ) => {

		console.log(testInfo.title)
		console.log(testInfo.error?.message)

		const paragraphs = page.locator('[data-identifier="Paragraphs"] > p')
		const paragraphsAll = await paragraphs.all()
    
		// test.step('1. Go to "https://techglobal-training.com/frontend"', async () => {
		// 	await page.goto('https://techglobal-training.com/frontend')
		// })

		// test.step('2. Click on the "Html Elements" card', async () => {
		// 	await clickLink(page, "Html Elements");
		// })

		await test.step('3. Validate Hello World and I Like automation testing! texts are visible', async () => {
			for(const paragraph of paragraphsAll) {
				await expect(paragraph).toBeVisible()
			}
		})

		await test.step('4. Validate their texts are equal to expected texts', async () => {
			await expect(paragraphs).toHaveText(['Hello World!', 'I like automation testing!'])
		})
		
  })
})
