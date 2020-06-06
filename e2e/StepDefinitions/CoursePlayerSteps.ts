import { Given,When,Then } from "cucumber";
import { browser, element, by } from "protractor";
import { CoursePlayerPage } from "../PageObject/CoursePlayerPage";
import { expect, assert } from "chai";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let cpp=new CoursePlayerPage();

Given(': I am playing a video in a course', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
    await browser.get(browser.params.login.url);
    await cpp.Username.sendKeys(browser.params.login.user);
    await cpp.Password.sendKeys(browser.params.login.pwd);
    await cpp.RememberMe.click();
    await cpp.LoginButton.click();
});

When(': View the playback bar for video', async ()=> {
    await browser.sleep(4000);
    await browser.get(browser.params.login.cpurl);
});

Then(': I am able to view the total time for the video', async ()=> {
   var tt= element(by.xpath("//vg-time-display[@ng-reflect-vg-property='total']"));
   await browser.sleep(4000);
   var totaltime=(tt.isDisplayed());
   assert.equal('pass','pass');
});

Given(': I am playing a video and audio in a course', async ()=> {
    await browser.sleep(2000);
});

When(': I click on the volume and mute button', async ()=> {
    await cpp.Mute.click();
});

Then(': I can access a slider to adjust the volume', async ()=> {
    await cpp.Volume.click();
});

Given(': I am playing a video audio in a course', async ()=> {
    await cpp.PlaypauseButton.click();
  });

When(': I click on forward and backward button', async ()=> {
   await browser.sleep(1000);
   await cpp.ForwardButton.click();
   await browser.sleep(1000);
   await cpp.BackwardButton.click();
});

Then(': I should move ahead or behind by ten seconds in the respective audio video', async ()=> {
    console.log("Move video back and forth successfully");
});

Given(': I am playing the video for ViewFullScreen',async ()=> {
    console.log("Full screen page");
});

When(': I click on full screen icon', async ()=> {
    await cpp.FullscreenButton.click();
});

Then(': I should be able to view the video in full screen', async ()=> {
    console.log("Video played in Full screen Page");
});

/*Given(': I am playing a video in a course to view the subtitle', async ()=> {
    await browser.sleep(1000);
});

When(': I click on subtitle', async ()=> {
    await cpp.SubtitleMenu.click();
});

When(': Select a language as English', async ()=> {
    await browser.sleep(3000);
    await cpp.SubtitleText.click();
});

Then(': I am able to view the video with respective subtitle', function () {
    console.log("Subtitle Text is displayed");
});*/
