import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@core/core/footer/footer.component';
// local
import { MaterialModule } from '@core/material.module';
import { CapslockDirective } from '@core/services/directives/capslock.directive';
import { StickyHeaderDirective } from '@core/services/directives/sticky-header.directive';
import { AudioPlayerComponent } from '@core/shared/audio-player/audio-player.component';
import { CourseComponentComponent } from '@core/shared/course-component/course-component.component';
import { ListViewCourseComponentComponent } from '@core/shared/list-view-course-component/list-view-course-component.component';
import { MycourseItemComponent } from '@core/shared/mycourse-item-component/mycourse-item-component';
import { RecomendedCoursesComponent } from '@core/shared/recomended-courses/recomended-courses.component';
import { TopCoursesComponent } from '@core/shared/top-courses/top-courses.component';
import { VideoPlayerComponent } from '@core/shared/video-player/video-player.component';
import { WishlistCoursesComponent } from '@core/shared/wishlist-courses/wishlist-courses.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyDatePickerModule } from 'mydatepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng5SliderModule } from 'ng5-slider';
// others
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { VgControlsModule } from 'videogular2/compiled/controls';
// Video and Audio Player
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { SearchPipe } from '../pipes/search.pipe';
import { HeaderComponent } from './core/header/header.component';
import { LandingHeaderComponent } from './core/landing-header/landing-header.component';
import { DragDropImageDirective } from './services/directives/drag-drop-image.directive';
import { CategoryComponentComponent } from './shared/category-component/category-component.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { GuidelineSearchComponent } from './shared/guideline-search/guideline-search.component';
import { PdfreaderComponent } from './shared/pdfreader/pdfreader.component';
import { SearchComponent } from './shared/search/search.component';
import { ToolbarNotificationComponent } from './shared/toolbar-notification/toolbar-notification.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
// const routes: Routes = [
//   // { path: 'video', component: VideoPlayerComponent, canActivate: [AuthGuard] },
//   // { path: 'audio', component: AudioPlayerComponent, canActivate: [AuthGuard] },
// ];
@NgModule({
  declarations: [
    CapslockDirective,
    StickyHeaderDirective,
    HeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    DataTableComponent,
    ListViewCourseComponentComponent,
    SearchComponent,
    DragDropImageDirective,
    GuidelineSearchComponent,
    PdfreaderComponent,
    LandingHeaderComponent,
    CategoryComponentComponent,
    SearchPipe,
    ToolbarNotificationComponent,
    MycourseItemComponent
  ],

  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    PdfViewerModule,
    BarRatingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMaskModule.forRoot(),
    // RouterModule.forChild(routes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    NgxPaginationModule,
    MyDatePickerModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgCircleProgressModule.forRoot({}),
    NgCircleProgressModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  exports: [
    HeaderComponent,
    LandingHeaderComponent,
    FooterComponent,
    CourseComponentComponent,
    TopCoursesComponent,
    RecomendedCoursesComponent,
    WishlistCoursesComponent,
    CapslockDirective,
    StickyHeaderDirective,
    DataTableComponent,
    VideoPlayerComponent,
    ListViewCourseComponentComponent,
    CategoryComponentComponent,
    PdfreaderComponent,
    GuidelineSearchComponent,
    MycourseItemComponent,
    SearchPipe]
})
export class CoreModule { }
