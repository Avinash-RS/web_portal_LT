import {Given,When,Then} from "cucumber";
import {LoginPage} from "../PageObject/LoginPage";
import {ViewCourseLearnerPage} from "../PageObject/ViewCourseLearnerPage";
import { browser } from "protractor";

let lgn=new LoginPage();
let vcl=new ViewCourseLearnerPage();

Given(': I am in my courses page', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
    await lgn.Username.sendKeys('mythreyi');
    await lgn.Password.sendKeys('123Aa!@#');
    await lgn.LoginButton.click(); 
});

  When(': I click on my course link', async ()=> {
    await vcl.mycourse.click();
});

  Then(': I can view all the purchased courses arranged in chronological order', async ()=> {
    console.log("EndTest");
});
