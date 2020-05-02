import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//others
import { BarRatingModule } from "ngx-bar-rating";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaskModule } from 'ngx-mask';
//local
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { FooterComponent } from '@core/core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { CourseComponentComponent } from '@core/shared/course-component/course-component.component';
import { ListViewCourseComponentComponent } from '@core/shared/list-view-course-component/list-view-course-component.component'
import { TopCoursesComponent } from '@core/shared/top-courses/top-courses.component';
import { RecomendedCoursesComponent } from '@core/shared/recomended-courses/recomended-courses.component';
import { WishlistCoursesComponent } from '@core/shared/wishlist-courses/wishlist-courses.component';
import { CapslockDirective } from '@core/services/directives/capslock.directive';
import { VideoPlayerComponent } from '@core/shared/video-player/video-player.component';
import { AudioPlayerComponent } from '@core/shared/audio-player/audio-player.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
//Video and Audio Player
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from "videogular2/compiled/buffering";

const routes: Routes = [
  { path: 'video', component: VideoPlayerComponent, canActivate: [AuthGuard] },
  { path: 'audio', component: AudioPlayerComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    CapslockDirective,
    HeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    DataTableComponent,
    ListViewCourseComponentComponent
  ],

  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    BarRatingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  exports: [
    HeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,
    CapslockDirective,
    DataTableComponent,
    ListViewCourseComponentComponent]
})
export class CoreModule { }
