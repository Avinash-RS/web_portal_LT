import { ElementFinder,element,by } from "protractor";

export class ViewProfilePage
{
    ProfileImage:ElementFinder;

    constructor()
    {
        this.ProfileImage=element(by.css("img[class='profileimg']"));
    }
}