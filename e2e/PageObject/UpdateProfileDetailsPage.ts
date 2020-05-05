import { ElementFinder,element,by} from "protractor";
export class UpdateProfileDetailsPage
{
    Username:ElementFinder;
    Password:ElementFinder;
    LoginButton:ElementFinder;
    ProfileImage:ElementFinder;
    editicon:ElementFinder;
    AboutYou:ElementFinder;
    //Gender:ElementFinder;
    subButton:ElementFinder;
    
    constructor()
    {
        this.Username=element(by.name('username'));
        this.Password=element(by.name('password'));
        this.LoginButton=element(by.id('login'));
        this.ProfileImage=element(by.xpath("//img[@class='profileimg']"));
        this.editicon=element(by.xpath("//div[@class='row myprofile']/mat-icon[@class='createicon mat-icon notranslate material-icons mat-icon-no-color']"));
        this.AboutYou=element(by.xpath("//textarea[@name='info']"));
        //this.Gender=element(by.className("mat-radio-button mat-accent mat-radio-checked"));
        this.subButton=element(by.xpath("//button[@class='subbtn']"));
    }
}
