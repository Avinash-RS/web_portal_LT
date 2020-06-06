import { Given, When, Then } from "cucumber";
import { AdminTrackUserEventPage } from "../PageObject/AdminTrackUserEventPage";
import { browser } from "protractor";


var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let atue=new AdminTrackUserEventPage();

Given(': I am in View user mgmt page to track user details', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);  
    await atue.Username.sendKeys(browser.params.login.adminuser);
    await atue.Password.sendKeys(browser.params.login.adminpwd);    
    await atue.LoginButton.click();
});

When(': I can view all the available users and Click on view icon to track usr details', async ()=> {
    await browser.sleep(3000);
    await atue.ViewIcon.click();
    await browser.sleep(5000);
    await atue.TrackDetails.click();
});

Then(': Admin should track the user details when click on view icon', async ()=> {
    console.log("Track user Details");
});

