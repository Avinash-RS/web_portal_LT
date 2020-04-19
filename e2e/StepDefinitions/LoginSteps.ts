import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage} from "../PageObject/LoginPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let lgn=new LoginPage();

  Given(': User is in login page', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    //QA env : 52.171.134.188 [ Bobby / Test@123 ]
    //Dev env: 40.76.47.212 [ mythreyi / 123Aa!@# ]
    //await browser.manage().window().maximize();
  });

  When(':  Enter usrname and pwd for a particular user roles', async ()=> {
    await lgn.Username.sendKeys(browser.params.login.user);
    //await browser.sleep(3000);
    await lgn.Password.sendKeys(browser.params.login.pwd);
    //await browser.sleep(3000);
  });

  Then(': User Click on log in button', async ()=> {
    await lgn.LoginButton.click(); 
  }); 