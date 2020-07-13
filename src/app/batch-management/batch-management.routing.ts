import { BatchHomeComponent } from './batch-home/batch-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchCreationComponent } from './batch-creation/batch-creation.component';
import { BatchAddCourseComponent } from './batch-add-course/batch-add-course.component';
import {BatchAddLearnerComponent} from './batch-add-learner/batch-add-learner.component'
import {BatchSchedulerComponent} from './batch-scheduler/batch-scheduler.component'

const routes: Routes = [
    { path: '', component: BatchHomeComponent },
    {path: 'create', component: BatchCreationComponent},
    {path: 'addcourse', component: BatchAddCourseComponent},
    {path: 'addleaner', component: BatchAddLearnerComponent},
    {path: 'addscheduler', component: BatchSchedulerComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class batchRoutingModule { }