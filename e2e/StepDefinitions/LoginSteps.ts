import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage} from "../PageObject/LoginPage";

let lgn=new LoginPage();

  Given(': I am in login page', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
  });

  When(':  Enter {string} and {string} for a particular user role', async (string, string2)=> {        
    await lgn.Username.sendKeys(string);
    await lgn.Password.sendKeys(string2);
  });

  Then(': Click on log in button', async ()=> {
    await lgn.LoginButton.click(); 
  }); 