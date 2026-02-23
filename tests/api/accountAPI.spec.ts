import { test } from '../../fixtures/APIFixture';
import { expect } from '@playwright/test';
import { UsersData } from '../../UsersData';
import { HomePage } from '../../pages/HomePage/HomePage';

test.describe(
  'Account API',
  { tag: ['@API', '@AccountAPI', '@PositiveTests'] },
  () => {
    test('API-001: Register a new user', async ({
      request,
      browser,
    }) => {
      const user = UsersData.getValidUser();
      let response;

      await test.step('Send API request to create a new user', async () => {
        response = await request.post(
          'https://teststore.automationtesting.co.uk/index.php?controller=registration',
          {
            form: {
              firstname: user.firstName,
              lastname: user.lastName,
              email: user.email,
              password: user.password,
              psgdpr: '1',
              submitCreate: '1',
            },
            failOnStatusCode: true,
          },
        );
      });

      await test.step('Verify API response', async () => {
        expect(response.status()).toBe(200);
      });

      await test.step('Verify user is logged in via UI', async () => {
        const storageState = await request.storageState();

        const context = await browser.newContext({ storageState });
        const page = await context.newPage();
        const homePage = new HomePage(page);

        await page.goto('/');

        await expect(homePage.locators.signOutButton).toBeVisible();
        await expect(homePage.locators.userAccountLink).toContainText(
          `${user.firstName} ${user.lastName}`,
        );
      });
    });
  },
);
