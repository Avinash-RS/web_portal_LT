import { ElementFinder, element, by } from "protractor";

export class ViewAllCoursesPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    Menu:ElementFinder;
    ViewAllCourse:ElementFinder;
    
    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        //this.mycourse=element(by.xpath("//button/span[@class='mat-button-wrapper']"));
        this.Menu=element(by.xpath("//button/span/mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color']"));
        this.ViewAllCourse=element(by.xpath("//label[text()='View All Courses']"));
        
    }
}