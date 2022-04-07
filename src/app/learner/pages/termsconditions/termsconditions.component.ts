import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.component.html',
  styleUrls: ['./termsconditions.component.scss']
})
export class TermsconditionsComponent implements OnInit {

  constructor( private router: Router,
               public dialog: MatDialog,
               public dialogRef: MatDialogRef<TermsconditionsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public translate: TranslateService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en');
                }

  ngOnInit() {
  }
  closedialogbox() {
    this.dialog.closeAll();
  }

}
