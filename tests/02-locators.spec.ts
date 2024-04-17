import { test } from "@playwright/test";

test.describe("Playwright Locators", () => {
  test("Playwright Locator API", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/");

    await page.locator("#logo").click();
    await page.click("#logo");

    const myLogo = page.locator("#logo");

    await myLogo.click();
  });

  test("Playwright - Custom Pseudo Classes", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    // These are two same ways to locate the element by their visibile text on the UI
    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.locator('a:has-text("Html elements")').click();

    await page.pause();

    await page.locator('button:text("Register")').click();
    await page.locator('button:has-text("Sign in"):visible').click();

    console.log(await page.locator('#radio-button-group > div').count())

    console.log(await page.locator('#radio-button-group > div', { has: page.locator('#java_radio') }).count())
  });
});
