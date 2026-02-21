import { Locator } from '@playwright/test';
import { BasePageLocators } from '../../pages/BasePage/BasePageLocators';

export class ModalLocators extends BasePageLocators {
  readonly modal: Locator = this.baseLocator.locator('#blockcart-modal .modal-content');
  readonly closeButton: Locator = this.modal.locator('button.close');
  readonly continueShoppingButton: Locator = this.modal.getByRole('button', { name: 'Continue Shopping' });
  readonly successMessage: Locator = this.modal.locator('.modal-body');
  readonly proceedToCheckoutButton: Locator = this.modal.getByRole('link', { name: 'Proceed to checkout' });
  // readonly subtotalValue: Locator = this.modal.locator('product-total span.price');
  // readonly shippingValue: Locator = this.modal.locator('shipping-cost span.price');
  // readonly totalValue: Locator = this.modal.locator('order-total span.price');
}
