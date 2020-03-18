import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-forgot-username-and-password',
  templateUrl: './forgot-username-and-password.component.html',
  styleUrls: ['./forgot-username-and-password.component.scss']
})
export class ForgotUsernameAndPasswordComponent implements OnInit {
  forgotUsername: FormGroup;
  ForgotpasswordForm: FormGroup;
  recoveryType: string;
  recoveryTypes: string[] = ['+917737924803', 'ankitkachhwahaha6@gmail.com'];
  constructor( private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.forgotUsername = this.formBuilder.group({
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}\1*$/)]),
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    }, {
  });

  this.ForgotpasswordForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/), Validators.minLength(3), Validators.maxLength(20)]),
  }, {
});
  }
  get f() { return this.forgotUsername.controls; }
  get Fp() { return this.ForgotpasswordForm.controls; }
  forgotPassword(){
  
  }
  forgotusername(){

  }

  
}
