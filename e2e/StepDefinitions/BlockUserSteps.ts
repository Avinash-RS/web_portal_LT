import {Given,When,Then} from "cucumber";
import { BlockUserPage } from "../PageObject/BlockUserPage";
import { browser } from "protractor";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let bu=new BlockUserPage();

Given(': I am in user management page to block the users',  async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);  
    await bu.Username.sendKeys(browser.params.login.adminuser);
    await bu.Password.sendKeys(browser.params.login.adminpwd);    
    await bu.LoginButton.click();    
});

When(': I view all the users to block the user',  async ()=> {
    console.log("User is in View All users page");
});

When(': Search for a particular user using the user attributes to block',  async ()=> {
   await browser.sleep(2000);
   await bu.Search.clear();
   await bu.Search.sendKeys("tamil");
});

When(': I select the user to be blocked',  async ()=> {
    await browser.sleep(8000);
    //await bu.Checkbox.click();
});

When(': Click on Block button',  async ()=> {
    await browser.sleep(1000);
    await bu.BlockButton.click();
});

Then(': The user account should be blocked',  async ()=> {
    await browser.sleep(2000);
    await bu.Yesbutton.click();
});

Then(': The user status change to false and can not login into system',  async ()=> {
    await browser.sleep(5000);    
    await bu.Search.clear();
    await bu.Search.sendKeys("tamil");
});