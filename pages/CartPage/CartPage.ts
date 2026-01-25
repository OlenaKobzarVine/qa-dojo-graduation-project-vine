import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePage {
  readonly locators: CartPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartPageLocators(page.locator('body'));
  }

  async getCartItemsCount(): Promise<number> {
    if (await this.locators.noItemsInCartLabel.isVisible()) return 0;
    await this.locators.cartItems.first().waitFor();
    return this.locators.cartItems.count();
  }

  async getProductInCart(index: number): Promise<Locator> {
    return this.locators.cartItems.nth(index);
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.locators.proceedToCheckoutButton.click();
  }

  async removeProduct(index: number): Promise<void> {
    const item = await this.getProductInCart(index);
    await item.locator(this.locators.removeFromCartButton).click();
    await expect(item).not.toBeVisible();
  }

  async getCartProductsNames() {
    const cartItemsCount = await this.getCartItemsCount();
    const productNames: string[] = [];

    for (let i = 0; i < cartItemsCount; i++) {
      const productItem = await this.getProductInCart(i);
      const name = await productItem
        .locator(this.locators.productName as string)
        .textContent();
      if (name) {
        productNames.push(name.trim());
      }
    }

    return productNames;
  }

  async verifyProductsInCart(addedProducts: Array<{ name: string | null }>): Promise<void> {
    const cartProductNames = await this.getCartProductsNames();

    for (const product of addedProducts) {
      if (!product.name) continue;
      
      const cleanProductName = product.name.replace(/\s*\.{3}\s*/, '').trim();
      
      const found = cartProductNames.some(cartName => {
        return cartName.includes(product.name || '') || 
               cartName.includes(cleanProductName) ||
               (product.name && cartName.toLowerCase().includes(product.name.toLowerCase())) ||
               cartName.toLowerCase().includes(cleanProductName.toLowerCase());
      });
      
      await expect(found).toBeTruthy();
    }
  }
}