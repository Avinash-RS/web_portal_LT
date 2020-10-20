import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// others
import { BarRatingModule } from 'ngx-bar-rating';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaskModule } from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng5SliderModule } from 'ng5-slider';
import { MyDatePickerModule } from 'mydatepicker';
import { SearchPipe } from '../pipes/search.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// local
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { FooterComponent } from '@core/core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { CourseComponentComponent } from '@core/shared/course-component/course-component.component';
import { ListViewCourseComponentComponent } from '@core/shared/list-view-course-component/list-view-course-component.component';
import { TopCoursesComponent } from '@core/shared/top-courses/top-courses.component';
import { RecomendedCoursesComponent } from '@core/shared/recomended-courses/recomended-courses.component';
import { WishlistCoursesComponent } from '@core/shared/wishlist-courses/wishlist-courses.component';
import { CapslockDirective } from '@core/services/directives/capslock.directive';
import { StickyHeaderDirective } from '@core/services/directives/sticky-header.directive';
import { VideoPlayerComponent } from '@core/shared/video-player/video-player.component';
import { AudioPlayerComponent } from '@core/shared/audio-player/audio-player.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { MycourseItemComponent } from '@core/shared/mycourse-item-component/mycourse-item-component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Video and Audio Player
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { SearchComponent } from './shared/search/search.component';
import { DragDropImageDirective } from './services/directives/drag-drop-image.directive';
import { GuidelineSearchComponent } from './shared/guideline-search/guideline-search.component';
import { LandingHeaderComponent } from './core/landing-header/landing-header.component';
import { CategoryComponentComponent } from './shared/category-component/category-component.component';
import { PdfreaderComponent } from './shared/pdfreader/pdfreader.component';
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
