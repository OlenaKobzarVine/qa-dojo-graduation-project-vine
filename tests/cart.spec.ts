import { test } from '../fixtures/MyFixture';
import { expect } from '@playwright/test';
import { ProductsData } from '../ProductsData';

test.describe(
  'Shopping Cart Tests',
  {
    tag: ['@Cart', '@PositiveTests'],
    storageState: './storageState.json',
  },
  () => {
    test('CART-001 Add multiple products with quantity and Decrease quantity', async ({ homePage, cartPage }) => {
      const product1 = ProductsData.products[0]; 
      const product2 = ProductsData.products[1]; 
      const quantity = 3;

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Add first product with quantity 3 to cart', async () => {
        await homePage.addProductToCartByName(product1.title, quantity);
      });

      await test.step('Add second product with quantity 3 to cart', async () => {
        await homePage.addProductToCartByName(product2.title, quantity);
      });

      await test.step('Verify both products are in cart with correct quantity', async () => {
        await homePage.openCart();

        const cartProductNames = await cartPage.getCartProductsNames();
        const product1Found = cartProductNames.some(name => name.includes(product1.title));
        const product2Found = cartProductNames.some(name => name.includes(product2.title));
        
        await expect(product1Found).toBeTruthy();
        await expect(product2Found).toBeTruthy();
        
        const product1Qty = await cartPage.getProductQuantity(product1.title);
        const product2Qty = await cartPage.getProductQuantity(product2.title);
        
        await expect(product1Qty).toBe(quantity);
        await expect(product2Qty).toBe(quantity);
      });

      await test.step('Decrease quantity of each product by 1', async () => {
        await cartPage.updateProductQuantity(product1.title, quantity - 1);
        await cartPage.updateProductQuantity(product2.title, quantity - 1);
      });

      await test.step('Verify correct quantities remain in cart', async () => {
        const product1Qty = await cartPage.getProductQuantity(product1.title);
        const product2Qty = await cartPage.getProductQuantity(product2.title);
        
        await expect(product1Qty).toBe(quantity - 1);
        await expect(product2Qty).toBe(quantity - 1);
      });
    });

    test('CART-002 Add a negative quantity of products to the cart', async ({ homePage, cartPage }) => {
      const product1 = ProductsData.products[0]; 
      const quantity = -3;

      await test.step('Navigate to the home page', async () => {
        await homePage.navigateTo('/');
        await homePage.waitForHomePageElements();
      });

      await test.step('Add product with negative quantity to cart', async () => {
        await homePage.addProductToCartByName(product1.title, quantity);
      });

      await test.step('Verify product is in cart with correct quantity', async () => {
        await homePage.openCart();

        const cartProductNames = await cartPage.getCartProductsNames();
        const product1Found = cartProductNames.some(name => name.includes(product1.title));
        
        await expect(product1Found).toBeTruthy();
        
        const product1Qty = await cartPage.getProductQuantity(product1.title);
        
        await expect(product1Qty).toBe(1);
      });
    
    });
  }
  
);
