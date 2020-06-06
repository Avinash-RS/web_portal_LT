import { Given, When, Then } from "cucumber";
import { VidSpeedAdjandSubtitlePage } from "../PageObject/VidSpeedAdjandSubtitlePage";
import { browser } from "protractor";


var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vsst=new VidSpeedAdjandSubtitlePage();

Given(': I am playing a video in a course to adjust video speed', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
    await browser.get(browser.params.login.url);
    await vsst.Username.sendKeys(browser.params.login.user);
    await vsst.Password.sendKeys(browser.params.login.pwd);
    await vsst.RememberMe.click();
    await vsst.LoginButton.click();
});

When(': User clicks on play button to play the video to adj speed', async ()=> {
    await browser.sleep(4000);
    await browser.get(browser.params.login.cpurl);
});

When(': Select adjust the video speed faster', async ()=> {
await vsst.PlaypauseButton.click();
});

Then(': Video Play faster from normal speed', async ()=> {
    await vsst.VideoSpeed.click();
    await browser.sleep(3000);
    await vsst.FastVideo.click();    
});

Then(': Select adjust the video speed slower', async ()=> {
    await browser.sleep(3000);
    await vsst.FastVideo.click();
});

Then(': Video Play slower from normal speed', async ()=> {
    await browser.sleep(3000);
    await vsst.SlowVideo.click();
});

