import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

//mat
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

//local
import { GraphqlModule } from './graphql/graphql.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './learner/pages/registration/registration.component';
// import { NgOtpInputModule } from  'ng-otp-input';
import { LoginComponent } from './learner/pages/login/login.component';
import { AlertComponentComponent } from './common/alert-component/alert-component.component';
import { CoursedetailsComponent } from './learner/pages/coursedetails/coursedetails.component';
import { HeaderComponent } from './common/header/header.component';
import { OtpComponent } from './learner/pages/otp/otp.component';
import { PasswordComponent } from './learner/pages/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AlertComponentComponent,
    CoursedetailsComponent,
    HeaderComponent,
    OtpComponent,
    PasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphqlModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    // MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [CookieService, AlertComponentComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AlertComponentComponent]
})
export class AppModule { }
