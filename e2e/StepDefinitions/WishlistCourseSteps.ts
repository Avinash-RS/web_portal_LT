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
await browser.get(browser.params.login.url);
await browser.manage().window().maximize();
await wlc.Username.sendKeys(browser.params.login.user);
await wlc.Password.sendKeys(browser.params.login.password);
await wlc.LoginButton.click(); 
});

When(':Learner selects wishlist icon on the course', async ()=> {
await browser.sleep(5000);
await wlc.Wishlistmenu.click();
await wlc.Wishlistmenu.click();
  //await wlc.Favorite.click();      
});

Then(':Course must be available in the course under wishlist tab', async ()=> {
//await wlc.AddtoWishList.click();
console.log("Courses Added into wishlist");     
});
         
Then(':Learner deselect the wishlist icon from the Wishlist section', async ()=> {
//await wlc.RemoveFromWishlist.click(); 
console.log("Removed from wishlist");
});

Then(':Deselected Courses must be removed from the wishlist section', function () {
  console.log("deselect course from wishlist");    
});