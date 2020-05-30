import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ProfileComponent } from './profile.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
    MatSelectModule,
    MatProgressBarModule,
    // CountdownModule
  ]
})
export class ProfileModule { }
