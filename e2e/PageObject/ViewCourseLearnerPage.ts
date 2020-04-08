import {ElementFinder,element,by} from "protractor";

export class ViewCourseLearnerPage
{
    mycourse:ElementFinder;

    constructor()
    {
        this.mycourse=element(by.className('my_course_btn mat-raised-button'));
    }
}