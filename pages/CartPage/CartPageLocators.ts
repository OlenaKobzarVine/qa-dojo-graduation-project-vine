import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class CartPageLocators extends BasePageLocators {
  readonly cartItems: Locator = this.baseLocator.locator('.cart-item');
  readonly productName: string = '.product-line-info a';
  readonly productPrice: string = '.current-price .price';
  readonly removeFromCartButton: string = '.remove-from-cart';
  readonly quantityInput: string = '.js-cart-line-product-quantity';
  readonly proceedToCheckoutButton: Locator = this.baseLocator.locator('.checkout a');
  readonly noItemsInCartLabel: Locator = this.baseLocator.locator('.no-items');
}