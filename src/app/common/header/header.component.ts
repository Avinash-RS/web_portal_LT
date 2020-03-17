import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../services/common-services.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public services: CommonServicesService) { }

  ngOnInit() {

  }
  logout() {
    var user = JSON.parse(localStorage.getItem('UserDetails'));
    // console.log(user,JSON.parse(user));
    this.services.logout(user._id, false).subscribe((logout: any) => {
      console.log(logout.data.logout.success)
      if (logout.data.logout.success)
        localStorage.clear();
      else
        alert(logout.data.logout.message)
    });
  }
}
