//Created by Mythreyi
// angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { NgxMaskModule } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
//local
import { LoginComponent } from '@learner/pages/login/login.component';
import { CoursedetailsComponent } from '@learner/pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from '@learner/pages/registration/registration.component';
import { OtpComponent } from '@learner/pages/otp/otp.component';
import { PasswordComponent } from '@learner/pages/password/password.component';
import { MaterialModule } from '@core/material.module';
import { LearnerHomeComponent } from '@learner/pages/learner-home/learner-home.component';
import { ForgotUsernameAndPasswordComponent } from '@learner/pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from '@learner/pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';
import { ProfileComponent } from '@learner/pages/profile/profile.component';
import { LearnerMyCourseComponent } from '@learner/pages/learner-my-course/learner-my-course.component';
import { CourseComponentComponent } from '@core/shared/course-component/course-component.component';
import { TopCoursesComponent } from '@core/shared/top-courses/top-courses.component';
import { RecomendedCoursesComponent } from '@core/shared/recomended-courses/recomended-courses.component';
import { WishlistCoursesComponent } from '@core/shared/wishlist-courses/wishlist-courses.component';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { ResetpasswordComponent } from '@learner/pages/resetpassword/resetpassword.component';
import { TermsconditionsComponent } from '@learner/pages/termsconditions/termsconditions.component';
import { ScormplayerComponent } from './pages/scormplayer/scormplayer.component';
//others

const routes: Routes = [
  { path: '', component: LearnerHomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'courseDetail', component: CoursedetailsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent, },
  { path: 'otp', component: OtpComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'recover', component: ForgotUsernameAndPasswordComponent },
  { path: 'recoverotp', component: RecoverFogotpasswordOTPComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'MyCourse', component: LearnerMyCourseComponent, canActivate: [AuthGuard] },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: "terms", component: TermsconditionsComponent },
  { path: 'scorm', component: ScormplayerComponent },
];

@NgModule({
  declarations: [
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
    TermsconditionsComponent,
    ScormplayerComponent
  ],


  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  imports: [
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxMaskModule.forChild(),
    FormsModule,
    //NgxPasswordToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    MaterialModule
  ],
  providers: [Apollo],
  entryComponents: []
})
export class LearnerModule { }
