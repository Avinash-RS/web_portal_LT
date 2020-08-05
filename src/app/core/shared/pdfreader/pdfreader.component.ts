import { Component, OnInit, Input } from '@angular/core';

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
    console.log(this.url.path);
    if (this.url.doc_type === 'application/pdf') {
      this.isEnable = true;
      this.pdfSrc = {
        url: this.url.path,
        withCredentials: true
       };
    } else {
      this.isEnable = false;
      this.pdfSrc =  this.url.path;
    }
  }

}
