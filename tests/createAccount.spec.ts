import { expect } from '@playwright/test';
import { test } from '../fixtures/MyFixture';
import { TestData } from '../TestData';

test.describe(
  'create account with required fields',
  { tag: ['@CreateAccountPage', '@PositiveTests'] },
  () => {
    test('CA-001 - create account with valid data and accepted terms', async ({
      createAccountPage,
      homePage,
    }) => {
      await test.step('Open sign up page', async () => {
        await createAccountPage.navigateToCreateAccountPage();
      });

      await test.step('Fill required fields and accept terms', async () => {
        const user = TestData.getValidUser();

        await createAccountPage.fillInputFields({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });

        await createAccountPage.setAgreeTerms(true);
      });

      await test.step('Click Save', async () => {
        await createAccountPage.clickSaveButton();
      });

      // await test.step('Save button becomes enabled', async () => {
      //   await expect(await createAccountPage.isSaveButtonEnabled()).toBe(true);
      // });
      await test.step('Verify form was submitted', async () => {
        await homePage.verifyHomePageLoaded();
      });
    });
  }
);

test.describe(
  'block account creation when terms not accepted',
  { tag: ['@CreateAccountPage', '@NegativeTests'] },
  () => {
    test('CA-002 - cannot save without accepting required terms', async ({
      createAccountPage,
    }) => {
      await test.step('Open sign up page', async () => {
        await createAccountPage.navigateToCreateAccountPage();
      });

      await test.step('Fill required fields but do not accept terms', async () => {
        const user = TestData.getValidUser();
        await createAccountPage.fillInputFields({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });
      });

      await test.step('Click Save', async () => {
        await createAccountPage.clickSaveButton();
      });

      await test.step('Check validation message', async () => {
        await expect(
          await createAccountPage.getTermsCheckboxValidationMessage()
        ).toContain('Please check this box if you want to proceed.');
      });

      await test.step('Verify form was not submitted', async () => {
        await createAccountPage.verifyCreateAccountPageURL();
      });
    });
  }
);
