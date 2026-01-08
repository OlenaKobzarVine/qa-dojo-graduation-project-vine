import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class CreateAccountPageLocators extends BasePageLocators {
  readonly createAccountTitle: Locator = this.baseLocator.locator(
    `//h1[normalize-space(text())='Create an account']`
  );

  readonly agreeTermsCheckbox: Locator = this.baseLocator.locator(
    `//input[@name="psgdpr"]`
  );

  // Inputs
  readonly firstNameInput: Locator = this.baseLocator.locator(
    `//input[@id="field-firstname"]`
  );

  readonly lastNameInput: Locator = this.baseLocator.locator(
    `//input[@id="field-lastname"]`
  );

  readonly emailInput: Locator = this.baseLocator.locator(
    `//input[@id="field-email"]`
  );

  readonly passwordInput: Locator = this.baseLocator.locator(
    `//input[@id="field-password"]`
  );

  // Buttons
  readonly saveButton: Locator = this.baseLocator.locator(
    `//button[normalize-space(text())='Save']`
  );
}
