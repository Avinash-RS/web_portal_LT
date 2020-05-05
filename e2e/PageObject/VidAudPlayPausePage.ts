import { ElementFinder,element,by } from "protractor";

export class VidAudPlayPausePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    RememberMe:ElementFinder;
    LoginButton:ElementFinder;
    PlaypauseButton:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.RememberMe=element(by.className('mat-checkbox-inner-container'));
        this.LoginButton=element(by.id('login'));
        this.PlaypauseButton=element(by.xpath("//vg-play-pause"));
    }
        
}