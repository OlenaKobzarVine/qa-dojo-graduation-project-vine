import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePage {
  readonly locators: CartPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartPageLocators(page.locator('body'));
  }

  async getCartItemsCount() {
    if (await this.locators.noItemsInCartLabel.isVisible()) return 0;
    await this.locators.cartItems.first().waitFor();
    return this.locators.cartItems.count();
  }

  async getProductInCart(index: number) {
    return this.locators.cartItems.nth(index);
  }

  async clickProceedToCheckout() {
    await this.locators.proceedToCheckoutButton.click();
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

  async verifyProductsInCart(addedProducts: Array<{ name: string | null }>) {
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

  private getProductByName(productName: string) {
    return this.page.locator(`.cart-item:has-text("${productName}")`);
  }

  async removeProduct(name: string) {
    const product = this.getProductByName(name);
    await product.locator(this.locators.removeFromCartButton as string).click();
    await expect(product).not.toBeVisible();
  }

  async getProductQuantity(productName: string): Promise<number> {
    const product = this.getProductByName(productName);
    const quantityInput = product.locator(this.locators.quantityInput as string);
    const quantityValue = await quantityInput.inputValue();
    return parseInt(quantityValue, 10);
  }

  async updateProductQuantity(productName: string, quantity: number): Promise<void> {
    const product = this.getProductByName(productName);
    const quantityInput = product.locator(this.locators.quantityInput as string);
    await quantityInput.clear();
    await quantityInput.fill(quantity.toString());
    await quantityInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }
}