import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ProfileComponent } from './profile.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileComponent,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class ProfileModule { }
