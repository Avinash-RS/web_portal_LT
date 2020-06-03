import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule, MatTreeModule, MatSlideToggleModule } from '@angular/material';
import {
    MatTabsModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatCardModule,
    MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule, MatProgressBarModule,
    MatAutocompleteModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminCoreModule } from '../core/admin-core.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReportManagementComponent } from './report-management/report-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogueManagementComponent } from './catalogue-management/catalogue-management.component';
import { CatagoryManagementComponent } from './catagory-management/catagory-management.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { LearnerprofileComponent } from './learnerprofile/learnerprofile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AuditlogComponent } from './auditlog/auditlog.component';
import { PipeModule } from './../../pipes/pipe.module';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        PipeModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        AdminCoreModule,
        MatSidenavModule,
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
        MatSortModule,     // WcaModule
        ChartsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    declarations: [AddUserComponent, ReportManagementComponent, AdminDashboardComponent, CatalogueManagementComponent,
        CatagoryManagementComponent, EnrollmentComponent, LearnerprofileComponent, AuditlogComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
