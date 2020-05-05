import{Given,When,Then} from "cucumber";
import{browser} from "protractor";
import {ViewPublishCoursePage} from "../PageObject/ViewPublishCoursePage"

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vpcp=new ViewPublishCoursePage();

Given(': I am in the course mgmt page to view ViewPublishCourses', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);
    await vpcp.Username.sendKeys(browser.params.login.adminuser);
    await vpcp.Password.sendKeys(browser.params.login.adminpwd);
    await vpcp.LoginButton.click();
});

When(': Click on ViewAll link in ViewPublishCourse section', async ()=> {
    await browser.get(browser.params.login.cmurl);
    await browser.sleep(2000);
    await vpcp.ViewAll.click();
});

Then(': I should see published courses', async ()=> {
    console.log("");
});


