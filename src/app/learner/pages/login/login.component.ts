import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z0-9]*$/)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?^[A-Za-z0-9!@#%^*()]*$).{8,20}$/)
      ]),
      remember_me: new FormControl("", [])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loader.show();
    this.service.login(this.loginForm.value.username.toLowerCase(), this.loginForm.value.password, false).subscribe((loginresult: any) => {
      if (loginresult.data.login.success) {
        this.loader.hide();
        if (loginresult.data.login && this.loginForm.value.remember_me === true) {
          // this.cookieService.set('uname', this.loginForm.value.username);
          // this.cookieService.set('remember_me','true');
          var ps = btoa(this.loginForm.value.password);
          // this.cookieService.set('ps', ps);
          this.router.navigate(['/courses'])
        } else {
          // this.cookieService.set('remember_me','false');
          this.router.navigate(['/courses'])
        }
      } else {
        this.loader.hide();
        this.alert.openAlert("Invalid login. Please try again", null)
      }
    });
  }
}
