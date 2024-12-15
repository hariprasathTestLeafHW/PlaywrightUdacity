# Cucumber Playwright Starter-Udacity
This Test Framework Runs The Test For Udacity Webportal


## Running E2E tests

Before running tests, ensure that @Playwright/test is installed correctly by running `npm run e2e:install`.


Then Run the script `npm run e2e:test-local`, to execute your e2e tests locally using Chrome. You can find the local config in `cucumber.js`. The default is to run `headless:false`, which display the browser.

### CI/CD

To run in a CI pipeline then use the script `npm run e2e:ci`, this is configured to automatically run the application, once running the e2e tests will then execute in headless mode and use the parallel feature to reduce test duration. You can find the ci config in `cucumber.js`.

## Further help

Make Sure You set up proper Nodejs Versions(latest) and Npm in your Machine before proceeding
Use Aqua IDE for better Execution