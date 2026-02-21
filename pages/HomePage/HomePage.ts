import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage/BasePage";
import { HomePageLocators } from "./HomePageLocators";
import { QuickViewModal } from "../../modals/QuickViewModal/QuickViewModal";
import { AddToCartConfirmationModal } from "../../modals/Modal/AddToCartConfirmationModal";

export interface Product {
  index: number;
  name: string | null;
  price: string | null;
}

export class HomePage extends BasePage {
  readonly locators= new HomePageLocators(this.page.locator('body'));

  // constructor(page: Page) {
  //   super(page);
  //   this.locators = new HomePageLocators(page.locator("body"));
  // }

  async waitForHomePageElements() {
    await this.locators.signOutButton.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.locators.shoppingCart.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.locators.productItems
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
  }

  async openCart() {
    await this.locators.shoppingCart.click();
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

      const nameLink = product.locator(this.locators.productName);
      let name = await nameLink.getAttribute("title");
      if (!name) {
        name = await nameLink.textContent();
      }
      const price = await product.locator("span.price").textContent();

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

    const quickViewButton = productItem.locator(this.locators.quickViewButton);
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
    const modal = new AddToCartConfirmationModal(this.page);

    const productCount = await this.getProductItemsCount();

    for (let i = 0; i < productCount; i++) {
      const productElement = this.locators.productItems.nth(i);
      await productElement.hover();

      const quickViewBtn = productElement.locator(
        this.locators.quickViewButton,
      );
      await quickViewBtn.waitFor({ state: "visible", timeout: 5000 });
      await quickViewBtn.click();

      await quickViewModal.locators.quickViewModal.waitFor({ state: "visible", timeout: 5000 });
      await quickViewModal.clickAddToCart();
      await modal.clickContinueShopping();
    }
  }

  private getProductByName(productName: string) {
    return this.page
      .locator(".js-product.product")
      .filter({ hasText: productName })
      .first();
  }

  async addProductToCartByName(productName: string, quantity: number = 1) {
    const quickViewModal = new QuickViewModal(this.page);
    const modal = new AddToCartConfirmationModal(this.page);

    const product = this.getProductByName(productName);
    await product.hover();

    const quickViewBtn = product.locator("a.quick-view");
    await quickViewBtn.waitFor({ state: "visible", timeout: 5000 });
    await quickViewBtn.click();

    await quickViewModal.locators.quickViewModal.waitFor({ state: "visible", timeout: 5000 });
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
        .locator("span.product")
        .textContent();

      results.push({
        text: suggestionText?.trim() || "",
        matchesSearch: suggestionText?.trim()?.includes(productTitle) || false,
      });
    }

    return {
      allMatch: results.every((result) => result.matchesSearch),
      results: results,
    };
  }

  async navigateToAllProductsPage() {
    await this.locators.allProductsLink.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.locators.allProductsLink.click();
  }

  async applySizeFilter(size: string) {
    await this.locators.searchFilters.waitFor({
      state: "visible",
      timeout: 5000,
    });

    const sizeSection = this.locators.sizeFilterSection;
    const sizeCheckbox = sizeSection.locator(
      `input[data-search-url*="Size-${size}"]`,
    );
    await sizeCheckbox.waitFor({ state: "visible", timeout: 5000 });

    const initialCount = await this.locators.productItems.count();

    await sizeCheckbox.check();

    await expect
      .poll(async () => await this.locators.productItems.count(), {
        message: `Expected product count to change from ${initialCount}`,
        timeout: 5000,
      })
      .not.toBe(initialCount);
  }

   async applyColour(colour: string) {
    await this.locators.searchFilters.waitFor({
      state: "visible",
      timeout: 5000,
    });

    const colorSection = this.locators.colorFilterSection;
    const colorCheckbox = colorSection.locator(
      `input[data-search-url*="Color-${colour}"]`,
    );
    await colorCheckbox.waitFor({ state: "visible", timeout: 5000 });

    const initialCount = await this.locators.productItems.count();

    await colorCheckbox.check();

    await expect
      .poll(async () => await this.locators.productItems.count(), {
        message: `Expected product count to change from ${initialCount}`,
        timeout: 5000,
      })
      .not.toBe(initialCount);
  }

  async getFilteredProducts() {
    const productCount = await this.getProductItemsCount();
    const productNames: string[] = [];

    for (let i = 0; i < productCount; i++) {
      const productItem = this.locators.productItems.nth(i);
      const name = await productItem
        .locator(this.locators.filteredProductName as string)
        .textContent({ timeout: 1000 })
        .catch(() => null);
      if (name) {
        productNames.push(name.trim());
      }
    }

    return productNames;
  }

  async verifyFilteredProducts(
    productsWithSize: string[],
    expectedProductNames: string[],
    filterDescription: string,
  ) {
    for (const productName of productsWithSize) {
      const isExpectedProduct = expectedProductNames.some(
        (expectedName) =>
          productName
            .toLowerCase()
            .includes(expectedName.toLowerCase()),
      );

      await expect(
        isExpectedProduct,
        `Product "${productName}" is not in the expected list for ${filterDescription}`,
      ).toBe(true);
    }
  }
}