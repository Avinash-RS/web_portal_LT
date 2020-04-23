import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { LoginPage } from "../PageObject/LoginPage";
import { ViewCourseLearnerPage } from "../PageObject/ViewCourseLearnerPage";
import { ViewProfilePage } from "../PageObject/ViewProfilePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

//let lgn=new LoginPage();
let vpp=new ViewProfilePage();

Given(': I am successfully logged into my account', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    await browser.manage().window().maximize();
    await vpp.Username.sendKeys(browser.params.login.user);
    await vpp.Password.sendKeys(browser.params.login.pwd);
    await vpp.LoginButton.click(); 
});

When(': I click on my profile page', async ()=> {
    await browser.sleep(5000);
    await vpp.ProfileImage.click();
});

Then(': User should be in view profile page', async ()=> {
    console.log("User landed into ViewProfile Page");     
});