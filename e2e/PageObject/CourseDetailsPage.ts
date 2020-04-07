import { ElementFinder, element, by } from "protractor";

export class CourseDetailsPage
{
    CourseDetails:ElementFinder;
    
    constructor()
    {
        this.CourseDetails=element(by.css("div[class='overlay']"));
    }
}