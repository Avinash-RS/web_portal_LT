import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { FooterComponent } from '@core/core/footer/footer.component';
// local
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
// import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MaterialModule } from '@core/material.module';
import { CapslockDirective } from '@core/services/directives/capslock.directive';
import { StickyHeaderDirective } from '@core/services/directives/sticky-header.directive';
import { AudioPlayerComponent } from '@core/shared/audio-player/audio-player.component';
import { VideoPlayerComponent } from '@core/shared/video-player/video-player.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// others
// import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';

import { CarouselModule } from 'ngx-owl-carousel-o';
// Video and Audio Player
import { SearchPipe } from '../pipes/search.pipe';
import { HeaderComponent } from './core/header/header.component';
import { LandingHeaderComponent } from './core/landing-header/landing-header.component';
import { DragDropImageDirective } from './services/directives/drag-drop-image.directive';
import { PdfreaderComponent } from './shared/pdfreader/pdfreader.component';
import { ToolbarNotificationComponent } from './shared/toolbar-notification/toolbar-notification.component';
// import { DeferLoadModule } from '@trademe/ng-defer-load';

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
    // FooterComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    DragDropImageDirective,
    PdfreaderComponent,
    LandingHeaderComponent,
    SearchPipe,
    ToolbarNotificationComponent,
  ],

  imports: [
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    // MatNativeDateModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    // MatBadgeModule,
    MatProgressSpinnerModule,
    // MaterialModule,
    RouterModule,
    CommonModule,
    PdfViewerModule,
    // BarRatingModule,
    NgxMaskModule.forRoot(),
    // RouterModule.forChild(routes),
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // DeferLoadModule,
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
    // FooterComponent,
    CapslockDirective,
    StickyHeaderDirective,
    VideoPlayerComponent,
    PdfreaderComponent,
    SearchPipe]
})
export class CoreModule { }
