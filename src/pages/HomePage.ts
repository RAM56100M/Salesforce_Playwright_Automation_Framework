import { Page, expect } from "@playwright/test";


export default class HomePage {
  private readonly serviceTitleLocator = "Service";
  private readonly contactsLinkLocator = "Contacts";

  constructor(private page: Page) {}

  async expectServiceTitleToBeVisible() {
    await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({
      timeout: 15000,
    }).catch((error) => {
      throw error; // rethrow the error if needed
    })
  }


  async navigateToContactTab(){

    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    
  }

  async navigateToCaseTab(){

    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    
  }
}