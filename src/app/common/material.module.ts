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
  MatProgressBarModule
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
    MatProgressBarModule,
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
    MatProgressBarModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  declarations: [],
})
export class MaterialModule { }