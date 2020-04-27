import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as myGlobals from '@core/globals';
import { TermsconditionsComponent } from '../termsconditions/termsconditions.component';
import {MatDialog} from '@angular/material/dialog';
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
  fullname: any;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private loader: Ng4LoadingSpinnerService,
      private alert: AlertServiceService,
      // private loader : NgxSpinnerService,
      // private cookieService: CookieService,
      public service : LearnerServicesService,
      public dialog: MatDialog
  ) {
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
         fullname: new FormControl('', myGlobals.fullnameVal),
          email: new FormControl('',myGlobals.emailVal),
          termsandconditions: new FormControl('', [])
      }, {
      });
  }

  // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
  get f() { return this.registerForm.controls; }

  Submit() {
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.loader.show();
    this.fullname=this.registerForm.value.fullname.trimLeft();
   this.service.user_registration(this.registerForm.value.email,this.fullname,this.registerForm.value.termsandconditions)
    .subscribe(data => {
          if (data.data['user_registration']['success'] == 'true') {
            this.alert.openAlert(data.data['user_registration'].message,null)
            localStorage.setItem('UserDetails',JSON.stringify(data.data['user_registration'].data))
            localStorage.setItem('role', 'learner')
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
  openDialog(): void {
    const dialogRef = this.dialog.open(TermsconditionsComponent, {
      width: '550px',
      height: '450px',
      data: {component: TermsconditionsComponent}
    });
  }

}