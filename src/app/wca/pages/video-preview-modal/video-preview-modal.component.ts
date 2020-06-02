import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-video-preview-modal',
  templateUrl: './video-preview-modal.component.html',
  styleUrls: ['./video-preview-modal.component.css']
})
export class VideoPreviewModalComponent implements OnInit {

  displayURL: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Escape') { this.close(); }
  }

  constructor(private sanitizer: DomSanitizer,
              private dialogRefVdo: MatDialogRef<VideoPreviewModalComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.displayURL = sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  ngOnInit() {
    this.dialogRefVdo.updatePosition({ top: '10px' });
  }

  close() {
    this.dialogRefVdo.close();
  }

}
