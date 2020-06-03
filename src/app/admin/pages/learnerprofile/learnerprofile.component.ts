import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-learnerprofile',
  templateUrl: './learnerprofile.component.html',
  styleUrls: ['./learnerprofile.component.scss']
})
export class LearnerprofileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columns = [
    { columnDef: 'course_start_datetime', header: 'Date', cell: (element: any) => `${element.course_start_datetime ?
      moment(element?.course_start_datetime).format('LL') || '' : element.lastlogin ? moment(element?.lastlogin).format('LL') || '' :
       moment(element?.last_logout).format('LL') || ''}`},
       { columnDef: 'course_active_time', header: 'Time', cell: (element: any) => `${element.course_start_datetime ?
        moment(element?.course_start_datetime).format('LT') || '' : element.lastlogin ? moment(element?.lastlogin).format('LT') || '' :
         moment(element?.last_logout).format('LT') || ''}`},
    // { columnDef: 'course_start_datetime',   header: 'Time', cell: (element: any) => `${element?.course_start_datetime || '' }`   },
    { columnDef: 'course_id', header: 'Business action', cell: (element: any) => `${element?.course_id ? 'Started' :
     element.lastlogin ? 'Login' : 'Logout '  }`   },
    { columnDef: 'course_name',   header: 'Context', cell: (element: any) => `${element?.course_name ? 'Course' :
       'User ' }`   },
    // { columnDef: 'symbol',   header: 'Description', cell:
    // (element: any) => `${element.course_description || element.author_details.description}`   },
    { columnDef: 'status',   header: 'Status', cell: (element: any) => `${element.status || 'Success'}`   },

  ];

  columns1 = [
    { columnDef: 'course_name', header: 'Course name', cell: (element: any) => `${element.course_name}` },
    {
      columnDef: 'created_at', header: 'Enrolled date', cell: (element: any) =>
        `${ element?.created_at ? moment(element?.created_at).format('LL') : ''}`
    },
    { columnDef: 'status_reason', header: 'Status', cell: (element: any) => `${element.status_reason}` },
  ];
  displayedColumns: any;
  displayedColumns1: any;

  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  userid: any;
  profiledetail: any;
  trackdetail: any;
  coursedetail: any;
  constructor(private learnerservice: LearnerServicesService, private router: Router) {
    this.userid = (this.router.getCurrentNavigation().extras?.state?.userid);
    if (!this.userid) {
      this.router.navigate(['/Admin/auth/enrollment']);
    }
  }

  ngOnInit() {
    this.getprofiledetails();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
  }
  getprofiledetails() {
  if (this.userid) {
    console.log(this.userid);
    this.learnerservice.view_profile1(this.userid.user_id).subscribe((profiledetail: any) => {
      this.profiledetail = profiledetail?.data?.view_profile?.message[0];
      this.learnerservice.getlearnertrack(this.userid.user_id, this.userid._id).subscribe((trackdetail: any) => {
        this.trackdetail = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0];
        this.coursedetail = trackdetail?.data?.get_learner_track?.message?.Enrolled_courses;
        this.dataSource1.data = this.coursedetail;
        this.displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
        this.displayedColumns1 = (['sno']).concat(this.columns1.map(c => c.columnDef));
console.log(trackdetail?.data?.get_learner_track?.message?.Enrolled_courses)
        trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects.
        push({lastlogin: trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0].last_login[0] });

        trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects.
        push({last_logout: trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0].last_logout[0] });

        this.dataSource.data = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects;

     });
    });
  }
  }

}
