import { Page, Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class ProductPageLocators extends BasePageLocators {
  readonly addToCartButton: Locator = this.baseLocator.locator(
    `//button[@data-button-action='add-to-cart']`
  );
  readonly productTitle: Locator = this.baseLocator.locator('.product-container h1');
  readonly productPrice: Locator = this.baseLocator.locator('.current-price span');
}
