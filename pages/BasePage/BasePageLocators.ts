import { Locator } from '@playwright/test';

export class BasePageLocators {
  protected baseLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
  }
}