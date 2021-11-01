import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as myGlobals from '@core/globals';
import { LearnerServicesService } from '@learner/services/learner-services.service';
//import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '@learner/services/google-analytics.service';
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
  secretKey = "(!@#Passcode!@#)";
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
  recaptchaStr = '';
  recaptchaForgetStr = '';
  recaptchaSignInStr = '';
  getErrorMessage() {
    return this.username.hasError('required') ? 'Email or Username is required' :
        this.username.hasError('email') ? 'Please enter a valid email address' :
            '';
  }
  constructor(public translate: TranslateService, private router: Router, private formBuilder: FormBuilder, public learnerService: LearnerServicesService,public gaService:GoogleAnalyticsService,
             // public socketService: SocketioService,
              private service: LearnerServicesService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,private titleService: Title) {
      this.languages = [{lang: 'ta' , languagename: 'Tamil' } , { lang: 'en' , languagename: 'English'  }] ;
      // translate.addLangs(['en', 'ta']);
      // translate.setDefaultLang('en');
      // const browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    this.portalToIggnite();
    this.loginForm = this.formBuilder.group({
      // username: new FormControl('', myGlobals.req),
      username: ['',  myGlobals.req],
      signInrecaptchaReactive: [null],
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, []),
      language: new FormControl(false, [])
    });    
  }

  viewChange(){
    this.signInPage = false;
    this.forgotPage = true;
    this.titleService.setTitle('Forgot Password');
    this.gaService.setInnerPage('Forgot Password')
  }
  backToSignin(){
    this.forgotPage = false;
    this.signInPage = true;
    this.titleService.setTitle('Learner Login');
    this.gaService.setInnerPage('Learner Login')
    this.username.reset();
  }
  forgotPassword() {
      var encryptedmail = CryptoJS.AES.encrypt(this.username.value, this.secretKey.trim()).toString();
      this.service.forgotUsernameandPassword('password', 'email','', encryptedmail,this.recaptchaForgetStr)
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
        err =>{
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

  get f() {
    return this.loginForm.controls;
  }
  checkCaptchaLogin(captchaRef){
    if (this.recaptchaStr) {
      captchaRef.reset();
  }
  captchaRef.execute();
  }

  checkCaptchaForget(captchaForget){
    if (this.recaptchaForgetStr) {
      captchaForget.reset();
  }
  captchaForget.execute();
  }
  checkCaptchaSignIn(captchaSignIn){
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
  resolvedForget(captchaForgetResponse: string){
    this.recaptchaForgetStr = captchaForgetResponse;
    if (this.recaptchaForgetStr) {
        this.forgotPassword();
    }
  }
  resolvedSignIn(captchaSignInResponse: string){
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
    var encryptedname = CryptoJS.AES.encrypt(this.loginForm.value.username.toLowerCase(), this.secretKey.trim()).toString();
    var encryptedpassword = CryptoJS.AES.encrypt(this.loginForm.value.password, this.secretKey.trim()).toString();
    this.service.login(encryptedname, encryptedpassword, false,this.recaptchaStr)
      .subscribe((loginresult: any) => {
        // loginresult.data.login.message['TFAsetup'] = {
        //   'main_config_TFA':true,
        //   'dataURL': "data:image/png;base64,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",
        //   'user_config_TFA': true
        // }
        if(loginresult.data.login){
          if (loginresult.data.login.success) {
            if(loginresult.data.login?.message?.TFAsetup?.main_config_TFA){
              if(loginresult.data.login?.message?.TFAsetup?.user_config_TFA){
                this.router.navigate(['/Learner/authentication']);
              } else{
                this.router.navigate(['/Learner/MyCourse']);
              }
            } else {
              this.router.navigate(['/Learner/MyCourse']);
            }
            this.loginMovement(loginresult)
          } else {
            this.loader = false;
            this.loginForm.reset();
            this.toastr.error(loginresult.data.login.error_msg, null);
          }
        }
        else {
          this.loader = false;
          this.loginForm.reset();
          this.toastr.warning('Please try again later', null);
        }
        
      });
  }

  loginMovement(loginresult){
        if(this.loginForm.value.remember_me === true){
          localStorage.setItem('token', loginresult.data.login.message.token);
        }else{
          sessionStorage.setItem('token', loginresult.data.login.message.token);
        }
        localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
        localStorage.setItem('Fullname', loginresult.data.login.message.full_name);
        var id = CryptoJS.AES.encrypt(loginresult.data.login.message.user_id, this.secretKey.trim()).toString(); 
        loginresult.data.login.message.user_id = id
          localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
          localStorage.setItem('remember_me', 'false');
          localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
          localStorage.setItem('role', 'learner');
        if (loginresult.data.login && this.loginForm.value.remember_me === true) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.setItem('remember_me', 'false');
        }
        setTimeout(()=>{
          this.loader = false;
        },5000)
  }
  forgotusername(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

  reserPassword(type) {
    this.router.navigateByUrl('/Learner/recover', { state: { type } });
  }

  onSelection(lang) {
    const selectedLanguage = lang.value;
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
    viewSignin(){
      this.signInPage = false;
      this.signUpPage = true;
      this.titleService.setTitle('Sign up')
      this.gaService.setInnerPage('Sign up')
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
      var encryptedmail = CryptoJS.AES.encrypt(this.registerForm.value.email.toLowerCase(), this.secretKey.trim()).toString();
      var encryptedname = CryptoJS.AES.encrypt(this.fullname, this.secretKey.trim()).toString();
      var encryptedmobile = CryptoJS.AES.encrypt(this.registerForm.value.mobile, this.secretKey.trim()).toString();
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

  gettitleData() {
    this.service.getRegisterTitle().subscribe((data: any) => {
    this.titleData = data.data.user_mstr_data.data;
    });
  }
  backToIn(){
    this.signUpPage = false;
    this.signInPage = true;
    this.registerForm.reset();
  }
}
