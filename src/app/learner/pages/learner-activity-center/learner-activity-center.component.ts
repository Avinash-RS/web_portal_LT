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
          field: 'course',
        },
        {
          headerName: 'Module',
          field: 'module',
        },
        {
          headerName: 'Topic',
          field: 'topic',
        },
        {
          headerName: 'Activity',
          field: 'activity',
        },
        {
          headerName: 'Status',
          field: 'status',
          cellRenderer: (data) => {
            if (data.value === 'submitted') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:#FFA04E">stop_circle</mat-icon></span> Submitted `;
            } else if (data.value === 'graded') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:green">stop_circle</mat-icon></span> Graded `;
            } else if (data.value === 'yettosubmit') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:grey">stop_circle</mat-icon></span> Yet to Submit `;
            } else if (data.value === 'overdue') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:red">stop_circle</mat-icon></span> Overdue`;
            }

          },
        },
        {
          headerName: 'Score',
          field: 'score',
        },
      ];
    this.rowData = [
      {
        course: 'Gardening for all',
        module: 'Gardening for experts',
        topic: 'Plants-classifications',
        activity: 'Assignments',
        status: 'graded',
        score: '10/100'
      },
      {
        course: 'Gardening for all',
        module: 'Gardening for experts',
        topic: 'Plants-classifications',
        activity: 'Assignments',
        status: 'submitted',
        score: '10/100'
      },
      {
        course: 'Gardening for all',
        module: 'Gardening for experts',
        topic: 'Plants-classifications',
        activity: 'Assignments',
        status: 'yettosubmit',
        score: '-/100'
      },
      {
        course: 'Gardening for all',
        module: 'Gardening for experts',
        topic: 'Plants-classifications',
        activity: 'Assignments',
        status: 'overdue',
        score: '-/100'
      }


    ];

  }




  // End of screen 5 - View All Activities card //

  // ******************************************************************************** //
}
