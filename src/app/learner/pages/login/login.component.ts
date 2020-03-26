import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import * as myGlobals from '../../../common/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private alert: AlertServiceService, private service: LearnerServicesService) { }

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
    this.service.login(this.loginForm.value.username.toLowerCase(), this.loginForm.value.password, false)
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
          } else {
            this.alert.openAlert(loginresult.data.login.error_msg, null)
          }
        } else {
          this.alert.openAlert("Please try again later", null)
        }
      });



    // localStorage.setItem('uname', this.loginForm.value.username);
    // localStorage.setItem('remember_me', 'false');
    // var ps = btoa(this.loginForm.value.password);
    // localStorage.setItem('ps', ps);
    // localStorage.setItem('UserDetails', '{}')
    // this.router.navigate(['/Learner'])


  }
}
