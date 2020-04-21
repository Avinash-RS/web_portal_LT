import { ElementFinder,element,by } from "protractor";

export class LogoutPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    RememberMe:ElementFinder;
    LoginButton:ElementFinder;
    LogoutMenu:ElementFinder;
    Logout:ElementFinder;   

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.RememberMe=element(by.className('mat-checkbox-inner-container'));
        this.LoginButton=element(by.id('login'));
        this.LogoutMenu=element(by.xpath("//button/span/mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']"));
        this.Logout=element(by.xpath("//button[6][@class='backgroundcol mat-menu-item']"));
    }
}