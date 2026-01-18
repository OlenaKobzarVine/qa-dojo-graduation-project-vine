import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { HomePageLocators } from './HomePageLocators';

export interface Product {
  index: number;
  name: string;
  price?: string;
}

export class HomePage extends BasePage {
  readonly locators: HomePageLocators;
  //private readonly signInUrl = 'https://demo.learnwebdriverio.com/login';

  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(page.locator('body'));
  }

  async waitForHomePageElements() {
    await this.locators.signOutButton.waitFor({ state: 'visible' });
    await this.locators.shoppingCart.waitFor({ state: 'visible' });
    await this.locators.productItems.first().waitFor({ state: 'visible' });
  }

  // async verifyHomePageURL() {
  //   await expect(this.page).toHaveURL(/\/index\.php$/);
  //   await expect(this.page).not.toHaveURL(/registration/);
  // }

  // async verifyHomePageLoaded() {
  //   //await this.page.waitForLoadState('networkidle');
  //   // await this.page.waitForTimeout(1000);
  //   await this.locators.signOutButton.waitFor({ state: 'visible' });
  //   await expect(this.page).toHaveURL(/\/index\.php$/);
  //   await expect(this.page).not.toHaveURL(/registration/);
  // }

  async openCart() {
    await this.locators.shoppingCart.click();
  }

  async getProductItemsCount(): Promise<number> {
    return this.locators.productItems.count();
  }

  async getTestProductsData(): Promise<Product[]> {
    const productCount = await this.getProductItemsCount();
    const products: Product[] = [];

    for (let i = 0; i < productCount; i++) {
      const productElement = this.locators.productItems.nth(i);
      const name = await productElement.locator(this.locators.productName).textContent();
      const price = await productElement.locator(this.locators.productPrice).textContent();

      products.push({
        index: i,
        // name: name?.trim() || `Product ${i + 1}`,
        name: name?.trim(),
        // price: price?.trim() || undefined,
        price: price?.trim(),
      });
    }

    return products;
  }

  async openProductItemPage(index: number) {
    await this.locators.productItems.nth(index).click();
  }

  async addAllProductToCartAndVerify() {
      
    const testProducts = await this.getTestProductsData();
    if (testProducts.length > 0) {
      for (const product of testProducts) {
         await this.openProductItemPage(product.index);
        await this.addToCart();
              // await test.step(`Add ${product.name} to cart`, async () => {
              //   await test.step('Open product page', async () => {
                  //await homePage.locators.productItems.nth(product.index).click();
                  //  await this.openProductItemPage(product.index);
                  //await this.waitForLoadState('networkidle');
                  // let title = await productPage.getProductTitle();
                  // expect(title, 'Product title should be visible').toBeTruthy();
                // }
              // );
      
                // await test.step('Add product to cart', async () => {
                //   await productPage.addToCart();
                // });
      
                await test.step('у відкритому модальному вікні натиснути кнопку Продовжити покупки', async () => {
                  await modal.closeModal();
                  await page.waitForLoadState('networkidle');
                });
      
                // Navigate back to home page for next product
                if (product.index < testProducts.length - 1) {
                  await page.goBack({ waitUntil: 'networkidle' });
                }
            //   });
            }
    }
  }


}
