import {ElementFinder, element,by} from "protractor";

export class ViewPublishCoursePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    ViewAll:ElementFinder;
    ParticularListCourse:ElementFinder;
    PreviewButton:ElementFinder;
    closePage:ElementFinder;


    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.ViewAll=element(by.xpath("//span[1][text()='View all']"));
        this.ParticularListCourse=element(by.xpath("//div/div[2]/div/mat-card/mat-grid-list/div/mat-grid-tile[1]"));
        this.PreviewButton=element(by.xpath("//button[@class='fillsmallbtn']"));
        this.closePage=element(by.xpath("//mat-icon[@class='close-icon mat-icon notranslate mat-warn material-icons']"));

    }
}