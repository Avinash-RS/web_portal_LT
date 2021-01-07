import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as myGlobals from '@core/globals';
import { LearnerServicesService } from '@learner/services/learner-services.service';
//import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

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

  constructor(public translate: TranslateService, private router: Router, private formBuilder: FormBuilder, public learnerService: LearnerServicesService,
             // public socketService: SocketioService,
              private service: LearnerServicesService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
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
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, []),
      language: new FormControl(false, [])
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
            localStorage.clear();
            localStorage.clear();
          }
        });  
      } else {
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('adminDetails');
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    var encryptedname = CryptoJS.AES.encrypt(this.loginForm.value.username.toLowerCase(), this.secretKey.trim()).toString();
    var encryptedpassword = CryptoJS.AES.encrypt(this.loginForm.value.password, this.secretKey.trim()).toString();
    this.service.login(encryptedname, encryptedpassword, false)
      .subscribe((loginresult: any) => {
        if (loginresult.data.login) {
          if (loginresult.data.login.success) {
          
            localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
            localStorage.setItem('Fullname', loginresult.data.login.message.full_name); // Added ny Mythreyi
              localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              localStorage.setItem('remember_me', 'false');
              localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              localStorage.setItem('role', 'learner');
              localStorage.setItem('token', loginresult.data.login.message.token);
              this.router.navigate(['/Learner/MyCourse']);
            if (loginresult.data.login && this.loginForm.value.remember_me === true) {
              localStorage.setItem('remember_me', 'true');
            } else {
              localStorage.setItem('remember_me', 'false');
            }
            this.router.navigate(['/Learner/MyCourse']);
          } else {
            this.loginForm.reset();
            this.toastr.error(loginresult.data.login.error_msg, null);
          }
        } else {
          this.loginForm.reset();
          this.toastr.warning('Please try again later', null);
        }
      });
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

}
