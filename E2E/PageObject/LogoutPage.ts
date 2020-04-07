import { ElementFinder,element,by } from "protractor";

export class LogoutPage
{
    Logout:ElementFinder;
    

    constructor()
    {
        this.Logout=element(by.className('nav-link'));       
    }
}