// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// others
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// local
import { MaterialModule } from '@core/material.module';
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
// import { DialogComponent } from './wca/pages/dialog/dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MAT_TABS_CONFIG } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { ErrorInterceptor } from '@core/services/_helpers';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ConfigsLoaderService } from '@core/services/configs-loader.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
// import { ChartsModule } from 'ng2-charts';

// import { JwtInterceptor } from './core/services/_helpers/jwt.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}



@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
    // DialogComponent,
    NotFoundComponent,
  ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    // ChartsModule,
    GraphqlModule,
    DragDropModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    PdfJsViewerModule,
    IvyCarouselModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphqlModule
  ],
  providers: [AlertComponentComponent,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation, ConfigsLoaderService]
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
export function appInitializerFactory(configsLoaderService: ConfigsLoaderService) {
  return () => configsLoaderService.loadConfigs();
}
