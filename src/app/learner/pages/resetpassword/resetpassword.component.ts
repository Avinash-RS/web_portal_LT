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
import { RecaptchaErrorParameters } from "ng-recaptcha";


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
  hide = true;
  hide2 = true;
  secretKey = "(!@#Passcode!@#)";
  siteKey: any = environment.captachaSiteKey;
  resolvedCaptcha: any;
  currentYear = new Date().getFullYear();
  loader = false;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute,
    private toastr: ToastrService,
    public service: LearnerServicesService) {
      const language = localStorage.getItem('language') || 'en';
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (params.code) {
        // const decryptedString = params.code;
      var input = {
          "userSecretkey" : params.code
      }
       // const decryptedString = atob(params.code);
        this.service.getEmail(input).subscribe((data)=>{
          var userValue = data['data']
          if(userValue['email']){
            this.user = userValue['email'].toLowerCase();
            this.get_user_detail_username(this.user);
          }
        })
        //this.user = decryptedString;
       
      } else {
        this.user = localStorage.getItem('Username');
        this.isLinkActive = true;
      }
    });



    this.resetForm = this.formBuilder.group({
      recaptchaReactive: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8),  Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),
          Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
      // password: new FormControl('', myGlobals.passwordVal),
      // confirmpassword: new FormControl('', [Validators.required,
      // Validators.minLength(8), Validators.maxLength(20),
      // Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword'),
    });
  }

  resolved(captchaResponse: string) {
    this.resolvedCaptcha = captchaResponse;
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
    this.loader = true
    var encryptedname = CryptoJS.AES.encrypt(this.user.toLowerCase(), this.secretKey.trim()).toString();
    var encryptedpassword = CryptoJS.AES.encrypt(this.resetForm.value.password, this.secretKey.trim()).toString();
    // var decryptname = CryptoJS.AES.decrypt(encryptedname, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    // var decryptpassword = CryptoJS.AES.decrypt(encryptedpassword, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    // return
    this.service.resetPassword(encryptedname,encryptedpassword).subscribe((data: any) => {
      if (data.data.get_forgot_password_byresetpassword.success === 'true') {
        this.loader = false
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
      });
    } catch (error) {
      throw error;
    }
  }

}
