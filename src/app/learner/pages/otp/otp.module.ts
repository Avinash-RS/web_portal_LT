import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgOtpInputModule } from 'ng-otp-input';
import { OtpRoutingModule } from './otp-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OtpRoutingModule,
    NgOtpInputModule
  ]
})
export class OtpModule { }
