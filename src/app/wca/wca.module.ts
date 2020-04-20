import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BarRatingModule } from "ngx-bar-rating";
import { NgxMaskModule } from 'ngx-mask'
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WcaComponent } from './pages/wca/wca.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CreateModuleComponent } from './pages/create-module/create-module.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material';
import { ViewModuleComponent } from './pages/view-module/view-module.component';
import { ChooseTemplateComponent } from './pages/choose-template/choose-template.component';

import { WcaService } from "./services/wca.service";
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { UploadFilesComponent } from './pages/upload-files/upload-files.component';
import { MycreatedCourseComponent } from './pages/mycreated-course/mycreated-course.component';







const routes: Routes = [

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'wca', component: WcaComponent, canActivate: [AuthGuard] },
  { path: 'addcourse', component: CreateCourseComponent, canActivate: [AuthGuard] },
  { path: 'viewmodule', component: ViewModuleComponent, canActivate: [AuthGuard] },
  { path: 'addmodule', component: CreateModuleComponent, canActivate: [AuthGuard] },
  { path: 'addtemplate', component: CreateTemplateComponent,canActivate: [AuthGuard]},
  { path: 'choosetemplate', component: ChooseTemplateComponent,canActivate: [AuthGuard]},
  { path: 'addtopic', component: CreateTopicComponent,canActivate: [AuthGuard]},

  { path: 'addfile', component: UploadFilesComponent,canActivate: [AuthGuard]},
  { path: 'mycourse', component: MycreatedCourseComponent,canActivate: [AuthGuard]},
  { path: 'ct', component: ChooseTemplateComponent,canActivate: [AuthGuard]}


 
];



@NgModule({
  declarations: [DashboardComponent, ChooseTemplateComponent,WcaComponent,CreateCourseComponent,CreateModuleComponent,CreateTemplateComponent, ViewModuleComponent, ChooseTemplateComponent, CreateTopicComponent, UploadFilesComponent, MycreatedCourseComponent],
  imports: [
    CoreModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule    ,                    
    //NgxPasswordToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    DragDropModule,
    MatListModule
  ],
  providers: [WcaService],
  entryComponents: []
})
export class WcaModule { }
