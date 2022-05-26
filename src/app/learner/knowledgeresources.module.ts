import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { MaterialModule } from '@core/material.module';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
    // MaterialModule,
    CarouselModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    DragScrollModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes),
    HttpClientModule,
    ApolloModule,
    MatSidenavModule,
    MatExpansionModule,
    MatStepperModule,
    InfiniteScrollModule,
    Ng2SearchPipeModule,
    NgxSkeletonLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [],
  providers: [
    Apollo
  ],
})
export class KnowledgeresourcesModule { }
