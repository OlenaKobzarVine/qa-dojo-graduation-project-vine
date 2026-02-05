import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class ModalLocators extends BasePageLocators {
  readonly modal: Locator = this.baseLocator.locator('#blockcart-modal .modal-content');
  readonly closeButton: Locator = this.modal.locator('button.close');
  readonly continueShoppingButton: Locator = this.modal.locator('button:has-text("Continue Shopping")');
  readonly successMessage: Locator = this.modal.locator('.modal-body');
  readonly proceedToCheckoutButton: Locator = this.modal.locator('a.btn-primary:has-text("Proceed to checkout")');
  readonly subtotalValue: Locator = this.modal.locator('div.product-total span.price');
  readonly shippingValue: Locator = this.modal.locator('div.shipping-cost span.price');
  readonly totalValue: Locator = this.modal.locator('div.order-total span.price');
}
