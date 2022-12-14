import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-knowledge-preview',
  templateUrl: './knowledge-preview.component.html',
  styleUrls: ['./knowledge-preview.component.scss']
})
export class KnowledgePreviewComponent implements OnInit {
  blobToken = environment.blobKey;
  fileType;
  file: any;
  isCancelLoad = false;
  constructor(@Optional() public dialogRef: MatDialogRef<KnowledgePreviewComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public batchdialogdata,
              private sanitizer: DomSanitizer,
              public translate: TranslateService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en');
               }

  ngOnInit() {
    setTimeout(() => {
      this.isCancelLoad = true;
    }, 500);
    this.fileType = this.batchdialogdata.fileType;
    if (this.fileType === 'pdf') {
      this.batchdialogdata.file = this.batchdialogdata.file;
      if (this.batchdialogdata?.internal === 'yes' || this.batchdialogdata?.internal === 'Yes') {
        this.file = this.batchdialogdata.file + this.blobToken;
      } else {
        this.file = this.batchdialogdata.file;
      }
    } else {
      if (this.batchdialogdata?.internal === 'yes' || this.batchdialogdata?.internal === 'Yes') {
        this.file = this.sanitizer.bypassSecurityTrustResourceUrl(this.batchdialogdata.file + this.blobToken);
      } else {
        this.file = this.sanitizer.bypassSecurityTrustResourceUrl(this.batchdialogdata.file);
      }
   }
  }

  onClose() {
    this.dialogRef.close();
  }
}
