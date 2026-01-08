import { Page, Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class LoginPageLocators extends BasePageLocators {
  readonly emailInput: Locator = this.baseLocator.locator(
    `//input[@id="field-email"]`
  );
  readonly passwordInput: Locator = this.baseLocator.locator(
    `//input[@id="field-password"]`
  );
  readonly signInButton: Locator = this.baseLocator.locator(
    `//button[normalize-space(text())='Sign in']`
  );
  readonly signInTitle: Locator = this.baseLocator.locator(
    `//h1[normalize-space(text())='Log in to your account']`
  );
}
