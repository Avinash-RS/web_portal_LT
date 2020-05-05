import { ElementFinder, element, by } from "protractor";

export class ViewCourseCreatedByMePage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    ViewAll: ElementFinder;
    Course: ElementFinder;
    Preview: ElementFinder;
    Close: ElementFinder; 
    EditCourse: ElementFinder;
    
    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.ViewAll=element(by.xpath("//*[@id='cdk-accordion-child-1']/div/mat-panel-title/span[3]"));
        this.Course=element(by.xpath("//app-course-component/div/div[6]/div[2]/div/p"));
        this.Preview=element(by.buttonText("Preview course"));
        this.Close=element(by.buttonText("//mat-icon[contains(@class,'close')]"));    
        this.EditCourse=element(by.buttonText("Edit course"));    
    }
}