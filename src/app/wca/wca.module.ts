import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { MatListModule, MatTableModule, MatSortModule } from '@angular/material';
import { ViewModuleComponent } from './pages/view-module/view-module.component';
import { ChooseTemplateComponent } from './pages/choose-template/choose-template.component';
import { WcaService } from "./services/wca.service";
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { UploadFilesComponent } from './pages/upload-files/upload-files.component';
import { MycreatedCourseComponent } from './pages/mycreated-course/mycreated-course.component';
import { ReferenceFileComponent } from './pages/reference-file/reference-file.component';
import { PipeModule } from '../pipes/pipe.module';
import { CoursepreviewComponent } from './pages/coursepreview/coursepreview.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] , data : {title:'Web Content Authoring Dashboard'}},
  { path: 'wca', component: WcaComponent, canActivate: [AuthGuard] , data : {title:'Web Content Authoring Dashboard'}},
  { path: 'addcourse', component: CreateCourseComponent, canActivate: [AuthGuard] , data : {title:'Add new Course'}},
  { path: 'viewmodule', component: ViewModuleComponent, canActivate: [AuthGuard] , data : {title:'View Module'} },
  { path: 'addmodule', component: CreateModuleComponent, canActivate: [AuthGuard] , data : {title:'Create Module'}},
  { path: 'addtemplate', component: CreateTemplateComponent,canActivate: [AuthGuard], data : {title:'Create Template'}},
  { path: 'choosetemplate', component: ChooseTemplateComponent,canActivate: [AuthGuard], data : {title:'Choose Template'}},
  { path: 'addtopic', component: CreateTopicComponent,canActivate: [AuthGuard], data : {title:'Create Topic'}},
  { path: 'addfile', component: UploadFilesComponent,canActivate: [AuthGuard], data : {title:'Upload Files'}},
  { path: 'mycourse', component: MycreatedCourseComponent,canActivate: [AuthGuard], data : {title:'My created Course'}},
  { path: 'ct', component: ChooseTemplateComponent,canActivate: [AuthGuard], data : {title:'Choose Template'}},
  { path: 'rf', component: ReferenceFileComponent,canActivate: [AuthGuard], data : {title:'Reference File'}},
  { path: 'previewcourse', component: CoursepreviewComponent,canActivate: [AuthGuard], data : {title:'Courses Preview'}}
  
];

@NgModule({
  declarations: [DashboardComponent, ChooseTemplateComponent,WcaComponent,CreateCourseComponent,CreateModuleComponent,CreateTemplateComponent, ViewModuleComponent, ChooseTemplateComponent, CreateTopicComponent, UploadFilesComponent, MycreatedCourseComponent, ReferenceFileComponent, CoursepreviewComponent],
  imports: [
    CoreModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    PipeModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    FormsModule,
    //NgxPasswordToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    DragDropModule,
    MatListModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [Apollo],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class WcaModule { }
