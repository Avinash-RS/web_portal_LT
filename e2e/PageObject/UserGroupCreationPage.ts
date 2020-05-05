import { element, by, ElementFinder } from "protractor";

export class UserGroupCreationPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    LearnerMgmt:ElementFinder;
    UserGroups:ElementFinder;
    GroupNameTxt:ElementFinder;
    SaveButton:ElementFinder;
    OkButton:ElementFinder;

    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.LearnerMgmt=element(by.xpath("//h3[contains(text(),'Learner Management')]"));
        this.UserGroups=element(by.xpath("//h3[contains(text(),'User Groups')]"));
        this.GroupNameTxt=element(by.id('mat-input-2'));
        this.SaveButton=element(by.xpath("//button[@type='submit']"));
        this.OkButton=element(by.xpath("//*[contains(text(),'Ok')]"));
    }
}


