import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AlertServiceService } from '../handlers/alert-service.service';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private alert: AlertServiceService,
    private router: Router,
  ) { }

  //Added by Mythreyi
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) ? JSON.parse(localStorage.getItem('UserDetails')) : JSON.parse(localStorage.getItem('adminDetails')) || null;
    var role = localStorage.getItem('role');

    if (userDetailes != null) {
      if (userDetailes.is_profile_updated && state.url == '/Learner/login' || state.url == '/Admin/login') {
        this.router.navigate(["/Learner"]);
        return false;
      }
      if (!userDetailes.is_profile_updated) {
        if (state.url != '/Learner/profile') {
          this.router.navigate(["/Learner/profile"]);
          this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')

          return false;
        } else
          return true
      }
      else
        return true;
    }
    else if (userDetailes == null) { //user detail is not present in local storage
      if (state.url == '/Learner' || state.url == '/Learner/login' || state.url == '/Admin/login'
        || state.url == '/Learner/register') {
        return true;
      } else {
        this.router.navigate(["/Learner"])
        return false;
      }
    }
    else
      return true;
  }
}
