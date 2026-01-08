import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class HomePageLocators extends BasePageLocators {
  readonly signOutButton: Locator = this.baseLocator.locator(`//a[@class='logout hidden-sm-down']`);
  readonly userAccountLink: Locator = this.baseLocator.locator(`.account`);
  
}
