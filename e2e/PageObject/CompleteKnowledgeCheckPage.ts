import { ElementFinder,element,by } from "protractor";

export class CompleteKnowledgeCheckPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    Profile:ElementFinder
    MyCourse:ElementFinder;
    StartButton:ElementFinder;

    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        this.Profile=element(by.xpath("//mat-icon[text()='more_vert']"));
        this.MyCourse=element(by.xpath("//label[text()='My Course']"));
        this.StartButton=element(by.xpath("//mat-grid-tile[1]/figure/app-course-component/div/div[4]/div/button"));
    }
}