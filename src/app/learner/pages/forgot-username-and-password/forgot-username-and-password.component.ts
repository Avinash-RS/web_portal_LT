import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  recoveryTypes: any = [] ;
  type: string;
  subtype: string;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertServiceService,
    private loader : NgxSpinnerService,
    public service : LearnerServicesService) { 
    }

  ngOnInit() {
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}\1*$/)]),
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
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
    }
    else if (e.target.id === 'email' && e.target.value != "" && e.target.value.length > 0){
      this.forgotUsername.controls['mobile'].disable();
    }else{
      this.forgotUsername.controls['email'].enable();
      this.forgotUsername.controls['mobile'].enable();
    }
  }

  forgotusername(){
    this.type = "username"
    this.service.forgotUsernameandPassword(this.type,this.subtype,this.forgotUsername.value.mobile,this.forgotUsername.value.email)
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

  getUserDetails(){
    this.service.forgotPasswordByUsername(this.forgotUsername.value.username).subscribe(data => {
      if (data.data['get_forgot_password_byusername']['success'] == 'true') {
        this.recoveryTypes = data.data['get_forgot_password_byusername'].data
      } else{
        this.alert.openAlert(data.data['get_forgot_password_byusername'].message,null)
      }
  })
  }
  
  

  forgotPassword(recovertype){
    if(recovertype.type === "mobile"){
        this.service.submit_otp(this.currentUser.user_id,this.currentUser._id,recovertype.value,this.forgotUsername.value.email).subscribe(data => {
              if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
                console.log(data.data['user_registration_mobile_otp_send'])
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
