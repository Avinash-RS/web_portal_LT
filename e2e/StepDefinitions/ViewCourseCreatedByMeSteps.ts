import {Given,When,Then} from "cucumber";
import { browser } from "protractor";
import { ViewCourseCreatedByMePage } from "../PageObject/ViewCourseCreatedByMePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vcme=new ViewCourseCreatedByMePage();

Given(': I am in the course mgmt page to view ViewCoursesCreatedByMe', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);
    await vcme.Username.sendKeys(browser.params.login.adminuser);
    await vcme.Password.sendKeys(browser.params.login.adminpwd);
    await vcme.LoginButton.click();
});

When(': Click on ViewAll link in ViewCourseCreatedByMe section', async ()=> {
    await browser.get(browser.params.login.cmurl);
});

Then(': I should see Courses created by me', async ()=> {
    await browser.sleep(5000);
    await vcme.ViewAll.click();
});

Given(': I am Course Detail page for ccbyme', async ()=> {
    await browser.sleep(5000);
});

When(': User clicks on particular course for ccbyme', async ()=> {
    await vcme.Course.click();
});

When(': Click on the Preview button for ccbyme', async ()=> {
    await browser.sleep(5000);
    await vcme.Preview.click();
});

Then(': I should see the preview of the module for ccbyme', async ()=> {
    await vcme.Close.click();
});

Given(': I am viewing course page of a course created by me', async ()=> {
    console.log("");
});

When(': I click on Edit button in the course page', async ()=> {
    await vcme.EditCourse.click();
});

Then(': I should be able to add a module to the course', async ()=> {
    console.log("");
});