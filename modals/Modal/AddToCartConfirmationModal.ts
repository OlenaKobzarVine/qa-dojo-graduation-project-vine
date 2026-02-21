import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage/BasePage';
import { ModalLocators } from './ModalLocators';

export class AddToCartConfirmationModal extends BasePage {
  readonly locators: ModalLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ModalLocators(page.locator('body'));
  }
    async waitForModalToAppear() {
    await this.locators.modal.waitFor({ 
      state: 'visible', 
      timeout: 10000 
    });
  }

  async verifyModalIsVisible() {
    await this.locators.modal.waitFor({ state: 'visible' });
    await expect(this.locators.modal).toBeVisible();
  }

  async clickContinueShopping() {
    await this.waitForModalToAppear();    
    await this.locators.continueShoppingButton.waitFor({ 
      state: 'visible', 
      timeout: 10000 
    });    
    await this.locators.continueShoppingButton.click();    
    await this.locators.modal.waitFor({ 
      state: 'hidden', 
      timeout: 10000 
    });
  }

  async closeModal() {
    await this.verifyModalIsVisible();
    await this.clickContinueShopping();
  }

}
