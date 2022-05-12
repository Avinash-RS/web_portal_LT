
// angular imports
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Materials import
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
// others
import { NgxMaskModule } from 'ngx-mask';
import { ApolloModule, Apollo } from 'apollo-angular';
import { CoreModule } from '@core/core.module';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { ProfileComponent } from '@learner/pages/profile/profile.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ViewAllnotificationsComponent } from './pages/view-allnotifications/view-allnotifications.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
    ForbiddenComponent,
    ViewAllnotificationsComponent,
    VideoPreviewModalComponent,

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  imports: [
    CoreModule,
    CommonModule,
    NgxMaskModule,
    DragScrollModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    HttpClientModule,
    ApolloModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    NgxSkeletonLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
