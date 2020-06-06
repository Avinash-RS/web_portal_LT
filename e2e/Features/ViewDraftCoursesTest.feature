Feature: ViewDraftCoursesFeatureTest

@sprint2
Scenario: ViewTheAllDraftCourses

Given : I am in the course management page to View Draft courses
When : I am viewing the page for dracourses
Then : I should see the Saved courses in View All page draft page

@sprint2
Scenario: ViewTheParticularDraftedCourse

Given : I am viewing course management page for viewdraft page
When : I click on a particular course in Saved courses
Then : I should view the page where I see the CourseName Thumbnail and the modules
