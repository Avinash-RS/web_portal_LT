import { Component, HostListener, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  loader;
  authCode;
  qrCode;
  userDetail
  @ViewChild('authInput') authInput;
  constructor(public translate: TranslateService, public learnerService: LearnerServicesService,
              private gs: GlobalServiceService, private router: Router,private toastr: ToastrService) {

  }
  @HostListener('window:resize', ['$event'])
  ngOnInit() {
    this.userDetail = this.gs.checkLogout();
    if(this.userDetail?.TFAsetup?.dataURL) {
      this.qrCode = this.userDetail?.TFAsetup?.dataURL;
    } else {
      this.qrCode = null;
    }
  }

  onAuthChange(auth){
    this.authCode = auth
  }

  backToIn() {
      localStorage.clear();
      sessionStorage.clear();
    this.router.navigateByUrl('/Learner/login');
  }

  verifyAuth(){
    if(this.authCode && this.authCode.length === 6) {
      this.learnerService.verifyAuth(this.authCode,this.userDetail.user_id).subscribe((response:any)=>{
        if(response?.data?.verify_tfa_setup?.success){
          this.router.navigate(['/Learner/MyCourse']);
        } else {
          this.toastr.warning(response?.data?.verify_tfa_setup?.message);
        }
      })
    } else {
      this.toastr.warning('Enter OTP')
    }
  }
}

