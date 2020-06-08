import { ElementFinder,element,by } from "protractor";

export class DeactivateUserPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    Search:ElementFinder;
    DeactivateButton:ElementFinder;
    Yesbutton:ElementFinder;
    Checkbox:ElementFinder;
    ReactivateButton:ElementFinder;

    constructor()
    {
        this.Username=element(by.xpath("//input[@type='text']"));
        this.Password=element(by.xpath("//input[@type='password']"));
        this.LoginButton=element(by.id('login'));
        this.Search=element(by.xpath("//input[@id='mat-input-1']"));
        this.DeactivateButton=element(by.xpath("//mat-table/mat-row/mat-cell[7]/button[2]/span"));
        this.ReactivateButton=element(by.xpath("//mat-table/mat-row/mat-cell[7]/button[2]/span"));
        this.Yesbutton=element(by.xpath("//mat-dialog-actions/button[1]"));
        this.Checkbox=element(by.xpath("//mat-checkbox"));

    }
}