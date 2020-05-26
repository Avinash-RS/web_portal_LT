import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WcaService } from '../../services/wca.service';
import { BlobServicesService } from '../../services/azureBlobService/blob-services.service';

@Component({
  selector: 'app-blob-reader',
  templateUrl: './blob-reader.component.html',
  styleUrls: ['./blob-reader.component.css']
})
export class BlobReaderComponent implements OnInit {

  public exploredData: any;

  constructor(private dialogRef: MatDialogRef<BlobReaderComponent>,
    private azureBlobService: BlobServicesService) { }

  ngOnInit() {
    this.getContainers();
  }

  getContainers() {
    this.azureBlobService.getContainerBlobs().subscribe(res => {
      console.log(res);
      if (res.statusBool) {
        this.exploredData = res.data;
      }
    });
  }

  getURL(row) {
    this.dialogRef.close(row);
  }

}
