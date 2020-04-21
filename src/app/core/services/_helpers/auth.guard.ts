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
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) ? JSON.parse(localStorage.getItem('UserDetails')) :
      JSON.parse(localStorage.getItem('adminDetails')) || null;
    var role = localStorage.getItem('role');
//  console.log('111role-----'+role)
    if (userDetailes != null) { // userdetail is present // authenticated user
    
      if (((role == 'learner' && userDetailes.is_profile_updated) || (role == 'admin')) &&
        state.url == '/Learner/login' || state.url == '/Admin') {
         
        this.router.navigate([role == 'admin' ? "/Admin/auth/userManagement":  "/Learner"]);
        return false;
      }
      if (role == 'learner' && !userDetailes.is_profile_updated) {

        if (state.url != '/Learner/profile') { //if profile not updated and trying to access other screens, redirect to profile
          this.router.navigate(["/Learner/profile"]);
          this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')
          return false;
        } else //if url is profile
          return true
      } else if(role == 'admin'){ // added by Afser
        // console.log('role-----'+role) 
        this.router.navigate(["/Admin/auth"]);
      }
      else
        return true;
    }
    else if (userDetailes == null) { //user detail is not present in local storage
      if (state.url == '/Learner' || state.url == '/Learner/login' || state.url == '/Admin'
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
