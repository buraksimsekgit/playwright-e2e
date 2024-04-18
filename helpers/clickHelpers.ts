import { Page } from "@playwright/test";

async function clickButton(page: Page, buttonText: string): Promise<void> {
  await page.getByRole("button", { name: buttonText }).click();
}

async function clickLink(page: Page, linktext: string): Promise<void> {
  await page.getByRole("link", { name: linktext }).click();
}

export { clickButton, clickLink };
