import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
];

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AdminModule { }
