import {Given,When,Then} from "cucumber";
import {LoginPage} from "../PageObject/LoginPage";
import {ViewCourseLearnerPage} from "../PageObject/ViewCourseLearnerPage";
import { browser } from "protractor";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

//let lgn=new LoginPage();
let vcl=new ViewCourseLearnerPage();

Given(': I am in my courses page', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    await browser.manage().window().maximize();
    await vcl.Username.sendKeys(browser.params.login.user);
    await vcl.Password.sendKeys(browser.params.login.pwd);
    await vcl.LoginButton.click(); 
});

  When(': I click on my course link', async ()=> {
    await vcl.mycourse.click();
});

  Then(': I can view all the purchased courses arranged in chronological order', async ()=> {
    console.log("User is in ViewCourseLearnerPage");
});
