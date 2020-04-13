import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {WishlistCoursePage} from "../PageObject/WishlistCoursePage"
import {LoginPage} from "../PageObject/LoginPage";
import {ViewCourseLearnerPage} from "../PageObject/ViewCourseLearnerPage";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

//let lgn=new LoginPage();
//let vcl=new ViewCourseLearnerPage();
let wlc=new WishlistCoursePage();

Given(':Learner is in my course page', async () => {
browser.waitForAngularEnabled(false);
await browser.get('http://52.171.134.188/Learner/login');
await browser.manage().window().maximize();
await wlc.Username.sendKeys("Bobby");
await wlc.Password.sendKeys("Test@123");
await wlc.LoginButton.click(); 
await wlc.mycourse.click();           
});

When(':Learner selects wishlist icon on the course', async ()=> {
await wlc.Favorite.click();      
});

Then(':Course must be available in the course under wishlist tab', async ()=> {
await wlc.AddtoWishList.click();
console.log("Courses Added into wishlist");     
});
         
Then(':Learner deselect the wishlist icon from the Wishlist section', async ()=> {
await wlc.RemoveFromWishlist.click(); 
});

Then(':Deselected Courses must be removed from the wishlist section', function () {
  console.log("deselect course from wishlist");    
});