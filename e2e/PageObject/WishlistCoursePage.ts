import {ElementFinder, element,by} from "protractor";
import { isContext } from "vm";

export class WishlistCoursePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    Wishlistmenu:ElementFinder;
    Wishlist:ElementFinder;
    Favorite:ElementFinder;
    AddtoWishList:ElementFinder;
    RemoveFromWishlist:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        this.Wishlistmenu=element(by.xpath("//button/span/mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']"));
        this.Wishlist=element(by.xpath("//button[4][@class='backgroundcol mat-menu-item']"));
        this.Favorite=element(by.css("mat-icon[class*='mat-icon notranslate']"));
        this.AddtoWishList=element(by.css("mat-panel-title[class*='f_wt_500 f_size_18 color_blue mat-expansion-panel-header-title']"));
        this.RemoveFromWishlist=element(by.css("mat-icon[class*='mat-icon notranslate material-icons mat-icon-no-color ng-star-inserted']"));
    }
}