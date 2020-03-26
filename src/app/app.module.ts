//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
//others
import { BarRatingModule } from "ngx-bar-rating";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaskModule } from 'ngx-mask'
//local
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MaterialModule } from '@core/material.module';
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponentComponent,
  ],
  imports: [
    // NgImageSliderModule,
    BarRatingModule,
    Ng4LoadingSpinnerModule.forRoot() ,
    NgxMaskModule.forRoot(),
    GraphqlModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AlertComponentComponent,HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
