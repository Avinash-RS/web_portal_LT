import {ElementFinder, element,by} from "protractor";
import { isContext } from "vm";

export class WishlistCoursePage
{
    Favorite:ElementFinder;
    AddtoWishList:ElementFinder;
    RemoveFromWishlist:ElementFinder;

    constructor()
    {
        this.Favorite=element(by.css("mat-icon[class*='mat-icon notranslate']"));
        this.AddtoWishList=element(by.css("mat-panel-title[class*='f_wt_500 f_size_18 color_blue mat-expansion-panel-header-title']"));
        this.RemoveFromWishlist=element(by.css("mat-icon[class*='mat-icon notranslate material-icons mat-icon-no-color ng-star-inserted']"));
    }
}