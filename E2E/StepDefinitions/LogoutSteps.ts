import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {LoginPage} from "../PageObject/LoginPage";
import {RememberMePage} from "../PageObject/RememberMePage";
import {LogoutPage} from "../PageObject/LogoutPage";

let lgn=new LoginPage();
let rem=new RememberMePage();
let lout=new LogoutPage();

Given(': User is already logged in the system', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');
    await browser.manage().window().maximize();
    await lgn.Username.sendKeys("mythreyi");
    await lgn.Password.sendKeys("123Aa!@#");
});


Given(': Remember me checked during log in', async ()=> {
    await rem.RememberMe.click();
    await lgn.LoginButton.click();            
});

When(': clicks on log out option', async ()=> {
    await lout.Logout.click();
});


Then(': User must be logged out of the system', async ()=> {
    //expect(browser.getTitle()).to.equal('bar');
});

Then(': User again loads the URL', async ()=> {
    await browser.get('http://40.76.47.212/Learner/login');    
  });

  Then(': it should not be logged into the Portal.', async ()=> {
    //expect(browser.getTitle()).to.equal('bar');
  });