import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  //Added by Mythreyi
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) ? JSON.parse(localStorage.getItem('UserDetails')) : JSON.parse(localStorage.getItem('adminDetails')) || null;
    var role = localStorage.getItem('role');

    if (userDetailes != null) { // userdetail is present in local storage
      if (state.url == '/Learner/login' || state.url == '/Admin/login') {
        this.router.navigate(["/Learner"]);
        return false;
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
