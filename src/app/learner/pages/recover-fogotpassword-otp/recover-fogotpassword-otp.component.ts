import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder, FormControl } from '@angular/forms';
import { AlertServiceService } from 'src/app/./core/services/handlers/alert-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover-fogotpassword-otp',
  templateUrl: './recover-fogotpassword-otp.component.html',
  styleUrls: ['./recover-fogotpassword-otp.component.scss']
})
export class RecoverFogotpasswordOTPComponent implements OnInit {
  recoverOTPForm: FormGroup;
  otp: any;
  mobile: any;
  constructor(  private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,  private alert: AlertServiceService,
    private loader : Ng4LoadingSpinnerService,
    private router: Router,
    public service : LearnerServicesService,) { 
      this.mobile = this.activatedRoute.snapshot.paramMap.get('mobile')
      console.log(this.mobile)
    }

  ngOnInit() {

    this.recoverOTPForm = this.formBuilder.group({
      otp1: new FormControl("", []),
      otp2: new FormControl("", []),
      otp3: new FormControl("", []),
      otp4: new FormControl("", [])
  }, {
  });
  }
  get f() { return this.recoverOTPForm.controls; }
  VerifyOTP(){
    this.loader.show();
    this.otp = this.recoverOTPForm.value.otp1+this.recoverOTPForm.value.otp2+this.recoverOTPForm.value.otp3+this.recoverOTPForm.value.otp4
    this.service.user_registration_verify(this.otp,this.mobile).subscribe(data => {
          if (data.data['user_registration_mobile_otp_verify']['success'] == 'true') {
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null)
            localStorage.setItem('UserDetails',JSON.stringify(data.data['user_registration_mobile_otp_verify'].data[0]))
            localStorage.setItem('role', 'learner')
            this.router.navigate(['Learner/resetpassword']);
          } else{
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null)
           
          }
      })
  }

  resendcode(){

  }

}
