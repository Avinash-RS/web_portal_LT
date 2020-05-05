import { Given,When,Then } from "cucumber";
import { browser } from "protractor";
import {FirstTimeLoginPage} from "../PageObject/FirstTimeLoginPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let flp=new FirstTimeLoginPage();

  Given(': User entered valid login credentials after profile update', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    await flp.Username.sendKeys(browser.params.login.user);
    await flp.Password.sendKeys(browser.params.login.pwd);
  });

 When(': User click Sign In button after profile update', async ()=> {
    flp.LoginButton.click();
  });

  When(': I am not logging in for the first time to LxP', async ()=> {
      console.log("User logged in the page upon complete profile page");
  });

  Then(': I should be redirected to LxP portal home page', async ()=> {
      console.log("User lands into lxphome page after profile update")
  });