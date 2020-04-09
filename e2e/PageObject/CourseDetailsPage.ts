import { ElementFinder, element, by } from "protractor";

export class CourseDetailsPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    mycourse:ElementFinder;
    CourseDetails:ElementFinder;
        
    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        this.mycourse=element(by.xpath("//button/span[@class='mat-button-wrapper']"));
        this.CourseDetails=element(by.xpath("//mat-expansion-panel-header/span/mat-panel-title[contains(text(),'Courses')]"));
    }
}