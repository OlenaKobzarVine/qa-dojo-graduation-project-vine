import { Page, Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class LoginPageLocators extends BasePageLocators {
  readonly emailInput: Locator = this.baseLocator.locator('#field-email');
  readonly passwordInput: Locator = this.baseLocator.locator('#field-password');
  readonly signInButton: Locator = this.baseLocator.getByRole('button', { name: 'Sign in' });
  readonly signInTitle: Locator = this.baseLocator.getByRole('heading', { level: 1, name: 'Log in to your account' });
}
