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
    await browser.get(browser.params.login.url);
    await browser.manage().window().maximize();
    await cdp.Username.sendKeys(browser.params.login.user);
    await cdp.Password.sendKeys(browser.params.login.pwd);
    await cdp.LoginButton.click();     
});

When(': I click on a purachased course', async ()=> {
    await browser.sleep(5000);
    await cdp.mycoursemenu.click();
    await cdp.mycourse.click();
    await browser.sleep(5000);
    await cdp.CourseDetails.click();
});

Then(': I can view the following details about the course', async ()=> {
    console.log("CourseDetailsPage Opened");
});