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
    const adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
    const role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
    // console.log('role-----',role)
    // for learner ------> 1
    // debugger
    const adminUrl = state.url.includes('Admin');
    const learnerUrl = state.url.includes('Learner');
    if (userDetailes != null && role === 'learner') {
      // userdetail is present // authenticated user
      // url should not start from admin - can be /Larner or anything
      // if profile updated and trying to go login/reg
      if (state.url === '/Learner/login' || state.url === '/Learner/register' ||
        state.url === '/' || state.url === '/Learner' || adminUrl) {
        this.router.navigate(['/Learner/home']);
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
    } else if ((userDetailes == null || adminDetails == null) && role == null) { // user detail is not present in local storage
      if (state.url === '/Learner' || state.url === '/Learner/login' || state.url === '/Admin/login'
        || state.url === '/Learner/register') {
        return true;
      } else {
        this.router.navigate(['/Learner']);
        return false;
      }
    }
    // if admin logged in
    if (role === 'admin' && adminDetails) {
      if (adminUrl && !learnerUrl && state.url !== '/Admin/login') {
        return true;
      } else {
        this.router.navigate(['/Admin/auth/userManagement']);
      }
    } else if (role === 'admin' && !adminDetails) {
      // console.log('role--3333---',role)
      localStorage.clear();

    } else {
      // console.log('role--33334444---',role)
      this.router.navigate(['/Learner']);
      return false;
    }
  }
}
