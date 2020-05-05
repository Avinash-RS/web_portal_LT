import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage}from "../PageObject/LoginPage";
import { UpdateProfileDetailsPage } from "../PageObject/UpdateProfileDetailsPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let upp=new UpdateProfileDetailsPage();

  Given(': I am in my profile page for edit', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    await upp.Username.sendKeys(browser.params.login.user);
    await upp.Password.sendKeys(browser.params.login.pwd);
    await browser.sleep(4000);
    await upp.LoginButton.click(); 
  });

  When(': Edit and update the required details', async ()=> {

    console.log("Edited field***");
    browser.sleep(3000);
    await upp.ProfileImage.click();
    await upp.editicon.click();
    await upp.AboutYou.sendKeys("Test");
    //await upp.Gender.click();*/  
  });

  Then(': I will be able to submit the updated profile details', async ()=> {
    await browser.sleep(2500);
    await upp.subButton.click();
    console.log("Profile Update successful");
  });


  