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
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
    await vpp.Username.sendKeys("mythreyi");
    await vpp.Password.sendKeys("123Aa!@#");
    await vpp.LoginButton.click(); 
});

When(': I click on my profile page', async ()=> {
    await vpp.ProfileImage.click();
});

Then(': User should be in view profile page', async ()=> {
    await expect('ViewProfilePage').toEqual('ViewProfilePage');       
});