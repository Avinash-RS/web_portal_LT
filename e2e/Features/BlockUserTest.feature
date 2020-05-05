Feature: Block user Test

@sprint2
Scenario: Block User as a admin

Given : I am in user management page to block the users
When : I view all the users to block the user
And : Search for a particular user using the user attributes to block
And : I select the user to be blocked 
And : Click on Block button 
Then : The user account should be blocked 
And : The user status change to false and can not login into system 
