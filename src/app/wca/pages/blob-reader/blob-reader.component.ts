import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { BlobServicesService } from '../../services/azureBlobService/blob-services.service';
import { VideoPreviewModalComponent } from '../../pages/video-preview-modal/video-preview-modal.component';

@Component({
  selector: 'app-blob-reader',
  templateUrl: './blob-reader.component.html',
  styleUrls: ['./blob-reader.component.css']
})
export class BlobReaderComponent implements OnInit {

  public exploredData = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    (event.code === 'Escape') && this.closeModel();
  }

  constructor(private dialogRef: MatDialogRef<BlobReaderComponent>,
    private dialog: MatDialog,
    private azureBlobService: BlobServicesService) { }

  ngOnInit() {
    this.getContainers();
    this.changePosition();
  }

  getContainers() {
    this.azureBlobService.getContainerBlobs().subscribe(res => {
      if (res.statusBool) {
        this.exploredData = res.data;
        console.log(res.data);
      };
    });
  }

  getURL(row) {
    this.dialogRef.close(row);
  }

  closeModel() {
    this.dialogRef.close(false);
  }

  changePosition() {
    this.dialogRef.updatePosition({ top: '0px' });
  }

  preview(row) {
    const dialogRef = this.dialog.open(VideoPreviewModalComponent, {
      data: { url: row.url },
      height: '38%',
      width: '30%',
      closeOnNavigation: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

}
