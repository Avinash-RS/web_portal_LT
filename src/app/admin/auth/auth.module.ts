import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatProgressSpinnerModule,
  MatTreeModule,
  MatSlideToggleModule
} from '@angular/material';
import {
  MatTabsModule,
  MatMenuModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { appRoutes } from './lazyloader.routes';

import { CoreModule } from '@core/core.module';
// import { WcaModule } from '../../wca/wca.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';

import { DndDirective } from '../core/dnd.directive';

import { PipeModule } from '../../pipes/pipe.module';
// import { SearchPipe } from '../../pipes/search.pipe';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { DashboardModule } from '../dashboard/dashboard.module';

import { AdminCoreModule } from '../core/admin-core.module';
import { from } from 'rxjs';
import { ChartsModule } from 'ng2-charts';
import { MatNativeDateModule } from '@angular/material';
import { PagesModule } from './../pages/pages.module';
// import { NewHomeComponent } from "@learner/pages/new-home/new-home.component";
// import { NewHomeComponent } from 'src/app/learner/pages/new-home/new-home.component'
// import { ReportsComponent } from '@admin/pages/reports/reports.component';
// import {LineChartComponent} from '@admin/core/charts/line-chart/line-chart.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    RouterModule.forChild(appRoutes),
    MatToolbarModule,
    DashboardModule,
    PipeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    AdminCoreModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    MatButtonModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    MatTreeModule,
    MatSlideToggleModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    MatSortModule, // WcaModule
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PagesModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  declarations: [
    DndDirective,
    AuthComponent,
   
  
    // ReportManagementComponent, AddUserComponent, , CatalogueManagementComponent, AdminDashboardComponent,
    // NewHomeComponent,
   
    // CatagoryManagementComponent, EnrollmentComponent, LearnerprofileComponent, AuditlogComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AuthModule {}
