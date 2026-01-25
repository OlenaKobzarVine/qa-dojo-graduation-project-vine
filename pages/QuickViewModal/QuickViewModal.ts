import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { QuickViewModalLocators } from './QuickViewModalLocators'; 

export class QuickViewModal extends BasePage {
  readonly locators: QuickViewModalLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new QuickViewModalLocators(page.locator('body'));
  }

  async clickAddToCart() {
    await this.locators.addToCartButton.click();
  }

  async closeModal(){
    await this.locators.closeButton.click();
  }
}
