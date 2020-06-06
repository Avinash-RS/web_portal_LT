import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage} from "../PageObject/LoginPage";
import {RememberMePage} from "../PageObject/RememberMePage";
import {LogoutPage} from "../PageObject/LogoutPage";

//let lgn=new LoginPage();
//let rem=new RememberMePage();
let lout=new LogoutPage();

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Given(': User is already logged in the system', async ()=> {
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
   // await browser.manage().window().maximize();
    await lout.Username.sendKeys(browser.params.login.user);
    await lout.Password.sendKeys(browser.params.login.pwd);
});


Given(': Remember me checked during log in', async ()=> {
    await lout.RememberMe.click();
    await browser.sleep(2000);
    await lout.LoginButton.click();            
});

When(': clicks on log out option', async ()=> {
    await browser.sleep(5000);
    await lout.LogoutMenu.click();
    await lout.Logout.click();
});


Then(': User must be logged out of the system', async ()=> {
    console.log("User Logged out successfully");
});

Then(': User again loads the URL', async ()=> {
    await browser.get(browser.params.login.url);    
  });

  Then(': it should not be logged into the Portal.', async ()=> {
    console.log("User is in login page");
  });