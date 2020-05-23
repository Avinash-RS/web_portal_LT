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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
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
import { SearchPipe } from '../pipes/search.pipe';
import { LearnerDashboardComponent } from './pages/learner-dashboard/learner-dashboard.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';


const routes: Routes = [
  { path: '', component: LearnerHomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { title: 'Learner Login' } },
  { path: 'courseDetail', component: CoursedetailsComponent, canActivate: [AuthGuard], data: { title: 'Course details' } },
  { path: 'register', component: RegistrationComponent, data: { title: 'Learner  Registration' } },
  { path: 'otp', component: OtpComponent, data: { title: 'Learner  Registration OTP' } },
  { path: 'password', component: PasswordComponent, data: { title: 'Learner  Registration Username/Password' } },
  { path: 'recover', component: ForgotUsernameAndPasswordComponent, data: { title: 'Learner  Forget Password' } },
  { path: 'recoverotp', component: RecoverFogotpasswordOTPComponent, data: { title: 'Learner  Forget Password OTP' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'Learner  Profile' } },
  { path: 'MyCourse', component: LearnerMyCourseComponent, canActivate: [AuthGuard], data: { title: 'Learner  MyCourse' } },
  { path: 'resetpassword', component: ResetpasswordComponent, data: { title: 'Learner   Reset password' } },
  { path: 'terms', component: TermsconditionsComponent, data: { title: 'Terms and conditions' } },
  { path: 'scorm', component: ScormplayerComponent, canActivate: [AuthGuard], data: { title: 'Course Player' } },
  { path: 'viewallcourses', component: ViewAllCoursesComponent, canActivate: [AuthGuard] },
  { path: 'Dashboard', component: LearnerDashboardComponent, canActivate: [AuthGuard] },



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
    SearchPipe,
    LearnerDashboardComponent,
    LandingpageComponent

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  imports: [
    CoreModule,
    Ng4LoadingSpinnerModule.forRoot(),
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
    MyDatePickerModule
  ],
  providers: [Apollo],
  entryComponents: []
})
export class LearnerModule { }
