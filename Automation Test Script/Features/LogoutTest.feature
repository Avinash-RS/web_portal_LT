Feature: Logout Functionality test

Scenario: Logout test when user already logged in

Given : User is already logged in the system 
And : Remember me checked during log in 
When : clicks on log out option 
Then : User must be logged out of the system 
And : User again loads the URL 
Then : it should not be logged into the Portal. 