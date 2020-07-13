import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { batchService } from '../batch-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.scss']
})
export class BatchHomeComponent implements OnInit {

  searchBatch: any;
  sortValue = ['A to Z', 'Z to A']
  batchList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: batchService,private router: Router) { }

  ngOnInit() {

    this.getBatchList();
  }

  getBatchList() {
    this.apiService.getBatch().subscribe((data: any) => {
      data.data.read_batch.message.forEach((val) => {
        let isStart, isEnd;
        if (val.batchstartdate && val.batchenddate) {
          isStart = this.dateDiffCalc(val.batchstartdate);
          isEnd = this.dateDiffCalc(val.batchenddate);
        }
        if(isStart < 0){
          val.batchstatus = "Yet to start";
        }
        else if(isStart > 0 && isEnd < 0) {
          val.batchstatus = 'On-going';
        }
        else if(isStart > 0 && isEnd > 0) {
          val.batchstatus = 'Completed';
        }
        else {
          val.batchstatus = 'Yet to start';
        }
      })
      this.batchList = data.data.read_batch.message;
    })
  }

  editBatch(id) {
    this.router.navigate(['/Admin/auth/batch/create'], {
      queryParams:
      {
        batchId: id
      }
    });
  }

  dateDiffCalc(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
