import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { CreateAccountPage } from '../pages/CreateAccountPage/CreateAccountPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { request } from '@playwright/test';
import { access, readFile, appendFile } from 'fs/promises';

type MyFixture = {
  email: string | undefined;
  loginPage: LoginPage;
  createAccountPage: CreateAccountPage;
  homePage: HomePage;
  before: void;
  token: string;
};

// lazy fixture
export const test = base.extend<MyFixture>({
  email: undefined,

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  createAccountPage: async ({ page }, use) => {
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  request: async ({}, use) => {
    const requestContext = await request.newContext({
      failOnStatusCode: true,
    });

    await use(requestContext);
  },

  storageState: async ({ email }, use) => {
    const defaultTokenPath = `${email}.txt`;
    let token: string;
    const requestContext = await request.newContext();

    // Перевіряємо чи є збережена сесія
    if (await isFileExist(defaultTokenPath)) {
      token = await readFile(defaultTokenPath, { encoding: 'utf-8' });
      // Перевіряємо чи сесія ще валідна
      try {
        await requestContext.get(
          process.env.BASEURL_API + process.env.API_ENDPOINT_WISHLIST_GET_ALL,
          {
            headers: {
              Cookie: `PHPSESSID=${token}`,
            },
            failOnStatusCode: true,
          },
        );
      } catch (e) {
        console.log('Session expired, logging in again');
        console.log(
          'Login URL: ',
          process.env.BASEURL_API + process.env.API_ENDPOINT_LOGIN,
        );
        console.log('Email: ', email);
        token = await loginAndGetSession(requestContext, email);

        await appendFile(defaultTokenPath, token);
      }
    } else {
      // Якщо файла немає, логінимось
      console.log(`No saved session for ${email}, logging in`);
      token = await loginAndGetSession(requestContext, email);

      await appendFile(defaultTokenPath, token);
    }

    await use(createStorageState(token));
  },

  before: [
    async ({ loginPage, email }, use) => {
      // beforeEach це все що до await use();
      await loginPage.navigateToSignInPage();
      await loginPage.fillInputFields({
        email: email!,
        password: process.env.DEFAULT_PASSWORD,
      });
      await loginPage.clickSignInButton();

      await use();
      // afterEach це все що після await use();
    },
    { auto: false, title: 'executing before test are finished' },
  ],
});

async function isFileExist(path: string) {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}

async function loginAndGetSession(
  requestContext: APIRequestContext,
  email: string,
) {
  const response = await requestContext.post(
    process.env.BASEURL_API + process.env.API_ENDPOINT_LOGIN,
    {
      form: {
        // form, не data
        email: email,
        password: process.env.DEFAULT_PASSWORD,
        submitLogin: '1',
        back: 'https://teststore.automationtesting.co.uk/index.php?controller=registration',
      },
      failOnStatusCode: true,
    },
  );

  const cookies = response.headers()['set-cookie'];
  if (!cookies) {
    throw new Error('No cookies in login response');
  }

  let sessionCookie: string | undefined;
  let cookieName: string;

  const fullCookieMatch = cookies.match(/(PrestaShop-[^=]+)=([^;]+)/);
  if (fullCookieMatch) {
    cookieName = fullCookieMatch[1];
    sessionCookie = fullCookieMatch[2];
  }

  return sessionCookie;
}

function createStorageState(token: string) {
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: process.env.BASEURL!,
        localStorage: [
          {
            name: 'id_token',
            value: token,
          },
        ],
        indexedDB: [],
      },
    ],
  };

  return storageState;
}
