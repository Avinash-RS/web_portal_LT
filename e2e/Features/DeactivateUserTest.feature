Feature: Deactivate User Test

@sprint2
Scenario: Deactivate user by using admin login

Given : I am in user management page for user deactivation
When : I view all the users for deactivation
And : Search for a particular user using the user attributes
And : I select the user to be removed 
And : Click on Deactivate button 
Then : The user account should be deactivated 
And : The user status changed to Inactive 

@sprint2
Scenario: Reactivate the user admin login

Given : I am in view all users page for reactivation
When : Search for the deactivated user
And : Select the record and click on activate button
Then : User Activated successfully

@sprint2
Scenario: Search user which does not exist in the system

Given : I am in user management page for deactivation
When : I view all the available users 
And : Search for a particular user using the usr attributes 
And : The attributes I have entered does not match with any of the existing users 
Then : I should see User does not exist message
   