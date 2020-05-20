import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { ReportManagementComponent } from '@admin/pages/report-management/report-management.component';
import { AddUserComponent } from '@admin/pages/add-user/add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule, MatTreeModule, MatSlideToggleModule } from '@angular/material';
import { MatTabsModule, MatMenuModule, MatInputModule,MatSortModule, MatCheckboxModule, MatFormFieldModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule, MatProgressBarModule, MatAutocompleteModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { appRoutes } from './lazyloader.routes';
import { AdminCoursesComponent } from '@admin/pages/admin-courses/admin-courses.component';
import { CoreModule } from '@core/core.module';
import { PublishCourseComponent } from '@admin/pages/publish-course/publish-course.component';
// import { WcaModule } from '../../wca/wca.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogueManagementComponent } from '@admin/pages/catalogue-management/catalogue-management.component';
import { DndDirective } from '../core/dnd.directive';
import { CatagoryManagementComponent } from '@admin/pages/catagory-management/catagory-management.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import { DashboardModule } from '../dashboard/dashboard.module';

import { AdminCoreModule } from '../core/admin-core.module';
import { from } from 'rxjs';
import { GroupManagementComponent } from '@admin/pages/group-management/group-management.component';
import { EnrollmentComponent} from '@admin/pages/enrollment/enrollment.component';
import { LearnerprofileComponent} from '@admin/pages/learnerprofile/learnerprofile.component';


@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule,
        RouterModule.forChild(appRoutes),
        MatToolbarModule,
        DashboardModule,
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
        MatSortModule     // WcaModule





    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    declarations: [DndDirective, CatalogueManagementComponent,
        AuthComponent, UserManagementComponent, ReportManagementComponent,
        AddUserComponent, GroupManagementComponent, AdminCoursesComponent, PublishCourseComponent,
        CatagoryManagementComponent, EnrollmentComponent, LearnerprofileComponent],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class AuthModule { }
