import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  words2 = [{ value: '' }];
  add(i) {
    
      this.words2.push({ value: '' });
  
  }


}
