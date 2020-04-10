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
    await browser.get('http://52.171.134.188/Learner/login');
    await browser.manage().window().maximize();
    await vcl.Username.sendKeys('Bobby');
    await vcl.Password.sendKeys('Test@123');
    await vcl.LoginButton.click(); 
});

  When(': I click on my course link', async ()=> {
    await vcl.mycourse.click();
});

  Then(': I can view all the purchased courses arranged in chronological order', async ()=> {
    console.log("User is in ViewCourseLearnerPage");
});
