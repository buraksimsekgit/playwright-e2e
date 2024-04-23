import { test, expect } from "@playwright/test";
import { clickButton, clickLink } from "../helpers/clickHelpers";
import fs from 'fs'
import path from 'path'

test.describe("Download & Upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend");
    await clickLink(page, "File Download & Upload");
  });

  test("Download a File", async ({ page }) => {
		
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("#file_download"),
    ]);


		// We call path() methot to see the location that handled by Playwright
    // const path = await download.path();
		// console.log(path)

		/**
		 * Provide the correct path to save the file
		 * const downloadPath = downloads/myFileName
		 */

		// const downloadPath = "downloads/" + download.suggestedFilename()
		const downloadPath = path.join('downloads', download.suggestedFilename())

		// Save the file
		await download.saveAs(downloadPath)

		/**
		 * Using fs (file system) module to check if the file exist
		 * It allows you to work with files and directories on the computer where the Node.js code is running.
		 * This includes liek reading, writing files of createing directories, and much more.
		 */

		const isDownloaded = fs.existsSync(downloadPath)
		console.log(isDownloaded)

		expect(isDownloaded, { message: 'test is FAILED' }).toBeTruthy()
  });

	test('Upload a file', async({ page }) => {

		const uploadLink = page.locator('#file_upload')
		const uploadPath = 'downloads/SampleText.txt'

		await uploadLink.setInputFiles(uploadPath)

		// Uploading multiole files use array of paths
		// await uploadLink.setInputFiles(['path/file', 'path/file2'])

		await clickButton(page, 'UPLOAD')

		const result = page.locator('#result')

		await expect(result).toHaveText(`You uploaded ${uploadPath.slice(uploadPath.lastIndexOf('/') + 1)}`)
		
		console.log(process.env.BASE_URL)
		console.log(process.env.USER_NAME)
		console.log(process.env.USER_PASSWORD)
	})
});
