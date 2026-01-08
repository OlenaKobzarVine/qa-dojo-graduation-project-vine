import { Page } from '@playwright/test';

export interface User {
  username: string;
  password: string;
}

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
