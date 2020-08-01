import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { ToastrService } from 'ngx-toastr';
// import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  capsOn;
  show = false;
  loginForm: FormGroup;
  languages: any;
  // public translate: TranslateService, 
  constructor(private router: Router, private formBuilder: FormBuilder,
              private service: LearnerServicesService, private toastr: ToastrService) {
      // /this.languages = [{lang: 'ta' , languagename: 'Tamil' } , { lang: 'en' , languagename: 'English'  }] ;

      // translate.addLangs(['en', 'ta']);
      // translate.setDefaultLang('en');
      // const browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', myGlobals.req),
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, []),
      language: new FormControl(false, [])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.service.login(this.loginForm.value.username, this.loginForm.value.password, false)
      .subscribe((loginresult: any) => {
        if (loginresult.data.login) {
          if (loginresult.data.login.success) {
            localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
            // IF ADDING SOME KEYS IN LOCAL, ADD IN ELSE ALSO - MYTHREYI
            if (loginresult.data.login && this.loginForm.value.remember_me === true) {
              localStorage.setItem('remember_me', 'true');
              localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              localStorage.setItem('Fullname', loginresult.data.login.message.full_name);
              localStorage.setItem('role', 'learner');
              localStorage.setItem('token', loginresult.data.login.message.token);
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              // if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated) {
                // for june 10 added by ankit
                this.router.navigate(['/Learner/home']);
              } else {
                this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields', { closeButton: true });
                this.router.navigate(['/Learner/profile']);
              }
            } else {
              localStorage.setItem('Fullname', loginresult.data.login.message.full_name);// Added ny Mythreyi
              sessionStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              sessionStorage.setItem('remember_me', 'false');
              sessionStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              sessionStorage.setItem('role', 'learner');
              sessionStorage.setItem('token', loginresult.data.login.message.token);
              // localStorage.setItem('token', loginresult.data.login.message.token);
              const ps = btoa(this.loginForm.value.password);
              // if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated) {
                // for june 10 added by ankit
                this.router.navigate(['/Learner/home']);
              } else {
                this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields', { closeButton: true });
                this.router.navigate(['/Learner/profile']);
              }
            }
          } else {
            this.loginForm.reset();
            this.toastr.error(loginresult.data.login.error_msg, null);
          }
        } else {
          this.loginForm.reset();
          this.toastr.warning('Please try again later', null);
        }
      });
  }
  forgotusername(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

  reserPassword(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

}
