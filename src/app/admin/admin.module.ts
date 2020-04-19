import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
// import { UserManagementComponent } from './pages/user-management/user-management.component';

import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { AdminCoreModule } from './core/admin-core.module';
import { AuthModule } from './auth/auth.module';
// import { AuthComponent } from './auth/auth.component';
// import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: AdminLoginComponent,canActivate:[AuthGuard]  },
  // { path: 'userManagement', component: UserManagementComponent,canActivate:[AuthGuard]  },
  {path: 'auth', loadChildren: '../auth/auth.module#AuthModule',canActivate:[AuthGuard] },
  {
    path: '',
    redirectTo: 'auth',
   
 }
];

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CoreModule,
    CommonModule,
    AuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadModule,
    AdminCoreModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AdminModule { }
