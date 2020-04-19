//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//others
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
//local
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
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    GraphqlModule,
   

    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
    BrowserAnimationsModule,

  ],
  providers: [AlertComponentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
