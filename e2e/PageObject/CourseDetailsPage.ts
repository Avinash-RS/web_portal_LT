import { ElementFinder, element, by } from "protractor";

export class CourseDetailsPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    mycoursemenu:ElementFinder;
    mycourse:ElementFinder;
    CourseDetails:ElementFinder;
        
    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        //this.mycourse=element(by.xpath("//button/span[@class='mat-button-wrapper']"));
        this.mycoursemenu=element(by.xpath("//button/span/mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']"));
        this.mycourse=element(by.xpath("//button[2][@class='backgroundcol mat-menu-item']"));
        this.CourseDetails=element(by.xpath("//mat-expansion-panel-header/span/mat-panel-title[contains(text(),'Courses')]"));
    }
}