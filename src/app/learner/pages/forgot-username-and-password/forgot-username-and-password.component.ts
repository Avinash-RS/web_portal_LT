import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as myGlobals from '@core/globals'; 
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
  recoveryTypes: any = [] ;
  type: string;
  subtype: string;
  isenable: boolean = false;
  isshow:boolean = true;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertServiceService,
    private loader : Ng4LoadingSpinnerService,
    public service : LearnerServicesService) { 
    }

  ngOnInit() {
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('',myGlobals.mobileVal),
      email: new FormControl('', myGlobals.emailVal),
      username: new FormControl('', myGlobals.usernameVal),
    }, {
      
  });}


  get f() { return this.forgotUsername.controls; }
  get fp() { return this.forgotPasswordform.controls; }

  inputChanged(element: HTMLElement) {
    this.subtype = element.getAttribute('formControlName')
  }

  focusout(e){
    if( e.target.id === 'mobile' && e.target.value != "" && e.target.value.length > 0){
      this.forgotUsername.controls['email'].disable();
      this.isshow = false;
    }
    else if (e.target.id === 'email' && e.target.value != "" && e.target.value.length > 0){
      this.forgotUsername.controls['mobile'].disable();
      this.isshow = false;
    }else{
      this.forgotUsername.controls['email'].enable();
      this.forgotUsername.controls['mobile'].enable();
      this.isshow = true;
    }
  }

  forgotusername(){
    this.type = "username"
    this.loader.show();
    this.service.forgotUsernameandPassword(this.type,this.subtype,this.forgotUsername.value.mobile,this.forgotUsername.value.email)
    .subscribe(data => {
       
          if (data.data['get_forgot_username_mobile_email']['success'] == 'true') {
            this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
            this.loader.hide();
         
          } else{
            this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
            this.loader.hide();
          }
      })
  }

  getUserDetails(){
    this.loader.show();
    this.service.forgotPasswordByUsername(this.forgotUsername.value.username).subscribe(data => {
      if (data.data['get_forgot_password_byusername']['success'] == 'true') {
        this.loader.hide();
        this.recoveryTypes = data.data['get_forgot_password_byusername'].data
        this.isenable = true;
      } else{
        this.loader.hide();
        this.alert.openAlert(data.data['get_forgot_password_byusername'].message,null)
      }
  })
  }
  
  

  forgotPassword(recovertype){
    if(recovertype.type === "mobile"){
      this.loader.show();
        this.service.submit_otp(this.currentUser.user_id,this.currentUser._id,recovertype.value,this.forgotUsername.value.email).subscribe(data => {
              if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
                console.log(data.data['user_registration_mobile_otp_send'])
                this.loader.hide();
                this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'],null)
                this.router.navigate(['Learner/recoverotp',{mobile:recovertype.value}])
              } 
          })
    }else{
      this.type = "password"
      this.service.forgotUsernameandPassword(this.type,recovertype.type,this.forgotUsername.value.mobile,this.forgotUsername.value.email)
      .subscribe(data => {
            this.loader.show();
            if (data.data['get_forgot_username_mobile_email']['success'] == 'true') {
              this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
              this.loader.hide();
           
            } else{
              this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
              this.loader.hide();
            }
        })
    }
   

  }
  
}
