import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class QuickViewModalLocators extends BasePageLocators {
  readonly quickViewModal: Locator = this.baseLocator.locator('.quickview.in .modal-content');
  readonly productTitle: Locator = this.quickViewModal.locator(`h1`);
  readonly productPrice: Locator = this.quickViewModal.locator(`.product-prices .current-price-value`);
  readonly shortDescription: Locator = this.quickViewModal.locator(`.product-description-short`);
  readonly addToCartButton: Locator = this.quickViewModal.locator(`button.add-to-cart`);
  readonly quantityInput: Locator = this.quickViewModal.locator(`#quantity_wanted`);
  readonly closeButton: Locator = this.quickViewModal.locator(`button.close`);
}