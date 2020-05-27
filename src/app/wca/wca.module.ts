import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarRatingModule } from "ngx-bar-rating";
import { NgxMaskModule } from 'ngx-mask'
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@core/material.module';
// import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WcaComponent } from './pages/wca/wca.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CreateModuleComponent } from './pages/create-module/create-module.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule, MatTableModule, MatSortModule, MatChipsModule } from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ViewModuleComponent } from './pages/view-module/view-module.component';
import { ChooseTemplateComponent } from './pages/choose-template/choose-template.component';
import { WcaService } from "./services/wca.service";
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { UploadFilesComponent } from './pages/upload-files/upload-files.component';
import { MycreatedCourseComponent } from './pages/mycreated-course/mycreated-course.component';
import { ReferenceFileComponent } from './pages/reference-file/reference-file.component';
import { PipeModule } from '../pipes/pipe.module';
import { CoursepreviewComponent } from './pages/coursepreview/coursepreview.component';
import { AddModuleComponent } from './pages/add-module/add-module.component';
import { ModuleRepositoryComponent } from './pages/module-repository/module-repository.component';
import { ViewCoursesComponent } from './pages/view-courses/view-courses.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BlobReaderComponent } from './pages/blob-reader/blob-reader.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [

  { path: '', component: DashboardComponent, },
  { path: 'wca', component: WcaComponent, },
  { path: 'addcourse', component: CreateCourseComponent, },
  { path: 'viewmodule', component: ViewModuleComponent, },
  { path: 'createmodule', component: CreateModuleComponent, },
  { path: 'addtemplate', component: CreateTemplateComponent, },
  { path: 'choosetemplate', component: ChooseTemplateComponent, },
  { path: 'addtopic', component: CreateTopicComponent, },

  { path: 'addfile', component: UploadFilesComponent, },
  { path: 'mycourse', component: MycreatedCourseComponent, },
  { path: 'ct', component: ChooseTemplateComponent, },
  { path: 'rf', component: ReferenceFileComponent, },
  { path: 'addmodule', component: AddModuleComponent },
  { path: 'previewcourse', component: CoursepreviewComponent },
  { path: 'modulerepository', component: ModuleRepositoryComponent }



];

@NgModule({
  declarations: [DashboardComponent, ChooseTemplateComponent, WcaComponent, CreateCourseComponent, CreateModuleComponent, CreateTemplateComponent, ViewModuleComponent, ChooseTemplateComponent, CreateTopicComponent, UploadFilesComponent, MycreatedCourseComponent, ReferenceFileComponent, CoursepreviewComponent, AddModuleComponent, ModuleRepositoryComponent, ViewCoursesComponent, BlobReaderComponent],
  imports: [
    CoreModule,
    MatDialogModule,
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
    MatTableModule,
    MatChipsModule,
    MatSlideToggleModule,
    PerfectScrollbarModule
    
  ],
  providers: [Apollo],
  entryComponents: [ViewCoursesComponent, BlobReaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class WcaModule { }
