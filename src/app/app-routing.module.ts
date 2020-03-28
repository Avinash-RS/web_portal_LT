import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule'
  },
  {
    path: 'Admin',
    loadChildren: './admin/admin.module#AdminModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
