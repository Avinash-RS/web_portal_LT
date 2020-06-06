import{Given,When,Then} from "cucumber";
import{browser, Browser} from "protractor";
import { PreviewCoursePage } from "../PageObject/PreviewCoursePage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vpc=new PreviewCoursePage();

Given(': I am Course Detail page for preview course', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.adminurl);
    await vpc.Username.sendKeys(browser.params.login.adminuser);
    await vpc.Password.sendKeys(browser.params.login.adminpwd);
    await vpc.LoginButton.click();
});

When(': User clicks on particular course to preview', async ()=> {
    await browser.get(browser.params.login.cmurl);
    await browser.sleep(5000);
    await vpc.ViewAll.click();
});

When(': Click on the Preview button to preview the course', async ()=> {
    await browser.sleep(3000);
    await vpc.ParticularListCourse.click();
});

Then(': I should see the preview of the module', async ()=> {
    await browser.sleep(3000);
    await vpc.PreviewButton.click();
    await browser.sleep(2000);
    await vpc.closePage.click();
});