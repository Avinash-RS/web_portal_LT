import { Component, OnInit,ViewChild, TemplateRef, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as myGlobals from '@core/globals';
import { LearnerServicesService } from '@learner/services/learner-services.service';
// import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { environment } from '../../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '@learner/services/google-analytics.service';
declare var gtag;
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  capsOn;
  hide = true;
  show = false;
  loginForm: FormGroup;
  languages: any;
  secretKey = '(!@#Passcode!@#)';
  currentYear = new Date().getFullYear();
  infoClose = true;
  loader = false;
  username = new FormControl('', [Validators.required]);
  signInPage = true;
  forgotPage = false;
  signUpPage = false;
  registerForm: FormGroup;
  fullname: any;
  resolvedCaptcha: any;
  registerSuccess = false;
  titleData = [];
  siteKey: any = environment.captachaSiteKey;
  TopicsOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplaySpeed: 500,
    dotsSpeed: 500,
    autoplayHoverPause: true,
    slideBy: 1,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  };
  env_Version = environment.appVersion;
  recaptchaStr = '';
  recaptchaForgetStr = '';
  recaptchaSignInStr = '';
  @ViewChild('captchaRef') captchaRef;
  @ViewChild('troubleshoot') troubleshoot: TemplateRef<any>;
  selectedLanguage: any = 'en';
  commands;
  rightHeader;
  queries = [
    {
    'title': 'How to clear cache and cookies?',
    'Active': true,
    'commands': [
      {
        'heading': 'In chrome',
        'steps': [
          {
          'value': '1. On your computer, open Chrome.'
          },
          {
          'value': '2. At the top right, click More.'
          },
          {
           'value': '3. Click More tools. Clear browsing data.'
          },
          {
           'value': '4. At the top, choose a time range. To delete everything, select All time.'
          },
          {
           'value': '5. Next to “Cookies and other site data” and “Cached images and files,” check the boxes.'
          },
          {
           'value': '6. Click Clear data.'
          }
        ]
      }
    ]
    },
    {
    'title': 'How to enable all cookies?',
    'commands': [
      {
        'heading': 'Change your cookie settings',
        'steps': [
          {
          'value': '1. On your computer, open Chrome.'
          },
          {
          'value': '2. At the top right, click More Settings.'
          },
          {
           'value': '3. Under “Privacy and security,” click Cookies and other site data.'
          },
          {
           'value': '4. Select an option: Allow all cookies. Block all cookies (not recommended). Block third party cookies in Incognito. Block third-party cookies.'
          }
        ]
      }
    ],
    },
    {
      'title': 'Browser Compatibility?',
      'commands': [
        {
          'heading': 'Browser Compatibility',
          'steps': [
            {
            'value': '1. Windows : Google Chrome, Mozilla Firefox, Microsoft Edge.'
            },
            {
            'value': '2. Mac OS : Google Chrome.'
            }
          ]
        }
      ],
    },
    {
      'title': 'Google Authenticator?',
      'commands': [
        {
          'heading': 'Google Authenticator',
          'steps': [
            {
            'value': '1. 2-step verification provides stronger security for your account and hence authentication using Google Authenticator is a mandatory step to log into L&T EduTech platform.'
            },
            {
            'value': '2. Do not delete the account created in the authenticator app by scanning the QR code or the authenticator app itself, as you would require to enter the 6 digit code displayed in the app, everytime you login to L&T EduTech.'
            }
          ]
        }
      ],
    },
    {
      'title': 'Invalid Auth code - while submitting the 6 digit code?',
      'commands': [
        {
          'heading': 'Invalid Auth code - while submitting the 6 digit code',
          'steps': [
            {
            'value': '1. Open Settings in Google Authenticator App.'
            },
            {
            'value': '2. Select Time Correction for code'
            },
            {
             'value': '3. Select Sync now'
            },
            {
             'value': '4. Clear cache in browser and Login again'
            }
          ]
        }
      ],
    },
    {
      'title': 'Login page loading continuously?',
      'commands': [
        {
          'heading': 'Login page loading continuously',
          'steps': [
            {
            'value': '1. 	Clear cache in browser and Login again'
            },
            {
            'value': '2. (Or) Create a new profile in your browser and try to log into the application again'
            }
          ]
        }
      ],
    },
    {
      'title': 'Invalid user name and password?',
      'commands': [
        {
          'heading': 'Invalid user name and password',
          'steps': [
            {
            'value': '1. Make sure you use the exact credentials you received from L&T EduTech in your registered email'
            },
            {
            'value': '2. Ensure, there is no space before or after the username and password.'
            }
          ]
        }
      ],
    }
  ];
  getErrorMessage() {
    return this.username.hasError('required') ? 'Email or Username is required' :
        this.username.hasError('email') ? 'Please enter a valid email address' :
            '';
  }
  constructor(public translate: TranslateService, private router: Router, private formBuilder: FormBuilder, public learnerService: LearnerServicesService,public gaService:GoogleAnalyticsService,
             // public socketService: SocketioService,
              private service: LearnerServicesService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,private titleService: Title, private dialog: MatDialog, 
              @Optional() public dialogRef: MatDialogRef<LoginComponent>) {
      this.languages = [{lang: 'ta' , languagename: 'Tamil' } , { lang: 'en' , languagename: 'English'  }] ;
      translate.addLangs(['en', 'ta']);
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      let lang = localStorage.getItem('language')
      this.translate.use(lang?lang:'en') 
  }

  ngOnInit() {
    this.portalToIggnite();
    this.loginForm = this.formBuilder.group({
      // username: new FormControl('', myGlobals.req),
      username: ['',  myGlobals.req],
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, []),
      language: new FormControl(false, [])
    });    
    setTimeout(()=>{
      this.captchaRef.reset();
    },1000)
  }
  stop(event) {
    event.stopPropagation();
  }
  viewChange() {
    this.signInPage = false;
    this.forgotPage = true;
    this.titleService.setTitle('Forgot Password');
    this.gaService.setInnerPage('Forgot Password');
    setTimeout(() => {
      this.captchaRef.reset();
    }, 1000);
  }
  backToSignin() {
    this.forgotPage = false;
    this.signInPage = true;
    this.titleService.setTitle('Learner Login');
    this.gaService.setInnerPage('Learner Login');
    this.username.reset();
    setTimeout(() => {
      this.captchaRef.reset();
    }, 1000);
  }
  forgotPassword() {
      const encryptedmail = CryptoJS.AES.encrypt(this.username.value, this.secretKey.trim()).toString();
      this.service.forgotUsernameandPassword('password', 'email', '', encryptedmail, this.recaptchaForgetStr)
        .subscribe((data: any) => {
          this.loader = true;
          if (data?.data?.get_forgot_username_mobile_email?.success === 'true') {
            this.toastr.success(data.data.get_forgot_username_mobile_email.message, null);
            this.loader = false;
            this.signInPage = false;
            this.forgotPage = true;
            this.username.reset();
          } else {
            this.toastr.error(data?.data?.get_forgot_username_mobile_email?.message, null);
            this.loader = false;
            this.username.reset();
          }
        },
        err => {
          this.toastr.error('Email or Username not found');
        });
  }
  portalToIggnite() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['email_id']) {
        this.learnerService.getLoginUserDetail(params.email_id.toLowerCase()).subscribe((isValidEmailResult: any) => {
          if (isValidEmailResult.data.get_login_details.success === true) {
            localStorage.setItem('token', isValidEmailResult.data.get_login_details.message.token);
            localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
            localStorage.setItem('Fullname', isValidEmailResult.data.get_login_details.message.full_name);
            localStorage.setItem('UserDetails', JSON.stringify(isValidEmailResult.data.get_login_details.message));
            localStorage.setItem('remember_me', 'true');
            localStorage.setItem('user_img', isValidEmailResult.data.get_login_details.message.profile_img);
            localStorage.setItem('role', 'learner');
            this.router.navigate(['/Learner/MyCourse']);
          } else {
            this.toastr.error(isValidEmailResult.data.get_login_details.error_msg, null);
            sessionStorage.clear();
            localStorage.clear();
          }
        });
      } else {
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('adminDetails');
        sessionStorage.removeItem('token');
      }
    });
  }
/*
  portalToIggnite() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['email_id']) {
        this.learnerService.getLoginUserDetail(params.email_id).subscribe((isValidEmailResult: any) => {
          if (isValidEmailResult.data.get_login_details.success === true) {
            sessionStorage.setItem('token', isValidEmailResult.data.get_login_details.message.token);
            localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
            localStorage.setItem('Fullname', isValidEmailResult.data.get_login_details.message.full_name);
            sessionStorage.setItem('UserDetails', JSON.stringify(isValidEmailResult.data.get_login_details.message));
            sessionStorage.setItem('remember_me', 'true');
            sessionStorage.setItem('user_img', isValidEmailResult.data.get_login_details.message.profile_img);
            sessionStorage.setItem('role', 'learner');
            this.router.navigate(['/Learner/MyCourse']);
          } else {
            this.toastr.error(isValidEmailResult.data.get_login_details.error_msg, null);
            localStorage.clear();
            sessionStorage.clear();
          }
        });
      } else {
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('adminDetails');
      }
    });
  }*/

  get f() {
    return this.loginForm.controls;
  }
  checkCaptchaLogin(captchaRef) {
    if (this.recaptchaStr) {
      captchaRef.reset();
  }
    captchaRef.execute();
  }

  checkCaptchaForget(captchaForget) {
    if (this.recaptchaForgetStr) {
      captchaForget.reset();
  }
    captchaForget.execute();
  }
  checkCaptchaSignIn(captchaSignIn) {
    if (this.recaptchaSignInStr) {
      captchaSignIn.reset();
  }
    captchaSignIn.execute();
  }
  resolvedLogin(captchaResponse: string) {
    this.recaptchaStr = captchaResponse;
    if (this.recaptchaStr) {
      this.login();
    }
  }
  resolvedForget(captchaForgetResponse: string) {
    this.recaptchaForgetStr = captchaForgetResponse;
    if (this.recaptchaForgetStr) {
        this.forgotPassword();
    }
  }
  resolvedSignIn(captchaSignInResponse: string) {
    this.recaptchaSignInStr = captchaSignInResponse;
    if (this.recaptchaSignInStr) {
        this.Submit();
    }
  }
  login() {
    if (!this.loginForm.valid) {
      return this.validateAllFields(this.loginForm);
    }
    this.loader = true;
    var encryptedname = CryptoJS.AES.encrypt(this.loginForm.value.username.toLowerCase().trim(), this.secretKey.trim()).toString();
    var encryptedpassword = CryptoJS.AES.encrypt(this.loginForm.value.password, this.secretKey.trim()).toString();
    this.service.learner_login(encryptedname, encryptedpassword, this.recaptchaStr)
      .subscribe((loginresult: any) => {
        if (loginresult.data.learner_login) {
          if (loginresult.data.learner_login.success) {
            const userId = loginresult.data.learner_login.message.user_id;
            gtag('config', environment.gaTrackingId, {' user_id ': userId});
            gtag('set', 'user_properties', { ' crm_id ' : userId });
            this.loginMovement(loginresult);
            if (loginresult.data.learner_login?.message?.TFAsetup?.main_config_TFA) {
              if (loginresult.data.learner_login?.message?.TFAsetup?.user_config_TFA) {
                this.router.navigate(['/Learner/authentication']);
              } else {
                this.setAuthentication();
              }
            } else {
              this.setAuthentication();
            }
          } else {
            this.loader = false;
            this.loginForm.reset();
            this.toastr.error(loginresult.data.learner_login.error_msg, null);
          }
        } else {
          this.loader = false;
          this.loginForm.reset();
          this.toastr.warning('Please try again later', null);
        }
      });
  }

  setAuthentication() {
    const userDetail = JSON.parse(localStorage.getItem('UserDetails'));
    userDetail['specific_report_value'] = Math.floor(Math.random() * 1000000000).toString();
    localStorage.setItem('UserDetails', JSON.stringify(userDetail));
    if (userDetail.is_password_updated) {
      if (userDetail.org_type === 'Corporate') {
        this.router.navigate(['/Learner/upskillcalendar']);
      } else {
        this.router.navigate(['/Learner/MyCourse']);
      }
    } else {
      this.router.navigate(['/Learner/profile']);
    }
  }
  loginMovement(loginresult) {
    if (this.loginForm.value.remember_me === true) {
      localStorage.setItem('token', loginresult.data.learner_login.message.token);
    } else {
      localStorage.setItem('token', loginresult.data.learner_login.message.token);
    }
    localStorage.setItem('language', this.loginForm?.value?.language || 'en');
    localStorage.setItem('Fullname', loginresult.data.learner_login.message.full_name);
    const id = CryptoJS.AES.encrypt(loginresult.data.learner_login.message.user_id, this.secretKey.trim()).toString();
    loginresult.data.learner_login.message.user_id = id;
    loginresult.data.learner_login.message.specific_report_value = '';
    localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.learner_login.message));
    localStorage.setItem('remember_me', 'false');
    localStorage.setItem('user_img', loginresult.data.learner_login.message.profile_img);
    localStorage.setItem('role', 'learner');
    if (loginresult.data.learner_login && this.loginForm.value.remember_me === true) {
      localStorage.setItem('remember_me', 'true');
    } else {
      localStorage.setItem('remember_me', 'false');
    }
    setTimeout(() => {
      this.loader = false;
    }, 5000);
  }
  forgotusername(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

  reserPassword(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

  onSelection() {
    const selectedLanguage = this.selectedLanguage;
    localStorage.setItem('language', selectedLanguage);
    this.translate.use(localStorage.getItem('language'));
  }

    // To validate all fields after submit
    validateAllFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFields(control);
        }
      });
    }
    // Go to signin
    viewSignin() {
      this.signInPage = false;
      this.signUpPage = true;
      this.titleService.setTitle('Sign up');
      this.gaService.setInnerPage('Sign up');
      this.gettitleData();
      this.registerForm = this.formBuilder.group({
        recaptchaReactive: [null],
        title: ['', [Validators.required]],
        fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
          Validators.pattern(/^[-a-zA-Z-() ]+(\s+[-a-zA-Z-()]+)*$/)]],
          mobile: ['', [ Validators.minLength(10),  Validators.maxLength(10),
            Validators.pattern(/^[6-9]\d{9}$/)]],
        email: ['', [ Validators.minLength(6),
          Validators.maxLength(64), Validators.pattern(/^([A-Za-z]|[0-9])[A-Za-z0-9._-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})$/)]],
        termsandconditions: new FormControl('', [])
      }, {
      });
      setTimeout(()=>{
        this.captchaRef.reset();
      },1000)
    }

    onError(errorDetails: RecaptchaErrorParameters): void {
    }

  // get f() { return this.registerForm.controls; }

  Submit() {
      localStorage.removeItem('UserDetails');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('adminDetails');
      this.loader = true;
      this.fullname = this.registerForm.value.fullname.trimLeft();
      // this.registerForm.value.termsandconditions
      const encryptedmail = CryptoJS.AES.encrypt(this.registerForm.value.email.toLowerCase(), this.secretKey.trim()).toString();
      const encryptedname = CryptoJS.AES.encrypt(this.fullname, this.secretKey.trim()).toString();
      const encryptedmobile = CryptoJS.AES.encrypt(this.registerForm.value.mobile, this.secretKey.trim()).toString();
      this.service.user_registration(encryptedmail, encryptedname,
        encryptedmobile ?  encryptedmobile : '' ,
       this.registerForm.value.title , true, this.recaptchaSignInStr).subscribe((data: any) => {
      this.registerForm.reset();
      this.registerForm.setErrors(null); // could be removed
      this.registerForm.updateValueAndValidity();
      if (data.data.user_registration) {
        if (data.data.user_registration.success === 'true') {
          this.registerSuccess = true;
          this.toastr.success(data.data.user_registration.message, null);
          this.loader = false;
          this.registerForm.setErrors(null);
          this.signUpPage = false;
          this.signInPage = true;
          this.registerForm.reset();
        } else {
          this.toastr.error(data.data.user_registration.message, null);
          this.loader = false;
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

  technicalSupport() {
    window.open('https://lntedutech.com/support-form/', 'technical');
  }
  feedback() {
    window.open('https://lntedutech.com/feedback-form/', 'feedback');
  }

  gettitleData() {
    this.service.getRegisterTitle().subscribe((data: any) => {
    this.titleData = data.data.user_mstr_data.data;
    });
  }
  backToIn() {
    this.signUpPage = false;
    this.signInPage = true;
    this.registerForm.reset();
    setTimeout(()=>{
      this.captchaRef.reset();
    },1000)
  }

  openPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.lntedutech.collegeconnect', 'playStore');
  }

  onClose() {
    this.dialog.closeAll();
  }

  openTroubleshootPopup() {
    this.rightHeader = this.queries[0].commands;
    this.dialog.open(this.troubleshoot, {
    width: '90%',
    height: '85%',
    panelClass: 'qnatroubleshoot'
    });
    // console.log(this.queries);
  }

  showRightContent(data) {
    this.queries.forEach((value: any) => {
    if (value.title === data.title) {
    value.Active = true;
    } else {
    value.Active = false;
    }
    });
    this.rightHeader = data.commands;
  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }
}
