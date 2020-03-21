import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileComponent,
    MatSelectModule
  ]
})
export class ProfileModule { }
