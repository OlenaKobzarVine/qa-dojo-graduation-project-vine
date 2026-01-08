import { chromium, expect, request, type FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { TestData } from './TestData';

async function globalSetup(config: FullConfig) {
  console.log('---starting global setup---');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    //baseURL: 'https://.../',
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  const user = TestData.getValidUser();

  await loginPage.navigateToSignInPage();
  await loginPage.fillInputFields({
    email: user.email,
    password: user.password,
  });
  await loginPage.clickSignInButton();
  await expect(page.locator("[href='/']").first()).toBeVisible();

  await page.waitForTimeout(3000);
  await page.context().storageState({ path: './storageState.json' });
  console.log('---finishing global setup---');

  //await browser.close();
}

export default globalSetup;
