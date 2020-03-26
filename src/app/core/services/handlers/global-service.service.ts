import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private $callWishlist = new BehaviorSubject(false);
  callWishlist = this.$callWishlist.asObservable();


  constructor(public route : Router, public alert : AlertServiceService) { }

  checkLogout() {
    if(this.route.url != '/' && this.route.url != '/Learner/login' && this.route.url != '/Learner') {
      var userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
      if (userDetail)
        return userDetail
      else {
        this.alert.openAlert("Logged Out!","You have been logged out. Please login to continue");
        this.route.navigate(['/Learner/login'])
      }
    }
    
  }

  canCallWishlist(callWishlist: boolean) {
    this.$callWishlist.next(callWishlist)
  }

}
