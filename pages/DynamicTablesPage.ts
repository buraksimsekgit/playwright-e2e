import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class DynamicTablesPage extends BasePage {
  readonly addProductButton: Locator
  readonly productModal: Locator
  readonly closeProductModalButton: Locator

  constructor(page: Page) {
    super(page)
    this.addProductButton = page.locator('#add_product_btn')
    this.productModal = page.locator('.modal-card')
    this.closeProductModalButton = page.locator('.delete')
  }

  async clickAddProductButton() {
    await this.addProductButton.click()
  }

  async closeProductModal() {
    await this.closeProductModalButton.click()
  }
}
