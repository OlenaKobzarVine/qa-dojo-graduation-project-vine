import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { CreateAccountPageLocators } from './CreateAccountPageLocators';

export class CreateAccountPage extends BasePage {
  readonly locators: CreateAccountPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CreateAccountPageLocators(page.locator('body'));
  }
  async navigateToCreateAccountPage() {
    await this.navigateTo('/index.php?controller=registration');
    await this.locators.createAccountTitle.waitFor({ state: 'visible' });
  }

  async fillInputFields(credentials: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.locators.firstNameInput.fill(credentials.firstName);
    await this.locators.lastNameInput.fill(credentials.lastName);
    await this.locators.emailInput.fill(credentials.email);
    await this.locators.passwordInput.fill(credentials.password);
  }

  async setAgreeTerms(accepted: boolean) {
    const checked = await this.locators.agreeTermsCheckbox.isChecked();
    if (checked !== accepted) await this.locators.agreeTermsCheckbox.click();
  }

  async isSaveButtonEnabled() {
    return await this.locators.saveButton.isEnabled();
  }

  async clickSaveButton() {
    await this.locators.saveButton.click();
  }

  async getTermsCheckboxValidationMessage() {
    await this.locators.agreeTermsCheckbox.waitFor({ state: 'visible' });
    const validationMessage = await this.locators.agreeTermsCheckbox.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    return validationMessage;
  }

  async verifyCreateAccountPageURL() {
    await expect(this.page).toHaveURL(/registration/);
  }
}
