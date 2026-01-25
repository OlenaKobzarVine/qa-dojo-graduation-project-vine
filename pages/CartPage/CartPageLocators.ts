import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class CartPageLocators extends BasePageLocators {
  readonly cartItems: Locator = this.baseLocator.locator('.cart-item');
  readonly productName: string = '.product-line-info a';
  readonly productPrice: string = '.current-price .price';
  readonly quantityInput: Locator = this.baseLocator.locator('.js-cart-line-product-quantity');
  readonly removeFromCartButton: Locator = this.baseLocator.locator('.remove-from-cart');
  readonly proceedToCheckoutButton: Locator = this.baseLocator.locator('.checkout a');
  readonly cartSummary: Locator = this.baseLocator.locator('.cart-summary');
  readonly subtotalValue: Locator = this.cartSummary.locator('#cart-subtotal-products .value');
  readonly totalValue: Locator = this.cartSummary.locator('.cart-total .value');
  readonly noItemsInCartLabel: Locator = this.baseLocator.locator('.no-items');
}