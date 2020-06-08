import { Given, When, Then } from "cucumber";
import { browser } from "protractor";
import { VidAudPlayBackPage } from "../PageObject/VidAudPlayBackPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vapb =new VidAudPlayBackPage();

Given(': User starts the video at a certain point', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
    await browser.get(browser.params.login.url);
    await vapb.Username.sendKeys(browser.params.login.user);
    await vapb.Password.sendKeys(browser.params.login.pwd);
    await vapb.RememberMe.click();
    await vapb.LoginButton.click();
});

When(': User clicks on playback bar in Video player page', async ()=> {
    await browser.sleep(4000);
    await browser.get(browser.params.login.cpurl);
    await vapb.PlayPauseButton.click();
    await vapb.PlayBackbar.isDisplayed();
});

Then(': User able to navigate back and forth through playback bar in video', async ()=> {
    await browser.sleep(1000);
});

Given(': User starts the audio at a certain point', async ()=> {
    await browser.get(browser.params.login.apurl);    
});

When(': User clicks on playback bar in audio player page', async ()=> {
    await vapb.PlayPauseButton.click();
    await vapb.PlayBackbar.isDisplayed();
});

Then(': User able to navigate back and forth through playback bar in audio', async ()=> {
    console.log("");
});


