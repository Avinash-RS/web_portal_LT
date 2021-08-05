import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LearnerMyCourseComponent } from './pages/learner-my-course/learner-my-course.component';
import { LearnerNewMyCourseComponent } from './pages/learner-new-my-course/learner-new-my-course.component';
import { CoursedetailsComponent } from './pages/coursedetails/coursedetails.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import { MatMenuModule, MatSidenavModule, MatExpansionModule, MatStepperModule, DateAdapter } from '@angular/material';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '@core/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgOtpInputModule } from 'ng-otp-input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarModule } from 'angular-calendar';
import { PopoverModule } from "ngx-smart-popover";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InstructorLedComponent } from './pages/instructor-led/instructor-led.component';
import { DiscussionForumComponent } from './pages/discussion-forum/discussion-forum.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { ProjectMobileComponent } from './pages/project-mobile/project-mobile.component';
import { PerformancePageMobileComponent } from './pages/performance-page-mobile/performance-page-mobile.component';
import { CourseGalleryComponent } from './pages/course-gallery/course-gallery.component'
import { AskQuestionsComponent } from './pages/ask-questions/ask-questions.component';
import { CourseReportComponent } from './pages/course-report/course-report.component';
import { CalendarActivityComponent } from './pages/calendar-activity/calendar-activity.component';
import { ProgressionReportComponent } from './pages/progression-report/progression-report.component';
import { QuestionanswerComponent } from './pages/QandA/questionanswer.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
  
}

const routes: Routes = [
  {
    path: 'MyCourse',
    component: LearnerNewMyCourseComponent,
    // canLoad: [AuthGuard],
    data: { animation: 'Learner  MyCourse' , title: 'My Courses'}
  },
  {
    path: 'courseDetail',
    component: CoursedetailsComponent,
    // canLoad: [AuthGuard],
    data: { animation: 'Course details', title: 'Course Player'}
  },
  {
    path: 'discussionForum',
    component: DiscussionForumComponent,
    data: { animation: 'Discussion Forum', title: 'Discussion Forum'}
  },
  {
    path: 'instructorLed',
    component: InstructorLedComponent,
    data: { animation: 'Learner  MyCourse', title: 'Live Interactions'}
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    data: { animation: 'Calendar' , title: 'Activities'}
  },
  {
    path: 'askQuestions',
    component: AskQuestionsComponent,
    data: { animation: 'Calendar' , title: 'Ask Questions'}
  },
  {
    path: 'coursegallery',
    component: CourseGalleryComponent,
    data: { animation: 'coursegallery' , title: 'Course Gallery'}
  },
  {
    path: 'coursereport',
    component: CourseReportComponent,
    data: { animation: 'coursereport' , title: 'Course Report'}
  },
  {
    path: 'calendaractivity',
    component: CalendarActivityComponent,
    data: { animation: 'calendaractivity' , title: 'Scheduled Activity'}
  },
  {
    path: 'progressionReport',
    component: ProgressionReportComponent,
    data: { animation: 'progressionReport' , title: 'Progression Report'}
  },
  {
    path: 'questionanswer',
    component: QuestionanswerComponent,
    data: { animation: 'questionanswer', title: 'Question and Answer'}
  }
]
@NgModule({
  declarations: [
    LearnerMyCourseComponent,
    CoursedetailsComponent,
    InstructorLedComponent,
    DiscussionForumComponent,
    ActivitiesComponent,
    AssignmentComponent,
    ProjectMobileComponent,
    PerformancePageMobileComponent,
    CourseGalleryComponent,
    AskQuestionsComponent,
    CourseGalleryComponent,
    CourseReportComponent,
    CalendarActivityComponent,
    LearnerNewMyCourseComponent,
    ProgressionReportComponent,
    QuestionanswerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CoreModule,
    MaterialModule,
    CarouselModule,
    CommonModule,
    NgxMaskModule,
    MatMenuModule,
    AngularEditorModule,
    ChartsModule,
    DragScrollModule,
    PopoverModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({

    }),
    NgxMaskModule.forChild(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    NgOtpInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    InfiniteScrollModule,
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
  ],
  providers: [
    Apollo
  ],


  entryComponents: [CategoryComponentComponent]
})
export class MycoursesModule { }
