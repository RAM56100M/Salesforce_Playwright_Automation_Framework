import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt, encrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

const authFile = "src/config/auth.json";

test.skip("simple login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  
  //await loginPage.fillUsername("ram@qa.com");
  //await loginPage.fillPassword("Track@0021");
  
  await loginPage.fillUsername(process.env.userid!);
  await loginPage.fillPassword(process.env.password!);
  
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
 
});

test.skip("Sample Env test", async ({page})=>{

console.log(process.env.NODE_ENV);
console.log(process.env.userid);
console.log(process.env.password);


});

test("Encrypt/Decrypt Credentials", async ({page})=>{

 // const plain_Text="Hello Ram the credentials are decrypted!";
 // const encryptedText=encrypt(plain_Text);
 // console.log('SALT:', process.env.SALT);
 // console.log('Encrypted:', encryptedText);
 // const DecryptedText=decrypt(encryptedText);
 // console.log('Decrypted:', DecryptedText);
encryptEnvFile();
  
  });
