import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-learner-activity-center',
  templateUrl: './learner-activity-center.component.html',
  styleUrls: ['./learner-activity-center.component.scss']
})
export class LearnerActivityCenterComponent implements OnInit {
  // Boolean
  // showHomeScreen = true;
  // showNextActivityOn = false;
  // showCompleted = false;
  // showPendingActivities = false;
  showViewAllActivities = true;


  // String

  // Array

  // Number
  paginationPageSize = 10;
  cacheBlockSize: any = 10;
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
      this.sortType = 'undefined';
      this.searchValue = '';
      this.searchColumn = 'undefined';
      if (this.navDetails?.tableType === 'completed') {
        // this.searchColumn = 'undefined';
        const statusB = [{
          ['$or']: [{ ['files.submit_status']: { $regex: 'Graded', $options: 'i' } },
          { 'files.submit_status': { $regex: 'Submitted', $options: 'i' } }]
        }];
        this.statusBased = JSON.stringify(statusB);
      } else if (this.navDetails?.tableType === 'pending') {
        const statusB = [{ ['files.submit_status']: { $regex: 'Yet to submit', $options: 'i' } }];
        this.statusBased = JSON.stringify(statusB);
      } else if (this.navDetails?.tableType === 'allActivities' || 'submission') {
        this.statusBased = 'undefined';
      }
      if (this.navDetails?.tableType === 'submission') {
        // need to add course id from navigation for view submission details
        this.courseId = this.navDetails?.id;
      } else {
        this.courseId = 'undefined';
      }
      this.service.getCourseActivities(userId, PageNumber, this.courseId, this.sortType, this.searchValue,
        this.searchColumn, this.statusBased)
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
  sortrecord: string;
  rowDataLength: any;
  columnSearch: any;
  statusBased: string;
  navDetails: any;

  constructor(private service: LearnerServicesService, private gs: GlobalServiceService,
              private route: Router, private toastr: ToastrService, ) {
    this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    // console.log(this.detail, 'det');
    this.navDetails = this.detail || JSON.parse(atob(localStorage.getItem('course')));
    // console.log(this.navDetails, 'cd');
    this.userDetails = this.gs.checkLogout();
    this.tabledef();
    // this.getCourseActivitiesforTable();

  }

  ngOnInit() {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDatasource(this.dataSources);
  }


  tabledef() {
    if (this.navDetails?.tableType === 'submission') {
      this.hideCourseColumn = true;
    }
    // console.log(this.hideCourseColumn);
    this.columnDefs =
      [
        {
          headerName: 'Course',
          field: 'course_name',
          hide: this.hideCourseColumn,
          sortable: true,
          filter: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
        {
          headerName: 'Module',
          field: 'module_name',
          sortable: true,
          filter: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
        {
          headerName: 'Topic',
          field: 'topic_name',
          sortable: true,
          filter: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
        {
          headerName: 'Activity',
          // Need to change field once API is updated and assignments to '-' in value getter
          field: 'activity',
          valueGetter: (params) => params.data?.activity ? params.data.activity : 'Assignments',
          // sortable: true,
        },
        {
          headerName: 'Status',
          field: 'status',
          sortable: true,
          filter: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
          cellRenderer: (data) => {
            // console.log(data, 'status');
            if (data.value === 'Submitted') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:#FFA04E">stop_circle</mat-icon></span> Submitted `;
            } else if (data.value === 'Graded') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color: #679959">stop_circle</mat-icon></span> Graded `;
            } else if (data.value === 'Yet to submit') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color: #6A6A6A">stop_circle</mat-icon></span> Yet to Submit `;
            } else if (data.value === 'Overdue') {
              return `<span> <mat-icon class="mat-icon material-icons f_size_16" style="vertical-align: text-top; color:#C02222 ">stop_circle</mat-icon></span> Overdue`;
            }

          },
        },
        {
          headerName: 'Score',
          field: 'score',
          sortable: true,
          filter: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
      ];
  }

  goBack() {
    if (this.navDetails?.tableType === 'submission') {
      this.route.navigateByUrl('/Learner/MyCourse');
    } else {
      this.route.navigateByUrl('/Learner/activitycenterhomescreen');
    }
  }

  onKeyChange(quickSearchValue) {
    if (quickSearchValue.length >= 3) {
      this.searchValue = quickSearchValue;
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.callGridApi(this.sortrecord || 'undefined', this.searchValue || '', 'undefined');
        // this.callGridApi(this.sortrecord || 'undefined', this.searchValue || '', this.searchColumn || 'undefined');
      }, 500);
    } else if (quickSearchValue.length === 0) {
      this.closesearch();
    }
  }

  closesearch() {
    this.quickSearchValue = null;
    // this.paginationPageSize = 10;
    // this.searchValue = 'undefined';
    // this.sortType = 'undefined';
    this.callGridApi(
      this.sortrecord || 'undefined',
      '',
      this.searchColumn || 'undefined'
    );
  }
  callGridApi(sortValue, globalSearchValue, searchColumnVal) {
    this.sortrecord = sortValue;
    this.searchValue = globalSearchValue ? globalSearchValue : '';
    console.log(searchColumnVal, 'sc');
    this.searchColumn = searchColumnVal;
    this.gridApi.setDatasource({
      getRows: (params: IGetRowsParams) => {
        const userId = this.userDetails.user_id;
        const PageNumber = params.startRow / 10 || 0;
        if (this.navDetails?.tableType === 'completed') {
          const statusB = [{
            ['$or']: [{ ['files.submit_status']: { $regex: 'Graded', $options: 'i' } },
            { 'files.submit_status': { $regex: 'Submitted', $options: 'i' } }]
          }];
          this.statusBased = JSON.stringify(statusB);
        } else if (this.navDetails?.tableType === 'pending') {
          const statusB = [{ ['files.submit_status']: { $regex: 'Yet to submit', $options: 'i' } }];
          this.statusBased = JSON.stringify(statusB);
        } else if (this.navDetails?.tableType === 'allActivities' || 'submission') {
          this.statusBased = 'undefined';
        }
        if (this.navDetails?.tableType === 'submission') {
          // need to add course id from navigation for view submission details
          this.courseId = this.navDetails?.id;
        } else {
          this.courseId = 'undefined';
        }
        this.service.getCourseActivities(userId, PageNumber, this.courseId, this.sortrecord, this.searchValue,
          this.searchColumn, this.statusBased)
          .subscribe((result: any) => {
            // console.log(result, 'r');
            if (result.data.get_course_activities.message.length === 0) {
              this.toastr.warning('No results found');
            }
            if (result.data && result.data.get_course_activities?.success) {
              if (params.startRow === 0) {
                this.rowData = [];
              }
              this.rowData = result.data.get_course_activities.message;
              this.rowDataLength = result.data.get_course_activities.total_count;
            }
            params.successCallback(
              result.data.get_course_activities.message, result.data.get_course_activities.total_count
            );
          });
      }
    });
  }

  onSort(data: any) {
    const sortState = this.gridApi.getSortModel();
    // console.log(sortState, 'ss');
    if (sortState.length === 0) {
      this.sortrecord = 'undefined';
      this.callGridApi(this.sortrecord, this.searchValue || '', this.searchColumn);
    } else {
      if (sortState[0].colId === 'course_name') {
        const r = { ['coursenamesortfield']: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      } else if (sortState[0].colId === 'module_name') {
        const r = { ['modulenamesortfield']: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      } else if (sortState[0].colId === 'topic_name') {
        const r = { ['topicnamesortfield']: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      } else if (sortState[0].colId === 'score') {
        const r = { [sortState[0]?.colId]: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      } else if (sortState[0].colId === 'status') {
        const r = { ['files.submit_status']: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      } else {
        const r = { [sortState[0]?.colId]: sortState[0]?.sort === 'asc' ? 1 : -1 };
        this.sortrecord = JSON.stringify(r);
      }
      // console.log(this.sortrecord, 'sr');
      this.callGridApi(this.sortrecord, this.searchValue || '', this.searchColumn || 'undefined');
    }
  }
  activityFilter(event) {
    let searchString = null;
    const filterModel = this.gridApi.getFilterModel();
    searchString = this.gridApi.getFilterModel()[Object.keys(this.gridApi.getFilterModel())[0]]?.filter || null;
    // console.log(searchString);
    const filterArray = [];
    for (const keyd in filterModel) {
      if (filterModel) {
        const filter: any = {};
        let propName;
        propName = keyd;
        if (propName === 'course_name') {
          searchString = filterModel[keyd].filter;
          filter['coursearray' + '.' + propName] = { $regex: searchString.trimEnd(), $options: 'i' };
        } else if (propName === 'module_name') {
          searchString = filterModel[keyd].filter;
          filter['files.module_id'] = { $regex: searchString.trimEnd(), $options: 'i' };
        } else if (propName === 'topic_name') {
          searchString = filterModel[keyd].filter;
          filter['files.topic_id'] = { $regex: searchString.trimEnd(), $options: 'i' };
        } else if (propName === 'score') {
          searchString = filterModel[keyd].filter;
          filter[propName] = { $regex: searchString.trimEnd(), $options: 'i' };
        } else if (propName === 'status') {
          searchString = filterModel[keyd].filter;
          filter['files.submit_status'] = { $regex: searchString.trimEnd(), $options: 'i' };
        } else {
          searchString = filterModel[keyd].filter;
          filter[propName] = { $regex: searchString.trimEnd(), $options: 'i' };
        }
        filterArray.push(filter);

      }
    }
    if (filterArray.length > 0) {
      this.searchColumn = JSON.stringify(filterArray);
      // console.log(this.searchColumn, 'searchcol');
      this.callGridApi(this.sortrecord || 'undefined', '', this.searchColumn);
      // this.callGridApi(this.sortrecord || 'undefined', this.searchValue || '', this.searchColumn);
    } else if (!searchString) {
      this.searchColumn = 'undefined';
      this.callGridApi(this.sortrecord || 'undefined', '', this.searchColumn);
    }
  }
}
