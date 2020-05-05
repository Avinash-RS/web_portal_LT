Feature: Test the function of Video speed and slow down

@sprint2
Scenario: Adjust Video speed

Given : I am playing a video in a course to adjust video speed
When : User clicks on play button to play the video to adj speed
And : Select adjust the video speed faster
Then : Video Play faster from normal speed
And : Select adjust the video speed slower
Then : Video Play slower from normal speed
