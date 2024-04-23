import { test, expect } from "@playwright/test";
import { clickLink } from "../helpers/clickHelpers";

test.describe("Interacting Multiple tabs", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Multiple Windows");
  });

  test("Create a new tab", async ({ page, context }) => {
    // const newTab = await page.context().newPage()
    const newTab = await context.newPage();

    await newTab.goto("https://www.apple.com/");

    await page.bringToFront();

    await page.goto("https://www.google.com");

    await page.locator('[name="q"]').fill("TechGlobal");

    await page.keyboard.press("Enter");
  });

  test("Interacting/switching to a new tab", async ({ page }) => {
    // await page.pause()

    // await clickLink(page, 'Apple')

    // const newTab = await page.waitForEvent('popup')

    // await expect(newTab).toHaveTitle('Apple')

    // await clickLink(page, 'Microsoft')

    // const newTab2 = await page.waitForEvent('popup')

    // await expect(newTab2).toHaveTitle('Microsoft – Cloud, Computers, Apps & Gaming')

    // await page.bringToFront()

    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      clickLink(page, "Apple"),
    ]);

    await expect(newTab).toHaveTitle("Apple");

    const numbers = [1, 2, 3];
    const [first, second] = numbers;

    console.log(first);
    console.log(second);

    const [newTab2] = await Promise.all([
      page.waitForEvent("popup"),
      clickLink(page, "Microsoft"),
    ]);

    await expect(newTab2).toHaveTitle(
      "Microsoft – Cloud, Computers, Apps & Gaming"
    );
  });

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Multiple Windows" card
   * Click on the "Apple" link and validate URL contains "Apple"
   * Click on the "Microsoft" link and validate URL contains "Microsoft"
   * Click on the "Tesla" link and validate URL contains "Tesla"
   */

  test("Test Case", async ({ page }) => {
    const links = ["Apple", "Microsoft", "Tesla"];

    for (const link of links) {
      const [newTab] = await Promise.all([
        page.waitForEvent("popup"),
        clickLink(page, link),
      ]);

      expect(newTab.url()).toContain(link.toLowerCase());
      await newTab.close();
    }
  });
});
