import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterPipeWithoutUnique } from './filterpipe_without_unique';
import { FilterPipeforselect } from './filterSelect';



@NgModule({
  declarations: [
    FilterPipe,
    FilterPipeWithoutUnique,
    FilterPipeforselect
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    FilterPipeWithoutUnique,
    FilterPipeforselect
  ],
})
export class PipeModule { }
