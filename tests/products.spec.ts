import { test } from "../fixtures/MyFixture";
import { expect } from "@playwright/test";
import { ProductsData } from "../ProductsData";

test.describe(
  "Product Interaction",
  {
    tag: ["@Products", "@PositiveTests"],
    // storageState: "./storageState.json",
  },
  () => {
    test.use({ storageState: './storageState.json' });
    test("PR-001 Add all products to cart", async ({ homePage, cartPage }) => {
      await test.step("Navigate to the home page", async () => {
        await homePage.navigateTo("/");
        await homePage.waitForHomePageElements();
      });

      await test.step("Verify home page is loaded", async () => {
        await expect(homePage.page).toHaveURL(/\/index\.php$/);
        await expect(homePage.page).not.toHaveURL(/registration/);
      });

      await test.step("Add all products to cart", async () => {
        await homePage.addAllProductsFromFirstPageToCart();
      });

      await test.step("Navigate to shopping cart and verify all products are added", async () => {
        const addedProducts = await homePage.getTestProductsData();
        await homePage.openCart();

        await cartPage.verifyProductsInCart(addedProducts);
      });
    });

    test("PR-002 Add product quantity and remove from cart", async ({
      homePage,
      cartPage,
    }) => {
      const productToTest = ProductsData.products[0];

      await test.step("Navigate to the home page", async () => {
        await homePage.navigateTo("/");
        await homePage.waitForHomePageElements();
      });

      await test.step("Add product with quantity 2 to cart", async () => {
        await homePage.addProductToCartByName(productToTest.title, 2);
      });

      await test.step("Navigate to shopping cart and verify products are added", async () => {
        await homePage.openCart();
        const cartProductNames = await cartPage.getCartProductsNames();
        const found = cartProductNames.some((name) =>
          name.includes(productToTest.title),
        );
        await expect(found).toBeTruthy();
      });

      await test.step("Remove product from cart", async () => {
        await cartPage.removeProduct(productToTest.title);
      });

      await test.step("Verify product is no longer in cart", async () => {
        const cartProductNames = await cartPage.getCartProductsNames();
        const found = cartProductNames.some((name) =>
          name.includes(productToTest.title),
        );
        await expect(found).toBeFalsy();
      });
    });
  },
);

test.describe(
  "Search by product title",
  { tag: ["@Search", "@PositiveTests"] },
  () => {
    for (const product of ProductsData.products) {
      test(`SA-001 Search by "${product.title}" returns correct results`, async ({
        homePage,
      }) => {
        await test.step("Navigate to the home page", async () => {
          await homePage.navigateTo("/");
          await homePage.waitForHomePageElements();
        });

        await test.step("Enter product title into search input", async () => {
          await homePage.locators.searchInput.fill(product.title);
        });

        await test.step("Verify autocomplete menu is visible", async () => {
          await homePage.locators.autocompleteMenu.waitFor({
            state: "visible",
          });
          await expect(homePage.locators.autocompleteMenu).toBeVisible();
        });

        const suggestions = homePage.locators.autocompleteItems;
        const suggestionCount = await suggestions.count();

        await test.step("Verify at least one search result is shown", async () => {
          expect(
            suggestionCount,
            `Expected at least one autocomplete result for "${product.title}"`,
          ).toBeGreaterThan(0);
        });

        await test.step("Verify autocomplete results match search criteria", async () => {
          const verificationResult =
            await homePage.verifyAutocompleteResultsMatchSearch(product.title);
          expect(verificationResult.allMatch).toBeTruthy();
        });
      });
    }
  },
);

test.describe(
  "Search with invalid value",
  { tag: ["@Search", "@NegativeTests"] },
  () => {
    test("SA-002 Invalid search value returns no results", async ({
      homePage,
    }) => {
      const invalidSearchValue = "Invalid value qwerty";

      await test.step("Navigate to the home page", async () => {
        await homePage.navigateTo("/");
        await homePage.waitForHomePageElements();
      });

      await test.step("Enter invalid search value into search input", async () => {
        await homePage.locators.searchInput.fill(invalidSearchValue);
      });

      await test.step("Verify autocomplete menu does not appear", async () => {
        await expect(homePage.locators.autocompleteMenu).not.toBeVisible({
          timeout: 5000,
        });
      });
    });
  },
);

test.describe(
  "Product Filter",
  {
    tag: ["@Products", "@Filter", "@PositiveTests"],
  },
  () => {
    test.beforeEach(async ({ homePage, page }) => {
      await homePage.navigateTo("/");
      await homePage.waitForHomePageElements();

      await homePage.navigateToAllProductsPage();

      await homePage.locators.productItems
        .first()
        .waitFor({ state: "visible", timeout: 10000 });
    });

    test.describe("Size Filter Parameterized Tests", () => {
      const uniqueSizes = ProductsData.availableSizes;

      uniqueSizes.forEach((size) => {
        test(`FIL-001 Filter products by size ${size}`, async ({
          homePage,
        }) => {
          const expectedProducts = ProductsData.products.filter((product) =>
            product.size?.includes(size),
          );

          await test.step(`Apply size filter for ${size}`, async () => {
            await homePage.applySizeFilter(size);
            await homePage.locators.productItems
              .first()
              .waitFor({ state: "visible", timeout: 10000 });
          });

          await test.step(`Verify all products contain size ${size} in their cards`, async () => {
            const productsWithSize = await homePage.getFilteredProducts();
            const expectedProductNames = expectedProducts.map((p) => p.title);

            await expect(productsWithSize.length).toBeGreaterThan(0);

            await homePage.verifyFilteredProducts(
              productsWithSize,
              expectedProductNames,
              `size ${size}`,
            );
          });
        });
      });
    });

    test.describe("Size and Colour Filter Parameterized Tests", () => {
      const uniqueSizes = ProductsData.availableSizes;
      const uniqueColours = ProductsData.availableColors;

      uniqueSizes.forEach((size) => {
        uniqueColours.forEach((colour) => {
          test(`FIL-002 Filter products by size ${size} and colour ${colour}`, async ({
            homePage,
          }) => {
            const expectedProducts = ProductsData.products.filter((product) =>
              product.size?.includes(size) && product.color?.includes(colour),
            );

            await test.step(`Apply size filter for ${size}`, async () => {
              await homePage.applySizeFilter(size);
              await homePage.locators.productItems
                .first()
                .waitFor({ state: "visible", timeout: 10000 });
            });

            await test.step(`Apply colour filter for ${colour}`, async () => {
              await homePage.applyColour(colour);
              await homePage.locators.productItems
                .first()
                .waitFor({ state: "visible", timeout: 10000 });
            });

            await test.step(`Verify all products contain size ${size} and colour ${colour}`, async () => {
              const productsWithFilters = await homePage.getFilteredProducts();
              const expectedProductNames = expectedProducts.map((p) => p.title);

              await expect(productsWithFilters.length).toBeGreaterThan(0);

              await homePage.verifyFilteredProducts(
                productsWithFilters,
                expectedProductNames,
                `size ${size} and colour ${colour}`,
              );
            });
          });
        });
      });
    });
  },
);
