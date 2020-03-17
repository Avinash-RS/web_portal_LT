import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
// import { CookieService } from 'ngx-cookie-service';
// import { CookieModule, CookieService } from 'ngx-cookie';
@NgModule({
  declarations: [],
  imports: [
    // CookieModule.forRoot(),
    CommonModule,
    LoginRoutingModule,
  ],providers : []
})
export class LoginModule { }
