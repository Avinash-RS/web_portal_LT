import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './learner/learner.module#LearnerModule'
  },
  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule'
  },
  {
    path: 'Admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'Wca',
    loadChildren: './wca/wca.module#WcaModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
