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
                let lang = localStorage.getItem('language')
                this.translate.use(lang ? lang : 'en')
                }

  ngOnInit() {
  //   this.dialogRef.keydownEvents().subscribe(event => {
  //     if (event.key === "Escape") {
  //         this.onCancel();
  //     }
  // });
  }
//   onCancel(): void {
//     this.data.cancel = true;
//     this.dialogRef.close(this.data);
// }
  closedialogbox() {
    this.dialog.closeAll();
  }

}
