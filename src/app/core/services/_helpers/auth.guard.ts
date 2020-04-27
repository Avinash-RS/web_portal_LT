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
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    var adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
    var role = localStorage.getItem('role') || null;
    //  console.log('role-----',role)
    //for learner ------> 1
    // debugger
    if (userDetailes != null && role == 'learner' && state.url != '/Admin/auth/userManagement' &&
      state.url != '/Admin/auth/addUser') {
      // userdetail is present // authenticated user
      // url should not start from admin - can be /Larner or anything
      // if profile updated and trying to go login/reg 
      if ((state.url == '/Learner/login' || state.url == '/Admin/login' || state.url == '/Learner/register')) {
        this.router.navigate(["/Learner"]);
        return false;
      }
      else if (!userDetailes.is_profile_updated) {
        //if profile not updated and trying to access other screens, redirect to profile
        if (state.url != '/Learner/profile') {
          this.router.navigate(["/Learner/profile"]);
          this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')
          return false;
        }
        else//if url is profile or anything
          return true
      }
      else
        return true
      //end of url navigations for logged in learner ------> 1
    }
    //if none of the role users logged in
    else if ((userDetailes == null || adminDetails == null) && role == null) { //user detail is not present in local storage
      if (state.url == '/Learner' || state.url == '/Learner/login' || state.url == '/Admin/login'
        || state.url == '/Learner/register') {
        return true;
      } else {
        this.router.navigate(["/Learner"])
        return false;
      }
    }
    //if admin logged in
    if (role == 'admin' && adminDetails && (state.url != 'Learner' && state.url != 'Wca')) {
      if (state.url == '/Admin/login')
        return false
      else if (state.url == '/Admin/auth/userManagement' || state.url == '/Admin/auth/addUser')
        return true
    }
    else {
      this.router.navigate(["/Learner"])
      return false;
    }
  }
}
