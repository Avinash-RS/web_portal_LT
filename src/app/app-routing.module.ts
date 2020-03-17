import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  // {
  //   path: '',
  //   component: LearnerHomeComponent
  // },
  // {
  //   path: '**',
  //   component: LearnerHomeComponent
  // },
  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
