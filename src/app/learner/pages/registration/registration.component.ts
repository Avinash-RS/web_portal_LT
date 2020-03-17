import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
// import { CookieService } from 'ngx-cookie-service';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
      private alert: AlertServiceService,
      private loader : NgxSpinnerService,
      // private cookieService: CookieService,
      public service : LearnerServicesService,
  ) {
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(3), Validators.maxLength(50)]),
          email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)]),
          termsandconditions: new FormControl('', [])
      }, {
      });
  }

  // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
  get f() { return this.registerForm.controls; }

  Submit() {
   this.service.user_registration(this.registerForm.value.email,this.registerForm.value.username,this.registerForm.value.termsandconditions)
    .subscribe(data => {
          this.loader.show();
          if (data.data['user_registration']['success'] == 'true') {
            this.alert.openAlert(data.data['user_registration'].message,null)
            localStorage.set('UserDetails',JSON.stringify(data.data['user_registration'].data))
            this.loader.hide();
            this.registerForm.reset();
          } else{
            this.alert.openAlert(data.data['user_registration'].message,null)
            this.loader.hide();
          }
      })
  }

  onSubmit() {
    console.log(this.registerForm.value.termsandconditions)
      if (this.registerForm.valid) {
          this.Submit();
      } 
  }

  signIn(){
    
  }
}