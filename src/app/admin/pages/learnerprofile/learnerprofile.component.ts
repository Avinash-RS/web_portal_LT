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
    { columnDef: 'name', header: 'Date', cell: (element: any) => `${element.course_start_datetime}` },
    { columnDef: 'weight', header: 'Time', cell: (element: any) => `${element?.course_start_datetime || ''}` },
    // { columnDef: 'weight',   header: 'Business Action', cell: (element: any) => `${element.weight}`   },
    // { columnDef: 'weight',   header: 'Context', cell: (element: any) => `${element.weight}`   },
    // { columnDef: 'symbol',   header: 'Description', cell:
    // (element: any) => `${element.course_description || element.author_details.description}`   },
    // { columnDef: 'symbol',   header: 'Status', cell: (element: any) => `${element.symbol}`   },

  ];

  columns1 = [
    { columnDef: 'course_name', header: 'Course Name', cell: (element: any) => `${element.course_name}` },
    {
      columnDef: 'enrollment_start', header: 'Enrolled Date', cell: (element: any) =>
        `${moment(element?.enrollment_start).format('LL')}`
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
      this.learnerservice.view_profile1(this.userid.user_id).subscribe((profiledetail: any) => {
        console.log(profiledetail);
        this.profiledetail = profiledetail?.data?.view_profile?.message[0];
        this.learnerservice.getlearnertrack(this.userid.user_id, this.userid._id).subscribe((trackdetail: any) => {
          console.log(trackdetail);
          this.trackdetail = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0];
          this.coursedetail = trackdetail?.data?.get_learner_track?.message?.Enrolled_courses;
          this.dataSource.data = this.trackdetail;
          this.dataSource1.data = this.coursedetail;
          this.displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
          this.displayedColumns1 = (['sno']).concat(this.columns1.map(c => c.columnDef));
        });
      });
    }
  }

}
