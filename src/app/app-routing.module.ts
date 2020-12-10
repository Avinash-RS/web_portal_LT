import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { LoginComponent } from '@learner/pages/login/login.component';
import { AuthGuard } from '@core/services/_helpers';
import { RegistrationComponent } from '@learner/pages/registration/registration.component';
import { OtpComponent } from '@learner/pages/otp/otp.component';
import { PasswordComponent } from '@learner/pages/password/password.component';
import { ForgotUsernameAndPasswordComponent } from '@learner/pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from '@learner/pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'Learner Login' }
  },
  {
    path: 'Learner/login',
    component: LoginComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'Learner Login' }
  },
  {
    path: 'Learner/register',
    component: RegistrationComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { animation: 'Learner  Registration' }
  },
  {
    path: 'Learner/otp',
    component: OtpComponent,
    // canActivate: [AuthGuard],
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'Learner  Registration OTP' }
  },
  {
    path: 'Learner/password',
    component: PasswordComponent,
    // canActivate: [AuthGuard],
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'Learner  Registration Username/Password' }
  },
  {
    path: 'Learner/recover',
    component: ForgotUsernameAndPasswordComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { animation: 'Learner Forget Password' }
  },
  {
    path: 'Learner/recoverotp',
    component: RecoverFogotpasswordOTPComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'Learner Forget Password OTP' }
  },

  // {
  //   path: '',
  //   loadChildren: './learner/learner.module#LearnerModule',
  //    data : {title: 'Welcome to EduTech'}
  // },

  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule',
    canLoad: [AuthGuard],
    data : {animation: 'Learner'}
  },
  // {
  //   path: 'Admin',
  //   loadChildren: './admin/admin.module#AdminModule',
  //   data : {title: 'Admin '}
  // },
  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title: 'Player'}
  },
  // {
  //   path: '*',
  //   // loadChildren: './wca/wca.module#WcaModule',
  //   data : {title: 'Web Content Authoring'}
  // },
  {path: '**', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
