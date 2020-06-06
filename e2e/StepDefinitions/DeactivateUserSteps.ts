import {Given,When,Then} from "cucumber";
import { browser,element,by } from "protractor";
import { DeactivateUserPage } from "../PageObject/DeactivateUserPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let du=new DeactivateUserPage();

Given(': I am in user management page for user deactivation', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);  
    await du.Username.sendKeys(browser.params.login.adminuser);
    await du.Password.sendKeys(browser.params.login.adminpwd);    
    await du.LoginButton.click();
});

When(': I view all the users for deactivation', async ()=> {
    console.log("User is in View All users page");
});

When(': Search for a particular user using the user attributes', async ()=> {
   await browser.sleep(2000);
   await du.Search.clear();
   await du.Search.sendKeys("tamil");
});

When(': I select the user to be removed', async ()=> {
    await browser.sleep(5000);
    //await du.Checkbox.click();
});

When(': Click on Deactivate button', async ()=> {
    await browser.sleep(1000);
    await du.DeactivateButton.click();
});

Then(': The user account should be deactivated', async ()=> {
    await browser.sleep(5000);
    //await browser.switchTo().alert().accept();
    await du.Yesbutton.click();
});

Then(': The user status changed to Inactive', async ()=> {
    await browser.sleep(5000);    
    await du.Search.clear();
    await du.Search.sendKeys("tamil");
    //var usrstatus = element(by.xpath("td[6]")).getText();
    //console.log(usrstatus);

    /*if(usrstatus==="Inactive")
    {
        console.log("User deactivated successfully");
    }*/
});

Given(': I am in view all users page for reactivation', async ()=> {
    console.log("View All users page");
});

When(': Search for the deactivated user', async () => {
    await browser.sleep(5000);    
    await du.Search.clear();
    await du.Search.sendKeys("tamil");
});

When(': Select the record and click on activate button', async ()=> {
    await browser.sleep(5000);
    //await du.Checkbox.click();
});

Then(': User Activated successfully', async ()=> {
    await du.ReactivateButton.click();
    await browser.sleep(5000);    
    await du.Yesbutton.click();
    await browser.sleep(5000);
    await du.Search.clear();
    await du.Search.sendKeys("tamil");
    console.log("Reactivation successful"); 
});

Given(': I am in user management page for deactivation', async ()=> {
    await browser.sleep(5000);    
    await du.Search.clear();
});


When(': I view all the available users', async ()=> {
 console.log("Listed Avaialble Users");
});

When(': Search for a particular user using the usr attributes', async ()=> {
    await du.Search.sendKeys("ERRUSER");
});

When(': The attributes I have entered does not match with any of the existing users', async ()=> {
    console.log("Attributes don't match with the existing user");
});

Then(': I should see User does not exist message', async ()=> {
    console.log("User Does not exist");
});