import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as myGlobals from '@core/globals';
import { TermsconditionsComponent } from '../termsconditions/termsconditions.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    public service: LearnerServicesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: new FormControl('', myGlobals.fullnameVal),
      email: new FormControl('', myGlobals.emailVal),
      termsandconditions: new FormControl('', [])
    }, {
    });
  }

  get f() { return this.registerForm.controls; }

  Submit() {
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');

    this.loader.show();
    this.fullname = this.registerForm.value.fullname.trimLeft();
    // this.registerForm.value.termsandconditions
    this.service.user_registration(this.registerForm.value.email, this.fullname, true ).subscribe((data: any) => {
    this.registerForm.reset();
    if (data.data.user_registration) {
      if (data.data.user_registration.success === 'true') {
        this.toastr.success(data.data.user_registration.message, null);
        this.loader.hide();
      } else {
        this.toastr.error(data.data.user_registration.message, null);
        this.loader.hide();
      }
     } else {
      this.toastr.warning('Please try after sometime', null);
     }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.Submit();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TermsconditionsComponent, {
      width: '550px',
      height: '450px',
      data: { component: TermsconditionsComponent }
    });
  }

}
