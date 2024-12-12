import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page, PlaywrightTestConfig } from '@playwright/test';
import { HomePage } from './page_objects/homepage.po';

/** World.
 *  @class
 *  Test World is instantiated on each scenario and shares state between step definitions, this can be a reference
 *  to the browser object, page objects or any custom code - best practice is to create your page objects here
 */
export class TestWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  homePage!: HomePage;
  playwrightConf: PlaywrightTestConfig;
  searchTerm: string = '';
  uiResults: string[] = [];
  apiResults: string[] = [];
  resultstatus:boolean=false;

  constructor(opts: IWorldOptions) {
    super(opts);

    this.playwrightConf = {
      use: {
        screenshot: 'only-on-failure',
        headless: this.parameters.headless,
      },
      timeout: 20000,
      snapshotDir: './e2e/results/screenshots',
    };
  }

  /**
   * init: setup browser, context and new page and any page objects
   * this is called from a cucumber Before hook to ensure everything
   * is setup before each set of tests
   */
  async init() {
    const { timeout, use } = this.playwrightConf;

    this.browser = await chromium.launch({ headless: use?.headless, timeout });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.homePage = new HomePage(this);

    await this.page.goto(this.parameters.appUrl);
    await this.page.waitForLoadState('networkidle');
  }


  // Make an API call to fetch results using Playwright's request API
  // Make an API call to fetch results using Playwright's request API
  async fetchApiResults() {
    const requestBody = {
      searchText: "testing",
      sortBy: "relevance",
      page: 0,
      pageSize: 24,
      keys: [],
      skills: ["taxonomy:4c61e76f-1bc5-4088-97ee-9e4756fafece"],
      schools: [],
      durations: [],
      difficulties: [],
      semanticTypes: [],
      enrolledOnly: false
    };

    // Make the POST request to the API
    const response = await this.page.context().request.post('https://api.udacity.com/api/unified-catalog/search', {
      data: requestBody,
      headers: {
        'Content-Type': 'application/json', // Set content type for JSON data
      },
    });

    // Check if the response is successful
    if (response.ok()) {
      const jsonResponse = await response.json();
      const hits = jsonResponse.searchResult.hits; // Access the 'hits' array

      // Extract titles from the 'hits' array
      const titles = hits.map((hit: { title: any; }) => hit.title);

      console.log('Titles:', titles);  // Log the titles array to see the results
      this.apiResults = titles;  // Store the titles in apiResults

    } else {
      throw new Error(`Failed to fetch API results: ${response.status()}`);
    }
  }




  /**
   * destroy: close page, browser context and browser.
   * This is usually called from a cucumber After hook
   */
  async destroy() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(TestWorld);
setDefaultTimeout(30000);
