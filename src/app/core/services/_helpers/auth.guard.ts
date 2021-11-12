import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router,


  RouterStateSnapshot,
  CanLoad,
  UrlSegment,
  Route
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertServiceService } from '../handlers/alert-service.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(
    private toastr: ToastrService,
    private alert: AlertServiceService,
    private router: Router,
  ) {
    
   }
  // Added by Avinasi
 
    //    else {
    //     this.router.navigate(['/Learner/login']);
    //     return false;
    //   }
    // }
  
  // Added by Mythreyi
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails =JSON.parse(localStorage.getItem('UserDetails'));
    const token =  localStorage.getItem('token')||sessionStorage.getItem('token');
    if(userDetails?.TFAsetup?.main_config_TFA) {
      if(userDetails?.TFAsetup?.user_config_TFA) {
        if (token && userDetails?.specific_report_value) {
            return true;
          } else {
            this.router.navigate(['/Learner/login']);
            return false;
          }
      } else {
        if (token && userDetails?.specific_report_value) {
            return true;
          } else {
            this.router.navigate(['/Learner/login']);
            return false;
          }
      }
    } else {
      if (token) {
          return true;
        } else {
          this.router.navigate(['/Learner/login']);
          return false;
        }
    }
    
      // end of url navigations for logged in learner ------> 1
    }

    canLoad(route: Route, segments: UrlSegment[]): any {
      const userDetails =JSON.parse(localStorage.getItem('UserDetails'));
      const token =  localStorage.getItem('token')||sessionStorage.getItem('token');
      if(userDetails?.TFAsetup?.main_config_TFA) {
        if(userDetails?.TFAsetup?.user_config_TFA) {
          if (token && userDetails?.specific_report_value) {
              return true;
            } else {
              console.log('3')
              this.router.navigate(['/Learner/login']);
              return false;
            }
        } else {
          if (token && userDetails?.specific_report_value) {
              return true;
            } else {
              console.log('4')
              this.router.navigate(['/Learner/login']);
              return false;
            }
        }
      } else {
        if (token) {
            return true;
          } else {
            console.log('5')
            this.router.navigate(['/Learner/login']);
            return false;
          }
      }
      }

    // const userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    // // const role = localStorage.getItem('role') || localStorage.getItem('role') || null;
    // // for learner ------> 1
    // // debugger
    // const adminUrl = state.url.includes('Admin');
    // const learnerUrl = state.url.includes('Learner');
    // if (userDetailes != null) {
    //   // userdetail is present // authenticated user
    //   // url should not start from admin - can be /Larner or anything
    //   // if profile updated and trying to go login/reg
    //   if (localStorage.getItem('role') == 'learner') {
    //     this.router.navigate(['/Learner/MyCourse']);
    //     return false;
    //   } else if (!userDetailes.is_profile_updated) {
    //     // if profile not updated and trying to access other screens, redirect to profile
    //     // Iggnite Changes done by Afser on Profile update not Mandtory
    //     // if (state.url !== '/Learner/profile') {
    //     //   this.router.navigate(['/Learner/profile']);
    //     //   this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields', { closeButton: true });
    //     //   // this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details');
    //     //   return false;
    //     // } else {// if url is profile or anything
    //     //   return true;
    //     // }
    //     return true;
    //   } else {
    //     return true;
    //   }
    //   // end of url navigations for logged in learner ------> 1
    // } else if ((userDetailes == null)) { // user detail is not present in local storage
    //   if (localStorage.getItem('role') == 'learner') {
    //     return true;
    //   } else {
    //     this.router.navigate(['/Learner/login']);
    //     return false;
    //   }
    // } else {
    //   this.router.navigate(['/Learner/login']);
    //   return false;
    // }
  }
