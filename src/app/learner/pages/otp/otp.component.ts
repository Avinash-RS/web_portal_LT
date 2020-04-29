import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import * as myGlobals from '@core/globals'; 

// import { CookieService } from 'ngx-cookie-service';
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
  systemip:String;
  otp: any;
  isLinkActive: boolean = false;
  showotp: boolean = false;
  isenable:boolean = true;
  showverify: boolean = false;
  email:any;
  useridData:any;
  userid:any;
  timeLeft: number = 60;
  interval;
  status: string;
  minutes: number;
  seconds: number;
  constructor(private router:Router,
      private formBuilder: FormBuilder,
      private alert: AlertServiceService,
      private loader:Ng4LoadingSpinnerService,
      public service : LearnerServicesService,
      private activeroute: ActivatedRoute) { 
        this.activeroute.queryParams.subscribe(params => {
          this.email = params["code"]
          this.get_user_detail(this.email)
        })
      }


  @ViewChild('ngOtpInput') ngOtpInput: any;
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
  };

  ngOnInit() {
  var user = localStorage.getItem('UserDetails')
  this.currentUser = JSON.parse(user);
  this.systemip = localStorage.getItem('Systemip')
  this.otpForm = this.formBuilder.group({
          mobile: new FormControl('', myGlobals.mobileVal),
          otp: new FormControl("", []),
          // otp2: new FormControl("", []),
          // otp3: new FormControl("", []),
          // otp4: new FormControl("", [])
}, {

});
}
get f() { return this.otpForm.controls; }
  otpverification(){
    this.get_user_detail(this.email)
    console.log('ddddddddddddddddddddddddddddd'+this.userid+this.currentUser._id+this.otpForm.value.mobile+this.email)
    this.loader.show();
    this.service.submit_otp(this.userid,this.currentUser._id,this.otpForm.value.mobile,this.email).subscribe(data => {
          if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'],null)
            this.isenable = false;
            this.showotp = true;
            //Timer
            this.timeLeft = 120;
            // if(this.timeLeft > 60){
              this.interval = setInterval(() => {
                if (this.timeLeft > 0) {
                  this.timeLeft--;
                   this.minutes = Math.floor(this.timeLeft/60);
                  this.seconds = this.timeLeft -this.minutes * 60;
    
                } else {
                  this.timeLeft = 0;
                  // this.verifybutton = true;
                }
              }, 1000)
            } 
      })
  
  }
  onOtpChange(otp) {
    this.otp = otp;
  }
  otpverify(){
    this.service.user_registration_verify(this.otp,this.otpForm.value.mobile).subscribe(data => {
          if (data.data['user_registration_mobile_otp_verify']['success'] == 'true') {
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null)
            this.showotp = true;
            localStorage.setItem("key",this.userid)
            this.router.navigate(['Learner/password']);
          } else{
            this.otpForm.setValue({mobile:this.otpForm.value.mobile,otp: ''})
            this.alert.openAlert(data.data['user_registration_mobile_otp_verify'].message,null)
            this.showotp = false;
            this.isenable = true;
          }
      })

  }
  Resendcode(){
    this.loader.show();
    this.service.submit_otp(this.userid,'this.currentUser._id',this.otpForm.value.mobile,this.email).subscribe(data => {
      this.otp = '';
      if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
        this.loader.hide();
        this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'],null)
        this.showotp = true;
      } 
  })
  }
  correctotp(){
    // this.showverify = true;
  }
  get_user_detail(email){
    console.log('email'+email)
    try {
      this.service.get_user_detail(email).subscribe(data => {
        this.useridData=data.data
        // console.log('email'+this.useridData.get_user_detail.message[0])
        this.userid =this.useridData.get_user_detail.message[0].user_id; 
        // this.userid= 'm6siev';
        this.isLinkActive = this.useridData.get_user_detail.message[0].email_verify.flag;
      })  
    } catch (error) {
        throw error 
    }
  }
  }
