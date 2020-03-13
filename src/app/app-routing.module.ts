import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './learner/pages/login/login.component';
import { CoursedetailsComponent } from './learner/pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from './learner/pages/registration/registration.component';
import { OtpComponent } from './learner/pages/otp/otp.component';
import { PasswordComponent } from './learner/pages/password/password.component';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: CoursedetailsComponent
  },
  {
    path: 'courses',
    component: CoursedetailsComponent
  },
  {
    path: 'reg',
    component: RegistrationComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: '**',
    component: RegistrationComponent
  },
  // {
  //     path: '',
  //     redirectTo: '/login',
  //     pathMatch: 'full'
  // },
  // {
  //     path: '**',
  //     component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
