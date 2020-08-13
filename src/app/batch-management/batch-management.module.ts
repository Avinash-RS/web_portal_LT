import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@core/core.module';
import { MatDialogModule, MatListModule, MatSortModule, MatTableModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MaterialModule } from '@core/material.module';
import { PipeModule } from '../pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';

import { batchRoutingModule } from './batch-management.routing';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { CdkTableModule } from '@angular/cdk/table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
   
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
    CdkTableModule,
    Ng2SearchPipeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
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
