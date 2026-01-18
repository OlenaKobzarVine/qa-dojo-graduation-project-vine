import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class ModalLocators extends BasePageLocators {
  readonly closeButton: Locator = this.baseLocator.locator('button.close');
  readonly continueShoppingButton: Locator = this.baseLocator.locator('button.close');
  readonly modalContainer: Locator = this.baseLocator.locator('.modal');
}
