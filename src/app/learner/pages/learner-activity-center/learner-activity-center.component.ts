import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';

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
  userDetails: any;
  searchColumn: any;
  hideCourseColumn: any;
  dataSources: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const userId = this.userDetails.user_id;
      // const userId = 'egs8fv';
      const PageNumber = params.startRow / 10 || 0;
      const sortType = 'undefined';
      const searchValue = '';

      if (this.detail?.key === 'completed') {
        // this.searchColumn = 'undefined';
        const searchC = [{
          ['$or']: [{ ['files.submit_status']: { '$regex': 'Graded', '$options': 'i' } },
          { 'files.submit_status': { '$regex': 'Submitted', '$options': 'i' } }]
        }];
        this.searchColumn = JSON.stringify(searchC);
      } else if (this.detail?.key === 'pending') {
        const searchC = [{ ['files.submit_status']: { '$regex': 'Yet to submit', '$options': 'i' } }];
        this.searchColumn = JSON.stringify(searchC);
      } else if (this.detail?.key === 'allActivities' || 'submission') {
        this.searchColumn = 'undefined';
      }
      if (this.detail?.key === 'submission') {
        // need to add course id from navigation for view submission details
        this.courseId = this.courseDetails?.id;
      } else {
        this.courseId = 'undefined';
      }
      this.service.getCourseActivities(userId, PageNumber, this.courseId, sortType, searchValue, this.searchColumn)
        .subscribe((result: any) => {
          // console.log(result, 'r');
          if (result.data.get_course_activities.total_count > 0) {
            params.successCallback(
              result.data.get_course_activities.message, result.data.get_course_activities.total_count
            );
          } else {
          }
        });
    }
  };
  gridApi: any;
  detail: any;
  quickSearchValue = null;
  delayTimer: NodeJS.Timeout;
  searchValue: any;
  sortType: string;
  courseId: any;
  courseDetails: any;
  constructor(private service: LearnerServicesService, private gs: GlobalServiceService,
    private route: Router,) {
    this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    // console.log(this.detail.key, 'det');
    this.courseDetails = this.detail || JSON.parse(atob(localStorage.getItem('course')));
    // console.log(this.courseDetails, 'cd');
    this.userDetails = this.gs.checkLogout();
    this.tabledef();
    // this.getCourseActivitiesforTable();

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
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDatasource(this.dataSources);
  }

  // getCourseActivitiesforTable() {
  //   // const userId = this.userDetails.user_id;
  //   const userId = this.userDetails.user_id;
  //   const PageNumber = '0';
  //   const courseId = 'undefined';
  //   const sortType = 'undefined';
  //   const searchValue = 'undefined';
  //   const searchColumn = 'undefined';
  //   this.service.getCourseActivities(userId, PageNumber, courseId, sortType, searchValue, searchColumn).subscribe((result: any) => {
  //     console.log(result, 'r');
  //   });
  // }

  tabledef() {
    if (this.detail?.key === 'submission') {
      this.hideCourseColumn = true;
    }
    // console.log(this.hideCourseColumn);
    this.columnDefs =
      [
        {
          headerName: 'Course',
          field: 'course_name',
          hide: this.hideCourseColumn,
        },
        {
          headerName: 'Module',
          field: 'module_name',
        },
        {
          headerName: 'Topic',
          field: 'topic_name',
        },
        {
          headerName: 'Activity',
          field: 'activity',
          valueGetter: (params) => params.data?.activity ? params.data.activity : '-',
        },
        {
          headerName: 'Status',
          field: 'status',
          cellRenderer: (data) => {
            // console.log(data, 'status');
            if (data.value === 'Submitted') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:#FFA04E">stop_circle</mat-icon></span> Submitted `;
            } else if (data.value === 'Graded') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:green">stop_circle</mat-icon></span> Graded `;
            } else if (data.value === 'Yet to submit') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:grey">stop_circle</mat-icon></span> Yet to Submit `;
            } else if (data.value === 'Overdue') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:red">stop_circle</mat-icon></span> Overdue`;
            }

          },
        },
        {
          headerName: 'Score',
          field: 'score',
        },
      ];
    // this.rowData = [
    //   {
    //     course: 'Gardening for all',
    //     module: 'Gardening for experts',
    //     topic: 'Plants-classifications',
    //     activity: 'Assignments',
    //     status: 'graded',
    //     score: '10/100'
    //   },
    //   {
    //     course: 'Gardening for all',
    //     module: 'Gardening for experts',
    //     topic: 'Plants-classifications',
    //     activity: 'Assignments',
    //     status: 'submitted',
    //     score: '10/100'
    //   },
    //   {
    //     course: 'Gardening for all',
    //     module: 'Gardening for experts',
    //     topic: 'Plants-classifications',
    //     activity: 'Assignments',
    //     status: 'yettosubmit',
    //     score: '-/100'
    //   },
    //   {
    //     course: 'Gardening for all',
    //     module: 'Gardening for experts',
    //     topic: 'Plants-classifications',
    //     activity: 'Assignments',
    //     status: 'overdue',
    //     score: '-/100'
    //   }


    // ];

  }




  // End of screen 5 - View All Activities card //

  // ******************************************************************************** //

  goBack() {
    if (this.detail?.key === 'submission') {
      this.route.navigateByUrl('/Learner/MyCourse');
    } else {
    this.route.navigateByUrl('/Learner/activitycenterhomescreen');
    }
  }

  onKeyChange(data) {
    if (data.length >= 3) {
      this.searchValue = data;
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.callGridApi(this.searchValue, this.sortType || 'undefined');
      }, 500)

    } else if (data.length === 0) {
      this.closesearch();
    }
  }

  callGridApi(search, sortType) {
    this.gridApi.setDatasource({
      getRows: (params: IGetRowsParams) => {
        const userId = this.userDetails.user_id;
        const PageNumber = params.startRow / 10 || 0;
        const courseId = 'undefined';
        const sortType = 'undefined';
        const searchColumn = 'undefined';
        this.service.getCourseActivities(userId, PageNumber, courseId, sortType, search, searchColumn)
          .subscribe((result: any) => {
            // console.log(result, 'r');
            params.successCallback(
              result.data.get_course_activities.message, 10
            );
          });
      }
    });
  }

  closesearch() {
    this.quickSearchValue = null;
    // this.paginationPageSize = 10;
    this.searchValue = 'undefined';
    this.sortType = 'undefined';
    this.callGridApi(
      this.searchValue || 'undefined',
      this.sortType || 'undefined'
    );
  }

  onSort(data: any) {
    const sortState = this.gridApi.getSortModel();
    console.log(sortState, 'ss');
  }
}
