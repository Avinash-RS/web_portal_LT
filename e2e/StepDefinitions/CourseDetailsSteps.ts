import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { LoginPage } from "../PageObject/LoginPage";
import { ViewCourseLearnerPage } from "../PageObject/ViewCourseLearnerPage";
import { CourseDetailsPage } from "../PageObject/CourseDetailsPage";

let lgn=new LoginPage();
let vcl=new ViewCourseLearnerPage();
let cdp=new CourseDetailsPage();

Given(': I am on purchased courses page', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
    await lgn.Username.sendKeys('mythreyi');
    await lgn.Password.sendKeys('123Aa!@#');
    await lgn.LoginButton.click();  
    await vcl.mycourse.click();
});

When(': I click on a purachased course', async ()=> {
    await cdp.CourseDetails.click();
});

Then(': I can view the following details about the course', async ()=> {
    await expect("CourseDetailsPage").toEqual("CourseDetailsPage");
});