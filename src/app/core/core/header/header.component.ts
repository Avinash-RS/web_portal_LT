import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetailes: any;
  userimage: any;
  role: string;

  constructor(public services: CommonServicesService, private alert: AlertServiceService,
    private router: Router, ) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) ? JSON.parse(localStorage.getItem('UserDetails')) :
    this.role = localStorage.getItem('role');
    this.userimage = localStorage.getItem('user_img')
  }

  navigateProfile() {
    this.router.navigate(['Learner/profile']);
  }

  navigateWishlist() {
    this.router.navigate(['Learner/MyCourse']);
  }

  logout() {
    this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
      if (logout.data.logout && logout.data.logout.success) {
        localStorage.clear();
        this.userDetailes = null;
        this.router.navigate(['/Learner/login'])
      }
      else if (logout.data.logout && !logout.data.logout.success)
        this.alert.openAlert(logout.data.logout.message, null)
      else
        this.alert.openAlert('Please try again later', null)
    });
  }
}
