import { test } from "../fixtures/MyFixture";
import { expect } from "@playwright/test";
import { ProductsData } from '../ProductsData';

test.describe(
  "Checkout - Success Flow",
  { tag: ["@CheckoutPage", "@PositiveTests"] },
  () => {
    test.use({ storageState: './storageState.json' });
    test("CO-001 Checkout with valid data", async ({
      homePage,
      cartPage,
      checkoutPage,
      orderConfirmationPage,
    }) => {
      const productToTest = ProductsData.products[0];

      await test.step("Navigate to the home page", async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step("Add product with quantity 2 to cart", async () => {
        await homePage.addProductToCartByName(productToTest.title, 2);
      });

      await test.step("Navigate to shopping cart and verify product is in cart", async () => {
        await homePage.openCart();
        const cartProductNames = await cartPage.getCartProductsNames();
        
        const found = cartProductNames.some((name) =>
          name.includes(productToTest.title),
        );
        await expect(found).toBeTruthy();
      });

      await test.step("Fill in required checkout fields on Addresses section", async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillAddress();
        await checkoutPage.clickContinueOnAddressSectionButton();
      });

      await test.step("Left Shipping Method by default", async () => {
        await checkoutPage.clickContinueOnDeliverySectionButton();
      });

      await test.step("Select payment method and agree to terms", async () => {
        await checkoutPage.selectPaymentMethodAndAgreeToTerms();
      });

      await test.step("Verify order confirmation", async () => {
        await expect(orderConfirmationPage.locators.confirmationTitle).toContainText("Your order is confirmed");
        await expect(orderConfirmationPage.locators.confirmationText).toContainText(
          "An email has been sent to the",
        );
      });
    });
  },
);

test.describe(
  "Checkout - With Empty Address",
  { tag: ["@CheckoutPage", "@NegativeTests"] },
  () => {
    test("CO-002 Checkout without filling address fields", async ({
      homePage,
      cartPage,
      checkoutPage,
    }) => {
      const productToTest = ProductsData.products[0];

      await test.step("Navigate to the home page", async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step("Add product with quantity 2 to cart", async () => {
        await homePage.addProductToCartByName(productToTest.title, 2);
      });

      await test.step("Navigate to shopping cart and verify product is in cart", async () => {
        await homePage.openCart();
        const cartProductNames = await cartPage.getCartProductsNames();
        
        const found = cartProductNames.some((name) =>
          name.includes(productToTest.title),
        );
        await expect(found).toBeTruthy();
      });

      await test.step("Proceed to checkout without filling address fields", async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.deleteAddress();

        await checkoutPage.clickContinueOnAddressSectionButton();
      });

      await test.step("Verify validation errors are displayed", async () => {
        await expect(checkoutPage.page).toHaveURL(/controller=order/);
        await expect(checkoutPage.locators.clickContinueOnDeliverySectionButton).not.toBeVisible();
      });
    });
  },
);