import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import { MatMenuModule, MatSidenavModule, MatExpansionModule, MatStepperModule, DateAdapter } from '@angular/material';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMaskModule } from 'ngx-mask';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MaterialModule } from '@core/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BarRatingModule } from 'ngx-bar-rating';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng5SliderModule } from 'ng5-slider';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { RatingModule } from 'ng-starrating';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AgGridModule } from 'ag-grid-angular';
import { LearnerCalendarComponent } from './pages/learner-calendar/learner-calendar.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes: Routes = [
  {
    path: '',
    component: LearnerCalendarComponent,
    data: { animation: 'Calendar' }
  },
]
@NgModule({
  declarations: [
    LearnerCalendarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CoreModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    CarouselModule,
    BarRatingModule,
    CommonModule,
    NgxMaskModule,
    MatMenuModule,
    AngularEditorModule,
    ChartsModule,
    DragScrollModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      // set defaults here
      // radius: 10,
      // outerStrokeWidth: 10,
      // innerStrokeWidth: 8,
      // outerStrokeColor: '#78C000',
      // innerStrokeColor: '#C7E596',
      // animationDuration: 300,
    }),
    NgxMaskModule.forChild(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    Ng5SliderModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    NgOtpInputModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    MyDatePickerModule,
    InfiniteScrollModule,
    PdfJsViewerModule,
    RatingModule,
    NgCircleProgressModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    NgxSkeletonLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AgGridModule.withComponents([])
  ],
  providers: [
    Apollo
    // { provide: Window, useValue: window }
  ],
  entryComponents: [CategoryComponentComponent]
})
export class CalendarModules { }
