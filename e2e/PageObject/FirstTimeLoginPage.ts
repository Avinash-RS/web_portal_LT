import { ElementFinder,element,by } from "protractor";

export class FirstTimeLoginPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    
    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
    }
}