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
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('adminDetails');
    localStorage.removeItem('token');
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
        if (loginresult.data && loginresult.data.login) {
          if (loginresult.data.login.success) {
              localStorage.setItem('adminDetails', JSON.stringify(loginresult.data.login.message))
              this.router.navigate(['/Admin/auth/userManagement'])
              localStorage.setItem('role','admin');
              localStorage.setItem('token',loginresult.data.login.message.token)
          } else
            this.alert.openAlert("Invalid login. Please try again", null)
        } else
          this.alert.openAlert("Please try again later", null)
      });
  }
}