import { Page, expect } from "@playwright/test";
import { CheckoutPageLocators } from "./CheckoutPageLocators";
import { BasePage } from "../BasePage/BasePage";
import { TestData } from "../../TestData";

export class CheckoutPage extends BasePage {
  readonly locators: CheckoutPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutPageLocators(page.locator('body'));
  }

  async fillRequiredAddressFields() {
    const dataForCheckout = TestData.getDataForCheckout();
    if (!(await this.locators.firstNameInput.inputValue())) {
      await this.locators.firstNameInput.fill(dataForCheckout.firstName);
    }
    if (!(await this.locators.lastNameInput.inputValue())) {
      await this.locators.lastNameInput.fill(dataForCheckout.lastName);
    }
    await this.locators.address1Input.fill(dataForCheckout.address1);
    await this.locators.cityInput.fill(dataForCheckout.city);
    await this.locators.stateSelect.selectOption({
      label: dataForCheckout.state,
    });
    await this.locators.postcodeInput.fill(dataForCheckout.postcode);
    await this.locators.countrySelect.selectOption({
      label: dataForCheckout.country,
    });
  }

  async clickContinueOnAdressSectionButton() {
    await this.locators.clickContinueOnAdressSectionButton.waitFor();
    await this.locators.clickContinueOnAdressSectionButton.click();
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
      await this.page.waitForLoadState('networkidle');
    }
  }

  async selectPaymentMethodAndAgreeToTerms(){
    await this.page.waitForLoadState('networkidle');

    await this.locators.bankWireRadio.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.bankWireRadio.check();

    await this.locators.termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.termsCheckbox.check();
    await this.locators.placeOrderButton.click();
  }
}
