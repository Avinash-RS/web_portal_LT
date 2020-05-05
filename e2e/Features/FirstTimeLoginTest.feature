Feature: FirstTimeLoginUser Test

@sprint2
Scenario: First Time Login user visits page after profile update

Given : User entered valid login credentials after profile update 
When : User click Sign In button after profile update 
And : I am not logging in for the first time to LxP 
Then : I should be redirected to LxP portal home page 


