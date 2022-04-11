import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '@core/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChartsModule } from 'ng2-charts';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgOtpInputModule } from 'ng-otp-input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { KnowledgeLandingPageComponent } from './pages/knowledge-landing-page/knowledge-landing-page.component';
import { KnowledgeResourceHomeComponent } from './pages/knowledge-resource-home/knowledge-resource-home.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes: Routes = [

  {
    path: '',
    component: KnowledgeResourceHomeComponent,
    data: { animation: 'activitycenterhomescreen', title: 'Knowledge Resource'}
  },
  {
    path: 'preview',
    component: KnowledgeLandingPageComponent,
    data: { animation: 'activitycenterhomescreen', title: 'Knowledge Resource' }
  },
];
@NgModule({
  declarations: [
    KnowledgeResourceHomeComponent,
    KnowledgeLandingPageComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CoreModule,
    MaterialModule,
    CarouselModule,
    CommonModule,
    NgxMaskModule,
    MatMenuModule,
    AngularEditorModule,
    ChartsModule,
    DragScrollModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
    }),
    NgxMaskModule.forChild(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    NgOtpInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    InfiniteScrollModule,
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
  ],
  entryComponents: [],
  providers: [
    Apollo
  ],
})
export class KnowledgeresourcesModule { }
