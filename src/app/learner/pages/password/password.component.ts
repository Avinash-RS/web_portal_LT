import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent implements OnInit {
  currentUser: any = [];
  usersuggestion: any = [];
  passwordForm: FormGroup;
  systemip: string;
  userid: any;
  options: string[] = [];
  hide = true;
  hide2 = true;
  lowercase = false;
  uppercase  = false;
  number = false;
  spicalcharacter  = false;
  showpassbutton  = false;
  showpsseye  = false;
  showconpassbutton  = false;
  showconpsseye  = false;
  useridData: any;
  email: any;
  emailid: any;
  secretKey = '(!@#Passcode!@#)';
  currentYear = new Date().getFullYear();
  loader = false;
  expiryMessage = '';
  constructor(public translate: TranslateService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private activeroute: ActivatedRoute,
              public service: LearnerServicesService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en');
                this.activeroute.queryParams.subscribe(params => {
                  this.email = params.code;
                  const input = {
                    ' userSecretkey ' : params.code
                };
                  this.service.getUser(this.email).subscribe((data: any) => {
                    this.expiryMessage = data?.data?.getuserRecordbasedonSecretKey?.message ?
                    data?.data?.getuserRecordbasedonSecretKey?.message : '';
                    var userValue = data?.data?.getuserRecordbasedonSecretKey?.data;
                    if (userValue['email']) {
                      this.emailid =  userValue['email'];
                      this.userid = userValue['user_id'];
                      localStorage.setItem('key', this.userid);
                    }
                });
                });
               }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language') ? localStorage.getItem('language') : 'en');
    this.systemip = localStorage.getItem('Systemip');
    this.passwordForm = this.formBuilder.group({
      username: [''],
      password: ['', [Validators.required, Validators.minLength(8),  Validators.maxLength(20),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.*?^[A-Za-z0-9!<>?/{}\|+-_=@#%$^*()]*$)/)]],
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword'),
    });

  }
  get pf() { return this.passwordForm.controls; }

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
  submit() {
    this.loader = true;
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.userid = localStorage.getItem('key');
    var encryptedid = CryptoJS.AES.encrypt(this.userid, this.secretKey.trim()).toString();
    var encryptedpassword = CryptoJS.AES.encrypt(this.passwordForm.value.password, this.secretKey.trim()).toString();
    var encryptedname = CryptoJS.AES.encrypt( this.emailid, this.secretKey.trim()).toString();
    this.service.user_registration_done(encryptedid, encryptedname, encryptedpassword, this.systemip ? this.systemip : '')
    .subscribe((data: any) => {
      this.loader = false;
      if (data.data.user_registration_done.success === 'true') {
        // Added by Mythreyi - for user story 19 first time login
        this.toastr.success('Your registration is successful');
        this.router.navigate(['/Learner/login']);
      } else {
        this.toastr.error(data.data.user_registration_done.message, null);
      }
    },
    err => {
      this.loader = false;
    });
  }

  /* function that checks for existing user or not on blur event in username field */
  checkForExistingUser() {
    if (this.passwordForm.value.username) {
      try {
        this.service.check_existing_user(this.passwordForm.value.username).subscribe((data: any) => {
          if (data.data.check_existing_user && data.data.check_existing_user.message === 'Username already exists') {
            this.toastr.warning(data.data.check_existing_user.message, null);
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }

  get_user_detail(email) {
    try {
      this.service.get_user_detail(email).subscribe((data: any) => {
        this.useridData = data.data;
        this.emailid =  this.useridData.get_user_detail.message[0].email;
        this.userid = this.useridData.get_user_detail.message[0].user_id;
        localStorage.setItem('key', this.userid);
      });
    } catch (error) {
      throw error;
    }
  }
}

