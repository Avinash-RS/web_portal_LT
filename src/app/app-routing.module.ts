import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  // {
  //    path: 'address',
  //    component: AddressComponent
  // },	
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  },
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
