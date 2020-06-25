import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as myGlobals from '@core/globals';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  currentUser: any = []
  otpForm: FormGroup;
  systemip: String;
  otp: any;
  isLinkActive: boolean = false;
  showotp: boolean = false;
  isenable: boolean = true;
  showverify: boolean = false;
  email: any;
  useridData: any;
  userid: any;
  timeLeft: number;
  interval;
  status: string;
  minutes: number;
  seconds: number;
  verifybutton: Boolean = false;
  resendtimeLeft: number = 60;
  resendLabel: Boolean = false;
  otpFeature: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loader: Ng4LoadingSpinnerService,
    public service: LearnerServicesService,
    private activeroute: ActivatedRoute) {
    this.activeroute.queryParams.subscribe(params => {
      this.email = params["code"];
      this.otpFeature = params["otpstatus"];
      localStorage.setItem('OTPFeature', this.otpFeature);
      this.get_user_detail(this.email)
    })
  }


  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '40px',
      'border-radius': '4px'
    }
  };

  ngOnInit() {
    this.systemip = localStorage.getItem('Systemip')
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      otp: new FormControl("", []),
    }, {

    });
  }
  get f() { return this.otpForm.controls; }
  otpverification() {
    this.resendLabel = true;
    this.get_user_detail(this.email)
    this.loader.show();
    this.service.submit_otp(this.userid, this.currentUser._id, this.otpForm.value.mobile, this.email).subscribe(data => {
      if (this.otpFeature == 'true') {
        if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
          this.loader.hide();
          Swal.fire(data.data['user_registration_mobile_otp_send']['message'], null)
          this.isenable = false;
          this.showotp = true;
          //Timer
          this.timeLeft = 60;
          this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
              this.timeLeft--;
              this.minutes = Math.floor(this.timeLeft / 60);
              this.seconds = this.timeLeft - this.minutes * 60;

            } else {
              this.verifybutton = true;
            }
          }, 1000)
        }
      } else {
        this.router.navigate(['Learner/password']);
      }

    })

  }
  onOtpChange(otp) {
    this.otp = otp;
  }
  otpverify() {
    this.service.user_registration_verify(this.otp, this.otpForm.value.mobile).subscribe(data => {
      if (data.data['user_registration_mobile_otp_verify']['success'] == 'true') {
        this.toastr.success(data.data['user_registration_mobile_otp_verify'].message, null)
        this.showotp = true;
        localStorage.setItem("key", this.userid)
        this.router.navigate(['Learner/password']);
      } else {
        this.otpForm.setValue({ mobile: this.otpForm.value.mobile, otp: '' })
        this.toastr.error(data.data['user_registration_mobile_otp_verify'].message, null)
        this.showotp = false;
        this.isenable = true;
      }
    })

  }
  Resendcode() {
    this.loader.show();
    this.service.submit_otp(this.userid, 'this.currentUser._id', this.otpForm.value.mobile, this.email).subscribe(data => {
      this.otp = '';
      if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
        this.loader.hide();
        Swal.fire(data.data['user_registration_mobile_otp_send']['message'], null)
        if (data.data['user_registration_mobile_otp_send']['data'].status == true) {
          this.showotp = true;
        } else {
          this.showotp = false;
        }

        clearTimeout(this.interval);
        this.interval = setInterval(() => {
          if (this.resendtimeLeft > 0) {
            this.resendtimeLeft--;
            this.minutes = Math.floor(this.resendtimeLeft / 60);
            this.seconds = this.resendtimeLeft - this.minutes * 60;

          } else {
            this.verifybutton = true;
          }
        }, 1000)
      }
    })
  }
  correctotp() {
    // this.showverify = true;
  }
  get_user_detail(email) {
    try {
      this.service.get_user_detail(email).subscribe(data => {
        this.useridData = data.data
        this.userid = this.useridData.get_user_detail.message[0].user_id;
        localStorage.setItem("key", this.userid)
        this.isLinkActive = this.useridData.get_user_detail.message[0].email_verify.flag;
      })
    } catch (error) {
      throw error
    }
  }
}
