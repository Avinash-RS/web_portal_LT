import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {RememberMePage} from "../PageObject/RememberMePage";

let rem=new RememberMePage();

  Given(': I am in login page', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
  });

  When(':  Enter {string} and {string} for a particular user role', async (string, string2)=> {        
    await rem.Username.sendKeys(string);
    await rem.Password.sendKeys(string2);
  });

  When(': Select Remember me option', async ()=> {
    await rem.RememberMe.click();
  });

  Then(': Click on log in button', async ()=> {
    await rem.LoginButton.click(); 
  });