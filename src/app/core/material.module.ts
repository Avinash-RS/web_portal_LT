import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatChipsModule,
  MatTooltipModule,
  MatDialogRef,
  MatTabsModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatExpansionModule
} from '@angular/material';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
   
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  declarations: [
 
  ]
})
export class MaterialModule { }
