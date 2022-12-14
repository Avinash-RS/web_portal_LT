import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import * as myGlobals from '@core/globals';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { RecaptchaErrorParameters } from 'ng-recaptcha';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  currentUser: any = [];
  user: any;
  username: any;
  lowercase = false;
  uppercase = false;
  number = false;
  spicalcharacter = false;
  showpassbutton = false;
  showpsseye = false;
  showconpassbutton = false;
  showconpsseye = false;
  isLinkActive: boolean;
  isLink = false;
  hide = true;
  hide2 = true;
  secretKey = '(!@#Passcode!@#)';
  siteKey: any = environment.captachaSiteKey;
  resolvedCaptcha: any;
  currentYear = new Date().getFullYear();
  loader = false;
  resetCode;
  recaptchaResetStr = '';
  constructor(
    public translate: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute,
    private toastr: ToastrService,
    public service: LearnerServicesService) {
      const lang = localStorage.getItem('language');
      this.translate.use(lang ? lang : 'en');
      const language = localStorage.getItem('language') || 'en';
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (params.code) {
        this.resetCode = params.code;
        this.service.getUser(this.resetCode).subscribe((data: any) => {
          const userValue = data?.data?.getuserRecordbasedonSecretKey?.data;
          if (userValue['email']) {
            this.user = userValue['email'].toLowerCase();
            this.get_user_detail_username(this.user);
          }
      });
      } else {
        this.user = localStorage.getItem('Username');
        this.isLinkActive = true;
      }
    });
    this.resetForm = this.formBuilder.group({
      recaptchaReactive: [null],
      password: ['', [Validators.required, ,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        Validators.minLength(8),  Validators.maxLength(20)]],
        confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),
          Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword'),
    });
  }
  checkCaptchaReset(captchaRefReset) {
    if (this.recaptchaResetStr) {
      captchaRefReset.reset();
  }
    captchaRefReset.execute();
  }
  resolvedReset(captchaResponse: string) {
    this.recaptchaResetStr = captchaResponse;
    if (this.recaptchaResetStr) {
            this.resetpassword();
        }
  }

  onError(errorDetails: RecaptchaErrorParameters): void {
  }


  get f() { return this.resetForm.controls; }
  showPassword() {
    this.showpassbutton = !this.showpassbutton;
    this.showpsseye = !this.showpsseye;
  }
  showconPassword() {
    this.showconpassbutton = !this.showconpassbutton;
    this.showconpsseye = !this.showconpsseye;
  }
  change(event) {
    if (event.target.value.match(myGlobals.lowerCaseLetters)) {
      this.lowercase = true;
    } else {
      this.lowercase = false;
    }
    if (event.target.value.match(myGlobals.upperCaseLetters)) {
      this.uppercase = true;
    } else {
      this.uppercase = false;
    }
    if (event.target.value.match(myGlobals.numbers)) {
      this.number = true;
    } else {
      this.number = false;
    }
    if (event.target.value.match(myGlobals.specialchar)) {
      this.spicalcharacter = true;
    } else {
      this.spicalcharacter = false;
    }

  }


  resetpassword() {
    this.loader = true;
    const encryptedname = CryptoJS.AES.encrypt(this.user.toLowerCase(), this.secretKey.trim()).toString();
    const encryptedpassword = CryptoJS.AES.encrypt(this.resetForm.value.password, this.secretKey.trim()).toString();
    this.service.resetPassword(encryptedname, encryptedpassword, this.resetCode, this.recaptchaResetStr).subscribe((data: any) => {
      if (data.data.get_forgot_password_byresetpassword.success === 'true') {
        this.loader = false;
        this.toastr.success(data.data.get_forgot_password_byresetpassword.message);
        localStorage.removeItem('Username');
        localStorage.removeItem('Details_user');
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');

        this.router.navigate(['/Learner/login']);

      } else {
        this.loader = false;
        this.toastr.error(data.data.get_forgot_password_byresetpassword.message, null);
      }
    });
  }

  get_user_detail_username(name) {
    try {
      this.service.get_user_detail_username(name).subscribe((data: any) => {
        this.isLinkActive = data.data.get_user_detail_username && data.data.get_user_detail_username.message === 'Link not expired' ?
          true : false;
        if (!this.isLinkActive) {
            this.isLink = true;
          }
      });
    } catch (error) {
      throw error;
    }
  }

}
