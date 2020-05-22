import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { LearnerServicesService} from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-learnerprofile',
  templateUrl: './learnerprofile.component.html',
  styleUrls: ['./learnerprofile.component.css']
})
export class LearnerprofileComponent implements OnInit {
  ELEMENT_DATA1: any[] = [
    {position: 1, name: 'ffff', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'vvv', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'vv', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  columns = [
    { columnDef: 'name',     header: 'Date',   cell: (element: any) => `${element.course_start_datetime}`},
    { columnDef: 'weight',   header: 'Time', cell: (element: any) => `${element.course_start_datetime }`   },
    // { columnDef: 'weight',   header: 'Business Action', cell: (element: any) => `${element.weight}`   },
    // { columnDef: 'weight',   header: 'Context', cell: (element: any) => `${element.weight}`   },
    // { columnDef: 'symbol',   header: 'Description', cell:
    // (element: any) => `${element.course_description || element.author_details.description}`   },
    // { columnDef: 'symbol',   header: 'Status', cell: (element: any) => `${element.symbol}`   },

  ];

  columns1 = [
    { columnDef: 'course_name',     header: 'Course Name',   cell: (element: any) => `${element.course_name}` },
    { columnDef: 'enrollment_start',   header: 'Enrolled Date', cell: (element: any) => `${element.enrollment_start}`},
    { columnDef: 'status',   header: 'Status', cell: (element: any) => `${element.status}`   },
  ];
  displayedColumns: any;
  displayedColumns1: any;

  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  userid: any;
  profiledetail: any;
  trackdetail: any;
  coursedetail: any;
  constructor(private learnerservice: LearnerServicesService , private router: Router) {
    this.userid = (this.router.getCurrentNavigation().extras?.state?.userid);
  }

  ngOnInit() {
    this.getprofiledetails();
  }

  getprofiledetails() {
  console.log(this.userid);
  if (this.userid) {
    this.learnerservice.view_profile1(this.userid.user_id).subscribe((profiledetail: any) => {
      console.log(profiledetail);
      this.profiledetail = profiledetail?.data?.view_profile?.message[0];
      this.learnerservice.getlearnertrack(this.userid.user_id, this.userid._id).subscribe((trackdetail: any) => {
        console.log(trackdetail);
        this.trackdetail = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0];
        this.coursedetail = trackdetail?.data?.get_learner_track?.message?.Enrolled_courses[0];
        if (trackdetail?.length === 2) {
          this.dataSource.data = this.trackdetail;
          this.dataSource1.data = this.coursedetail;
          this.displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
          this.displayedColumns1 = (['sno']).concat(this.columns1.map(c => c.columnDef));        }
     });
    });
  }
  }

}
