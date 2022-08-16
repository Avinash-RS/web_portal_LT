import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PlatformLocation } from '@angular/common' ;
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  loader;
  authCode;
  qrCode;
  userDetail;
  secondStep = false;
  recaptchaStr = '';
  rightHeader;
  siteKey: any = environment.captachaSiteKey;
  secretKey = '(!@#Passcode!@#)';
  @ViewChild('captchaRef') captchaRef;
  @ViewChild('authInput') authInput;
  @ViewChild('troubleshoot') troubleshoot: TemplateRef<any>;
  @HostListener('window:beforeunload', ['$event'])
  clearStorage($event: any) {
    localStorage.clear();
    sessionStorage.clear();
  }
  currentYear = new Date().getFullYear();
  carourselSection: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplaySpeed: 500,
    dotsSpeed: 1000,
    margin: 20,
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
  @HostListener('window:popstate', ['$event'])
  clearStorage1($event: any) {
    localStorage.clear();
    sessionStorage.clear();
  }
  constructor(public translate: TranslateService, public learnerService: LearnerServicesService, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private gs: GlobalServiceService, private router: Router, private toastr: ToastrService, location: PlatformLocation) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    // location.onPopState(() => {
    //   localStorage.clear();
    //   sessionStorage.clear();
    // });
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails'));
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/Learner/login');
    }
    if(token && this.userDetail.specific_report_value){
      this.router.navigateByUrl('/Landing/MyCourse');
    }
  }
  ngOnInit() {
    if (this.userDetail?.TFAsetup?.dataURL) {
      this.qrCode = this.userDetail?.TFAsetup?.dataURL;
      this.secondStep = false;
    } else {
      this.qrCode = null;
      this.secondStep = true;
    }
    setTimeout(() => {
      this.captchaRef.reset();
    }, 1000);
  }

  onAuthChange(auth) {
    this.authCode = auth;
  }

  backToIn() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/Learner/login');
  }
  onClose() {
    this.dialog.closeAll();
  }
  verifyAuth() {
    this.loader = true;
    if (this.authCode && this.authCode.length === 6) {
      this.learnerService.verifyAuth(this.authCode, this.userDetail.user_id).subscribe((response: any) => {
        if (response?.data?.verify_tfa_setup?.success) {
          this.userDetail['specific_report_value'] = Math.floor(Math.random() * 1000000000).toString();
          localStorage.setItem('UserDetails', JSON.stringify(this.userDetail));
          if (this.userDetail.is_password_updated) {
            if (this.userDetail.org_type === 'Corporate') {
              this.router.navigate(['/Learner/upskillcalendar']);
            } else {
              this.router.navigate(['/Landing/MyCourse']);
            }
          } else {
            this.router.navigate(['/Learner/profile']);
          }
          setTimeout(() => {
            this.loader = false;
          }, 1000);
        } else {
          this.loader = false;
          this.authInput.setValue('');
          this.toastr.warning(response?.data?.verify_tfa_setup?.message);
        }
      });
    } else {
      this.loader = false;
      this.toastr.warning('Enter the code');
    }
  }

  checkCaptchaReset2FA(captchaRef) {
    if (this.recaptchaStr) {
      captchaRef.reset();
  }
    captchaRef.execute();
  }

  resolvedReset2FA(captchaResponse: string) {
    this.recaptchaStr = captchaResponse;
    if (this.recaptchaStr) {
      this.resetAuth();
    }
  }

  resetAuth() {
    const encryptedmail = CryptoJS.AES.encrypt(this.userDetail.username, this.secretKey.trim()).toString();
    this.learnerService.forgotUsernameandPassword('2fa', 'domain', '', encryptedmail , this.recaptchaStr)
      .subscribe((data: any) => {
        this.loader = true;
        if (data?.data?.get_forgot_username_mobile_email?.success === 'true') {
          this.toastr.success('Reset link has been sent to your registered mail account.');
          this.loader = false;
          this.backToIn();
        } else {
          this.toastr.error(data?.data?.get_forgot_username_mobile_email?.message);
          this.loader = false;
        }
      },
      err => {
        this.toastr.error('Something went wrong');
      });
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
  openGooglePlay() {
    window.open("https://play.google.com/store/apps/details?id=com.lntedutech.collegeconnect", 'googlePlay');
  }
  openPlayStore() {
    window.open("https://apps.apple.com/in/app/l-t-edutech-collegeconnect/id1625255324", 'playStore');
  }
}

