import { expect } from '@playwright/test';
import { TestWorld } from 'e2e/world';

export class HomePage {
  constructor(private world: TestWorld) {}

  async verifyLoad(): Promise<void> {
    await expect(this.world.page).toHaveURL(this.world.parameters.appUrl);

  }

  async searchFor(term: string) {
    await this.world.page.getByRole('button', { name: 'Search' }).click();
    await this.world.page.getByRole('searchbox', { name: 'Search input' }).fill(term);
    await this.world.page.getByRole('searchbox', { name: 'Search input' }).press('Enter');

  }

  async clickSkillDropdown() {
    await this.world.page.getByRole('button', { name: 'Skill' }).click();

  }


  async selectSkill(skill: string) {
    await this.world.page.getByRole('region', { name: 'Skill' }).getByRole('combobox').fill('Automation testing');
    await this.world.page.getByRole('region', { name: 'Skill' }).getByRole('combobox').press('Enter');
  }

  async getSearchResults() {
    await this.world.page.waitForTimeout(3000);
    return await this.world.page.locator('//a[contains(@class,"chakra-heading")]').allTextContents();
  }


  async  checkMessage(): Promise<boolean> {
    const message = await this.world.page.locator('(//h2[contains(@class,"chakra-heading")])[1]').textContent();
    return message === 'No Results Found';
  }



}
