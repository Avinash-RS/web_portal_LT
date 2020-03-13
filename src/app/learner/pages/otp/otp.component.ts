import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router) { }

  ngOnInit() {
  }
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('[1-9]{1}[0-9]{9}')
  ]);
  otpverification(){
    // this.router.navigate(['/password']);
    this.showotp = true;
  }
  onOtpChange(otp) {
    this.otp = otp;
  }
}
