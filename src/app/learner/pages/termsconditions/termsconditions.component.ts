import { Component, OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.component.html',
  styleUrls: ['./termsconditions.component.scss']
})
export class TermsconditionsComponent implements OnInit {

  constructor( private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TermsconditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
