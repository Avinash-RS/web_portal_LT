import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './learner/pages/login/login.component';
import { CoursedetailsComponent } from './learner/pages/coursedetails/coursedetails.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
        path: '**',
        component: CoursedetailsComponent
    },
    {
      path: 'courses',
      component: CoursedetailsComponent
  }
  // {
  //     path: '',
  //     redirectTo: '/login',
  //     pathMatch: 'full'
  // },
  // {
  //     path: '**',
  //     component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
