//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule,} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { FlexLayoutModule } from '@angular/flex-layout';
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
    GraphqlModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    // FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule, MatRadioModule,
    MatCardModule,
    // MatDatepickerModule,
    // FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [CookieService,AlertComponentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
