import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  capsOn;
  show = false;
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private service: LearnerServicesService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', myGlobals.req),
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, [])
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
            if (loginresult.data.login && this.loginForm.value.remember_me === true) {
              localStorage.setItem('uname', this.loginForm.value.username);
              localStorage.setItem('remember_me', 'true');
              localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              const ps = btoa(this.loginForm.value.password);
              localStorage.setItem('ps', ps);
              localStorage.setItem('login', 'true');
              localStorage.setItem('role', 'learner');
              localStorage.setItem('token', loginresult.data.login.message.token);
              // localStorage.setItem('user_img', loginresult.data.login.message.user_img);
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              localStorage.setItem('user_img',loginresult.data.login.message.profile_img)
              
              // if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated) {
                // for june 10 added by ankit
                this.router.navigate(['/Learner/home']);
              } else {
                this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields');
                this.router.navigate(['/Learner/profile']);
              }
            } else {
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              localStorage.setItem('remember_me', 'false');
              localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              localStorage.setItem('uname', this.loginForm.value.username);
              localStorage.setItem('login', 'true');
              localStorage.setItem('role', 'learner');
              localStorage.setItem('user_img',loginresult.data.login.message.profile_img)
              localStorage.setItem('token', loginresult.data.login.message.token);
              const ps = btoa(this.loginForm.value.password);
              localStorage.setItem('ps', ps);
              // if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated) {
                // for june 10 added by ankit
                this.router.navigate(['/Learner/home']);
              } else {
                this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields');
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
<<<<<<< HEAD
=======

>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
}
