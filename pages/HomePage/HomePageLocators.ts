import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class HomePageLocators extends BasePageLocators {
  readonly signOutButton: Locator = this.baseLocator.locator(`a.logout.hidden-sm-down`);
  readonly userAccountLink: Locator = this.baseLocator.locator(`a.account`);
  
  readonly productItems: Locator = this.baseLocator.locator(`div.js-product.product`);
  readonly productRegularPrice: Locator = this.baseLocator.locator(`span.regular-price`);
  readonly productDiscount: Locator = this.baseLocator.locator(`span.discount-percentage`);

  readonly productName: string = `h3.product-title a`;
  readonly productPrice: string = `span.price`;
  readonly quickViewButton: string = `a.quick-view`;
  
  readonly shoppingCart: Locator = this.baseLocator.locator(`#_desktop_cart`);
}
