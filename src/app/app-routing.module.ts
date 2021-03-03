import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { AuthGuard } from '@core/services/_helpers';


const routes: Routes = [

  {
    path: '',
    loadChildren: './learner/login.module#LoginModule',
    canActivate: [IsLoggedInAuthGuard],
     data : {title: 'Welcome to EduTech'}
  },

  {
    path: 'Learner',
    loadChildren: './learner/learner.module#LearnerModule',
    canLoad: [AuthGuard],
    data : {title: 'My Course'}
  },
  // {
  //   path: 'Admin',
  //   loadChildren: './admin/admin.module#AdminModule',
  //   data : {title: 'Admin '}
  // },
  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title: 'Course Player'}
  },
  // {
  //   path: '*',
  //   // loadChildren: './wca/wca.module#WcaModule',
  //   data : {title: 'Web Content Authoring'}
  // },
  {path: '**', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash:true,
    scrollPositionRestoration: 'enabled',
    // initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
