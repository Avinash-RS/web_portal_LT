import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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

  constructor(public services: CommonServicesService, private alert: AlertServiceService, private http: HttpClient,
              public router: Router, private gs: GlobalServiceService) { }

  ngOnInit() {
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

  navigateProfile() {
    this.router.navigate(['Learner/profile']);
  }

  navigateWishlist() {
    this.router.navigate(['Learner/Thankyou']);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout ?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
          if (logout.data.logout && logout.data.logout.success) {
            localStorage.clear();
            sessionStorage.clear();
            this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
              localStorage.setItem('Systemip', res.ip);
            });
            this.userDetailes = null;
            this.userDetailes = null;
            // june 10 added by ankit
            this.router.navigate(['/Learner/login']);
          } else if (logout.data.logout && !logout.data.logout.success) {
            if (logout.data.logout.error_msg === 'Authentication error. Token required.') {
              localStorage.clear();
              sessionStorage.clear();
              this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
                localStorage.setItem('Systemip', res.ip);
              });
              this.userDetailes = null;
              this.userDetailes = null;
              // june 10 added by ankit
              this.router.navigate(['/Learner/login']);
            } else {
              this.alert.openAlert(logout.data.logout.message, null);
            }
          } else {
            this.alert.openAlert('Please try again later', null);
          }
        });
      }
    });

  }
}
