import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service';
import { WcaService } from '../app/wca/services/wca.service';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { CommonServicesService } from '@core/services/common-services.service';
import { Subscription } from 'rxjs';
import { slideInAnimation } from './router.animation';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';


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
  spinnerType = SPINNER.circle;
  isFooterVisible: string = '';

   // FOR DRM(Restriction for right click)
   @HostListener('document:keydown', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
     if ( (event.which === 67 && event.ctrlKey && event.shiftKey) || (event.which === 123) ||
      (event.which === 73 && event.ctrlKey && event.shiftKey) ) {
       event.returnValue = false;
       event.preventDefault();
     }
 }

  constructor(private router: Router,
              private gs: GlobalServiceService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private APIService: WcaService,
              private titleService: Title,
              private commonService: CommonServicesService,
              public Lservice: LearnerServicesService,
              private ngxService: NgxUiLoaderService

  ) {
    // console.error = function(){}
    // console.log = function(){}
    // console.warn = function(){}
    this.getIPAddress();
    // this.getIPAddress();
    this.commonService.getIpAddressByUrl();
    // this.getorganizationbyiddetails();
  }

  ngOnInit() {
    // console.error = function(){}
    // console.log = function(){}
    // console.warn = function(){}    
    this.loaderSubscription = this.commonService.loader.subscribe((val) => {
      this.isLoader = val;
      if (this.isLoader) {
        this.ngxService.start();
      } else {
        setTimeout(() => {
        this.ngxService.stop();
        }, 500);
      }
    });
    // console.log("--Browser running on--",navigator.platform)
    // if(!this.runnablePlatforms.includes(navigator.platform)){
    //   this.isMobile = true;
    // }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((e: any) => {
      const urlIdentifier = e.url.split("/")
      const possiblePages = ['register', 'login', 'recover', 'resetpassword']

      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.isFooterVisible = '';
        this.titleService.setTitle(data.title);
        //  console.log(urlIdentifier[2], "GOKUL");
        //  console.log(possiblePages.includes(urlIdentifier[2]), e.url)
        if (!possiblePages.includes(urlIdentifier[2])) {
         /// this.isFooterVisible = false;
         this.isFooterVisible = '<div class="footer"><span class="powered"><span class="forgot1">2020 © L&T EduTech All Rights Reserved</span></span></div>'
        }
        if(e.url.includes("resetpassword")){
          this.isFooterVisible = '';
        }
      });
    });

    this.getIPAddress();

    // window.addEventListener("beforeunload", function (e) {
    //   var confirmationMessage = "\o/";
    //   (e || window.event).returnValue = "Do you really want to close?"; //Gecko + IE
    //   return "Do you really want to close?";                            //Webkit, Safari, Chrome
    // });
    // this.myLoad();
  }
  // ** Browser close handler.. Dont delete **
  
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
  
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  getIPAddress() {
    // this.http.get(this.commonService.getIpAddressByUrl()).subscribe((res: any) => {
    //   this.ipAddress = res.ip;
    //   localStorage.setItem('Systemip', this.ipAddress ? this.ipAddress : '' );
    // });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }

//   getorganizationbyiddetails() {
//     const organizationid = environment.orgId;
//     if (organizationid === '') {
//       // localStorage.clear();
//       localStorage.removeItem('organizationDetails');
//     }

//     this.Lservice
//     .get_organization_by_id(organizationid)
//     .subscribe((result: any) => {
//       console.log(result, 'resultdata');
//       if (result.data?.get_organization_by_id?.success) {
//         localStorage.setItem('organizationDetails', JSON.stringify(result.data?.get_organization_by_id?.message));
//       }
//     });
// }
}
