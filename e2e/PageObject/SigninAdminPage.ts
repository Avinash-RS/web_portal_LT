import { ElementFinder,element,by } from "protractor";

export class SigninAdminPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;

    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
    }
}