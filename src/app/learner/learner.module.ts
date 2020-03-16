// angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//local
import { GraphqlModule } from './../graphql/graphql.modules';
import { LoginComponent } from './../learner/pages/login/login.component';
import { CoursedetailsComponent } from './../learner/pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from './../learner/pages/registration/registration.component';
import { OtpComponent } from './../learner/pages/otp/otp.component';
import { PasswordComponent } from './../learner/pages/password/password.component';
//others
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule,} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursedetailsComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'password', component: PasswordComponent },
];

@NgModule({
  declarations: [LoginComponent,CoursedetailsComponent,RegistrationComponent,OtpComponent,PasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GraphqlModule,

    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule, MatRadioModule,
    MatCardModule,
    // MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class LearnerModule { }
