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
  isFooterVisible: boolean = true;

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
      let urlIdentifier = e.url.split("/")
      let possiblePages = ['register', 'login', 'recover']
      console.log(urlIdentifier[5],"GOKUL");
      if(possiblePages.includes(urlIdentifier[2])){
          this.isFooterVisible = false;
        }

      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.titleService.setTitle(data.title);
      });
    });

    this.getIPAddress();
    // var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
    // var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
    // var login = localStorage.getItem('login') ? localStorage.getItem('login') : null;
    // var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
    // var ps = atob(psd)
    // if (login == 'true') {
    //   if (cookie == 'true') {
    //     if ((name || psd) == null) {
    //       this.router.navigate(["/Learner/login"]);
    //     }
    //   } else {
    //     localStorage.clear();
    //   }
    // }
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
