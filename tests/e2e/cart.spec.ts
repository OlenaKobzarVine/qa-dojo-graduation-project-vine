import { test } from '../../fixtures/E2EFixture';
import { expect } from '@playwright/test';
import { ProductsData } from '../../ProductsData';

test.describe(
  'Shopping Cart',
  {
    tag: ['@Cart', '@PositiveTests']
  },
  () => {
    test.use({ storageState: './storageState.json' });
    test('CART-001 Add multiple products with quantity and Decrease quantity', async ({ homePage, cartPage, productPage }) => {
      const product = ProductsData.products[0]; 
      const quantity = 3;

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Add first product with quantity 3 to cart', async () => {
        await homePage.addProductToCartByName(product.title, quantity);
      });

      await test.step('Verify products are in cart with correct quantity', async () => {
        await homePage.openCart();

        const cartProductNames = await cartPage.getCartProductsNames();
        const product1Found = cartProductNames.some(name => name.includes(product.title));        
        await expect(product1Found).toBeTruthy();
        
        const pr = cartPage.locators.cartItems.filter({ hasText: product.title });
        const productQty = parseInt(await pr.locator(cartPage.locators.quantityInput).inputValue(), 10);
        
        await expect(productQty).toBe(quantity);
      });

      await test.step('Decrease quantity of each product by 1', async () => {
        await cartPage.updateProductQuantity(product.title, quantity - 1);
      });

      await test.step('Verify correct quantities remain in cart', async () => {
        const pr = cartPage.locators.cartItems.filter({ hasText: product.title });
        const productQty = parseInt(await pr.locator(cartPage.locators.quantityInput).inputValue(), 10);
        
        await expect(productQty).toBe(quantity - 1);
      });
    });

    test('CART-002 Add a negative quantity of products to the cart', async ({ homePage, cartPage }) => {
      const product = ProductsData.products[0]; 
      const quantity = -3;

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Add product with negative quantity to cart', async () => {
        await homePage.addProductToCartByName(product.title, quantity);
      });

      await test.step('Verify product is in cart with correct quantity', async () => {
        await homePage.openCart();

        const cartProductNames = await cartPage.getCartProductsNames();
        const product1Found = cartProductNames.some(name => name.includes(product.title));
        
        await expect(product1Found).toBeTruthy();
        
        const pr = cartPage.locators.cartItems.filter({ hasText: product.title });
        const productQty = parseInt(await pr.locator(cartPage.locators.quantityInput).inputValue(), 10);
        
        await expect(productQty).toBe(1);
      });
    
    });
  }
  
);
