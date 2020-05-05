import{Given,When,Then} from "cucumber";
import{browser} from "protractor";
import {ViewDraftCoursePage} from "../PageObject/ViewDraftCoursePage"


var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vdc=new ViewDraftCoursePage();

Given(': I am in the course management page to View Draft courses', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);
    await vdc.Username.sendKeys(browser.params.login.adminuser);
    await vdc.Password.sendKeys(browser.params.login.adminpwd);
    await vdc.LoginButton.click();
});

When(': I am viewing the page for dracourses', async ()=> {
    await browser.get(browser.params.login.cmurl);
});

Then(': I should see the Saved courses in View All page draft page', async ()=> {    
    await browser.sleep(4000);
    await vdc.ViewAll.click();      
});

Given(': I am viewing course management page for viewdraft page', async ()=> {
    console.log("");
});
 
When(': I click on a particular course in Saved courses', async ()=> {
    await browser.sleep(5000);
    await vdc.DraftCourse.click();
});

Then(': I should view the page where I see the CourseName Thumbnail and the modules', async ()=> {
    await browser.sleep(5000);            
});