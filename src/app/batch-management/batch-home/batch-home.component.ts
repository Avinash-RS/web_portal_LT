import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.scss']
})
export class BatchHomeComponent implements OnInit {

  sortValue = ['A to Z','Z to A']

  constructor() { }

  ngOnInit() {
  }

}
