import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { AuthGuard } from '@core/services/_helpers';


const routes: Routes = [

  {
    path: 'Learner',
    loadChildren: './learner/login.module#LoginModule',
    canActivate: [IsLoggedInAuthGuard],
     data : {title: 'Welcome to EduTech'}
  },

  {
    path: '',
    loadChildren: './learner/learner.module#LearnerModule',
    canLoad: [AuthGuard],
    data : {animation: 'Learner'}
  },
  // {
  //   path: 'Admin',
  //   loadChildren: './admin/admin.module#AdminModule',
  //   data : {title: 'Admin '}
  // },
  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title: 'Player'}
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
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
