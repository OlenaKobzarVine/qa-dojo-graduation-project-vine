import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { HomePageLocators } from "./HomePageLocators";
import { ProductPage } from "../ProductPage/ProductPage";
import { QuickViewModal } from "../QuickViewModal/QuickViewModal";
import { Modal } from "../Modal/Modal";
import { TestData } from "../TestData";

export interface Product {
  index: number;
  name: string | null;
  price: string | null;
}

export class HomePage extends BasePage {
  readonly locators: HomePageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(page.locator("body"));
  }

  async waitForHomePageElements() {
    await this.locators.signOutButton.waitFor({ state: "visible", timeout: 10000 });
    await this.locators.shoppingCart.waitFor({ state: "visible", timeout: 10000 });
    await this.locators.productItems.first().waitFor({ state: "visible", timeout: 10000 });
  }

  async openCart() {
    await this.locators.shoppingCart.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductItemsCount() {
    await this.locators.productItems.first().waitFor({ state: "visible" });
    return await this.locators.productItems.count();
  }

  async getTestProductsData() {
    const productCount = await this.getProductItemsCount();
    const products: Product[] = [];

    for (let i = 0; i < productCount; i++) {
      const product = this.locators.productItems.nth(i);
      
      const nameLink = product.locator('h3.product-title a');
      let name = await nameLink.getAttribute('title');
      if (!name) {
        name = await nameLink.textContent();
      }
      const price = await product.locator('span.price').textContent();

      products.push({
        index: i,
        name: name?.trim() || null,
        price: price?.trim() || null,
      });
    }
    return products;
  }

  async openProductQuickView(index: number): Promise<void> {
    const productItem = this.locators.productItems.nth(index);
    await productItem.hover();
    
    const quickViewButton = productItem.locator('a.quick-view');
    await quickViewButton.waitFor({ state: "visible", timeout: 5000 });
    await quickViewButton.click();
  }

  async openProductItemPage(index: number) {
    const productItem = this.locators.productItems.nth(index);
    await productItem.waitFor({ state: "visible" });
    await productItem.click();
  }

  async addAllProductsFromFirstPageToCart() {
    const quickViewModal = new QuickViewModal(this.page);
    const modal = new Modal(this.page);
    
    const productCount = await this.getProductItemsCount();

    for (let i = 0; i < productCount; i++) {
      const productElement = this.locators.productItems.nth(i);
      await productElement.hover();
      
      const quickViewBtn = productElement.locator('a.quick-view');
      await quickViewBtn.waitFor({ state: "visible", timeout: 5000 });
      await quickViewBtn.click();
      
      await this.page.waitForLoadState("networkidle");

      await quickViewModal.clickAddToCart();
      await modal.clickContinueShopping();
      
      await this.page.waitForTimeout(500);
    }
  }

 private getProductByName(productName: string) {
  return this.page
    .locator('.js-product.product')
    .filter({ hasText: productName })
    .first();
}

  async addProductToCartByName(productName: string, quantity: number = 1) {
    const quickViewModal = new QuickViewModal(this.page);
    const modal = new Modal(this.page);
    
    const product = this.getProductByName(productName);
    await product.hover();
    
    const quickViewBtn = product.locator('a.quick-view');
    await quickViewBtn.waitFor({ state: "visible", timeout: 5000 });
    await quickViewBtn.click();
    
    await this.page.waitForLoadState("networkidle");

    await quickViewModal.setProductQuantity(quantity);
    await quickViewModal.clickAddToCart();
    await modal.clickContinueShopping();
  }

  async verifyAutocompleteResultsMatchSearch(productTitle: string) {
    const suggestions = this.locators.autocompleteItems;
    const suggestionElements = await suggestions.all();
    const results = [];

    for (const suggestion of suggestionElements) {
      const suggestionText = await suggestion
        .locator('span.product')
        .textContent();
      
      results.push({
        text: suggestionText?.trim() || '',
        matchesSearch: suggestionText?.trim()?.includes(productTitle) || false
      });
    }

    return {
      allMatch: results.every(result => result.matchesSearch),
      results: results
    };
  }
}