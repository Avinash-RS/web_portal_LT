import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { SocketioService } from '@learner/services/socketio.service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  userimage: any;
  role: string;
  fullName: string;
  initials: any;
  activeUrl: string;
  orgDetails: any;
  loginDetails: any;
  screenHeight: number;
  screenWidth: number;
  show = true;
  isAvailOpen = false;
  loading = false;
  hideHeaderMenu: boolean = false;
  expandTxt: boolean = false;
  calendarActive;
  @HostBinding('class') componentCssClass;
  innerWidth: number;
  profilepic: any;
  blobKey = environment.blobKey;
  portalUser: any;
  contentHide = false;
  constructor(public services: CommonServicesService, private alert: AlertServiceService,
              private http: HttpClient, public overlayContainer: OverlayContainer, public socketService: SocketioService,
              public router: Router, private gs: GlobalServiceService, public translate: TranslateService) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    // this.getScreenSize();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((e: any) => {
      const urlHeader = e.url.split('/');
      const headerPages = ['courseDetail'];
      // debugger
      if (headerPages.includes(urlHeader[2])) {
        this.hideHeaderMenu = true;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  ngOnInit() {
    var verifyportal = JSON.parse(localStorage.getItem('UserDetails'));
    this.portalUser = verifyportal.userOrigin;
    if (this.portalUser == 'microLearn' || this.portalUser == 'learner') {
      this.contentHide = true;
    } else {
      this.contentHide = false;
    }
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 767) {
      this.expandTxt = true;
    } else {
      this.expandTxt = false;
    }
    this.services.closeAvailPopup$.subscribe((data: any) => {
      this.isAvailOpen = data;
    });
    this.activeUrl = this.router.url;
    if (this.activeUrl === '/Learner/upskillcalendar' || this.activeUrl === '/Learner/calendaractivity') {
      this.calendarActive = true;
    } else {
      this.calendarActive = false;
    }
    this.orgDetails = JSON.parse(localStorage.getItem('organizationDetails')) || null;
    this.userDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    // this.profilepic = this.userDetails.profile_img;
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role');
    this.userimage = localStorage.getItem('user_img') || sessionStorage.getItem('user_img');
    this.fullName = localStorage.getItem('Fullname');
    this.getShortName(this.fullName);
    setTimeout(() => {
      this.userDetails = this.gs.checkLogout();
      this.profilepic = this.userDetails.profile_img;
    }, 1000);
    if (this.profilepic === '' || this.profilepic == null) {
      this.profilepic = this.userimage;
    }
    this.updateProfilePic();
  }
  updateProfilePic() {
    this.services.updateProfilePic.subscribe((data: any) => {
      this.profilepic = localStorage.getItem('user_img') || sessionStorage.getItem('user_img');
    });
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 767) {
      this.expandTxt = true;
    } else {
      this.expandTxt = false;
    }
  }
  getShortName(fullName) {
    const Name = fullName?.split(' ').map((str: any) => {
      return str ? str[0].toUpperCase() : '';
    }).join('');
    if (Name?.length === 1) {
      this.initials = Name.charAt(0);
    } else {
      this.initials = Name.charAt(0) + Name.charAt(Name.length - 1);
    }
  }
  // getScreenSize(event?) {
  //   this.screenHeight = window.innerHeight;
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth < 800) {
  //     this.show = false;
  //   }
  // }

  navigateProfile() {
    this.router.navigate(['Learner/profile']);
  }

  navigateWishlist() {
    this.router.navigate(['Learner/Thankyou']);
  }
  onSetTheme(selectedValue) {
    this.overlayContainer.getContainerElement().classList.add(selectedValue);
    this.componentCssClass = selectedValue;
    // localStorage.setItem('theme', selectedValue);
    this.gs.getThemeName(selectedValue);
  }
  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#333333',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      // console.log('inside logout result', result, 'login -', this.loginDetails, 'user - ', this.userDetails);
      if (result.value) {
        // this.loading = true;

        // SOCKET DISCONNECTION START

        if (this.socketService?.socket?.connected) {
          this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
          });
          this.socketService.closeSocket();
        }
        this.services.getIpAddressByUrl();
        this.services.logout(this.userDetails.user_id, false).subscribe((logout: any) => {
          this.userDetails = null;
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/Learner/login']);
        });
      }
    });

  }
  navigateMyCourse() {
    this.router.navigate(['/Landing/MyCourse']);
  }

  openCalendar() {
    if (this.userDetails.org_type === 'Corporate') {
      this.router.navigate(['/Learner/upskillcalendar']);
    } else {
      this.router.navigate(['/Learner/calendaractivity']);
    }
  }
  openAvailableCources(isAvailOpen) {
    this.services.openAvailCourcePopup$.next(isAvailOpen);
  }
  redirectToPortal() {
    if (this.userDetails.userOrigin == 'microLearn') {
      window.open(environment.aictePortalUrl, '_self');
    } else {
      window.open(environment.guportalUrl, '_self');
    }
    
  }
}
