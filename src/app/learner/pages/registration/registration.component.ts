import { Component, OnInit } from '@angular/core';
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  yourValue: number;
  title = 'lxp';

  constructor(private router:Router) { }

  ngOnInit() {
    console.log('in reg')
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
  register() {
    this.router.navigate(['/otp']);
  }

}
