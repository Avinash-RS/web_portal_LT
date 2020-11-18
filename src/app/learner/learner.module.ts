// Created by Mythreyi
// angular imports
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// others
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng5SliderModule } from 'ng5-slider';
import { MyDatePickerModule } from 'mydatepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';

import { MaskingPipePipe } from '@core/core/masking-pipe.pipe';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { LoginComponent } from '@learner/pages/login/login.component';
// import { NewHomeComponent } from '@learner/pages/new-home/new-home.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { SearchPipe } from '../pipes/search.pipe';
import { LearnerDashboardComponent } from './pages/learner-dashboard/learner-dashboard.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { LearnerCalendarComponent } from './pages/learner-calendar/learner-calendar.component';
import { ViewAllnotificationsComponent } from './pages/view-allnotifications/view-allnotifications.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { LearnermycourseService } from './pages/learner-my-course/learnermycourse.service';
import { PerformancePageMobileComponent } from './pages/performance-page-mobile/performance-page-mobile.component';
import { SelfLearnerAvtivityComponent } from './pages/self-learner-avtivity/self-learner-avtivity.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { DiscussionForumComponent } from './pages/discussion-forum/discussion-forum.component';
import { LearnerActivityCenterComponent } from './pages/learner-activity-center/learner-activity-center.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActivitycenterhomescreenComponent } from './pages/activitycenterhomescreen/activitycenterhomescreen.component';
import { InstructorLedComponent } from './pages/instructor-led/instructor-led.component';
import { KnowledgeResourceHomeComponent } from './pages/knowledge-resource-home/knowledge-resource-home.component';
import { KnowledgeLandingPageComponent } from './pages/knowledge-landing-page/knowledge-landing-page.component';
import { KnowledgePreviewComponent } from './pages/knowledge-preview/knowledge-preview.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from '../pipes/filter.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VideoPreviewModalComponent } from './pages/video-preview-modal/video-preview-modal.component';
import { ProjectMobileComponent } from './pages/project-mobile/project-mobile.component';
import { PerformVideoRecordComponent } from './pages/perform-video-record/perform-video-record.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { VideoRecorderComponent } from './pages/video-recorder/video-recorder.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


const routes: Routes = [
  // { path: '', component: LandingpageComponent , canActivate: [AuthGuard], data: { title: 'Welcome to LXP' } },
  // { path: 'login', component: LandingpageComponent, canActivate: [AuthGuard], data: { title: 'Learner Login' } },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { title: 'Learner Login' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { title: 'Learner Login' }
  },
  {
    path: 'courseDetail',
    component: CoursedetailsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'Course details' }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: { animation: 'Learner  Registration' }
  },
  {
    path: 'otp',
    component: OtpComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Learner  Registration OTP' }
  },
  {
    path: 'password',
    component: PasswordComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Learner  Registration Username/Password' }
  },
  {
    path: 'recover',
    component: ForgotUsernameAndPasswordComponent,
    data: { animation: 'Learner Forget Password' }
  },
  {
    path: 'recoverotp',
    component: RecoverFogotpasswordOTPComponent,
    data: { title: 'Learner Forget Password OTP' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'Learner  Profile' }
  },
  {
    path: 'MyCourse',
    component: LearnerMyCourseComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'Learner  MyCourse' }
  },
  {
    path: 'selfLearning',
    component: SelfLearnerAvtivityComponent,
    // resolve: {
    //   data: LearnermycourseService
    //   },
    // canActivate: [AuthGuard],
    data: { animation: 'Self Learner Avtivity' }
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    data: { title: 'Learner Reset password' }
  },

  {
    path: 'calendar',
    component: LearnerCalendarComponent,
    data: { animation: 'Calendar' }
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    data: { animation: 'Calendar' }
  },
    {
    path: 'activitycenter',
    component: LearnerActivityCenterComponent,
    data: { animation: 'activitycenter' }
  },

  {

    path: 'discussionForum',
    component: DiscussionForumComponent,
    data: { animation: 'Discussion Forum' }
  },

  {
    path: 'activitycenterhomescreen',
    component: ActivitycenterhomescreenComponent,
    data: { animation: 'activitycenterhomescreen' }

  },
  {
    path: 'knowledge',
    component: KnowledgeResourceHomeComponent,
    data: { animation: 'activitycenterhomescreen' }
  },
  {
    path: 'knowledge/preview',
    component: KnowledgeLandingPageComponent,
    data: { animation: 'activitycenterhomescreen' }
  },
  // {
  //   path: 'terms',
  //   component: TermsconditionsComponent,
  //   data: { title: 'Terms and conditions' }
  // },
  // {
  //   path: 'scorm',
  //   component: ScormplayerComponent,
  //   canActivate: [AuthGuard],
  //   data: { title: 'Course Player' }
  // },
  {
    path: 'viewallcourses',
    component: ViewAllCoursesComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'dashboard',
  //   component: LearnerDashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'home',
  //   component: LearnerHomeComponent,
  //   canActivate: [AuthGuard],
  //   data: { animation: 'Learner home' }
  // },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    data: { title: 'Learner Change email' }
  },
  {
    path: 'viewAllnotifications',
    component: ViewAllnotificationsComponent,
  },
  {
    path: 'instructorLed',
    component: InstructorLedComponent,
    data: { animation: 'Learner  MyCourse' }
  }
  // { path: 'new-home', component: NewHomeComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    // NewHomeComponent,
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
    ForbiddenComponent,
    NewHomeComponent,
    ViewAllCoursesComponent,
    // SearchPipe,
    LearnerDashboardComponent,
    LandingpageComponent,
    LearnerCalendarComponent,
    ViewAllnotificationsComponent,
    PerformancePageMobileComponent,
    SelfLearnerAvtivityComponent,
    ActivitiesComponent,
    DiscussionForumComponent,
    LearnerActivityCenterComponent,
    ActivitycenterhomescreenComponent,
    InstructorLedComponent,
    KnowledgePreviewComponent,
    KnowledgeLandingPageComponent,
    KnowledgeResourceHomeComponent,
    VideoPreviewModalComponent,
    ProjectMobileComponent,
    PerformVideoRecordComponent,
    AssignmentComponent,
    VideoRecorderComponent
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
    MatMenuModule,
    AngularEditorModule,
    ChartsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      // set defaults here
      // radius: 10,
      // outerStrokeWidth: 10,
      // innerStrokeWidth: 8,
      // outerStrokeColor: '#78C000',
      // innerStrokeColor: '#C7E596',
      // animationDuration: 300,
    }),
    NgxMaskModule.forChild(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    Ng5SliderModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    NgOtpInputModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    MyDatePickerModule,
    InfiniteScrollModule,
    PdfJsViewerModule,
    RatingModule,
    NgCircleProgressModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    NgxSkeletonLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AgGridModule.withComponents([])
  ],
  exports: [
    // MatMenuModule
  ],
  providers: [
    Apollo
    // { provide: Window, useValue: window }
  ],
  entryComponents: [CategoryComponentComponent, KnowledgePreviewComponent,VideoPreviewModalComponent]
})
export class LearnerModule { }
