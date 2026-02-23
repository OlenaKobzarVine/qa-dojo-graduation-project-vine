import { test } from "../../fixtures/MyFixture";
import { expect } from "@playwright/test";
import { UsersData } from "../../UsersData";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe(
  "Login without global setup",
  {
    tag: ["@LoginPage", "@PositiveTests"],
  },
  () => {
    test.beforeEach(async ({ loginPage}) => {
      await test.step("Navigate to login page", async () => {
        await loginPage.navigateToSignInPage();
      });
    });

    test("LO-001 User successfully logs in with valid credentials", async ({ loginPage, homePage }) => {
    
        const validUser = UsersData.getUserForLogin();
        
        await test.step("Fill in login credentials", async () => {
          await loginPage.fillInputFields({
            email: validUser.email,
            password: validUser.password!,
          });
        });   
      
        await test.step("Submit login form", async () => {
          await loginPage.clickSignInButton();
         });
        
        await test.step("Verify redirect to account orders page", async () => {
          await homePage.waitForHomePageElements();
          await expect(homePage.locators.signOutButton).toBeVisible({
            timeout: 10000,
          });
        });
        
      
      },
    );

    test("LO-002 User can't successfully logs in with invalid credentials", async ({ loginPage, homePage }) => {
    
        const invalidUser = UsersData.getInvalidUser();
        
        await test.step("Fill in invalid login credentials", async () => {
          await loginPage.fillInputFields({
            email: invalidUser.email,
            password: invalidUser.password!,
          });
        });   
      
        await test.step("Submit login form", async () => {
          await loginPage.clickSignInButton();
         });
        
        await test.step("Verify user remains on login page", async () => {
          await expect(loginPage.page).toHaveURL('https://teststore.automationtesting.co.uk/index.php?controller=authentication', {
            timeout: 10000,
          });
        });

      },
    );

    test("LO-003 User can't successfully logs in without credentials", async ({ loginPage, homePage }) => {
      
        await test.step("Submit login form without credentials", async () => {
          await loginPage.clickSignInButton();
         });
        
        await test.step("Verify user remains on login page", async () => {
          await expect(loginPage.page).toHaveURL('https://teststore.automationtesting.co.uk/index.php?controller=authentication', {
            timeout: 10000,
          });
        });

      },
    );


  },
);
