import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AlertServiceService } from '../handlers/alert-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private alert: AlertServiceService,
    private router: Router,
  ) { }

  // Added by Mythreyi
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    const adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
    const role = localStorage.getItem('role') || null;
      // console.log('role-----',role)
    // for learner ------> 1
    // debugger
    if (userDetailes != null && role === 'learner' &&
      (state.url !== '/Admin/auth/userManagement' && state.url !== '/Admin/auth/addUser' &&
        state.url !== '/Admin/auth/listCourses' && state.url !== '/Admin/auth/viewReport' &&
        state.url !== '/Admin/auth/publishCourse' && state.url !== '/Admin/auth/Wca' &&
        state.url !== '/Admin/auth/Wca/addcourse' && state.url !== '/Admin/auth/Wca/wca' && state.url !== '/Admin/auth/Wca/viewmodule' &&
        state.url !== '/Admin/auth/Wca/createmodule' && state.url !== '/Admin/auth/Wca/addmodule' &&
        state.url !== '/Admin/auth/Wca/choosetemplate' && state.url !== '/Admin/auth/Wca/previewcourse' &&
        state.url !== '/Admin/auth/Wca/rf' &&  state.url !== '/Admin/auth/Wca/addtemplate' &&
        state.url !== '/Admin/auth/Wca/addtopic' &&        state.url !== '/Admin/auth/Wca/ct' &&
        state.url !== '/Admin/auth/Wca/addfile' &&
        state.url !== '/Admin/auth/Wca/mycourse')) {
      // userdetail is present // authenticated user
      // url should not start from admin - can be /Larner or anything
      // if profile updated and trying to go login/reg
      if ((state.url === '/Learner/login' || state.url === '/Admin/login' || state.url === '/Learner/register')) {
        this.router.navigate(['/Learner']);
        return false;
      } else if (!userDetailes.is_profile_updated) {
        // if profile not updated and trying to access other screens, redirect to profile
        if (state.url !== '/Learner/profile') {
          this.router.navigate(['/Learner/profile']);
          this.alert.openAlert('Your profile is incomplete !', 'Please provide data for all mandatory field');
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
      if (state.url === '/Admin/auth/userManagement' || state.url === '/Admin/auth/addUser'
        || state.url === '/Admin/auth/listCourses' || state.url === '/Admin/auth/viewReport' || state.url === '/Admin/auth/publishCourse'
        || state.url === '/Admin/auth/usergroup' || state.url === '/Admin/auth/Wca' || state.url === '/Admin/auth/Wca/addcourse'
        || state.url === '/Admin/auth/Wca/viewmodule' || state.url === '/Admin/auth/Wca/createmodule'
        || state.url === '/Admin/auth/Wca/addtemplate' || state.url === '/Admin/auth/Wca/choosetemplate'
        || state.url === '/Admin/auth/Wca/addtopic' || state.url === '/Admin/auth/Wca/rf'
        || state.url === '/Admin/auth/Wca/addfile' || state.url === '/Admin/auth/Wca/addmodule'
        || state.url === '/Admin/auth/Wca/mycourse' || state.url === '/Admin/auth/Wca/previewcourse'
        || state.url === '/Admin/auth/Wca/ct'  || state.url === '/Learner/login') {
        return true;
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
