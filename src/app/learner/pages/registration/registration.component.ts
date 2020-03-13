import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LearnerServicesService } from '../../services/learner-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  userDetails: any;
  platform: string;
  is_staff: boolean;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      public service : LearnerServicesService,
  ) {
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(3), Validators.maxLength(50)]),
          email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      }, {
          // validator: MustMatch('password', 'confirmpassword')
      });
  }

  // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
  get f() { return this.registerForm.controls; }

  Submit() {
   this.service.user_registration(this.registerForm.value.email,this.registerForm.value.username)
    .subscribe(data => {
          if (data.data['user_registration']['success'] == 'true') {
            alert(data.data['user_registration'].message)
            localStorage.setItem('UserDetails',JSON.stringify(data.data['user_registration'].data))
            // this.router.navigate(['otp']);
            this.registerForm.reset();
          } else{
            alert(data.data['user_registration'].message)
          }
      })
  }

  onSubmit() {
      if (this.registerForm.valid) {
          this.Submit();
      } else {
          // Swal.fire({
          //     title: 'Required!',
          //     text: 'Please fill required details correctly',
          //     icon: 'error',
          //     confirmButtonText: 'OK'
          // })
          return;
      }
  }
}