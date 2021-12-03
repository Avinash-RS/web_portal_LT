import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInAuthGuard } from '@core/services/_helpers/is-logged-in-auth.guard';
import { AuthGuard } from '@core/services/_helpers';
import { RedirectionComponent} from '../app/redirection/redirection.component'

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

  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
    data : {title: 'Course Player'}
  },
  {
    path: 'Player',
    loadChildren: './core/core.module#CoreModule',
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
