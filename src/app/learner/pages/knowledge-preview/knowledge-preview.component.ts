import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-knowledge-preview',
  templateUrl: './knowledge-preview.component.html',
  styleUrls: ['./knowledge-preview.component.scss']
})
export class KnowledgePreviewComponent implements OnInit {

  fileType: String;
  file: any;
  isCancelLoad = false;
  constructor(@Optional() public dialogRef: MatDialogRef<KnowledgePreviewComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public batchdialogdata,
  private sanitizer: DomSanitizer) { }

  ngOnInit() {
     setTimeout(() => {
       this.isCancelLoad = true;
     }, 500);
   this.fileType = this.batchdialogdata.fileType;
   if(this.fileType == 'pdf') {
    this.batchdialogdata.file = this.batchdialogdata.file+'#toolbar=0'
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl(this.batchdialogdata.file);
   }
   else {
   this.file = this.sanitizer.bypassSecurityTrustResourceUrl(this.batchdialogdata.file);
   }
  }

  onClose() {
    this.dialogRef.close();
  }
}
