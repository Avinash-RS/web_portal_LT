import { Given, When,Then } from "cucumber";
import { browser } from "protractor";
import { ViewAllCoursesPage } from "../PageObject/ViewAllCoursesPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let vac=new ViewAllCoursesPage();

Given(': I have logged in to LxP to view All courses', async ()=> {
    browser.waitForAngularEnabled(false);
    await browser.get(browser.params.login.url);
    await vac.Username.sendKeys(browser.params.login.user);
    await vac.Password.sendKeys(browser.params.login.pwd);
    await vac.LoginButton.click();     
});

When(': I click on All courses button', async ()=> {
    await browser.sleep(3000);
    await vac.Menu.click();

});

Then(': I should be able to view all categories', async ()=> {
    await browser.sleep(3000);
    await vac.ViewAllCourse.click();
});