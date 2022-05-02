import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { AuthGuard } from '@core/services/_helpers';
import { RedirectionComponent} from '../app/redirection/redirection.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./learner/login.module').then(m => m.LoginModule),
    canActivate: [IsLoggedInAuthGuard],
     data : {title: 'Welcome to EduTech'}
  },

  {
    path: 'Learner',
    loadChildren: () => import('./learner/learner.module').then(m => m.LearnerModule),
    canLoad: [AuthGuard],
    data : {title: 'My Course'}
  },

  {
    path: 'Player',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
    data : {title: 'Course Player'}
  },
  {
    path: 'Player',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
    data : {title: 'Course Player'}
  },
  {
    path: 'profile',
    component: RedirectionComponent,
    data: { animation: 'Redirection', title: 'Redirection' }
  },
  {
    path: 'redirection',
    component: RedirectionComponent,
    data: { animation: 'Redirecting', title: 'Redirecting' }
  },
  {path: '**', component: NotFoundComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
