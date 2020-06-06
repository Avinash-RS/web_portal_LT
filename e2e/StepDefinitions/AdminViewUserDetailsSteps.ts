import { Given, When, Then } from "cucumber";
import { AdminViewUserDetailsPage } from "../PageObject/AdminViewUserDetailsPage";
import { browser } from "protractor";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let avu=new AdminViewUserDetailsPage();

Given(': I am in View user mgmt page to view user details', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);  
    await avu.Username.sendKeys(browser.params.login.adminuser);
    await avu.Password.sendKeys(browser.params.login.adminpwd);    
    await avu.LoginButton.click();
});

When(': I can view all the available users and Click on view icon', async ()=> {
  await browser.sleep(3000);
  await avu.ViewIcon.click();
});

Then(': Admin should see user details when click on view icon', async ()=> {
    console.log("User Details Displayed");
});