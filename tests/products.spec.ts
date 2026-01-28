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

    test('PR-001 Add all products to cart', async ({ homePage, cartPage }) => {
      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Verify home page is loaded', async () => {
        await expect(homePage.page).toHaveURL(/\/index\.php$/);
        await expect(homePage.page).not.toHaveURL(/registration/);
      });

      await test.step('Add all products to cart', async () => {
        await homePage.addAllProductsFromFirstPageToCart();
      });

      await test.step('Navigate to shopping cart and verify all products are added', async () => {
        const addedProducts = await homePage.getTestProductsData();
        await homePage.openCart();

        await cartPage.verifyProductsInCart(addedProducts);
      });
    });

    test('PR-002 Add product quantity and remove from cart', async ({ homePage, cartPage, quickViewModal, modal }) => {
      const productToTest = TestData.products[0]; 

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Add product with quantity 2 to cart', async () => {
        await homePage.addProductToCartByName(productToTest.title, 2);
      });

      await test.step('Navigate to shopping cart and verify products are added', async () => {
        await homePage.openCart();
        const cartProductNames = await cartPage.getCartProductsNames();
        const found = cartProductNames.some(name => name.includes(productToTest.title));
        await expect(found).toBeTruthy();
      });

      await test.step('Remove product from cart', async () => {
        await cartPage.removeProduct(productToTest.title);
      });

      await test.step('Verify product is no longer in cart', async () => {
        const cartProductNames = await cartPage.getCartProductsNames();
        const found = cartProductNames.some(name => name.includes(productToTest.title));
        await expect(found).toBeFalsy();
      });
    });
  }
)

test.describe(
  'Search tests by product title',
  { tag: ['@Search', '@PositiveTests'] },
  () => {

    for (const product of TestData.products) {
      test(`Search by "${product.title}" returns correct results`, async ({ homePage }) => {

        await test.step('Navigate to the home page', async () => {
          await homePage.navigateTo('/');
          await homePage.waitForHomePageElements();
        });

        await test.step('Enter product title into search input', async () => {
          await homePage.locators.searchInput.fill(product.title);
        });

        await test.step('Verify autocomplete menu is visible', async () => {
          await homePage.locators.autocompleteMenu.waitFor({ state: "visible" });
          await expect(homePage.locators.autocompleteMenu).toBeVisible();
        });

        const suggestions = homePage.locators.autocompleteItems;
        const suggestionCount = await suggestions.count();

        await test.step('Verify at least one search result is shown', async () => {
          expect(
            suggestionCount,
            `Expected at least one autocomplete result for "${product.title}"`
          ).toBeGreaterThan(0);
        });

        await test.step('Verify autocomplete results match search criteria', async () => {
          const verificationResult = await homePage.verifyAutocompleteResultsMatchSearch(product.title);
          expect(verificationResult.allMatch).toBeTruthy();
        });
      });
    }
  }
);

test.describe(
  'Search tests with invalid value',
  { tag: ['@Search', '@NegativeTests'] },
  () => {
    test('SA-002 Invalid search value returns no results', async ({ homePage }) => {
      const invalidSearchValue = 'Invalid value qwerty';

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Enter invalid search value into search input', async () => {
        await homePage.locators.searchInput.fill(invalidSearchValue);
      });

      await test.step('Verify autocomplete menu does not appear', async () => {
        await expect(homePage.locators.autocompleteMenu).not.toBeVisible({ timeout: 5000 });
      });
    });
  }
);