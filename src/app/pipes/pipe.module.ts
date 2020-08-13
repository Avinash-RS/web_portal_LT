import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterPipeWithoutUnique } from './filterpipe_without_unique';
import { FilterPipeforselect } from './filterSelect';
// import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';
import { SortStatusPipe } from './sort-status.pipe';




@NgModule({
  declarations: [
    FilterPipe,
    FilterPipeWithoutUnique,
    FilterPipeforselect,
    // SearchPipe,
    SortPipe,
    SortStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    FilterPipeWithoutUnique,
    FilterPipeforselect,
    // SearchPipe,
    SortPipe,
    SortStatusPipe
  ],
})
export class PipeModule { }
