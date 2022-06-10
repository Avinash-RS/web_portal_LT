import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from "@learner/services/learner-services.service";
import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';

@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss']
})
export class ActivityreportComponent implements OnInit {
  secretKey = '(!@#Passcode!@#)';

  defaultColDef = {
    resizable: false,
    floatingFilter: false,
    enableColResize: false,
    sortable: false,
    lockPosition: true,
    suppressMenu: true,
    unSortIcon: true,
  };
  
  cols = [
    { headerName: 'Module', field: 'module_id', minWidth: 200,width: 200, tooltipField: 'module_id'},
    { headerName: 'Topic', field: 'topic_id', minWidth: 200, width: 200, tooltipField: 'topic_id'},
    { headerName: 'Activity', field: 'activityType', minWidth: 80, width: 80},
    { headerName: 'Iteration', field: 'Iteration', minWidth: 90, width: 90},
    { headerName: 'Status', field: 'submit_status', minWidth: 150, width: 150, cellClass:'statusClass',flex:1,
    cellRenderer: (params) => {
      console.log(params)
      if (params?.data?.grade_status === 'Evaluated') {
        return `<div class="statusBtn">
              <div class="dot graded"></div> <div>Graded</div>
        </div>`;
      } else if (params?.data?.grade_status === 'Not Evaluated') {
        return `<div class="statusBtn">
                 <div class="dot submitted"></div> <div>Submitted</div>
             </div>`;
      } else {
        return `<div class="statusBtn">
                <div class="dot yettosubmit"></div><div>Yet to submit</div>
              </div>`;
      }

    }},
    { headerName: 'Submission', field: 'submit_status', minWidth: 100, width: 100},
    { headerName: 'Score', field: 'total_mark', minWidth: 80, width: 80},
  ];
  gridApi: any;
  getuserid: any;
  sourceData: any;
  grupdata: any;
  constructor(private service:LearnerServicesService) { }

  ngOnInit(): void {
    this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
    // const id = CryptoJS.AES.decrypt(this.getuserid.user_id,this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    this.service.overallActivitySubmits(this.getuserid.user_id).subscribe((arg:any) =>{ 
      this.sourceData = arg.data.overallActivitySubmits.data
      this.grupdata = _.chain(this.sourceData)
      .groupBy("course_id")
      .map((value, key) => ({ courseName: value[0].course_name, courseDetails: value })).value()
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // this.geTQuizData();
  }
}
