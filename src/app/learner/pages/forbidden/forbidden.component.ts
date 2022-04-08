import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(public translate: TranslateService) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
   }

  ngOnInit() {
  }

}
