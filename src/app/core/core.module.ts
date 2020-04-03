import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//others
import { BarRatingModule } from "ngx-bar-rating";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaskModule } from 'ngx-mask';
//local

import { MaterialModule } from '@core/material.module';
import { FooterComponent } from '@core/core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { CourseComponentComponent } from '@core/shared/course-component/course-component.component';
import { TopCoursesComponent } from '@core/shared/top-courses/top-courses.component';
import { RecomendedCoursesComponent } from '@core/shared/recomended-courses/recomended-courses.component';
import { WishlistCoursesComponent } from '@core/shared/wishlist-courses/wishlist-courses.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,],

  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    BarRatingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  
  exports: [  
    HeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent]
})
export class CoreModule { }
