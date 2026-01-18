import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { ModalLocators } from './ModalLocators';

export class Modal extends BasePage {
  readonly locators: ModalLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ModalLocators(page.locator('body'));
  }

  async verifyModalIsVisible(): Promise<void> {
    await this.locators.modalContainer.waitFor({ state: 'visible' });
    await expect(this.locators.modalContainer).toBeVisible();
  }

  async clickContinueShopping(): Promise<void> {
    await this.locators.continueShoppingButton.click();
  }

  async closeModal(): Promise<void> {
    await this.verifyModalIsVisible();
    await this.clickContinueShopping();
  }
}
