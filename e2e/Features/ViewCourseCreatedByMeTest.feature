Feature: ViewCoursesCreatedByMe Test

@sprint2
Scenario: ViewCoursesCreatedByMe

Given : I am in the course mgmt page to view ViewCoursesCreatedByMe 
When : Click on ViewAll link in ViewCourseCreatedByMe section
Then : I should see Courses created by me 

@sprint2
Scenario: PreviewCourseTestforCreatedByMe

Given : I am Course Detail page for ccbyme
When : User clicks on particular course for ccbyme
And : Click on the Preview button for ccbyme
Then : I should see the preview of the module for ccbyme 

@sprint2
Scenario: EditCoursefortheCourseCreatedByMe

Given : I am viewing course page of a course created by me 
When : I click on Edit button in the course page 
Then : I should be able to add a module to the course 
