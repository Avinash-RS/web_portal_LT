import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
/////// decrypt
// import 'angular-base64/angular-base64';
// import * as crypto from 'crypto';
// import CryptoJS from 'crypto-js';
import SimpleCrypto from 'simple-crypto-js';
const secretKey = 'myTotalySecretKey';
const simpleCrypto = new SimpleCrypto(secretKey);

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


  constructor(
    public translate: TranslateService,
    private loader: Ng4LoadingSpinnerService,
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
        // const decryptedString = simpleCrypto.decrypt(params.code);

        // const decryptedString = this.decrypt(params.code);
        // const bytes = CryptoJS.AES.decrypt(params.code, 'secret key 123');
        // const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedString = atob(params.code);
        this.user = decryptedString;
        this.get_user_detail_username(this.user);
      } else {
        this.user = localStorage.getItem('Username');
        this.isLinkActive = true;
      }
    });



    this.resetForm = this.formBuilder.group({
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
    this.loader.show();
    this.service.resetPassword(this.user, this.resetForm.value.password).subscribe((data: any) => {
      if (data.data.get_forgot_password_byresetpassword.success === 'true') {
        this.loader.hide();
        this.toastr.success(data.data.get_forgot_password_byresetpassword.message);
        localStorage.removeItem('Username');
        localStorage.removeItem('Details_user');
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');

        this.router.navigate(['/Learner/login']);

      } else {
        this.loader.hide();
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
