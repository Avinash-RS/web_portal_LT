import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { OverlayContainer } from '@angular/cdk/overlay';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

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
  @HostBinding('class') componentCssClass;
  constructor(public services: CommonServicesService, private alert: AlertServiceService,
              private http: HttpClient, public overlayContainer: OverlayContainer,
              public router: Router, private gs: GlobalServiceService) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.activeUrl = this.router.url;
    this.orgDetails = JSON.parse(localStorage.getItem('organizationDetails')) || null;
    this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
    // this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userDetailes = this.gs.checkLogout();
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role');
    this.userimage = localStorage.getItem('user_img') || sessionStorage.getItem('user_img');
    this.fullName = localStorage.getItem('Fullname');
    this.getShortName(this.fullName);
  }
  getShortName(fullName) {
    const Name = fullName?.split(' ').map(function(str) {
      return str ? str[0].toUpperCase() : '';
    }).join('');
    if (Name?.length === 1) {
      this.initials = Name.charAt(0);
    } else {
      this.initials = Name.charAt(0) + Name.charAt(Name.length - 1);
    }
  }
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.show = false;
    }
  }

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
      confirmButtonColor: '#FFCC00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
          if (logout.data.logout && logout.data.logout.success) {
            localStorage.clear();
            sessionStorage.clear();
            this.services.getIpAddressByUrl();
            this.userDetailes = null;
            this.userDetailes = null;
            // june 10 added by ankit
            this.router.navigate(['/Learner/login']);
          } else if (logout.data.logout && !logout.data.logout.success) {
            if (logout.data.logout.error_msg === 'Authentication error. Token required.') {
              localStorage.clear();
              sessionStorage.clear();
              this.services.getIpAddressByUrl();
              this.userDetailes = null;
              this.userDetailes = null;
              // june 10 added by ankit
              this.router.navigate(['/Learner/login']);
            } else {
              this.alert.openAlert(logout.data.logout.message, null);
            }
          } else {
            console.log(logout);
            logout.errors.forEach(element => {
              if (element.message.includes('TokenExpiredError') || element.message.includes('JsonWebTokenError')) {
                localStorage.clear();
                sessionStorage.clear();
                this.services.getIpAddressByUrl();
                this.gs.checkLogout();
              }
            });
            // this.alert.openAlert('Please try again later', null);
          }
        });
      }
    });

  }
  navigateMyCourse() {
    this.router.navigate(['/Learner/MyCourse']);
  }
}
