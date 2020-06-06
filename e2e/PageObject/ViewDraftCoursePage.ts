
import {ElementFinder, element,by} from "protractor";

export class ViewDraftCoursePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    ViewAll:ElementFinder;
    DraftCourse:ElementFinder;
    EditModules:ElementFinder;
    

    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.ViewAll=element(by.xpath("//div/mat-panel-title/span[3][text()='View all']"));
        this.DraftCourse=element(by.xpath("//div/div[2]/div/mat-card/mat-grid-list/div/mat-grid-tile[1]"));
        //this.EditModules=element(by.xpath("//button[@class='outlinebtn']"));

    }
}