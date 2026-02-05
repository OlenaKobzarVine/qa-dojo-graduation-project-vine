import { test } from '../fixtures/base-fixture';
import { expect } from '@playwright/test';
import { TestData } from '../TestData';

test.describe('Login API tests', { tag: ['@LoginAPI', '@PositiveTests'] }, () => {
  test(
    'API-LO-001: should be able to login with valid credentials',
    {
      tag: '@PositiveTests',
    },
    async ({ request }) => {
      let response;
      const userCredentials = TestData.getUserForLogin();
      const userEmail = userCredentials.email;
      const userPassword = userCredentials.password;

      await test.step('Send API request to login', async () => {
        response = await request.post(
          'https://teststore.automationtesting.co.uk/index.php?controller=authentication',
          {
            form: {
              email: userEmail,
              password: userPassword,
              submitLogin: '1',
            },
            failOnStatusCode: true,
          },
        );
      });

      await test.step('Verify user is logged in successfully', async () => {

        expect(response.status()).toBe(200);

        const responseBody = await response.text();
        expect(responseBody).toContain('Sign out');
      });
    },
  );

  test(
    'API-LO-002: user is not logged in with invalid credentials',
    {
      tag: ['@LoginAPI', '@NegativeTests']
    },
    async ({ request }) => {
      let response;
      const userEmail = process.env.EXISTING_USER_EMAIL!;

      await test.step('Send API request to login with invalid password', async () => {
        response = await request.post(
          'https://teststore.automationtesting.co.uk/index.php?controller=authentication',
          {
            form: {
              email: userEmail,
              password: 'invalidPassword123',
              submitLogin: '1',
            },
            failOnStatusCode: true, 
          },
        );
      });

      await test.step('Verify login failed', async () => {

        expect(response.status()).toBe(200);

        const setCookieHeader = response.headers()['set-cookie'];
        //expect(setCookieHeader).not.toContain('PrestaShop-');

        const responseBody = await response.text();
        expect(responseBody).toContain('Log in to your account');
      });
    },
  );
});
