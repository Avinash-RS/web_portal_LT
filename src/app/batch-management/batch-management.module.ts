import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchHomeComponent } from './batch-home/batch-home.component';
import { CoreModule } from '@core/core.module';
import { MatDialogModule, MatListModule, MatSortModule, MatTableModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MaterialModule } from '@core/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { PipeModule } from '../pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BatchCreationComponent } from './batch-creation/batch-creation.component';
import { batchRoutingModule } from './batch-management.routing';

@NgModule({
  declarations: [BatchHomeComponent,BatchCreationComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    PipeModule,
    batchRoutingModule,
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    DragDropModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatSlideToggleModule,
    PerfectScrollbarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BatchManagementModule { }
