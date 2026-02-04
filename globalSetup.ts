import { chromium, expect, request, type FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { TestData } from './TestData';
import { HomePage } from './pages/HomePage/HomePage';
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {
  dotenv.config();
  console.log('---starting global setup---');

  const baseURL = process.env.BASEURL || 'https://teststore.automationtesting.co.uk';

  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  const user = TestData.getUserForLogin();

  await loginPage.navigateToSignInPage();
  await loginPage.fillInputFields({
    email: user.email,
    password: user.password!,
  });
  await loginPage.clickSignInButton();
  await homePage.waitForHomePageElements();

  await page.waitForTimeout(3000);
  await page.context().storageState({ path: './storageState.json' });
  console.log('---finishing global setup---');

  await browser.close();
}

export default globalSetup;
