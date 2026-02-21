import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class CreateAccountPageLocators extends BasePageLocators {
  readonly createAccountTitle: Locator = this.baseLocator.getByRole('heading', { level: 1, name: 'Create an account' });

  readonly agreeTermsCheckbox: Locator = this.baseLocator.locator('input[name="psgdpr"]');

  readonly firstNameInput: Locator = this.baseLocator.locator(
    `#field-firstname`
  );

  readonly lastNameInput: Locator = this.baseLocator.locator(
    `#field-lastname`
  );

  readonly emailInput: Locator = this.baseLocator.locator(
    `#field-email`
  );

  readonly passwordInput: Locator = this.baseLocator.locator(
    `#field-password`
  );

  readonly saveButton: Locator = this.baseLocator.getByRole('button', { name: 'Save' });
}
