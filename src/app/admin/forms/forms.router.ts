import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const FormsRoutes: Routes = [
  	
];

@NgModule({
  imports: [
    RouterModule.forChild(FormsRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class FormsRouterModule {}