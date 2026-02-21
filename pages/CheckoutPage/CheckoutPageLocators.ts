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

	readonly clickContinueOnAddressSectionButton: Locator = this.baseLocator.getByRole('button', { name: /continue/i }).first();
	readonly savedAddressRadio: Locator = this.baseLocator.locator('#delivery-addresses').getByRole('radio');
	readonly deleteAddressButton: Locator = this.baseLocator.getByRole('link', { name: /delete/i });

	// readonly clickContinueOnDeliverySectionButton: Locator = this.baseLocator.getByRole('button', { name: /continue/i }).last();
	readonly clickContinueOnDeliverySectionButton: Locator = this.baseLocator.locator('button[name="confirmDeliveryOption"]');

    readonly bankWireRadio: Locator = this.baseLocator.page().getByRole('radio', { name: /wire/i });
	readonly termsCheckbox: Locator = this.baseLocator.page().getByRole('checkbox', { name: /terms/i });

    readonly placeOrderButton: Locator = this.baseLocator.page().getByRole('button', { name: /place order/i });

}
