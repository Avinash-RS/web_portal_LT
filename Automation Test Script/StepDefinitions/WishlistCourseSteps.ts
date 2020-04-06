import {Given,When,Then} from "cucumber";
import {browser} from "protractor";
import {WishlistCoursePage} from "../PageObject/WishlistCoursePage"
import {LoginPage} from "../PageObject/LoginPage";
import {ViewCourseLearnerPage} from "../PageObject/ViewCourseLearnerPage";

let lgn=new LoginPage();
let vcl=new ViewCourseLearnerPage();
let wlc=new WishlistCoursePage();

Given(':Learner is in my course page', async () => {
await browser.get('http://40.76.47.212/Learner/login');
await browser.manage().window().maximize();
await lgn.Username.sendKeys("mytheryi");
await lgn.Password.sendKeys("123Aa!@#");
await lgn.LoginButton.click(); 
await vcl.mycourse.click();           
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