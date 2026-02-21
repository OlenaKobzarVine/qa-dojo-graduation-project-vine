import { Page, expect } from "@playwright/test";
import { CheckoutPageLocators } from "./CheckoutPageLocators";
import { BasePage } from "../BasePage/BasePage";
//import { TestData } from "../../TestData";
import { UsersData } from "../../UsersData";
import { AddressData } from "../../AddressData";

export class CheckoutPage extends BasePage {
  readonly locators = new CheckoutPageLocators(this.page.locator('body'));

  // constructor(page: Page) {
  //   super(page);
  //   this.locators = new CheckoutPageLocators(page.locator('body'));
  // }

  async fillRequiredAddressFields() {    
    const userForCheckout = UsersData.getUserForCheckout();
    const addressData = AddressData.getAddressData();
    //const dataForCheckout = TestData.getDataForCheckout();

    if (!(await this.locators.firstNameInput.inputValue())) {
      await this.locators.firstNameInput.fill(userForCheckout.firstName);
    }
    if (!(await this.locators.lastNameInput.inputValue())) {
      await this.locators.lastNameInput.fill(userForCheckout.lastName);
    }
    await this.locators.address1Input.fill(addressData.address1);
    await this.locators.cityInput.fill(addressData.city);
    await this.locators.stateSelect.selectOption({
      label: addressData.state,
    });
    await this.locators.postcodeInput.fill(addressData.postcode);
    await this.locators.countrySelect.selectOption({
      label: addressData.country,
    });
  }

  async clickContinueOnAddressSectionButton() {
    await this.locators.clickContinueOnAddressSectionButton.waitFor();
    await this.locators.clickContinueOnAddressSectionButton.click();
  }

  async clickContinueOnDeliverySectionButton() {
    await this.locators.clickContinueOnDeliverySectionButton.waitFor();
    await this.locators.clickContinueOnDeliverySectionButton.click();
  }

  async fillAddress() {
    const savedAddressRadio = this.locators.savedAddressRadio;
    if ((await savedAddressRadio.count()) > 0) {
      if (!(await savedAddressRadio.first().isChecked())) {
        await savedAddressRadio.first().check();
      }
    } else {
      await this.fillRequiredAddressFields();
    }
  }

  async deleteAddress() {
    const deleteButton = this.locators.deleteAddressButton;
    if ((await deleteButton.count()) > 0) {
      await deleteButton.first().click();
    }
  }

  async selectPaymentMethodAndAgreeToTerms(){

    await this.locators.bankWireRadio.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.bankWireRadio.check();

    await this.locators.termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.termsCheckbox.check();
    await this.locators.placeOrderButton.click();
  }
}
