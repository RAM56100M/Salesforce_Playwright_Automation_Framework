import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";

const authFile = "src/config/auth.json";

test("simple login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  
  await loginPage.fillUsername("ram@qa.com");
  await loginPage.fillPassword("Track@0021");
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
 
});
