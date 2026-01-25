import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { ModalLocators } from './ModalLocators';

export class Modal extends BasePage {
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
    
    await this.page.waitForTimeout(500);
    
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

  async isProductAddedToCartMessageVisible() {
    return await this.locators.successMessage.isVisible();
  }

  async hasProductAddedMessage() {
    const text = await this.locators.successMessage.textContent();
    return text?.includes('Product successfully added to your shopping cart') ?? false;
  }

  async isProceedToCheckoutVisible() {
    return await this.locators.checkoutButton.isVisible();
  }

  async getSubtotalValue() {
    return await this.locators.subtotalValue.textContent();
  }

  async getShippingValue() {
    return await this.locators.shippingValue.textContent();
  }

  async getTotalValue() {
    return await this.locators.totalValue.textContent();
  }
}
