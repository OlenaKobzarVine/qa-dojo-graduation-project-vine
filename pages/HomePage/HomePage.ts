import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { HomePageLocators } from './HomePageLocators';

export class HomePage extends BasePage {
  readonly locators: HomePageLocators;
  //private readonly signInUrl = 'https://demo.learnwebdriverio.com/login';

  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(page.locator('body'));
  }

  async verifyHomePageLoaded() {
    //await this.page.waitForLoadState('networkidle');
    //await this.page.waitForTimeout(5000);
    await this.locators.signOutButton.waitFor({ state: 'visible' });
    await expect(this.page).toHaveURL(/\/index\.php$/);
    await expect(this.page).not.toHaveURL(/registration/);
  }
}
