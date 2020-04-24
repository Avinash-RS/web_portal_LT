import { Component, OnInit, Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import * as myGlobals from '@core/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  capsOn;
  show: boolean = false;
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private alert: AlertServiceService, private service: LearnerServicesService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameValforLogin),
      password: new FormControl("", myGlobals.passwordValforLogin),
      remember_me: new FormControl("", [])
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
              var ps = btoa(this.loginForm.value.password);
              localStorage.setItem('ps', ps);
              localStorage.setItem('login', 'true');
              localStorage.setItem('role', 'learner')
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
              //if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated)
                this.router.navigate(['/Learner/MyCourse'])
              else {
                this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')
                this.router.navigate(['/Learner/profile'])
              }
            } else {
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
              localStorage.setItem('remember_me', 'false');
              localStorage.setItem('uname', this.loginForm.value.username);
              localStorage.setItem('login', 'true');
              localStorage.setItem('role', 'learner')
              var ps = btoa(this.loginForm.value.password);
              localStorage.setItem('ps', ps);
              //if false, then need to update profile
              if (loginresult.data.login.message.is_profile_updated)
                this.router.navigate(['/Learner/MyCourse'])
              else {
                this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details')
                this.router.navigate(['/Learner/profile'])
              }
            }
          } else {
            this.loginForm.reset();
            this.alert.openAlert(loginresult.data.login.error_msg, null)
          }
        } else {
          this.loginForm.reset();
          this.alert.openAlert("Please try again later", null)
        }
      });
  }
}
