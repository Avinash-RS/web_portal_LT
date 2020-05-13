import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';

import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';

import { AdminLoginModule } from './admin-login/admin-login.module';

import { AdminCoreModule } from './core/admin-core.module';
import { AuthModule } from './auth/auth.module';

import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  // {path: 'login', loadChildren: './admin-login/admin-login.module#AdminLoginModule',canActivate:[AuthGuard]},
  { path: 'login', component: AdminLoginComponent,canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [AuthGuard] },
 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    AdminLoginModule,
    CommonModule,
    AuthModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminCoreModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule { }
