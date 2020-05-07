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
  timeLeft: number;
  interval;
  minutes: number;
  seconds: number;
  verifybutton: Boolean = false;
  userId: any;
  email: string;
  details: any;
  constructor(  private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,  private alert: AlertServiceService,
    private loader : Ng4LoadingSpinnerService,
    private router: Router,
    public service : LearnerServicesService,) { 
      this.mobile = this.activatedRoute.snapshot.paramMap.get('mobile')
      console.log(this.mobile)
    }
    config = {
      allowNumbersOnly: true,
      length: 4,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder:'',
      inputStyles: {
        'width': '60px',
        'height': '60px',
        'background': '#B8D0FF'
      }
    }

  ngOnInit() {
    // this.userId=localStorage.getItem('Username');
    const val = localStorage.getItem('Details_user');
    // console.log(JSON.parse(val));
    this.details = JSON.parse(val)

    this.recoverOTPForm = this.formBuilder.group({
      otp: new FormControl("", []),
  }, {
  });
  this.timer();
  }
  get f() { return this.recoverOTPForm.controls; }
  onOtpChange(otp){
    this.otp = otp;
  }
  VerifyOTP(){
    this.loader.show();
    this.service.user_registration_verify(this.otp,this.mobile).subscribe(data => {
          if (data.data['user_registration_mobile_otp_verify']['success'] == 'true') {
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null);
            localStorage.setItem('UserDetails',JSON.stringify(data.data['user_registration_mobile_otp_verify'].data[0]))
            localStorage.setItem('role', 'learner')
            this.router.navigate(['Learner/resetpassword']);
          } else{
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null)
           
          }
      })
  }
  timer(){
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
         this.minutes = Math.floor(this.timeLeft/60);
        this.seconds = this.timeLeft -this.minutes * 60;

      } else {
        this.verifybutton = true;
      }
    }, 1000)
  }

  resendcode(){
    this.loader.show();
    this.service.submit_otp(this.details.user_id,'this.details._id',this.mobile,this.details.data[0].value).subscribe(data => {
      clearTimeout(this.interval);
      this.timer();
        this.loader.hide();
        this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'],null) 
  })
        } 

}
