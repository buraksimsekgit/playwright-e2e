import { test, chromium } from "@playwright/test";

test.describe("Playwright 101", async () => {
  // This will trigger the test runner.
  test("Playwright 101 - Test Case", () => {
    // console.log('Tech Global')
    // Tests to be executed
  });

  // Test runner will trigger the browser context
  // using the { page } fixture
  test("Playwright 101 - Test Case 2", ({ page }) => {
    // const myobj = {
    //   name: "myName",
    //   lastName: "lastName",
    // };
    // myobj.name;
    // const { name, lastName } = myobj;
    // name;
    // Test t be executed
  });

  // Marks a function as asynchronous using 'async' keyword
  // meaning it might take some time to complete
  test("Playwright 101 - Test Case 3", async ({ page }) => {
    // The await keyword pauses function exectuon untill a Promise is resolved,
    // ensuring code runs only after the Promise is fulfilled or rejected
    await page.goto("https://www.techglobal-training.com/");
  });

	// Imagine this is any BDD keyword (Given, When, And)
	test('Playwright 101 - Cucumber Syntax', async () => {

		const browser = await chromium.launch()
		const context = await browser.newContext()
		const page = await context.newPage()

		await page.goto("https://www.techglobal-training.com/")

		await page.close()
	})

	test('Playwright 101 - Browser fixture', async ({ browser }) => {

		const context = await browser.newContext()

		const page = await context.newPage()

		await page.goto("https://www.techglobal-training.com/")

		await page.close()
	})

	test('Playwright 101 - Context fixture', async ({ context }) => {

		const page = await context.newPage()

		await page.goto("https://www.techglobal-training.com/")

		await page.close()
	})

});
