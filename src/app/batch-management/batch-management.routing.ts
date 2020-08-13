
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { BatchSchedulerComponent } from "./batch-scheduler/batch-scheduler.component";

const routes: Routes = [
 
  // {path: 'addscheduler', component: BatchSchedulerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class batchRoutingModule {}
