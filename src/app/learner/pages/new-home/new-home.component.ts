import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PlatformLocation } from '@angular/common' ;
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
  @ViewChild('authInput') authInput;
  @HostListener('window:beforeunload', ['$event'])
  clearStorage($event: any) {
    localStorage.clear();
    sessionStorage.clear();
  }
  constructor(public translate: TranslateService, public learnerService: LearnerServicesService,
              private gs: GlobalServiceService, private router: Router, private toastr: ToastrService, location: PlatformLocation) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    location.onPopState(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails'));
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/Learner/login');
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
  }

  onAuthChange(auth) {
    this.authCode = auth;
  }

  backToIn() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/Learner/login');
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

  save() {
    console.log('enter');
  }
}

