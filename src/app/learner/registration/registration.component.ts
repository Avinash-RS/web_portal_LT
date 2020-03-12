import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  showCard: boolean;
  yourValue: number;
  showmailCard: boolean = true;
  title = 'lxp';
  userCard: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
    Validators.minLength(6),
    Validators.maxLength(64)
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$'),
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('[1-9]{1}[0-9]{9}')
  ]);
  username = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]*$'),
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}'),
    // Validators.pattern('/^[A-Za-z 0-9]+$/')
  ]);
  matcher = new MyErrorStateMatcher();

  register() {
    this.showCard = false;
    this.showmailCard = false;
    this.userCard = true;
  }
  otpverification() {
    this.userCard = true;
    this.showCard = false;
    this.showmailCard = false;
  }

}
