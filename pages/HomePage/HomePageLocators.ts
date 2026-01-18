import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class HomePageLocators extends BasePageLocators {
  readonly signOutButton: Locator = this.baseLocator.locator(`//a[@class='logout hidden-sm-down']`);
  readonly userAccountLink: Locator = this.baseLocator.locator(`.account`);
  
  // readonly inventoryContainer: Locator = this.baseLocator.locator(
  //   '.inventory_container'
  // );
  // readonly cartBadge: Locator = this.baseLocator.locator(
  //   '.shopping_cart_badge'
  // );
  // readonly burgerMenu: Locator = this.baseLocator.locator(
  //   '#react-burger-menu-btn'
  // );
  // readonly logoutLink: Locator = this.baseLocator.locator(
  //   '#logout_sidebar_link'
  // );
  readonly productItems: Locator = this.baseLocator.locator(`.js-product.product`);
  readonly productName: Locator = this.baseLocator.locator('.product-name, .product-title, h2, h3');
  readonly productPrice: Locator = this.baseLocator.locator('.price, .product-price');
  readonly shoppingCart: Locator = this.baseLocator.locator(
    // '.shopping_cart_link'
    '#_desktop_cart'
  );
}
