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

  constructor(private gs: GlobalServiceService,public services: CommonServicesService, private alert: AlertServiceService, 
              private http: HttpClient,private router: Router ) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role');
    this.userimage = localStorage.getItem('user_img');
  }

  navigateProfile() {
    this.router.navigate(['Learner/profile']);
  }

  navigateWishlist() {
    this.router.navigate(['Learner/MyCourse']);
    this.gs.getNavigation('wishlist');
  }

  navigatetomycourse() {
    this.router.navigateByUrl('/Learner/MyCourse');
    this.gs.getNavigation('mycourse');
  }

  logout() {
    Swal.fire({
      title: 'Please confirm to logout',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      // cancelButtonText: 'No',
      confirmButtonText: 'Confirm'
      }).then((result) => {
      if (result.value) {

    this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
      if (logout.data.logout && logout.data.logout.success) {
        localStorage.clear();
        this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
          localStorage.setItem('Systemip', res.ip);
        });
        this.userDetailes = null;
        this.userDetailes = null;
        this.router.navigate(['/Learner']);
      } else if (logout.data.logout && !logout.data.logout.success) {
        if (logout.data.logout.error_msg === 'Authentication error. Token required.') {
          localStorage.clear();
          this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
            localStorage.setItem('Systemip', res.ip);
          });
          this.userDetailes = null;
          this.userDetailes = null;
          this.router.navigate(['/Learner']);
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
