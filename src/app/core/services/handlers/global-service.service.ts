import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';
import { LocationStrategy } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private $callWishlist = new BehaviorSubject(false);
  callWishlist = this.$callWishlist.asObservable();


  constructor(public route: Router, public alert: AlertServiceService, private locationStrategy: LocationStrategy,
  ) { }

  checkLogout() {
    if (this.route.url != '/' && this.route.url != '/Learner/login' && this.route.url != '/Learner') {
      var userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
      if (userDetail)
        return userDetail
      else {
        this.alert.openAlert("Logged Out!", "You have been logged out. Please login to continue");
        this.route.navigate(['/Learner/login'])
      }
    }
  }

  checkProfileFilled() {
    var userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (userDetail && !userDetail.is_profile_updated) {
      this.route.navigate(['/Learner/profile'])
      this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')
      return false;
    }
     
    else
      return true;
  }

  canCallWishlist(callWishlist: boolean) {
    this.$callWishlist.next(callWishlist)
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

}
