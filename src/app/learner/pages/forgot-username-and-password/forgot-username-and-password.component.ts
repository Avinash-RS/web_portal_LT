import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LearnerServicesService } from '../../services/learner-services.service';
@Component({
  selector: 'app-forgot-username-and-password',
  templateUrl: './forgot-username-and-password.component.html',
  styleUrls: ['./forgot-username-and-password.component.scss']
})
export class ForgotUsernameAndPasswordComponent implements OnInit {
  forgotUsername: FormGroup;
  forgotPasswordform: FormGroup;
  currentUser: any = []
  recoveryType: string;
  recoveryTypes: string[] = [];
  type: string;
  subtype: string;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertServiceService,
    private loader : NgxSpinnerService,
    public service : LearnerServicesService,) { }

  ngOnInit() {
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}\1*$/)]),
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/), Validators.minLength(3), Validators.maxLength(20)]),
    }, {
  });
  }

  get f() { return this.forgotUsername.controls; }
  get fp() { return this.forgotPasswordform.controls; }

  inputChanged(element: HTMLElement) {
    this.subtype = element.getAttribute('formControlName')
  }

  forgotusername(){
    this.type = "username"
    this.service.forgotUsernameandPassword(this.type,this.subtype,this.forgotUsername.value.mobile,this.forgotUsername.value.email)
    .subscribe(data => {
          this.loader.show();
          if (data.data['get_forgot_username_mobile_email']['success'] == 'true') {
            this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
            console.log(data.data['get_forgot_username_mobile_email'])
            // localStorage.setItem('UserDetails',JSON.stringify(data.data['get_forgot_username_mobile'].data))
            this.loader.hide();
         
          } else{
            this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
            this.loader.hide();
          }
      })
  }

  forgotPassword(){
    console.log(this.forgotUsername.value.username)
    this.service.forgotPasswordByUsername(this.forgotUsername.value.username)
    .subscribe(data => {
          this.loader.show();
          if (data.data['get_forgot_password_byusername']['success'] == 'true') {
            // this.alert.openAlert(data.data['get_forgot_password_byusername'].message,null)
              this.recoveryTypes = data.data['get_forgot_password_byusername'].data
            // localStorage.setItem('UserDetails',JSON.stringify(data.data['get_forgot_username_mobile'].data))
            this.loader.hide();
         
          } else{
            this.alert.openAlert(data.data['get_forgot_password_byusername'].message,null)
            this.loader.hide();
          }
      })
    
  }

  
}
