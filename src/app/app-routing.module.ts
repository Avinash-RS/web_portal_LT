import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ppt2Component } from './ppt2/ppt2.component';
import { Ppt1Component } from './ppt1/ppt1.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './learner/learner.module#LearnerModule',
     data : {title: 'Welcome to EduTech'}
  },
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'},
  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule',
    data : {animation: 'Learner'}
  },
  {
    path: 'Admin',
    loadChildren: './admin/admin.module#AdminModule',
    data : {title: 'Admin '}
  },
  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title: 'Player'}
  },
  {
    path: 'Wca',
    loadChildren: './wca/wca.module#WcaModule',
    data : {title: 'Web Content Authoring'}
  },
  {
    path: 'ppt1',
    component: Ppt1Component,
    data : {title: 'Sample PPt1'}
  }
  ,
  {
    path: 'ppt2',
    component: Ppt2Component,
    data : {title: 'Sample PPt1'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
