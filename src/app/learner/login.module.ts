import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { PasswordComponent } from './pages/password/password.component';
import { MaskingPipePipe } from '@core/core/masking-pipe.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory, CoreModule } from '@core/core.module';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'College Connect Login' }
  },
  {
    path: 'Learner/login',
    component: LoginComponent,
    canActivate: [IsLoggedInAuthGuard],
    data: { title: 'College Connect Login' }
  },
  {
    path: 'Learner/authentication',
    component: NewHomeComponent,
    data: { title: 'Learner Login' }
  },
  {
    path: 'Learner/password',
    component: PasswordComponent,
    data: { title: 'Learner  Registration Username/Password' }
  },
  {
    path: 'Learner/resetpassword',
    component: ResetpasswordComponent,
    data: { title: 'Learner Reset password' }
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    PasswordComponent,
    ResetpasswordComponent,
    MaskingPipePipe,
    NewHomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CarouselModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    RecaptchaModule,
    RecaptchaFormsModule,
    NgOtpInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class LoginModule { }
