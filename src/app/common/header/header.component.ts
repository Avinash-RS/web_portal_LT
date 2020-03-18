import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../services/common-services.service'
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetailes: any;

  constructor(public services: CommonServicesService, private alert: AlertServiceService, ) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
  }

  logout() {
    this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
      console.log(logout.data.logout)
      if (logout.data.logout && logout.data.logout.success) {
        localStorage.clear();
        this.userDetailes = null;
      }
      else if (logout.data.logout && !logout.data.logout.success)
        this.alert.openAlert(logout.data.logout.message, null)
      else
        alert('Please try again later')
    });
  }
}
