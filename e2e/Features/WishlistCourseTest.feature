Feature: Wishlist Functionality

Scenario: Add the courses to wishlist

Given :Learner is in my course page
When :Learner selects wishlist icon on the course
Then :Course must be available in the course under wishlist tab	
And :Learner deselect the wishlist icon from the Wishlist section
Then :Deselected Courses must be removed from the wishlist section				