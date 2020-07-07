import { BatchHomeComponent } from './batch-home/batch-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchCreationComponent } from './batch-creation/batch-creation.component';

const routes: Routes = [
    { path: '', component: BatchHomeComponent },
    {path: 'create', component: BatchCreationComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class batchRoutingModule { }