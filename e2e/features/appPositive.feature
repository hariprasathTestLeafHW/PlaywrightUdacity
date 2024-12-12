Feature: Homepage Search Feature Testing-Positive Case



    @test
    Scenario: Validate Search Functionality
        Given the application is loaded successfully
        And user search for "Testing"
        And user clicks on Skill Dropdown
        When user search for "Automation testing" in Skill Dropdown
        Then user sees results matching the search term in the UI
        And user fetch search results from the API
        Then the UI results should match the API results

