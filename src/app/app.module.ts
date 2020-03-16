//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//others
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
//local
import { MaterialModule } from './common/material.module';
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponentComponent } from './common/alert-component/alert-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
  ],
  imports: [
    GraphqlModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [CookieService,AlertComponentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
