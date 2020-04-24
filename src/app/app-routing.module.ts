import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ppt2Component } from './ppt2/ppt2.component';
import { Ppt1Component } from './ppt1/ppt1.component';

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
    path:'Player',
    loadChildren: './core/core.module#CoreModule'
  },
  {
    path:'Wca',
    loadChildren: './wca/wca.module#WcaModule'
  },
  {
    path:'ppt1',
    component: Ppt1Component,
  }
  ,
  {
    path:'ppt2',
    component: Ppt2Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
