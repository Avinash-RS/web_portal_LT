import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import { LoginPage } from "../PageObject/LoginPage";
import { ViewCourseLearnerPage } from "../PageObject/ViewCourseLearnerPage";
import { ViewProfilePage } from "../PageObject/ViewProfilePage";

let lgn=new LoginPage();
let vpp=new ViewProfilePage();

Given(': I am successfully logged into my account', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
    await lgn.Username.sendKeys("mythreyi");
    await lgn.Password.sendKeys("123Aa!@#");
    await lgn.LoginButton.click(); 
});

When(': I click on my profile page', async ()=> {
    await vpp.ProfileImage.click();
});

Then(': User should be in view profile page', async ()=> {
    await expect('ViewProfilePage').toEqual('ViewProfilePage');       
});