Feature: Course Player Video Audio Test

@sprint2
Scenario: Course Video Player Total Time 

Given : I am playing a video in a course 
When : View the playback bar for video 
Then : I am able to view the total time for the video 

@sprint2
Scenario: Course Video Player Adjust Volume

Given : I am playing a video and audio in a course 
When : I click on the volume and mute button 
Then : I can access a slider to adjust the volume 

@sprint2
Scenario: Forward and Backward button Test

Given : I am playing a video audio in a course
When : I click on forward and backward button 
Then : I should move ahead or behind by ten seconds in the respective audio video 

@sprint2
Scenario: ViewFullScreen Test

Given : I am playing the video for ViewFullScreen
When : I click on full screen icon
Then : I should be able to view the video in full screen



