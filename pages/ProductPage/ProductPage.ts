import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { ProductPageLocators } from './ProductPageLocators';

export interface Product {
  index: number;
  name: string;
  price?: string;
}

export class ProductPage extends BasePage {
  readonly locators: ProductPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductPageLocators(page.locator('body'));
  }

  async getProductName(): Promise<string> {
    return this.locators.productTitle.textContent() || '';
  }

  async getProductPrice(): Promise<string> {
    return this.locators.productPrice.textContent() || '';
  }

  async addToCart(): Promise<void> {
    await this.locators.addToCartButton.click();
  }

  async getProductTitle(): Promise<string> {
    await this.locators.productTitle.waitFor({ state: 'visible' });
    const title = await this.getProductName();
    return title;    
  }
  
}
