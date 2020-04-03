//Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
//local
import * as myGlobals from '@core/globals';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})

export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private alert: AlertServiceService, private service: LearnerServicesService, ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameVal),
      password: new FormControl("", myGlobals.passwordVal),
      remember_me: new FormControl("", [])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.service.login(this.loginForm.value.username.toLowerCase(), this.loginForm.value.password, true)
      .subscribe((loginresult: any) => {
        if (loginresult.data.login) {
          if (loginresult.data.login.success) {
            if (loginresult.data.login && this.loginForm.value.remember_me === true) {
              localStorage.setItem('uname', this.loginForm.value.username);
              localStorage.setItem('remember_me', 'true');
              var ps = btoa(this.loginForm.value.password);
              localStorage.setItem('ps', ps);
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
              this.router.navigate(['/Learner'])
            } else {
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
              localStorage.setItem('remember_me', 'false');
              this.router.navigate(['/Learner'])
            }
          } else
            this.alert.openAlert("Invalid login. Please try again", null)
        } else
          this.alert.openAlert("Please try again later", null)
      });
  }
}