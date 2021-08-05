import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-forgot-username-and-password',
  templateUrl: './forgot-username-and-password.component.html',
  styleUrls: ['./forgot-username-and-password.component.scss']
})

export class ForgotUsernameAndPasswordComponent implements OnInit {
  forgotUsername: FormGroup;
  forgotPasswordform: FormGroup;
  currentUser: any;
  recoveryType: string;
  recoveryTypes: any = [];
  type: string;
  subtype: string;
  isenable = false;
  isForgotUsernameEnable = false;
  isForgotPasswordEnable = false;
  isshow = true;
  isnextBtnEnable = true;
  secretKey = "(!@#Passcode!@#)";
  currentYear = new Date().getFullYear();
  constructor( public translate: TranslateService,
               private formBuilder: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               public service: LearnerServicesService) {

    this.type = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.type) || 'forgotUsername';
    if (this.type === 'forgotUsername') {
          this.isForgotUsernameEnable = false;
          this.isForgotPasswordEnable = true;
        } else {
          this.isForgotUsernameEnable = true;
          this.isForgotPasswordEnable = false;
        }
    }

ngOnInit() {
    // this.translate.use(localStorage.getItem('language'));
    const language = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      email: new FormControl('', myGlobals.emailVal),
      username: new FormControl('', myGlobals.usernamesplVal),
    }, {

  });
  }


get f() { return this.forgotUsername.controls; }
get fp() { return this.forgotPasswordform.controls; }

inputChanged(element: HTMLElement) {
    this.subtype = element.getAttribute('formControlName');
  }

focusout(e) {
    if ( e.target.id === 'mobile' && e.target.value !== '' && e.target.value.length > 9) {
      this.forgotUsername.controls.email.disable();
      this.isshow = false;
    } else if (e.target.id === 'email' && e.target.value !== '' && e.target.value.length > 0) {
      this.forgotUsername.controls.mobile.disable();
      this.isshow = false;
    } else {
      this.forgotUsername.controls.email.enable();
      this.forgotUsername.controls.mobile.enable();
      this.isshow = true;
    }
  }

forgotusername() {
    this.type = 'username';
    var encrypteduser = CryptoJS.AES.encrypt(this.forgotUsername.value.username.toLowe, this.secretKey.trim()).toString();
    this.service.forgotUsernameandPassword(this.type, this.subtype, this.forgotUsername.value.mobile, encrypteduser)
      .subscribe((data: any) => {
        if (data.data.get_forgot_username_mobile_email.success === 'true') {
          this.toastr.success(data.data.get_forgot_username_mobile_email.message, null);
          this.router.navigate(['Learner/login']);

        } else {
          this.toastr.error(data.data.get_forgot_username_mobile_email.message, null);
        }
      });
  }

getUserDetails() {
    this.recoveryTypes = [];
    var encryptedname = CryptoJS.AES.encrypt(this.forgotUsername.value.username, this.secretKey.trim()).toString();
    this.service.forgotPasswordByUsername(encryptedname).subscribe((data: any) => {
      if (data.data.get_forgot_password_byusername.success === 'true') {
        this.isnextBtnEnable = false;
        this.recoveryTypes = data.data.get_forgot_password_byusername.data;
        this.currentUser = data.data.get_forgot_password_byusername.user_id;
        const obj = {
          data: this.recoveryTypes,
          user_id: this.currentUser
        };
        localStorage.setItem('Username', this.forgotUsername.value.username);
        localStorage.setItem('Details_user', JSON.stringify(obj));
        this.isenable = true;
      } else {
        this.forgotUsername.reset();
        this.toastr.error(data.data.get_forgot_password_byusername.message, null);
      }
    });
  }
change(event) {
    if (event.target.value.length > 0 || event.target.value.length === '') {
      this.recoveryTypes = [];
      this.isenable = false;
      this.isnextBtnEnable = true;
    }
  }


forgotPassword(recovertype) {
    if (recovertype?.type === 'mobile') {
      this.service.submit_otp(this.currentUser, 'this.currentUser._id', recovertype.value, this.forgotUsername.value.email)
        .subscribe((data: any) => {
          if (data.data.user_registration_mobile_otp_send.success === 'true') {
            Swal.fire(data.data.user_registration_mobile_otp_send.message, null);
            this.router.navigate(['Learner/recoverotp', { mobile: recovertype.value }]);
          }
        });
    } else {
      this.type = 'password';
      var encryptedmail = CryptoJS.AES.encrypt(this.forgotUsername.value.username, this.secretKey.trim()).toString();
      this.service.forgotUsernameandPassword(this.type, recovertype.type, this.forgotUsername.value.mobile, encryptedmail)
        .subscribe((data: any) => {
          if (data.data.get_forgot_username_mobile_email.success === 'true') {
            this.toastr.success(data.data.get_forgot_username_mobile_email.message, null);
            this.router.navigate(['Learner/login']);
          } else {
            this.toastr.error(data.data.get_forgot_username_mobile_email.message, null);
          }
        });
    }


  }


resetForm(val) {
    if (val === 'mobile') {
      this.forgotUsername.get('mobile').reset();
      this.forgotUsername.get('mobile').setValidators(myGlobals.mobileVal);
      this.forgotUsername.get('mobile').updateValueAndValidity();
      this.forgotUsername.controls.email.enable();
    } else if (val === 'email') {
      this.forgotUsername.get('email').reset();
      this.forgotUsername.get('email').setValidators(myGlobals.emailVal);
      this.forgotUsername.get('email').updateValueAndValidity();
      this.forgotUsername.controls.mobile.enable();
    }
  }
}
