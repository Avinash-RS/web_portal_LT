import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(true);
  }
}
