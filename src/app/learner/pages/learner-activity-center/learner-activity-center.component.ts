import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';

@Component({
  selector: 'app-learner-activity-center',
  templateUrl: './learner-activity-center.component.html',
  styleUrls: ['./learner-activity-center.component.scss']
})
export class LearnerActivityCenterComponent implements OnInit {
  // Boolean
  showHomeScreen = true;
  showNextActivityOn = false;
  showCompleted = false;
  showPendingActivities = false;
  showViewAllActivities = true;

  // String

  // Array

  // Number

  // Any
  columnDefs: any;
  defaultColDef = {
    flex: 1,
    minWidth: 30,
    resizable: true,
    floatingFilter: true,
    suppressMenu: true,
    lockPosition: true,
    unSortIcon: true,
  };
  rowData: any;
  constructor(private service: LearnerServicesService) {
    this.tabledef();
  }

  ngOnInit() {
  }

  // Activity center Homescreen Starts here //


  // Activity center Homescreen Ends here //


  // ******************************************************************************** //

  // Start of screen 2 - Next activity on card //




  // End of screen 2 - Next activity on card //

  // ******************************************************************************** //

  // Start of screen 3 - Completed card //





  // End of screen 3 - Completed card //

  // ******************************************************************************** //

  // Start of screen 4 - Pending Activities card //



  // End of screen 4 - Pending Activities card //

  // ******************************************************************************** //

  // Start of screen 5 - View All Activities card //
  tabledef() {
    this.columnDefs =
      [
        {
          headerName: 'Course',
          field: 'statusfield',
        },
        {
          headerName: 'Module',
          field: 'statusfield',
        },
        {
          headerName: 'Topic',
          field: 'statusfield',
        },
        {
          headerName: 'Activity',
          field: 'statusfield',
        },
        {
          headerName: 'Status',
          field: 'statusfield',
        },
        {
          headerName: 'Score',
          field: 'statusfield',
        },
      ];
    this.rowData = [
      { statusfield: 'Emerging technologies' },
      { statusfield: 'Emerging technologies' },
      { statusfield: 'Emerging technologies' },
      { statusfield: 'Emerging technologies' },
    ];

  }




  // End of screen 5 - View All Activities card //

  // ******************************************************************************** //
}
