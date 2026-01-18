import { test } from '../fixtures/MyFixture';
import { expect } from '@playwright/test';

interface ProductTestData {
  index: number;
  name: string;
  price?: string;
}

test.describe(
  'Product Interaction Tests',
  {
    tag: ['@Products', '@PositiveTests'],
    storageState: './storageState.json',
  },
  () => {
     let testProducts: ProductTestData[] = [];

    test.beforeAll(async ({ homePage }) => {
      await homePage.navigateTo('/');
      await homePage.waitForHomePageElements();
      
      testProducts = await homePage.getTestProductsData();
      expect(testProducts.length, 'The page should have products for testing').toBeGreaterThan(0);
    });

     test.beforeEach(async ({ homePage }) => {
      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Verify home page is loaded', async () => {
        await expect(homePage).toHaveURL(/\/index\.php$/);
        await expect(homePage).not.toHaveURL(/registration/);
      });
    });

 for (const product of testProducts) {
      test(`PROD-00${product.index} - add "${product.name}" to cart`, async ({
        homePage,
        productPage,
        modal,
        page,
      }) => {
        await test.step('Open product page', async () => {
          await homePage.locators.productItems.nth(product.index).click();
          await page.waitForLoadState('networkidle');
          
          const title = await productPage.getProductTitle();
          expect(title, 'Product title should be visible').toBeTruthy();
        });

        await test.step('Add product to cart', async () => {
          await productPage.addToCart();
        });

        await test.step('Close modal and continue shopping', async () => {
          await modal.closeModal();
          await page.waitForLoadState('networkidle');
        });
      });
    }
  },
);