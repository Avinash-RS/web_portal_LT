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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetailes: any;
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
  expandTxt:boolean = false;

  @HostBinding('class') componentCssClass;
  innerWidth: number;
  profilepic: any;
  blobKey = environment.blobKey;
  constructor(public services: CommonServicesService, private alert: AlertServiceService,
              private http: HttpClient, public overlayContainer: OverlayContainer, public socketService: SocketioService,
              public router: Router, private gs: GlobalServiceService) {
    // this.getScreenSize();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      ).subscribe((e: any) => {
        const urlHeader= e.url.split("/")
      const headerPages = ['courseDetail']
      // debugger
      if (headerPages.includes(urlHeader[2])) {
        this.hideHeaderMenu = true;
      }
    })
  }
  @HostListener('window:resize', ['$event'])
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 767) {
      this.expandTxt = true;
    }
    else {
      this.expandTxt = false;
    }
    this.services.closeAvailPopup$.subscribe((data: any) => {
      this.isAvailOpen = data;
    });
    this.activeUrl = this.router.url;
    this.orgDetails = JSON.parse(localStorage.getItem('organizationDetails')) || null;
    this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    // this.userDetailes = this.gs.checkLogout();
    this.profilepic = this.userDetailes.profile_img;
    console.log(this.profilepic, 'asdfasdf');
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role');
    this.userimage = localStorage.getItem('user_img') || sessionStorage.getItem('user_img');
    this.fullName = localStorage.getItem('Fullname');
    this.getShortName(this.fullName);
    setTimeout(() => {
      this.userDetailes = this.gs.checkLogout();
    }, 3000);
  }
  

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 767) {
      this.expandTxt = true;
    }
    else {
      this.expandTxt = false;
    }
  }
  
  getShortName(fullName) {
    // tslint:disable-next-line:only-arrow-functions
    const Name = fullName?.split(' ').map(function(str) {
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
    console.log('inside logout');
    Swal.fire({
      title: 'Are you sure you want to logout?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#333333',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      // console.log('inside logout result', result, 'login -', this.loginDetails, 'user - ', this.userDetailes);
      if (result.value) {
        // this.loading = true;

        //SOCKET DISCONNECTION START
        //console.log(this.socketService.socket.connected,"connected")
        if (this.socketService?.socket?.connected) {
          this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
          });
          this.socketService.closeSocket();
        }
        //SOCKET DISCONNECTION COMPLETE
        
        this.services.getIpAddressByUrl();
        this.userDetailes = null;
        this.services.logout(this.loginDetails._id, false).subscribe((logout: any) => {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/Learner/login']);
          // if (logout.data.logout && logout.data.logout.success) {
          //   this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
          //   });

          //   this.router.navigate(['/Learner/login']);
          //   localStorage.clear();
          //   sessionStorage.clear();
          //   this.services.getIpAddressByUrl();
          //   this.userDetailes = null;
          //   this.loading = false;
          //   // june 10 added by ankit
          // } else if (logout.data.logout && !logout.data.logout.success) {
          //   if (logout.data.logout.error_msg === 'Authentication error. Token required.') {
          //     this.router.navigate(['/Learner/login']);
          //     localStorage.clear();
          //     sessionStorage.clear();
          //     this.services.getIpAddressByUrl();
          //     this.userDetailes = null;
          //     this.loading = false;
          //     // june 10 added by ankit
          //   } else {
          //     this.alert.openAlert(logout.data.logout.message, null);
          //   }
          // } else {
          //   logout.errors.forEach(element => {
          //     if (element.message.includes('TokenExpiredError') || element.message.includes('JsonWebTokenError')) {
          //       localStorage.clear();
          //       sessionStorage.clear();
          //       this.services.getIpAddressByUrl();
          //       // this.gs.checkLogout();
          //       this.loading = false;
          //     }
          //   });
          //   this.alert.openAlert('Please try again later', null);
          // }
        });
      }
    });

  }
  navigateMyCourse() {
    this.router.navigate(['/Learner/MyCourse']);
  }

  openAvailableCources(isAvailOpen) {
    this.services.openAvailCourcePopup$.next(isAvailOpen);
  }
}
