import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss']
})
export class ActivityreportComponent implements OnInit {
  defaultColDef = {
    resizable: false,
    floatingFilter: false,
    enableColResize: false,
    sortable: false,
    lockPosition: true,
    suppressMenu: true,
    unSortIcon: true,
  };
  rows = [
    {Module:'Dotnet Collection',Topic:'Dotnet Collection Asses…',Activity:'Perform',Iteration:'1',Status:'Graded',Submission:'Late',Score:'89/100'},
    {Module:'Dotnet Collection',Topic:'Dotnet Collection Asses…',Activity:'Perform',Iteration:'1',Status:'Submitted',Submission:'Late',Score:'89/100'},
    {Module:'Dotnet Collection',Topic:'Dotnet Collection Asses…',Activity:'Perform',Iteration:'1',Status:'Yet to submit',Submission:'Late',Score:'89/100'},

  ]
  cols = [
    { headerName: 'Module', field: 'Module', width: 200, tooltipField: 'quiz_name',},
    { headerName: 'Topic', field: 'Topic', minWidth: 200, width: 200},
    { headerName: 'Activity', field: 'Activity', minWidth: 100, width: 100},
    { headerName: 'Iteration', field: 'Iteration', minWidth: 90, width: 90},
    { headerName: 'Status', field: 'Status', minWidth: 150, width: 150, cellClass:'statusClass',flex:1,
    cellRenderer: (params) => {
      if (params?.data?.Status === 'Graded') {
        return `<div class="statusBtn">
              <div class="dot graded"></div> <div>Graded</div>
        </div>`;
      } else if (params?.data?.Status === 'Submitted') {
        return `<div class="statusBtn">
                 <div class="dot submitted"></div> <div>Submitted</div>
             </div>`;
      } else {
        return `<div class="statusBtn">
                <div class="dot yettosubmit"></div> <div>Yet to submit</div>
              </div>`;
      }

    }},
    { headerName: 'Submission', field: 'Submission', minWidth: 100, width: 100},
    { headerName: 'Score', field: 'Score', minWidth: 110, width: 110},
  ];
  gridApi: any;
  constructor() { }

  ngOnInit(): void {
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // this.geTQuizData();
  }
}
