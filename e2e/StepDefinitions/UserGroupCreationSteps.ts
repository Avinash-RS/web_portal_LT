import { Given, When, Then } from "cucumber";
import { UserGroupCreationPage } from "../PageObject/UserGroupCreationPage";
import { browser } from "protractor";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let ugcp=new UserGroupCreationPage();

Given(': I am in UserGroupCretionPage', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);  
    await ugcp.Username.sendKeys(browser.params.login.adminuser);
    await ugcp.Password.sendKeys(browser.params.login.adminpwd);    
    await ugcp.LoginButton.click();
});

When(': Click on User Groups from left navigation', async ()=> {
    await browser.sleep(3000);
    await ugcp.LearnerMgmt.click();
    await browser.sleep(2000);
    await ugcp.UserGroups.click();
    await browser.sleep(2000);
    await ugcp.GroupNameTxt.sendKeys("tstasc1");
    await ugcp.SaveButton.click();
});

Then(': User Group Created successfully', async ()=> {
    await browser.sleep(3000);
    await ugcp.OkButton.click();
});