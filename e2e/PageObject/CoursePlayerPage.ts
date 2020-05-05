import { ElementFinder,element,by } from "protractor";

export class CoursePlayerPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    RememberMe:ElementFinder;
    LoginButton:ElementFinder;
    Mute:ElementFinder;
    Volume:ElementFinder;
    PlaypauseButton:ElementFinder;
    ForwardButton:ElementFinder;
    BackwardButton:ElementFinder;
    FullscreenButton:ElementFinder;
    SubtitleMenu:ElementFinder;    
    SubtitleText:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.RememberMe=element(by.className('mat-checkbox-inner-container'));
        this.LoginButton=element(by.id('login'));
        this.Mute=element(by.xpath("//vg-mute"));
        this.Volume=element(by.xpath("//vg-volume"));
        this.PlaypauseButton=element(by.xpath("//vg-play-pause"));
        this.BackwardButton=element(by.xpath("//i [@class='fa fa-backward']"));
        this.ForwardButton=element(by.xpath("//i [@class='fa fa-forward']"));
        this.FullscreenButton=element(by.xpath("//vg-fullscreen"));
        //this.SubtitleMenu=element(by.xpath("//select"));
        //this.SubtitleText=element(by.xpath("//select[@aria-valuetext='English']"));
    }
}