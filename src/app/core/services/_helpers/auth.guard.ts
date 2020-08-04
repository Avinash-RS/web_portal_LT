import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AlertServiceService } from '../handlers/alert-service.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private alert: AlertServiceService,
    private router: Router,
  ) { }

  // Added by Mythreyi
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
    // const role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
    // console.log('role-----',role)
    // for learner ------> 1
    // debugger
    const adminUrl = state.url.includes('Admin');
    const learnerUrl = state.url.includes('Learner');
    if (userDetailes != null) {
      // userdetail is present // authenticated user
      // url should not start from admin - can be /Larner or anything
      // if profile updated and trying to go login/reg
      if (state.url === '/Learner' || state.url === '/Learner/login' || state.url === '/Learner/register'
        || state.url === '/Learner/otp' || state.url === '/Learner/recover'
        || state.url === '/Learner/password' || state.url === '/Learner/recoverotp'
        || state.url === '/Learner/resetpassword' || state.url === '/Learner/terms' || state.url === '/' || adminUrl) {
        this.router.navigate(['/Learner/MyCourse']);
        return false;
      } else if (!userDetailes.is_profile_updated) {
        // if profile not updated and trying to access other screens, redirect to profile
        if (state.url !== '/Learner/profile') {
          this.router.navigate(['/Learner/profile']);
          this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields', { closeButton: true });
          // this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details');
          return false;
        } else {// if url is profile or anything
          return true;
        }
      } else {
        return true;
      }
      // end of url navigations for logged in learner ------> 1
    } else if ((userDetailes == null)) { // user detail is not present in local storage
      if (state.url === '/Learner' || state.url === '/Learner/login' || state.url === '/Learner/register'
        || state.url === '/Learner/otp' || state.url === '/Learner/recover'
        || state.url === '/Learner/password' || state.url === '/Learner/recoverotp'
        || state.url === '/Learner/resetpassword' || state.url === '/Learner/terms' || state.url === '/') {
        return true;
      } else {
        this.router.navigate(['/Learner']);
        return false;
      }
    } else {
      // console.log('role--33334444---',role)
      this.router.navigate(['/Learner']);
      return false;
    }
  }
}
