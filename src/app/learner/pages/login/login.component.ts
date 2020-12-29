import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { LearnerServicesService } from '@learner/services/learner-services.service';
//import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public translate: TranslateService, private router: Router, private formBuilder: FormBuilder,
             // public socketService: SocketioService,
              private service: LearnerServicesService, private toastr: ToastrService) {
      this.languages = [{lang: 'ta' , languagename: 'Tamil' } , { lang: 'en' , languagename: 'English'  }] ;

      // translate.addLangs(['en', 'ta']);
      // translate.setDefaultLang('en');
      // const browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.loginForm = this.formBuilder.group({
      // username: new FormControl('', myGlobals.req),
      username: ['',  myGlobals.req],
      password: new FormControl('', myGlobals.req),
      remember_me: new FormControl(false, []),
      language: new FormControl(false, [])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.service.login(this.loginForm.value.username, this.loginForm.value.password, false)
      .subscribe((loginresult: any) => {
        if (loginresult.data.login) {
          if (loginresult.data.login.success) {
          
            localStorage.setItem('language', this.loginForm?.value?.language || 'en'  );
            localStorage.setItem('Fullname', loginresult.data.login.message.full_name); // Added ny Mythreyi
              sessionStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
              sessionStorage.setItem('remember_me', 'false');
              sessionStorage.setItem('user_img', loginresult.data.login.message.profile_img);
              sessionStorage.setItem('role', 'learner');
              sessionStorage.setItem('token', loginresult.data.login.message.token);
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
