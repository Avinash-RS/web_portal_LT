import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchHomeComponent } from './batch-home/batch-home.component';
import { CoreModule } from '@core/core.module';
import { MatDialogModule, MatListModule, MatSortModule, MatTableModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MaterialModule } from '@core/material.module';
import { PipeModule } from '../pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { BatchCreationComponent } from './batch-creation/batch-creation.component';
import { batchRoutingModule } from './batch-management.routing';
import { BatchAddCourseComponent } from './batch-add-course/batch-add-course.component';
import { BatchAddLearnerComponent } from './batch-add-learner/batch-add-learner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BatchSchedulerComponent } from './batch-scheduler/batch-scheduler.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    BatchHomeComponent,
    BatchCreationComponent,
    BatchAddCourseComponent,
    BatchAddLearnerComponent,
    BatchSchedulerComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    MaterialModule,
    CommonModule,
    PipeModule,
    batchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatSlideToggleModule,
    InfiniteScrollModule,
    PerfectScrollbarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
]
})
export class BatchManagementModule { }
