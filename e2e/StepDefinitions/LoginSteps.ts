import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage} from "../PageObject/LoginPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let lgn=new LoginPage();

  Given(': I am in login page', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get('http://52.171.134.188/Learner/login');
    //QA env : 52.171.134.188 [ Bobby / Test@123 ]
    //Dev env: 40.76.47.212 [ mythreyi / 123Aa!@# ]
    await browser.manage().window().maximize();
  });

  When(':  Enter {string} and {string} for a particular user role', async (string, string2)=> {        
    await lgn.Username.sendKeys(string);
    await lgn.Password.sendKeys(string2);
  });

  Then(': Click on log in button', async ()=> {
    await lgn.LoginButton.click(); 
  }); 