import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'd3';
import 'nvd3';
import { NvD3Module } from 'ng2-nvd3';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  imports: [
    CommonModule,
    NvD3Module,
    FlexLayoutModule
  ],
  declarations: [   ]
})
export class Nvd3ChartsModule { }
