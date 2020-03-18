//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//others
import { NgxSpinnerModule } from 'ngx-spinner';
// import { CookieModule, CookieService } from 'ngx-cookie';
// import { CookieService } from 'ngx-cookie-service';
//local
import { MaterialModule } from './common/material.module';
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponentComponent } from './common/alert-component/alert-component.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
    AdminLoginComponent,
    
  ],
  imports: [
    // CookieModule.forRoot() ,
    GraphqlModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    GraphqlModule,
    BrowserAnimationsModule,
  ],
  providers: [AlertComponentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
