// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler } from '@angular/core';

// others
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// local
// import { MaterialModule } from '@core/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
// import { DialogComponent } from './wca/pages/dialog/dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from '@core/services/_helpers';
import { GlobalErrorHandler } from '@core/services/_helpers/global-error-handler'
import { ConfigsLoaderService } from '@core/services/configs-loader.service';
import { NotFoundComponent } from './not-found/not-found.component';
// import {IvyCarouselModule} from 'angular-responsive-carousel';
import { DatePipe } from '@angular/common';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketioService } from '@learner/services/socketio.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@core/core.module';
import { InterceptorService } from '@learner/services/interceptor.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { KnowledgePreviewComponent } from '@learner/pages/knowledge-preview/knowledge-preview.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GoogleAnalyticsService } from '@learner/services/google-analytics.service';
import {GtagModule} from 'angular-gtag';
import { environment } from '@env/environment';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BnNgIdleService } from 'bn-ng-idle';
import { RedirectionComponent } from './redirection/redirection.component';
// import { ChartsModule } from 'ng2-charts';

// import { JwtInterceptor } from './core/services/_helpers/jwt.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}



@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
    // DialogComponent,
    NotFoundComponent,
    KnowledgePreviewComponent,
    RedirectionComponent
    ],
  imports: [
    // MaterialModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    GraphqlModule,
    DragDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphqlModule,
    NgxUiLoaderModule,
    AngularEditorModule,
    PdfViewerModule,
    GtagModule.forRoot({ trackingId: environment.gaTrackingId, trackPageviews: false }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [AlertComponentComponent, DatePipe, SocketioService,GoogleAnalyticsService, InterceptorService, BnNgIdleService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation, ConfigsLoaderService]
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [AlertComponentComponent, KnowledgePreviewComponent]
})
export class AppModule { }
export function appInitializerFactory(configsLoaderService: ConfigsLoaderService) {
  return () => configsLoaderService.loadConfigs();
}
