import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { LoginPage } from "../PageObject/LoginPage";
import { ViewCourseLearnerPage } from "../PageObject/ViewCourseLearnerPage";
import { CourseDetailsPage } from "../PageObject/CourseDetailsPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
//let lgn=new LoginPage();
//let vcl=new ViewCourseLearnerPage();
let cdp=new CourseDetailsPage();

Given(': I am on purchased courses page', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get('http://52.171.134.188/Learner/login');
    await browser.manage().window().maximize();
    await cdp.Username.sendKeys('Bobby');
    await cdp.Password.sendKeys('Test@123');
    await cdp.LoginButton.click();  
    await cdp.mycourse.click();
});

When(': I click on a purachased course', async ()=> {
    await cdp.CourseDetails.click();
});

Then(': I can view the following details about the course', async ()=> {
    console.log("CourseDetailsPage Opened");
});