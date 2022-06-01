import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service';
import { Title } from '@angular/platform-browser';
import { filter, switchMap, take, takeUntil, tap, timeout } from 'rxjs/operators';
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
declare var dataLayer;
declare var gtag;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=LARSEN & TOUBRO LIMITED,LicensedGroup=L&T EduTech,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=3,AssetReference=AG-017299,ExpiryDate=15_July_2022_[v2]_MTY1NzgzOTYwMDAwMA==d6a472ece2e8481f35e75c20066f8e49');
import { BnNgIdleService } from 'bn-ng-idle';
import { SocketioService } from '@learner/services/socketio.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
              private gs: GlobalServiceService,
              private ga_service: GoogleAnalyticsService,
              public translate: TranslateService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private commonService: CommonServicesService,
              public Lservice: LearnerServicesService,
              private gtag: Gtag,
              public sanitizer: DomSanitizer,
              private bnIdle: BnNgIdleService,
              public socketService: SocketioService,
              private toast:ToastrService
  ) {
    this.languages = [{lang: 'ta' , languagename: 'Tamil' } , { lang: 'en' , languagename: 'English'  }] ;
    translate.addLangs(['en', 'ta']);
    if (localStorage.getItem('language')) { this.translate.use(localStorage.getItem('language'));
  } else {
      this.translate.setDefaultLang('en');
    }

    const userDetail = JSON.parse(localStorage.getItem('UserDetails'));
    if (!userDetail?.specific_report_value) {
      localStorage.clear();
      sessionStorage.clear();
    }
    if (localStorage.getItem('language')) { this.translate.use(localStorage.getItem('language')); }
    // console.error = function(){}
    // console.warn = function(){}
    this.commonService.getIpAddressByUrl();
    // this.getorganizationbyiddetails();

    // GOOGLE ANALYTICS INIT
  //    if (environment.gaTrackingId) {
    // register google tag manager
    const gTagManagerScript = document.createElement('script');
    gTagManagerScript.async = true;
    gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
    document.head.appendChild(gTagManagerScript);
    let user_id = null;
    if (this.UserDetails) {
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
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  ipAddress = '';
  title = 'LXP';
  isLoader = false;
  loaderSubscription: Subscription;
  isMobile = false;
  platformTxt = navigator.platform;
  isProgressBar = false;
  isFooterVisible: string = '';
  percentage = 'Upload in progress';
  loadersubscription: Subscription;
  hideLeftMenu: boolean = false;
  chatbotShow: boolean = false;
  UserDetails: any;
  secretKey = '(!@#Passcode!@#)';
  botUrl;
  urlSafe: SafeResourceUrl;
  languages: { lang: string; languagename: string; }[];
 private destroy$ = new Subject<void>();
   // FOR DRM(Restriction for right click)
   @HostListener('document:keydown', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
     if ( (event.which === 67 && event.ctrlKey && event.shiftKey) || (event.which === 123) ||
      (event.which === 73 && event.ctrlKey && event.shiftKey) ) {
       event.returnValue = false;
       event.preventDefault();
     }
 }

  ngOnInit() {
    this.loadersubscription = this.Lservice.getMessage().subscribe(message => {
        if (message.count) {
          this.percentage = message.count + '  ' + message.text.slice(0, message.text.lastIndexOf('.')) + '%';
        } else {
          this.percentage = message.text.slice(0, message.text.lastIndexOf('.')) + '%';
        }
        if (this.percentage === '0%') {
          this.percentage = 'Upload in progress';
        }
      });
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((e: any) => {
      if (localStorage.getItem('language')) { this.translate.use(localStorage.getItem('language'));
    } else {
        this.translate.setDefaultLang('en');
      }
      const titledat = this.getChild(this.activatedRoute);
      titledat.data.subscribe(data => {
        let user_id = null;
        if (this.UserDetails) {
          user_id = CryptoJS.AES.decrypt(this.UserDetails.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
          if (dataLayer) {
            dataLayer[0] = { userID: user_id };

          } else {
            dataLayer[0] = { userID: user_id };
          }
        }
        this.gtag.pageview({
          page_title: data?.title ? data.title : 'L&T Edutech',
          page_path: this.router.url,
          page_location: window.location.href,
          userID: user_id
        });
        this.gtag.set({ userID : user_id });
        gtag('set', 'user_properties', { userID : user_id });
      });
        // this.ga_service.logPageView(e.url,user_id);
        // this.ga_service.logPageView(e.url);
      const urlIdentifier = e.url.split('/');
      const possiblePages = ['register', 'login', 'recover', 'resetpassword', 'password', 'authentication', ''];
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.isFooterVisible = '';
        this.titleService.setTitle(data?.title);
        if (!possiblePages.includes(urlIdentifier[2])) {
         /// this.isFooterVisible = false;
         const currentYear = new Date().getFullYear();
         this.isFooterVisible = '<div class="footer"><span class="powered"><span class="forgot1">'
         + '© ' + currentYear + this.translate.instant(' L&T EduTech. All Rights Reserved.') + '</span></span></div>';
        }
        if (e.url.includes('resetpassword') || e.url.includes('login') || e.url.includes('password') || e.url.includes('MyCourse')
        || e.url.includes('courseDetail') || urlIdentifier[2] === undefined) {
          this.isFooterVisible = '';
        }
        if (e.url.includes('MyCourse')) {
          this.isFooterVisible = ' ';
        }
        if (e.url.includes('courseDetail')) {
          this.isFooterVisible = ' ';
        }
        // for left padding
        const headerPages = ['courseDetail'];
        if (headerPages.includes(urlIdentifier[2])) {
          this.hideLeftMenu = true;
        } else {
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
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.loadersubscription.unsubscribe();
    this.destroy$.next();
  }

  openChatbot() {
      this.UserDetails = JSON.parse( window.localStorage.getItem('UserDetails'));
      this.botUrl = environment.botUrl + '?userName=' + this.UserDetails.full_name + '&userID='
      + this.UserDetails.user_id + '&token=' + this.UserDetails.token;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.botUrl);
      this.chatbotShow = true;
  }
  checkIdleState(){
    this.bnIdle.startWatching(2700).subscribe((timeout)=>{
      if(timeout) {
        var userDetail =JSON.parse(localStorage.getItem('UserDetails'))
        if(userDetail){
          this.logout(userDetail)
        }
      }
    })
  }
  logout(userDetail){
    if (this.socketService?.socket?.connected) {
      this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
      });
      this.socketService.closeSocket();
    }
      
      this.commonService.getIpAddressByUrl();
      this.commonService.logout(userDetail.user_id, false).subscribe((logout: any) => {
        this.UserDetails = null;
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/Learner/login']);
        this.toast.warning("Session Timed Out!!")
      });
    }
}
