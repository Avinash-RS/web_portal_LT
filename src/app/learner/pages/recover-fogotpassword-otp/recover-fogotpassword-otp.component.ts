import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-fogotpassword-otp',
  templateUrl: './recover-fogotpassword-otp.component.html',
  styleUrls: ['./recover-fogotpassword-otp.component.scss']
})
export class RecoverFogotpasswordOTPComponent implements OnInit {
  recoverOTPForm: FormGroup;
  otp: any;
  mobile: any;
  timeLeft: number;
  interval;
  minutes: number;
  seconds: number;
  verifybutton = false;
  userId: any;
  email: string;
  details: any;
  constructor(  private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
                public translate: TranslateService,
                private router: Router,
                private toastr: ToastrService,
                public service: LearnerServicesService, ) {
      this.mobile = this.activatedRoute.snapshot.paramMap.get('mobile');
    }
    config = {
      allowNumbersOnly: true,
      length: 4,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        width: '40px',
        height: '40px',
      }
    };

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    const val = localStorage.getItem('Details_user');
    this.details = JSON.parse(val);

    this.recoverOTPForm = this.formBuilder.group({
      otp: new FormControl('', []),
  }, {
  });
    this.timer();
  }
  get f() { return this.recoverOTPForm.controls; }
  onOtpChange(otp) {
    this.otp = otp;
  }
  VerifyOTP() {
    this.service.user_registration_verify(this.otp, this.mobile).subscribe((data: any) => {
      if (data.data.user_registration_mobile_otp_verify.success === 'true') {
        
        Swal.fire(data.data.user_registration_mobile_otp_verify.message, null);
        localStorage.setItem('UserDetails', JSON.stringify(data.data.user_registration_mobile_otp_verify.data[0]));
        localStorage.setItem('role', 'learner');
        this.router.navigate(['Learner/resetpassword']);
      } else {
        
        this.toastr.error(data.data.user_registration_mobile_otp_verify.message, null);

      }
    });
  }
  timer() {
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft - this.minutes * 60;

      } else {
        this.verifybutton = true;
      }
    }, 1000);
  }

  resendcode() {
    this.service.submit_otp(this.details.user_id, 'this.details._id', this.mobile, this.details.data[0].value).subscribe((data: any) => {
      clearTimeout(this.interval);
      this.timer();
      
      Swal.fire(data.data.user_registration_mobile_otp_send.message, null);
  });
        }

}
