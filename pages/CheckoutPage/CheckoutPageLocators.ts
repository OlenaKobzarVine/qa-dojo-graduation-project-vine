import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class CheckoutPageLocators extends BasePageLocators {
	readonly firstNameInput: Locator = this.baseLocator.locator('#field-firstname');
	readonly lastNameInput: Locator = this.baseLocator.locator('#field-lastname');
	readonly address1Input: Locator = this.baseLocator.locator('#field-address1');
	readonly cityInput: Locator = this.baseLocator.locator('#field-city');
	readonly stateSelect: Locator = this.baseLocator.locator('#field-id_state');
	readonly postcodeInput: Locator = this.baseLocator.locator('#field-postcode');
	readonly countrySelect: Locator = this.baseLocator.locator('#field-id_country');

	readonly clickContinueOnAdressSectionButton: Locator = this.baseLocator.locator('button[name="confirm-addresses"]');
	readonly savedAddressRadio: Locator = this.baseLocator.locator('#delivery-addresses input[type="radio"][name="id_address_delivery"]');
	readonly deleteAddressButton: Locator = this.baseLocator.locator('a[data-link-action="delete-address"]');

	readonly clickContinueOnDeliverySectionButton: Locator = this.baseLocator.locator('button[name="confirmDeliveryOption"]');

    readonly bankWireRadio: Locator = this.baseLocator.page().locator('input[type="radio"][name="payment-option"][data-module-name="ps_wirepayment"]');
	readonly termsCheckbox: Locator = this.baseLocator.page().locator('input[type="checkbox"][name="conditions_to_approve[terms-and-conditions]"]');

    readonly placeOrderButton: Locator = this.baseLocator.page().locator('button.btn.btn-primary.center-block:not([disabled])');

}
