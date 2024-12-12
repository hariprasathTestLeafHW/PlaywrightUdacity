Feature: Homepage Search Feature Testing-Negative Case


@test
Scenario: Invalid Search with No Results
Given the application is loaded successfully
And   user search for "NonExistentTerm"
Then  user should see a "No results found" message