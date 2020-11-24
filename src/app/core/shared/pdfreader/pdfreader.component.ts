import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfreader',
  templateUrl: './pdfreader.component.html',
  styleUrls: ['./pdfreader.component.scss']
})
export class PdfreaderComponent implements OnInit {
  pdfSrc: any = {};
  // tslint:disable-next-line:no-input-rename
  @Input('url') url: any;
  isEnable = false;
  constructor() {
   }

  ngOnInit() {
    if (this.url.doc_type === 'application/pdf') {
      this.isEnable = true;
      // this.pdfSrc = {
      //   url: this.url.path,
      //   withCredentials: true
      //  };
      this.pdfSrc = this.url.path;
    } else {
      this.isEnable = false;
      this.pdfSrc =  this.url.path;
    }
  }

}
