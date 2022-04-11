
// angular imports
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// others
import { NgxMaskModule } from 'ngx-mask';
import { ApolloModule, Apollo } from 'apollo-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';

import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@core/material.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { ProfileComponent } from '@learner/pages/profile/profile.component';
import { TermsconditionsComponent } from '@learner/pages/termsconditions/termsconditions.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ViewAllnotificationsComponent } from './pages/view-allnotifications/view-allnotifications.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VideoPreviewModalComponent } from './pages/video-preview-modal/video-preview-modal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DragScrollModule } from 'ngx-drag-scroll';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mycourses.module').then(m => m.MycoursesModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canLoad: [AuthGuard],
    data: { animation: 'Learner  Profile', title: 'Learner  Profile' }
  },
  {
    path: 'knowledge',
    loadChildren: () => import('./knowledgeresources.module').then(m => m.KnowledgeresourcesModule),
    canLoad: [AuthGuard],
    data: { animation: 'activitycenterhomescreen' , title: 'Knowledge Resources' }
  },

  {
    path: 'forbidden',
    component: ForbiddenComponent,
    data: { title: 'Learner Change email' }
  },
  {
    path: 'viewAllnotifications',
    component: ViewAllnotificationsComponent,
    canLoad: [AuthGuard],
    data: { title: 'All Notifications' }
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    TermsconditionsComponent,
    ForbiddenComponent,
    ViewAllnotificationsComponent,
    VideoPreviewModalComponent,

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
    MatTooltipModule,
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
  exports: [
    // MatMenuModule
  ],
  providers: [
    Apollo
    // { provide: Window, useValue: window }
  ],
  entryComponents: [VideoPreviewModalComponent]
})
export class LearnerModule { }
