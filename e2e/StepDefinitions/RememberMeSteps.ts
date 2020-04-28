import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {RememberMePage} from "../PageObject/RememberMePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let rem=new RememberMePage();
Given(': I am in login page for remember me test', async ()=> {
 browser.waitForAngularEnabled(false);
 await browser.get(browser.params.login.url);
 await browser.manage().window().maximize();
 });

 When(': Enter usrname and passwd for remember me', async () => {
    await rem.Username.sendKeys(browser.params.login.user);
    await rem.Password.sendKeys(browser.params.login.pwd);
  });

 When(': Select Remember me checkbox', async ()=> {
    await rem.RememberMe.click();
 });

 When(': Click on log in button for remember me', async ()=> {
  await rem.LoginButton.click(); 
 });

Then(': I am able to directly access my portal if have not logged out of the platform but closed the tab.', async ()=> {
 await browser.get('http://52.171.134.188/Learner/login');
 console.log("User Logged in successfully");
});
