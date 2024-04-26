import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class WaitsPage extends BasePage {
  readonly redBoxButton: Locator
  readonly blueBoxButton: Locator
  readonly redBox: Locator
  readonly blueBox: Locator

  constructor(page: Page) {
    super(page)
    this.redBoxButton = page.locator('#red')
    this.blueBoxButton = page.locator('#blue')
    this.redBox = page.locator('.box.has-background-danger')
    this.blueBox = page.locator('button[class*="blue_box"]')
  }

  async clickRedBoxBUtton(options = {}) {
    await this.redBoxButton.click(options)
  }

  async clickBlueBoxBUtton(options = {}) {
    await this.blueBoxButton.click(options)
  }
}
