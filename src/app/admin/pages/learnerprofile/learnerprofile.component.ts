import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, FormBuilder, NgModel, Validators, FormArray } from '@angular/forms';
import * as myGlobals from '@core/globals';
@Component({
  selector: 'app-learnerprofile',
  templateUrl: './learnerprofile.component.html',
  styleUrls: ['./learnerprofile.component.scss']
})
export class LearnerprofileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columns = [
    {
      columnDef: 'course_start_datetime', header: 'Date', cell: (element: any) => `${element.course_start_datetime ?
        moment(element?.course_start_datetime).format('LL') || '' : element.lastlogin ? moment(element?.lastlogin).format('LL') || '' :
          moment(element?.last_logout).format('LL') || ''}`
    },
    {
      columnDef: 'course_active_time', header: 'Time', cell: (element: any) => `${element.course_start_datetime ?
        moment(element?.course_start_datetime).format('LT') || '' : element.lastlogin ? moment(element?.lastlogin).format('LT') || '' :
          moment(element?.last_logout).format('LT') || ''}`
    },
    // { columnDef: 'course_start_datetime',   header: 'Time', cell: (element: any) => `${element?.course_start_datetime || '' }`   },
    {
      columnDef: 'course_id', header: 'Business action', cell: (element: any) => `${element?.course_id ? 'Started' :
        element.lastlogin ? 'Login' : 'Logout '}`
    },
    {
      columnDef: 'course_name', header: 'Context', cell: (element: any) => `${element?.course_name ? 'Course' :
        'User '}`
    },
    // { columnDef: 'symbol',   header: 'Description', cell:
    // (element: any) => `${element.course_description || element.author_details.description}`   },
    { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status || 'Success'}` },

  ];

  columns1 = [
    { columnDef: 'course_name', header: 'Course name', cell: (element: any) => `${element.course_name}` },
    {
      columnDef: 'created_at', header: 'Enrolled date', cell: (element: any) =>
        `${element?.created_at ? moment(element?.created_at).format('LL') : ''}`
    },
    {
      columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status && element.is_active ? 'Approved' :
        !element.status && !element.is_active ? 'Rejected' : 'Pending'}`
    },
    {
      columnDef: 'status_reason', header: 'Comments', cell: (element: any) => `${!element.status && !element.is_active ?
        element.status_reason : ''}`
    },
  ];
  displayedColumns: any;
  displayedColumns1: any;
  cannotEdit = true;
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  userid: any;
  profiledetail: any;
  trackdetail: any;
  coursedetail: any;
  profileForm: FormGroup;
  levelValue: any = [];
  boardValue: any = [];
  uniValue: any = [];
  institutes: any = [];
  specValue: any = [];
  disciplines: any = [];
  constructor( private formBuilder: FormBuilder,private learnerservice: LearnerServicesService, private router: Router) {
    this.userid = (this.router.getCurrentNavigation().extras?.state?.userid);
    if (!this.userid) {
      this.router.navigate(['/Admin/auth/enrollment']);
    }
  }

  ngOnInit() {
    this.getprofiledetails();
    this.profileForm = this.formBuilder.group({
      certificate: this.formBuilder.array([new FormControl('')]),
      qualification: this.formBuilder.array([this.createQualItem()]),
    });
    this.getAllLevels();
    //this.getBoardsUniv();
    this.getInstitute();
    //this.getDiscipline();
    this.getSpec();
  }
  createQualItem(): FormGroup {
    return this.formBuilder.group({
      qualification: ['', myGlobals.req],
      institute: ['', myGlobals.req],
      board_university: ['', myGlobals.req],
      discipline: ['', myGlobals.req],
      specification: ['', myGlobals.req],
      year_of_passing: ['', myGlobals.req],
      percentage: ['', myGlobals.req]
    });
  }
  get f() {
    return this.profileForm.controls;
  }

  get qualification() {
    return this.profileForm.get('qualification') as FormArray;
  }

  getAllLevels() {
    this.learnerservice.get_qualification_details().subscribe((level: any) => {
      this.levelValue = level.data.get_qualification_details.data;
      this.levelValue.forEach(element => {
        element.allowed = 'Y';
      });
    });
  }

 /* getBoardsUniv() {
    // this.service.get_institute_details().subscribe(institute => {
    //   this.boardValue = institute.data['get_institute_details'].data;
    //   this.uniValue= institute.data['get_institute_details'].data;
    // })
    this.learnerservice.get_board_university_details().subscribe((boards: any) => {
      this.boardValue = boards.data.get_board_university_details.data.board;
      this.uniValue = boards.data.get_board_university_details.data.university;

    });
  }*/

  getInstitute() {
    this.learnerservice.get_institute_details().subscribe((institute: any) => {
      this.institutes = institute?.data?.get_institute_details?.data;
    });
  }
/*
  getDiscipline() {
    this.learnerservice.get_discipline_details().subscribe((discipline: any) => {
      this.disciplines = discipline.data.get_discipline_details.data;
    });
  }*/

  getSpec() {
    // this.service.get_institute_details().subscribe(institute => {

    //   this.specValue= institute.data['get_institute_details'].data;
    // })
    this.learnerservice.get_specification_details().subscribe((spec: any) => {
      this.specValue = spec.data.get_specification_details.data;
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
  }
  getprofiledetails() {
    if (this.userid) {
      this.learnerservice.view_profile1(this.userid.user_id).subscribe((profiledetail: any) => {
        this.profiledetail = profiledetail?.data?.view_profile?.message[0];
        console.log(this.profiledetail);

        const profileDetails = profiledetail.data.view_profile.message && profiledetail.data.view_profile.message[0].user_profile[0];
        if (profileDetails) {
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach(v => delete v.__typename);
          }
          // if (profileDetails.social_media.length > 0) {
          //   profileDetails.social_media.forEach(v => delete v.__typename);
          // }
          // if (profileDetails.progress.includes('%')) {
          //   profileDetails.progress = Number(profileDetails.progress.slice(0, -1));
          // } else {
          //   profileDetails.progress = Number(profileDetails.progress);
          // }
          // if (profileDetails.progress <= 60) {
          //   this.gs.preventBackButton();
          // }
          const qualification = this.profileForm.get('qualification') as FormArray;
          const certificate = this.profileForm.get('certificate') as FormArray;
          while (qualification.length) {
            qualification.removeAt(0);
          }
          // localStorage.setItem('user_img',this.urlImage)
          while (profileDetails.certificate && profileDetails.certificate.length > 0 && certificate.length) {
            certificate.removeAt(0);
          }
          this.profileForm.patchValue(profileDetails);
          // this.getAllState();
          // this.getDistrict();
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach(qual =>
              qualification.push(this.formBuilder.group(qual)));
          }
          if (profileDetails.certificate && profileDetails.certificate.length > 0) {
            profileDetails.certificate.forEach(certif =>
              certificate.push(this.formBuilder.control(certif)));
          }
          // console.log(data.data.view_profile.message[0], 'profileDetails', profileDetails)
        }
        this.learnerservice.getlearnertrack(this.userid.user_id, this.userid._id).subscribe((trackdetail: any) => {
          this.trackdetail = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0];
          this.coursedetail = trackdetail?.data?.get_learner_track?.message?.Enrolled_courses;
          this.dataSource1.data = this.coursedetail;
          this.displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
          this.displayedColumns1 = (['sno']).concat(this.columns1.map(c => c.columnDef));
          trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects.
            push({ lastlogin: trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0].last_login[0] });

          trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects.
            push({ last_logout: trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0].last_logout[0] });

          this.dataSource.data = trackdetail?.data?.get_learner_track?.message?.activities_and_enroll[0]?.courseObjects;

        });
      });
    }
  }

}
