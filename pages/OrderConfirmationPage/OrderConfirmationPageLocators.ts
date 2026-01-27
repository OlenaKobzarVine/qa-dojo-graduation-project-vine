import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class OrderConfirmationPageLocators extends BasePageLocators {
  readonly confirmationTitle: Locator = this.baseLocator.locator('h3.card-title').filter({ hasText: 'Your order is confirmed' });
  readonly confirmationText: Locator = this.baseLocator.locator('div.card-block p').first();
}
