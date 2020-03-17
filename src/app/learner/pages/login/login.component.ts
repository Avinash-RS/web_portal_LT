import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as myGlobals from '../../../common/globals'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private alert: AlertServiceService, private service: LearnerServicesService,private loader : NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameVal),
      password: new FormControl("",myGlobals.passwordVal),
      remember_me: new FormControl("", [])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loader.show();
    this.service.login(this.loginForm.value.username.toLowerCase(), this.loginForm.value.password, false).subscribe((loginresult: any) => {
      console.log(loginresult.data.login.message)
      if (loginresult.data.login.success) {
        this.loader.hide();
        if (loginresult.data.login && this.loginForm.value.remember_me === true) {
          localStorage.setItem('uname', this.loginForm.value.username);
          localStorage.setItem('remember_me', 'true');
          var ps = btoa(this.loginForm.value.password);
          localStorage.setItem('ps', ps);
          localStorage.setItem('UserDetails',JSON.stringify(loginresult.data.login.message))
          this.router.navigate(['/Learner/courses'])
        } else {
          localStorage.setItem('UserDetails',JSON.stringify(loginresult.data.login.message))
          localStorage.setItem('remember_me','false');
          this.router.navigate(['/Learner/courses'])
        }
      } else {
        this.loader.hide();
        this.alert.openAlert("Invalid login. Please try again", null)
      }
    });
  }
}
