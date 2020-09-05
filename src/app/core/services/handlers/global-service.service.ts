import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';
import { LocationStrategy } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private $theme = new BehaviorSubject('theme-3-primary');
  theme = this.$theme.asObservable();
  private $callWishlist = new BehaviorSubject(false);
  callWishlist = this.$callWishlist.asObservable();

  private $adminName = new BehaviorSubject('admin');
  adminName = this.$adminName.asObservable();

  private $navigation = new BehaviorSubject('myCourse');
  navigation = this.$navigation.asObservable();

  constructor(public route: Router, public alert: AlertServiceService, private locationStrategy: LocationStrategy,
  ) { }

  checkLogout() {
    if (this.route.url !== '/' && this.route.url !== '/Learner/login' && this.route.url !== '/Learner' &&
      this.route.url !== '/Admin/login') {
      // const adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
      // const role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
      const userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
      console.log(userDetail);
      if ((userDetail != null && userDetail !== undefined)) {
        return userDetail;
        // } else if ((adminDetails != null || adminDetails !== undefined) && role === 'admin') {
        //   return adminDetails;
      } else {
        this.alert.openAlert('Logged Out!', 'You have been logged out. Please login to continue');
        this.route.navigate(['/Learner/login']);
      }
    }
  }

  checkProfileFilled() {
    const userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (userDetail && !userDetail.is_profile_updated) {
      //Afser'schanges on Profile not Mandtory change no #3
      // this.route.navigate(['/Learner/profile']);
      // this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details');
      return true;
    } else {
      return true;
    }
  }

  canCallWishlist(callWishlist: boolean) {
    this.$callWishlist.next(callWishlist);
  }

  getAdminName(name: any) {
    this.$adminName.next(name);
  }

  getNavigation(navigation: any) {
    this.$navigation.next(navigation);
  }

  getThemeName(theme: string) {
    this.$theme.next(theme);
  }


  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
}
