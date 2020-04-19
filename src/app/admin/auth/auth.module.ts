import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { UserManagementComponent} from '../pages/user-management/user-management.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule,  MatProgressBarModule, MatAutocompleteModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { appRoutes } from './lazyloader.routes';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import { DashboardModule } from '../dashboard/dashboard.module';

import { AdminCoreModule } from '../core/admin-core.module';
import { from } from 'rxjs';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        MatToolbarModule,
        DashboardModule,
        MatButtonModule,
        MatIconModule,
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
        MatTableModule




    ],
    declarations: [AuthComponent,UserManagementComponent],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class AuthModule { }
