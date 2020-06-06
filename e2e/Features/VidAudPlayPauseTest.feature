Feature: Video/Audio Play Pause Feature

@sprint2
Scenario: Play the course video

Given : I am playing the video to check play option
When : User clicks on play button while visiting course video player page
Then : User is able to play the video in course video player page

@sprint2
Scenario: Pause and Resume the Course video

Given : I am playing the video to check pause option
When : User clicks on Pause button while video is playing
And : User clicks on play button when course video is in pause
Then : User Resume the course video successfully

@sprint2
Scenario: Play the audio player

Given : I am playing the audio to check play option
When : User clicks on play button while visiting course audio player page
Then : User is able to play the audio in course audio player page

@sprint2
Scenario: Pause and Resume the audio player

Given : I am playing the audio to check pause option
When : User clicks on Pause button while audio is playing
And : User clicks on play button when course audio is in pause
Then : User Resume the audio successfully
