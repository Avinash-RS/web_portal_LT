// angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
// import { CookieModule, CookieService } from 'ngx-cookie';
//local

import { LoginComponent } from './../learner/pages/login/login.component';
import { CoursedetailsComponent } from './../learner/pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from './../learner/pages/registration/registration.component';
import { OtpComponent } from './../learner/pages/otp/otp.component';
import { PasswordComponent } from './../learner/pages/password/password.component';
import { MaterialModule } from './../common/material.module';
//others

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursedetailsComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'password', component: PasswordComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    CoursedetailsComponent,
    RegistrationComponent,
    OtpComponent,
    PasswordComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],

  imports: [
    // CookieModule.forRoot() ,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class LearnerModule { }
