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





const routes: Routes = [

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'wca', component: WcaComponent, canActivate: [AuthGuard] },

 
];



@NgModule({
  declarations: [DashboardComponent, WcaComponent],
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
  ],
  providers: [Apollo],
  entryComponents: []
})
export class WcaModule { }
