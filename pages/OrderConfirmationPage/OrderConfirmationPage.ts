import { Page } from '@playwright/test';
import { OrderConfirmationPageLocators } from './OrderConfirmationPageLocators';
import { BasePage } from '../BasePage/BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly locators: OrderConfirmationPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new OrderConfirmationPageLocators(page.locator('body'));
  }

  getConfirmationElements() {
    return {
      title: this.locators.confirmationTitle,
      text: this.locators.confirmationText,
    };
  }
}
