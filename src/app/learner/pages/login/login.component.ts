import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe: boolean;

  constructor(private router: Router,private formBuilder: FormBuilder, private cookieService: CookieService,
    private service: LearnerServicesService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z0-9]*$/)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)
      ])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm,this.loginForm.value.username, this.rememberMe)
    this.service.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(result => {
      console.log(result)
      this.cookieService.set('uname', this.loginForm.value.username);
      var ps = btoa(this.loginForm.value.password);
      this.cookieService.set('ps', ps);
    });
  }
}
