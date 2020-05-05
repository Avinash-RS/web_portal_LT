import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { SigninAdminPage } from "../PageObject/SigninAdminPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let algn = new SigninAdminPage();

Given(': I am in admin login page', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);
    //await browser.manage().window().maximize();
});

When(': Enter user name and password for a particular user role', async ()=> {
    await algn.Username.sendKeys(browser.params.login.adminuser);
    await algn.Password.sendKeys(browser.params.login.adminpwd);
});

 When(': Click on log in button', async ()=> {
    await algn.LoginButton.click(); 
});

Then(': land in my respective homepage', async ()=> {
    console.log("Admin Login Success");
});