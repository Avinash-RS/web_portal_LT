import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service';

@Component({
  selector: 'app-blob-reader',
  templateUrl: './blob-reader.component.html',
  styleUrls: ['./blob-reader.component.css']
})
export class BlobReaderComponent implements OnInit {

  constructor(private wcaService: WcaService) { }

  ngOnInit() {
    console.log('blob reader loaded..');
    this.getContainers();
  }

  getContainers() {
    this.wcaService.getContainers().subscribe( res => {
      console.log(res);
    });
  }

}
