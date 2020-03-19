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
    MatTooltipModule,
    MatDialogRef,
    MatTabsModule,
    MatAutocompleteModule,
  } from '@angular/material';
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
        MatTabsModule,
        MatTooltipModule,
        MatAutocompleteModule
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
        MatAutocompleteModule
    ],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
   ],
  })
  export class MaterialModule {}