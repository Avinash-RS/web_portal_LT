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
<<<<<<< HEAD
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CreateModuleComponent } from './pages/create-module/create-module.component';
=======
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material';
>>>>>>> ce7bc4d39deaf33ce5550bf32cf3039d1768cbd0





const routes: Routes = [

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'create', component: CreateCourseComponent, canActivate: [AuthGuard] },

=======
  { path: 'wca', component: WcaComponent, canActivate: [AuthGuard] },
  { path: 'ct', component: CreateTemplateComponent}
>>>>>>> ce7bc4d39deaf33ce5550bf32cf3039d1768cbd0
 
];



@NgModule({
<<<<<<< HEAD
  declarations: [DashboardComponent, WcaComponent, CreateCourseComponent, CreateModuleComponent],
=======
  declarations: [DashboardComponent, WcaComponent, CreateTemplateComponent],
>>>>>>> ce7bc4d39deaf33ce5550bf32cf3039d1768cbd0
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
  providers: [Apollo],
  entryComponents: []
})
export class WcaModule { }
