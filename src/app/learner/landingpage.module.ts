import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateAdapter as AngularCalendarDateAdapter } from 'angular-calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LearnerNewMyCourseComponent } from './pages/learner-new-my-course/learner-new-my-course.component';
import { MycourseItemComponent } from './pages/mycourse-item-component/mycourse-item-component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { MicrocourseComponent } from './pages/microcourse/microcourse.component';
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
        path: 'Microcourses',
        component: LearnerNewMyCourseComponent,
        data: { animation: 'Learner  MicroCourses' , title: 'Micro Courses'}
      },
  ];


  @NgModule({
    declarations: [
        LearnerNewMyCourseComponent,
        MycourseItemComponent,
        MicrocourseComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [
        CoreModule,
        CommonModule,
        HttpClientModule,
        ApolloModule,
        NgxSkeletonLoaderModule,
        DragScrollModule,
        ChartsModule,
        NgCircleProgressModule,
        CalendarModule,
        MatDatepickerModule,
        MatTabsModule,
        MatSidenavModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule,
        FormsModule,ReactiveFormsModule,
        DeferLoadModule,
        RouterModule.forChild(routes),
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
    entryComponents: [],
    providers: [
        Apollo
      ],
  })

  export class LandingPageModule { }