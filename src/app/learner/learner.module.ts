// Created by Mythreyi
// angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// others
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng5SliderModule } from 'ng5-slider';
import { MyDatePickerModule } from 'mydatepicker';
// local
import { MaskingPipePipe } from '@core/core/masking-pipe.pipe';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { LoginComponent } from '@learner/pages/login/login.component';
import { CoursedetailsComponent } from '@learner/pages/coursedetails/coursedetails.component';
import { RegistrationComponent } from '@learner/pages/registration/registration.component';
import { OtpComponent } from '@learner/pages/otp/otp.component';
import { PasswordComponent } from '@learner/pages/password/password.component';
import { LearnerHomeComponent } from '@learner/pages/learner-home/learner-home.component';
import { ForgotUsernameAndPasswordComponent } from '@learner/pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from '@learner/pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';
import { ProfileComponent } from '@learner/pages/profile/profile.component';
import { LearnerMyCourseComponent } from '@learner/pages/learner-my-course/learner-my-course.component';
import { ResetpasswordComponent } from '@learner/pages/resetpassword/resetpassword.component';
import { TermsconditionsComponent } from '@learner/pages/termsconditions/termsconditions.component';
import { ScormplayerComponent } from './pages/scormplayer/scormplayer.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ViewAllCoursesComponent } from './pages/view-all-courses/view-all-courses.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingModule } from 'ng-starrating';
// import { SearchPipe } from '../pipes/search.pipe';
import { PipeModule } from '../pipes/pipe.module';
import { LearnerDashboardComponent } from './pages/learner-dashboard/learner-dashboard.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';
const routes: Routes = [
<<<<<<< HEAD
  { path: '', component: LandingpageComponent , canActivate: [AuthGuard], data: { title: 'Welcome to LXP' } },
  { path: 'login', component: LandingpageComponent, canActivate: [AuthGuard], data: { title: 'Learner Login' } },
=======
  // { path: '', component: LandingpageComponent , canActivate: [AuthGuard], data: { title: 'Welcome to LXP' } },
  { path: '', component: LoginComponent , canActivate: [AuthGuard], data: { title: 'Learner Login' } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { title: 'Learner Login' } },
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
  { path: 'courseDetail', component: CoursedetailsComponent, canActivate: [AuthGuard], data: { title: 'Course details' } },
  { path: 'register', component: LandingpageComponent, data: { title: 'Learner  Registration' } },
  { path: 'otp', component: LandingpageComponent, data: { title: 'Learner  Registration OTP' } },
  { path: 'password', component: LandingpageComponent, data: { title: 'Learner  Registration Username/Password' } },
  { path: 'recover', component: LandingpageComponent, data: { title: 'Learner  Forget Password' } },
  { path: 'recoverotp', component: LandingpageComponent, data: { title: 'Learner  Forget Password OTP' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'Learner  Profile' } },
<<<<<<< HEAD
  { path: 'MyCourse', component: LearnerMyCourseComponent, canActivate: [AuthGuard], data: { title: 'Learner  MyCourse' } },
  { path: 'resetpassword', component: LandingpageComponent, data: { title: 'Learner   Reset password' } },
=======

  // { path: 'MyCourse', component: LearnerMyCourseComponent, canActivate: [AuthGuard], data: { title: 'Learner  MyCourse' } },
  { path: 'Thankyou', component: LearnerMyCourseComponent, canActivate: [AuthGuard], data: { title: 'Thank you' } },
  { path: 'home', component: NewHomeComponent, canActivate: [AuthGuard], data: { title: 'Learner home' }},
  { path: 'forbidden', component: ForbiddenComponent, data: { title: 'Learner Change email' } },
  { path: 'resetpassword', component: ResetpasswordComponent, data: { title: 'Learner   Reset password' } },
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
  { path: 'terms', component: TermsconditionsComponent, data: { title: 'Terms and conditions' } },
  { path: 'scorm', component: ScormplayerComponent, canActivate: [AuthGuard], data: { title: 'Course Player' } },
  { path: 'viewallcourses', component: ViewAllCoursesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: LearnerDashboardComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: LearnerHomeComponent, canActivate: [AuthGuard], data: { title: 'Learner home' }}


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
    LearnerMyCourseComponent,
    ResetpasswordComponent,
    TermsconditionsComponent,
    ScormplayerComponent,
    MaskingPipePipe,
    ViewAllCoursesComponent,
    // SearchPipe,
    LearnerDashboardComponent,
    LandingpageComponent,
    ForbiddenComponent,
    NewHomeComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  imports: [
    CoreModule,
    PipeModule,
    // Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    FormsModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    NgOtpInputModule,
    NgxPaginationModule,
    MyDatePickerModule,
    RatingModule
  ],
  providers: [
    Apollo,
    // { provide: Window, useValue: window }
  ],
  entryComponents: [CategoryComponentComponent]
})
export class LearnerModule { }
