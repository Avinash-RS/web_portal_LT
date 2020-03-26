// angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { BarRatingModule } from "ngx-bar-rating";
//local
import { HeaderComponent } from '../common/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { CoursedetailsComponent } from './pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { OtpComponent } from './pages/otp/otp.component';
import { PasswordComponent } from './pages/password/password.component';
import { MaterialModule } from '../common/material.module';
import { LearnerHomeComponent } from './pages/learner-home/learner-home.component';
import { ForgotUsernameAndPasswordComponent } from './pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from './pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LearnerMyCourseComponent } from './pages/learner-my-course/learner-my-course.component';
import { CourseComponentComponent } from '../common/learner/course-component/course-component.component';
import { TopCoursesComponent } from '../common/learner/top-courses/top-courses.component';
import { RecomendedCoursesComponent } from '../common/learner/recomended-courses/recomended-courses.component';
import { WishlistCoursesComponent } from '../common/learner/wishlist-courses/wishlist-courses.component';
import { AuthGuard } from './../common/_helpers/auth.guard';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ScormplayerComponent } from './pages/scormplayer/scormplayer.component';
//others

const routes: Routes = [
  { path: '', component: LearnerHomeComponent },
  { path: 'login', component: LoginComponent,   canActivate:[AuthGuard] },
  { path: 'courses', component: CoursedetailsComponent },
  { path: 'register', component: RegistrationComponent ,},
  { path: 'otp', component: OtpComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'recover', component: ForgotUsernameAndPasswordComponent },
  { path: 'recoverotp', component: RecoverFogotpasswordOTPComponent },
  { path: 'profile', component: ProfileComponent },
  { path : 'MyCourse', component : LearnerMyCourseComponent,   canActivate:[AuthGuard]},
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'scorm', component: ScormplayerComponent },

];

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    LearnerHomeComponent,
    CoursedetailsComponent,
    RegistrationComponent,
    OtpComponent,
    PasswordComponent,
    ForgotUsernameAndPasswordComponent,
    RecoverFogotpasswordOTPComponent,
    ProfileComponent,
    LearnerMyCourseComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,
    LearnerMyCourseComponent,
    ResetpasswordComponent,
    ScormplayerComponent
  ],
    

  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],

  imports: [
    // CookieModule.forRoot() ,
    // BarRatingModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class LearnerModule { }
