import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
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
  constructor(private router:Router,  private formBuilder: FormBuilder,
    public service : LearnerServicesService) { }
  otp: any;
  showotp: boolean = false;

  @ViewChild('ngOtpInput') ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  ngOnInit() {
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    console.log(this.currentUser)
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}\1*$/)]),
      otp: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]{4}')]),
    }, {
  });
   
  }
  get f() { return this.otpForm.controls; }
  otpverification(){
    console.log( this.currentUser.user_id, this.currentUser._id,this.otpForm.value.mobile)
    this.service.submit_otp(this.currentUser.user_id,this.currentUser._id,this.otpForm.value.mobile).subscribe(data => {
        console.log(data.data['user_registration_mobile_otp_send'])
          if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
            console.log('in')
            alert(data.data['user_registration_mobile_otp_send'].message)
            this.showotp = true;
          
          } 
      })
  
  }
  onOtpChange(otp) {
    this.otp = otp;

  }
  otpverify(){
    console.log(this.otpForm.value.mobile,this.otpForm.value.otp)
    this.service.user_registration_verify(this.otpForm.value.mobile,this.otpForm.value.otp).subscribe(data => {
        console.log(data.data['user_registration_mobile_otp_verify'])
          if (data.data['user_registration_mobile_otp_verify']['success'] == 'true') {
            console.log('in')
            alert(data.data['user_registration_mobile_otp_verify'].message)
            this.showotp = true;
            this.router.navigate(['/password']);
          } else{
            alert(data.data['user_registration_mobile_otp_verify'].message)
          }
      })

  }
  Resendcode(){
    
  }
  
  }
