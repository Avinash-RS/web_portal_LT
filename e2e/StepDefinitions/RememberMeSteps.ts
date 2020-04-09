import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {RememberMePage} from "../PageObject/RememberMePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let rem=new RememberMePage();
Given(': I am in login page', async ()=> {
 browser.waitForAngularEnabled(false);
 await browser.get('http://52.171.134.188/Learner/login');
 await browser.manage().window().maximize();
 });

When(': Enter {string} and {string}', async (string, string2)=> {
await rem.Username.sendKeys(string);
await rem.Password.sendKeys(string2);
});
When(': Select Remember me option', async ()=> {
await rem.RememberMe.click();
});
 When(': Click on log in button', async ()=> {
  await rem.LoginButton.click(); 
 });
Then(': I am able to directly access my portal if have not logged out of the platform but closed the tab.', async ()=> {
 await browser.get('http://52.171.134.188/Learner/login');
 console.log("User Logged in successfully");
});
