import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as myGlobals from '@core/globals';
import { TermsconditionsComponent } from '../termsconditions/termsconditions.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { CommonServicesService } from '@core/services/common-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;
  public codeValue: string;
  registerForm: FormGroup;
  loading = false;
  userDetails: any;
  platform: string;
  titleData = [];
  // is_staff: boolean;
  fullname: any;
  registerSuccess = false;
  secretKey = "(!@#Passcode!@#)";
  siteKey: any = environment.captachaSiteKey;
  resolvedCaptcha: any;
  currentYear = new Date().getFullYear();
  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loader: Ng4LoadingSpinnerService,
    public service: LearnerServicesService,
    private commonService: CommonServicesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    const language = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.gettitleData();
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language') ? localStorage.getItem('language') : 'en');
    this.registerForm = this.formBuilder.group({
      recaptchaReactive: [null, [Validators.required]],
      title: ['', [Validators.required]],
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern(/^[-a-zA-Z ]+(\s+[-a-zA-Z]+)*$/)]],
        mobile: ['', [ Validators.minLength(10),  Validators.maxLength(10),
          Validators.pattern(/^[6-9][0-9]{9}$/)]],
      email: ['', [ Validators.minLength(6),
        Validators.maxLength(64), Validators.pattern(/^([A-Za-z]|[0-9])[A-Za-z0-9._-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})$/)]],
      termsandconditions: new FormControl('', [])
    }, {
    });    
  }

    resolved(captchaResponse: string) {
      this.resolvedCaptcha = captchaResponse;
    }

    onError(errorDetails: RecaptchaErrorParameters): void {
    }

  get f() { return this.registerForm.controls; }

  Submit() {
      localStorage.removeItem('UserDetails');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('adminDetails');
  
      this.loader.show();
      this.fullname = this.registerForm.value.fullname.trimLeft();
      // this.registerForm.value.termsandconditions
      var encryptedmail = CryptoJS.AES.encrypt(this.registerForm.value.email.toLowerCase(), this.secretKey.trim()).toString();
      var encryptedname = CryptoJS.AES.encrypt(this.fullname, this.secretKey.trim()).toString();
      var encryptedmobile = CryptoJS.AES.encrypt(this.registerForm.value.mobile, this.secretKey.trim()).toString();
      this.service.user_registration(encryptedmail, encryptedname,
        encryptedmobile ?  encryptedmobile : '' ,
       this.registerForm.value.title , true ).subscribe((data: any) => {
      this.registerForm.reset();
      this.formRef.resetForm();
      this.registerForm.setErrors(null); // could be removed
      this.registerForm.updateValueAndValidity();
      if (data.data.user_registration) {
        if (data.data.user_registration.success === 'true') {
          this.registerSuccess = true;
          this.toastr.success(data.data.user_registration.message, null);
          this.loader.hide();
          this.registerForm.setErrors(null);
        } else {
          this.toastr.error(data.data.user_registration.message, null);
          this.loader.hide();
          this.registerSuccess = false;
        }
       } else {
        this.toastr.warning('Please try after sometime', null);
       }
      });
  }
  register() {
    this.router.navigateByUrl('/Learner/login');
  }
  onSubmit() {
    
    if (this.registerForm.valid) {
      this.Submit();
    }
  }

  gettitleData() {
    this.service.getRegisterTitle().subscribe((data: any) => {
    this.titleData = data.data.user_mstr_data.data;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TermsconditionsComponent, {
      width: '550px',
      height: '450px',
      data: { component: TermsconditionsComponent }
    });
  }

}
