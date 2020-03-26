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
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (userDetailes != null) {
      if (state.url == '/Learner/login' || state.url == '/Admin/login') {
        this.router.navigate(["/Learner"]);
        return false;
      }
      else
        return true;
    }
    else if (userDetailes == null) {
      if (state.url == '/Learner/MyCourse') {
        this.router.navigate(["/Learner"])
        return false;
      } else
        return true;
    }
    else
      return true;
  }
}
