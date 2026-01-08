import { Page } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  readonly locators: LoginPageLocators;
  //private readonly signInUrl = 'https://teststore.automationtesting.co.uk/index.php?controller=authentication';

  constructor(page: Page) {
    super(page);
    this.locators = new LoginPageLocators(page.locator('body'));
  }

  async navigateToSignInPage() {
    await this.navigateTo(
      'https://teststore.automationtesting.co.uk/index.php?controller=authentication'
    );
    await this.locators.signInTitle.waitFor({ state: 'visible' });
  }

  async fillInputFields(credentials: { email: string; password: string }) {
    await this.locators.emailInput.fill(credentials.email);
    await this.locators.passwordInput.fill(credentials.password);
  }

  async clickSignInButton() {
    await this.locators.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.fillInputFields({ email, password });
    await this.clickSignInButton();
  }

}
