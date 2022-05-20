import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursedetailsComponent } from './pages/coursedetails/coursedetails.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InstructorLedComponent } from './pages/instructor-led/instructor-led.component';
import { DiscussionForumComponent } from './pages/discussion-forum/discussion-forum.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ProjectMobileComponent } from './pages/project-mobile/project-mobile.component';
import { PerformancePageMobileComponent } from './pages/performance-page-mobile/performance-page-mobile.component';
import { CourseGalleryComponent } from './pages/course-gallery/course-gallery.component';
import { AskQuestionsComponent } from './pages/ask-questions/ask-questions.component';
import { CourseReportComponent } from './pages/course-report/course-report.component';
import { CalendarActivityComponent } from './pages/calendar-activity/calendar-activity.component';
import { ProgressionReportComponent } from './pages/progression-report/progression-report.component';
import { QuestionanswerComponent } from './pages/QandA/questionanswer.component';
import { DateAdapter as AngularCalendarDateAdapter } from 'angular-calendar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpskillCalendarComponent } from './pages/upskill-calendar/upskill-calendar.component';
import { CalendarFilterComponent } from './pages/calendar-filter/calendar-filter.component';
import { QuizReportComponent } from './pages/quiz-report/quiz-report.component';
import 'ag-grid-enterprise';
import { AgGridModule } from 'ag-grid-angular';
import { ProgramReportComponent } from './pages/program-report/program-report.component';
import { BenchmarkreportComponent } from './pages/benchmarkreport/benchmarkreport.component';
import { MillestonereportComponent } from './pages/millestonereport/millestonereport.component';
import { TrainingreportComponent } from './pages/trainingreport/trainingreport.component';
import { OverallquizreportComponent } from './pages/overallquizreport/overallquizreport.component';
import { ActivityreportComponent } from './pages/activityreport/activityreport.component';
import { BehavioralAssessmentComponent } from './pages/behavioral-assessment/behavioral-assessment.component';
import { MatDialogModule } from '@angular/material/dialog';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes: Routes = [
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
    data: { animation: 'coursereport' , title: 'Assessment Report'}
  },
  {
    path: 'calendaractivity',
    component: CalendarActivityComponent,
    data: { animation: 'calendaractivity' , title: 'Scheduled Activity'}
  },
  {
    path: 'upskillcalendar',
    component: UpskillCalendarComponent,
    data: { animation: 'calendaractivity' , title: 'Upskill Calendar'}
  },
  {
    path: 'progressionReport',
    component: ProgressionReportComponent,
    data: { animation: 'progressionReport' , title: 'Progression Report'}
  },
  {
    path: 'quizreport',
    component: QuizReportComponent,
    data: { animation: 'quizreport' , title: 'Quiz Report'}
  },
  {
    path: 'programreport',
    component: ProgramReportComponent,
    data: { animation: 'programreport' , title: 'Program Report'}
  },
  {
    path: 'questionanswer',
    component: QuestionanswerComponent,
    data: { animation: 'questionanswer', title: 'Question and Answer'}
  }
];
@NgModule({
  declarations: [
    CoursedetailsComponent,
    InstructorLedComponent,
    DiscussionForumComponent,
    ActivitiesComponent,
    ProjectMobileComponent,
    PerformancePageMobileComponent,
    CourseGalleryComponent,
    AskQuestionsComponent,
    CourseGalleryComponent,
    CourseReportComponent,
    CalendarActivityComponent,
    ProgressionReportComponent,
    QuestionanswerComponent,
    UpskillCalendarComponent,
    CalendarFilterComponent,
    QuizReportComponent,
    ProgramReportComponent,
    BenchmarkreportComponent,
    MillestonereportComponent,
    TrainingreportComponent,
    OverallquizreportComponent,
    ActivityreportComponent,
    BehavioralAssessmentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CoreModule,
    CommonModule,
    MatMenuModule,
    AngularEditorModule,
    ChartsModule,
    DragScrollModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({

    }),
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    NgCircleProgressModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    NgxSkeletonLoaderModule,
    NgxPaginationModule,
    AgGridModule.withComponents([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot({
      provide: AngularCalendarDateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    Apollo
  ],


  entryComponents: [CalendarFilterComponent]
})
export class MycoursesModule { }
