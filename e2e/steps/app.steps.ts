import {Given, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from 'e2e/world';



Given(/^the application is loaded successfully$/, async function (this: TestWorld) {
  await this.homePage.verifyLoad();
  await this.page.waitForTimeout(2000);
});

Given('user search for {string}', async function (this: TestWorld, searchTerm: string) {
  this.searchTerm=searchTerm;
  await this.homePage.searchFor(searchTerm);
  await this.page.waitForTimeout(2000);
});

Given('user clicks on Skill Dropdown', async function (this: TestWorld) {
  await this.homePage.clickSkillDropdown();
  await this.page.waitForTimeout(2000);
});

When('user search for {string} in Skill Dropdown', async function (this: TestWorld, searchTerm: string) {
  this.searchTerm=searchTerm;
  await this.homePage.selectSkill(searchTerm);
  await this.page.waitForTimeout(2000);
});

Then('user sees results matching the search term in the UI', async function (this: TestWorld) {
  this.uiResults = await this.homePage.getSearchResults();
  console.log(this.uiResults);
  expect(this.uiResults.length).toBeGreaterThan(0);
});

Then('user fetch search results from the API', async function (this: TestWorld) {
  await this.page.waitForTimeout(2000);
  await this.fetchApiResults();
});

Then('the UI results should match the API results', function (this: TestWorld) {
  expect(this.uiResults.length).toBe(this.apiResults.length);
  for (let i = 0; i < this.uiResults.length; i++) {
    expect(this.uiResults[i]).toBe(this.apiResults[i]);
  }
});



Then('user should see a "No results found" message', async function (this: TestWorld) {
  await this.page.waitForTimeout(3000);
  this.resultstatus=await this.homePage.checkMessage();
  expect(this.resultstatus).toBe(true);
});
