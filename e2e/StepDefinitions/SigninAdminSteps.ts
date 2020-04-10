import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { SigninAdminPage } from "../PageObject/SigninAdminPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let algn = new SigninAdminPage();

Given(': I am in admin login page', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get('http://52.171.134.188/Learner/login');
    await browser.manage().window().maximize();
});

When(': Enter user name and password for a particular user role', async ()=> {
    await algn.Username.sendKeys("rahulsaivishnu1");
    await algn.Password.sendKeys("123Aa!@#");
});

 When(': Click on log in button', async ()=> {
    await algn.LoginButton.click(); 
});

Then(': land in my respective homepage', async ()=> {
    console.log("Admin Login Success");
});