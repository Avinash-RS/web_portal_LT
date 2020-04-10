import { ElementFinder,element,by } from "protractor";

export class ViewProfilePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    ProfileImage:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        this.ProfileImage=element(by.xpath("img[@class='profileimg']"));
    }
}