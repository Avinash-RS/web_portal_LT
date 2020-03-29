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

  constructor(public services: CommonServicesService, private alert: AlertServiceService,
    private router: Router, ) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
  }

  navigateProfile(){

this.router.navigate(['/Learner/profile'])

  }

  logout() {
    this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
      console.log(logout.data.logout)
      if (logout.data.logout && logout.data.logout.success) {
        localStorage.clear();
        this.userDetailes = null;
        this.router.navigate(['/Learner/login'])
      }
      else if (logout.data.logout && !logout.data.logout.success)
        this.alert.openAlert(logout.data.logout.message, null)
      else
      this.alert.openAlert('Please try again later',null)
    });
  }
}
