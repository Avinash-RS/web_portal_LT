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
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from '@core/services/_helpers';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ConfigsLoaderService } from '@core/services/configs-loader.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { DatePipe } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketioService } from '@learner/services/socketio.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginComponent } from '@learner/pages/login/login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@core/core.module';
import { RegistrationComponent } from '@learner/pages/registration/registration.component';
import { OtpComponent } from '@learner/pages/otp/otp.component';
import { PasswordComponent } from '@learner/pages/password/password.component';
import { ForgotUsernameAndPasswordComponent } from '@learner/pages/forgot-username-and-password/forgot-username-and-password.component';
import { RecoverFogotpasswordOTPComponent } from '@learner/pages/recover-fogotpassword-otp/recover-fogotpassword-otp.component';
import { MaskingPipePipe } from '@core/core/masking-pipe.pipe';

// import { ChartsModule } from 'ng2-charts';

// import { JwtInterceptor } from './core/services/_helpers/jwt.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}



@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
    LoginComponent,
    RegistrationComponent,
    OtpComponent,
    PasswordComponent,
    ForgotUsernameAndPasswordComponent,
    RecoverFogotpasswordOTPComponent,
    MaskingPipePipe,
    // DialogComponent,
    NotFoundComponent,
  ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    SocketIoModule.forRoot(config),
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
    NgxUiLoaderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphqlModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [AlertComponentComponent, DatePipe, SocketioService,
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
