import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { batchService } from '../batch-management.service';

@Component({
  selector: 'batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.scss']
})
export class BatchHomeComponent implements OnInit {

  sortValue = ['A to Z','Z to A']
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: batchService) { }

  ngOnInit() {

    this.getBatchList();
  }

  getBatchList() {
    this.apiService.getBatch().subscribe((data) => {
      debugger
    })
  }
}
