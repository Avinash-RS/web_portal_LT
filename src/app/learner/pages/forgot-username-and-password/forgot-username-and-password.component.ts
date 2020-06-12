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
  currentUser: any  ;
  recoveryType: string;
  recoveryTypes: any = [] ;
  type: string;
  subtype: string;
  isenable: boolean = false;
  isForgotUsernameEnable: boolean = false;
  isForgotPasswordEnable: boolean = false;
  isshow:boolean = true;
  isnextBtnEnable: boolean = true;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertServiceService,
    private loader : Ng4LoadingSpinnerService,
    public service : LearnerServicesService) { 

      this.type = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.type) || 'forgotUsername';
        if(this.type == 'forgotUsername'){
          this.isForgotUsernameEnable = false;
          this.isForgotPasswordEnable= true;
        }else{
          this.isForgotUsernameEnable = true;
          this.isForgotPasswordEnable= false;
        }
    }

  ngOnInit() {
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('',myGlobals.mobileVal),
      email: new FormControl('', myGlobals.emailVal),
      username: new FormControl('', myGlobals.usernamesplVal),
    }, {
      
  });
  }


  get f() { return this.forgotUsername.controls; }
  get fp() { return this.forgotPasswordform.controls; }

  inputChanged(element: HTMLElement) {
    this.subtype = element.getAttribute('formControlName')
  }

  focusout(e){
    if( e.target.id === 'mobile' && e.target.value != "" && e.target.value.length > 9){
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
            this.router.navigate(['Learner/login']);
            this.loader.hide();
         
          } else{
            this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
            this.loader.hide();
          }
      })
  }

  getUserDetails(){
    this.loader.show();
    this.recoveryTypes = [];
    this.service.forgotPasswordByUsername(this.forgotUsername.value.username).subscribe(data => {
      if (data.data['get_forgot_password_byusername']['success'] == 'true') {
        this.loader.hide();
        this.isnextBtnEnable = false;
        this.recoveryTypes = data.data['get_forgot_password_byusername'].data;
        this.currentUser =  data.data['get_forgot_password_byusername'].user_id;
        let obj = {
          data: this.recoveryTypes,
          user_id:  this.currentUser
        }
        localStorage.setItem('Username', this.forgotUsername.value.username);
        localStorage.setItem('Details_user',JSON.stringify(obj));
        this.isenable = true;
      } else{
        this.forgotUsername.reset();
        this.loader.hide();
        this.alert.openAlert(data.data['get_forgot_password_byusername'].message,null)
      }
  })
  }
  change(event){
    if(event.target.value.length > 0  || event.target.value.length == ''){
      this.recoveryTypes = [];
      this.isenable= false
      this.isnextBtnEnable = true;
    }
  }
  

  forgotPassword(recovertype){
    if(recovertype.type === "mobile"){
      this.loader.show();
        this.service.submit_otp(this.currentUser,'this.currentUser._id',recovertype.value,this.forgotUsername.value.email).subscribe(data => {
              if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
                this.loader.hide();
                this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'],null)
                this.router.navigate(['Learner/recoverotp',{mobile:recovertype.value}])
              } 
          })
    }else{
      this.type = "password"
      this.service.forgotUsernameandPassword(this.type,recovertype.type,this.forgotUsername.value.mobile,recovertype.value)
      .subscribe(data => {
            this.loader.show();
            if (data.data['get_forgot_username_mobile_email']['success'] == 'true') {
              this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
              this.loader.hide();
              this.router.navigate(['Learner/login'])
            } else{
              this.alert.openAlert(data.data['get_forgot_username_mobile_email'].message,null)
              this.loader.hide();
            }
        })
    }
   

  }
  

  resetForm(val){
    if(val == 'mobile') {
      this.forgotUsername.get('mobile').reset();
      this.forgotUsername.get('mobile').setValidators(myGlobals.mobileVal);
      this.forgotUsername.get('mobile').updateValueAndValidity();
      this.forgotUsername.controls['email'].enable();
    } else if(val == 'email') {
        this.forgotUsername.get('email').reset();
        this.forgotUsername.get('email').setValidators(myGlobals.emailVal);
        this.forgotUsername.get('email').updateValueAndValidity();
        this.forgotUsername.controls['mobile'].enable();
    }
  }
}
