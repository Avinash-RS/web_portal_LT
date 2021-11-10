import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service';
import { Title } from '@angular/platform-browser';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { CommonServicesService } from '@core/services/common-services.service';
import { Subject, Subscription, timer } from 'rxjs';
import { slideInAnimation } from './router.animation';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { environment } from '@env/environment';
import { GoogleAnalyticsService } from '@learner/services/google-analytics.service';
import { has } from 'underscore';
import * as CryptoJS from 'crypto-js';
import { Gtag } from 'angular-gtag';
declare var window;
declare var dataLayer
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  ipAddress = '';
  title = 'LXP';
  isLoader = false;
  loaderSubscription: Subscription;
  isMobile = false;
  platformTxt = navigator.platform;
  isProgressBar = false;
  isFooterVisible: string = '';
  percentage = "Upload in progress"
  loadersubscription: Subscription;  
  hideLeftMenu: boolean = false;
  chatbotShow: boolean = false;
  UserDetails: any;
  secretKey = "(!@#Passcode!@#)";
  botUrl;
  urlSafe: SafeResourceUrl;
   // FOR DRM(Restriction for right click)
   @HostListener('document:keydown', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
     if ( (event.which === 67 && event.ctrlKey && event.shiftKey) || (event.which === 123) ||
      (event.which === 73 && event.ctrlKey && event.shiftKey) ) {
       event.returnValue = false;
       event.preventDefault();
     }
 }
 private destroy$ = new Subject<void>();
  constructor(private router: Router,
              private gs: GlobalServiceService,
              private ga_service: GoogleAnalyticsService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private commonService: CommonServicesService,
              public Lservice: LearnerServicesService,
              private gtag: Gtag,
              public sanitizer: DomSanitizer,

  ) {
    // console.error = function(){}
    // console.warn = function(){}
    this.commonService.getIpAddressByUrl();
    // this.getorganizationbyiddetails();

    //GOOGLE ANALYTICS INIT
  //    if (environment.gaTrackingId) {
    // register google tag manager
    const gTagManagerScript = document.createElement('script');
    gTagManagerScript.async = true;
    gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
    document.head.appendChild(gTagManagerScript);
    let user_id = null
    if(this.UserDetails){
       user_id = CryptoJS.AES.decrypt(this.UserDetails.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8); 
    }
  //   // register google analytics
    const gaScript = document.createElement('script');
    gaScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('set', 'user_properties', { 'userID' : '${user_id}' });
      gtag('config', '${environment.gaTrackingId}',{ 'send_page_view': false });
      `;
    document.head.appendChild(gaScript);
  // }
  }

  ngOnInit() {
//GOOGLE ANALYTICS
// this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null
// timer(500)
//      .pipe(
//        filter(() => has.call(window, 'ga')),
//        take(1),
//        switchMap(() => {
//          return this.router.events.pipe(
//            filter((e) => e instanceof NavigationEnd),
//            tap((e: NavigationEnd) => {
//             var user_id = null
//              if(this.UserDetails.user_id){
//               user_id = CryptoJS.AES.decrypt(this.UserDetails.user_id, this.secretKey.trim()).toString(); 
//               dataLayer = [{'userID': user_id}];
//               console.log(window['dataLayer'])
//             }
//             gtag('config', '${environment.gaTrackingId}');
//              this.ga_service.logPageView(e.url,user_id);
            
//            })
//          );
//        }),
//        takeUntil(this.destroy$)
//      )
//      .subscribe();



   // console.error = function(){}
   // console.log = function(){}
  //  console.warn = function(){}
    console.log("App component")
    this.loadersubscription = this.Lservice.getMessage().subscribe(message => 
      { 
        if(message.count){
          this.percentage = message.count + '  ' + message.text.slice(0,message.text.lastIndexOf('.')) + '%'; 
        } else {
          this.percentage = message.text.slice(0,message.text.lastIndexOf('.')) + '%'; 
        }
        if(this.percentage == '0%'){
          this.percentage = 'Upload in progress'
        }
      });
   
    // this.loaderSubscription = this.commonService.loader.subscribe((val) => {
    //   this.isLoader = val;
    //   if (this.isLoader) {
    //     this.ngxService.start();
    //   } else {
    //     setTimeout(() => {
    //     this.ngxService.stop();
    //     }, 500);
    //   }
    // });
    // console.log("--Browser running on--",navigator.platform)
    // if(!this.runnablePlatforms.includes(navigator.platform)){
    //   this.isMobile = true;
    // }
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((e: any) => {

    //adding USERID to datalayer
    //   var user_id = null
    //   if(this.UserDetails.user_id){
    //    user_id = CryptoJS.AES.decrypt(this.UserDetails.user_id, this.secretKey.trim()).toString(); 
    //    window.dataLayer = [{'userID': user_id}];
    //    console.log(window['dataLayer'])
    //  }else{
    //    window.dataLayer = [{'userID': null}];
    //  }   
    //  send pageview 
        const titledat = this.getChild(this.activatedRoute);
      titledat.data.subscribe(data => {
        let user_id = null
        if(this.UserDetails){
           user_id = CryptoJS.AES.decrypt(this.UserDetails.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8); 
          if(dataLayer)
          {
            dataLayer[0]={'userID': user_id};
            
        }else{
          dataLayer[0]={'userID': user_id};
        }
        }
        console.log("USERID"+this.UserDetails.user_id)
        console.log("USERID"+user_id)
        this.gtag.pageview({
          page_title: data?.title? data.title : "L&T Edutech",
          page_path: this.router.url,
          page_location: window.location.href,
          userID:user_id
        });
        this.gtag.set({ 'userID' : user_id });
      })
        
       
        // this.ga_service.logPageView(e.url,user_id);
        // this.ga_service.logPageView(e.url);
      const urlIdentifier = e.url.split("/")
      const possiblePages = ['register', 'login', 'recover', 'resetpassword','password','authentication','']
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.isFooterVisible = '';
        this.titleService.setTitle(data?.title);
        if (!possiblePages.includes(urlIdentifier[2])) {
         /// this.isFooterVisible = false;
         const currentYear = new Date().getFullYear()
         this.isFooterVisible = '<div class="footer"><span class="powered"><span class="forgot1">' + '© ' + currentYear + ' L&T EduTech. All Rights Reserved.</span></span></div>';
        }
        if (e.url.includes("resetpassword")|| e.url.includes("password") || e.url.includes("MyCourse") || e.url.includes("courseDetail") || urlIdentifier[2]==undefined) {
          this.isFooterVisible = '';
        }
        if (e.url.includes("MyCourse")) {
          this.isFooterVisible = ' ';
        }
        if (e.url.includes("courseDetail")) {
          this.isFooterVisible = ' ';
        }

        //for left padding
        const headerPages = ['courseDetail']
        if (headerPages.includes(urlIdentifier[2])) {
          this.hideLeftMenu = true;
        }
        else {
          this.hideLeftMenu = false;
        }
      });
    });
  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
  event.preventDefault();
}
  // ** Browser close handler.. Dont delete **
  /*
 @HostListener('window:beforeunload', ['$event'])
     public beforeunloadHandler($event) {
       this.myUnload()
      // open('refresh-close-detector.html', '', 'width=100,height=100');
      // $event.returnValue = false;
}

myUnload() {
          // flag the page as being unloading
          window.localStorage.setItem('myUnloadEventFlag', new Date().getTime().toString());
      // notify the server that we want to disconnect the user in a few seconds (I used 5 seconds)
      this.askServerToDisconnectUserInAFewSeconds(); // synchronous AJAX call
  }

  myLoad() {
    if (window.localStorage.getItem('myUnloadEventFlag')) {
        let t0 = Number(window.localStorage.getItem('myUnloadEventFlag'));
        if (isNaN(t0)) t0=0;
        let t1=new Date().getTime();
        let duration=t1-t0;
        if (duration<40*1000) {
            // less than 40 seconds since the previous Unload event => it's a browser reload (so cancel the disconnection request)
            this.askServerToCancelDisconnectionRequest(); // asynchronous AJAX call
        } else {
          localStorage.removeItem('myUnloadEventFlag');
          localStorage.setItem('closed', 'true');
            // last unload event was for a tab/window close => do whatever you want (I do nothing here)
        }
    }
} 
  askServerToDisconnectUserInAFewSeconds() {
    localStorage.setItem('disReq', 'true');
  }
  askServerToCancelDisconnectionRequest() {
    localStorage.setItem('disCancelRefresh', 'true');
  }
  */
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.loadersubscription.unsubscribe();
    this.destroy$.next();
  }

  openChatbot() {
      this.UserDetails = JSON.parse( window.localStorage.getItem('UserDetails'));
      this.botUrl = "https://devfaqbot.lntiggnite.com/?userName=" + this.UserDetails.full_name + "&userID=" + this.UserDetails.user_id + "&token=" + this.UserDetails.token;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.botUrl)
      this.chatbotShow = true;
  }

}
