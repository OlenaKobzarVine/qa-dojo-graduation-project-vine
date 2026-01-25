import { test } from '../fixtures/MyFixture';
import { expect } from '@playwright/test';
import { TestData } from '../TestData';

test.describe(
  'Product Interaction Tests',
  {
    tag: ['@Products', '@PositiveTests'],
    storageState: './storageState.json',
  },
  () => {

    test('Add all products to cart', async ({ homePage, cartPage }) => {
      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Verify home page is loaded', async () => {
        await expect(homePage.page).toHaveURL(/\/index\.php$/);
        await expect(homePage.page).not.toHaveURL(/registration/);
      });

      await test.step('Add all products to cart', async () => {
        // addedProductsCount = await homePage.getProductItemsCount();
        await homePage.addAllProductToCart();
      });

      await test.step('Navigate to shopping cart and verify all products are added', async () => {
        const addedProducts = await homePage.getTestProductsData();
        await homePage.openCart();

        await cartPage.verifyProductsInCart(addedProducts);
      });
    });
  }
)