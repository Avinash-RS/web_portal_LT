import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-video-preview-modal',
  templateUrl: './video-preview-modal.component.html',
  styleUrls: ['./video-preview-modal.component.css']
})
export class VideoPreviewModalComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    (event.code === 'Escape') && this.close();
  }

  private displayURL;

  constructor(private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<VideoPreviewModalComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.displayURL = sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  changePosition() {
    this.dialogRef.updatePosition({ top: '10px' });
  }

  close() {
    this.dialogRef.close();
  }

}
