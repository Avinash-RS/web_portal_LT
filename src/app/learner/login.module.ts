import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { RegistrationComponent } from './pages/registration/registration.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PasswordComponent } from './pages/password/password.component';
import { ForgotUsernameAndPasswordComponent } from './pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from './pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';
import { MaskingPipePipe } from '@core/core/masking-pipe.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory, CoreModule } from '@core/core.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '@core/material.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
]

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    OtpComponent,
    PasswordComponent,
    ForgotUsernameAndPasswordComponent,
    RecoverFogotpasswordOTPComponent,
    MaskingPipePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class LoginModule { }
