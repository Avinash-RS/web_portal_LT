import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ppt2Component } from './ppt2/ppt2.component';
import { Ppt1Component } from './ppt1/ppt1.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './learner/learner.module#LearnerModule',
     data : {title:'Welcome to EduTech'}
  },
  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule',
    data : {title:'Learner'}
  },
  {
    path: 'Admin',
    loadChildren: './admin/admin.module#AdminModule',
    data : {title:'Admin '}
  },
  {
    path:'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title:'Player'}
  },
 
  {
    path:'ppt1',
    component: Ppt1Component,
    data : {title:'Sample PPt1'}
  }
  ,
  {
    path:'ppt2',
    component: Ppt2Component,
    data : {title:'Sample PPt1'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
