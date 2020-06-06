import { Given, When, Then } from "cucumber";
import { browser } from "protractor";
import { VidAudPlayPausePage } from "../PageObject/VidAudPlayPausePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vapp =new VidAudPlayPausePage();

Given(': I am playing the video to check play option', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
    await browser.get(browser.params.login.url);
    await vapp.Username.sendKeys(browser.params.login.user);
    await vapp.Password.sendKeys(browser.params.login.pwd);
    await vapp.RememberMe.click();
    await vapp.LoginButton.click();
});
          
When(': User clicks on play button while visiting course video player page', async ()=> {
    await browser.sleep(4000);
    await browser.get(browser.params.login.cpurl);
    await vapp.PlaypauseButton.click();
});
          
Then(': User is able to play the video in course video player page', async ()=> {
    console.log("Video is playing now");
});

Given(': I am playing the video to check pause option', async ()=> {
   console.log("Ready to pause the video");
});

When(': User clicks on Pause button while video is playing', async ()=> {
    await vapp.PlaypauseButton.click();
});

 When(': User clicks on play button when course video is in pause', async ()=> {
    await vapp.PlaypauseButton.click();
});

Then(': User Resume the course video successfully', async ()=> {
    console.log("Video is Resumed")
});

Given(': I am playing the audio to check play option', async ()=> {
    await browser.sleep(1000);
    await browser.get(browser.params.login.apurl);
});

When(': User clicks on play button while visiting course audio player page', async ()=> {
    await vapp.PlaypauseButton.click();
});

Then(': User is able to play the audio in course audio player page', async ()=> {
    console.log("Audio is playing now");   
});

Given(': I am playing the audio to check pause option', async ()=> {
    console.log("Ready to pause the Audio");
});

When(': User clicks on Pause button while audio is playing', async ()=> {
    await vapp.PlaypauseButton.click();
});

When(': User clicks on play button when course audio is in pause', async ()=> {
    await vapp.PlaypauseButton.click();
});

Then(': User Resume the audio successfully', async ()=> {
console.log("Audio is Resumed");
});

  

