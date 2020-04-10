import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent,canActivate:[AuthGuard]  },
  { path: 'userManagement', component: UserManagementComponent,canActivate:[AuthGuard]  },
];

@NgModule({
  declarations: [AdminLoginComponent, UserManagementComponent],
  imports: [
    CoreModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AdminModule { }
