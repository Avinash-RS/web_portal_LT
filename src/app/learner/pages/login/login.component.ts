import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService,
    private alert: AlertServiceService, private service: LearnerServicesService) { }

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
    this.service.login(this.loginForm.value.username, this.loginForm.value.password, false).subscribe((loginresult: any) => {
      console.log(loginresult)
      if (loginresult.data.login.success) {
        this.cookieService.set('uname', this.loginForm.value.username);
        var ps = btoa(this.loginForm.value.password);
        this.cookieService.set('ps', ps);
      } else {
        console.log('inside else')
        this.alert.openAlert("Invalid login. Please try again", null)
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.data = { title: "Invalid login. Please try again" };
        // dialogConfig.position = {
        //   top: '10',
        //   left: '10'
        // };
        // this.matDialog.open(AlertComponentComponent, dialogConfig);
      }
    });
  }
}
