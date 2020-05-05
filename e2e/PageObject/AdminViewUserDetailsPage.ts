import { ElementFinder,element,by } from "protractor";

export class AdminViewUserDetailsPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    Search:ElementFinder;
    ViewIcon:ElementFinder;
    
    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.Search=element(by.xpath("//input[@id='mat-input-1']"));
        this.ViewIcon=element(by.xpath("//mat-row[1]/mat-cell/button[1]"));
    }
}