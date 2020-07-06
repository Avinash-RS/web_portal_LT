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

@NgModule({
  declarations: [
    BatchHomeComponent,
    BatchCreationComponent,
    BatchAddCourseComponent,
    BatchAddLearnerComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BatchManagementModule { }
