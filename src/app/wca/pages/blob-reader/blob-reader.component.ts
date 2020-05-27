import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BlobServicesService } from '../../services/azureBlobService/blob-services.service';

@Component({
  selector: 'app-blob-reader',
  templateUrl: './blob-reader.component.html',
  styleUrls: ['./blob-reader.component.css']
})
export class BlobReaderComponent implements OnInit {

  public exploredData: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    (event.code === 'Escape') && this.closeModel();
  }

  constructor(private dialogRef: MatDialogRef<BlobReaderComponent>,
    private azureBlobService: BlobServicesService) { }

  ngOnInit() {
    this.getContainers();
  }

  getContainers() {
    this.azureBlobService.getContainerBlobs().subscribe(res => {
      if (res.statusBool) {
        this.exploredData = res.data
      };
    });
  }

  getURL(row) {
    this.dialogRef.close(row);
  }

  closeModel() {
    this.dialogRef.close(false);
  } 

}
