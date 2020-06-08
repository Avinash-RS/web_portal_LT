import { ElementFinder,element,by } from "protractor";

export class VidAudPlayBackPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    RememberMe:ElementFinder;
    LoginButton:ElementFinder;
    PlayPauseButton:ElementFinder;
    PlayBackbar:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.RememberMe=element(by.className('mat-checkbox-inner-container'));
        this.LoginButton=element(by.id('login'));
        this.PlayPauseButton=element(by.xpath("//vg-play-pause"));
        this.PlayBackbar=element(by.xpath("//div[@class='scrubBar']"));
    }
        
}