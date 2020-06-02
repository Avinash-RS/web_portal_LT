import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { 
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatTreeModule
       } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminCoreModule } from '../core/admin-core.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportManagementComponent } from './report-management/report-management.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { CatalogueManagementComponent } from './catalogue-management/catalogue-management.component';
import { CatagoryManagementComponent } from './catagory-management/catagory-management.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { LearnerprofileComponent } from './learnerprofile/learnerprofile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AuditlogComponent } from './auditlog/auditlog.component';
import { MatTableModule } from '@angular/material';
import { PipeModule } from './../../pipes/pipe.module'



@NgModule({
    imports: [
        InfiniteScrollModule,
        CdkTreeModule,
        MatTreeModule,
        CdkTableModule,
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        AdminCoreModule,
        RouterModule,
        NgxPaginationModule,
        ChartsModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        PipeModule
         ],
    declarations: [   
    AddUserComponent, ReportManagementComponent,AdminDashboardComponent, CatalogueManagementComponent, CatagoryManagementComponent, EnrollmentComponent, LearnerprofileComponent, AuditlogComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
