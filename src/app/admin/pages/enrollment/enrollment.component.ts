import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectiontype = 'individual';
  selectedcheckbox = true;
  selectedcheckbox1 = true;
  selection = new SelectionModel<any>(true, []);
  selectall: any;
  columns: any;
  columns1: any;
  displayedColumns1: any;
  displayedColumns: any;
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  dialogopened = false;
  selectedgroupid: any;
  enrollrequestdata: any;
  resultsLength: any;
  resultsLength1: any;

  constructor(private router: Router, private dialog: MatDialog, private adminservice: AdminServicesService) {
  }

  ngOnInit() {
    this.enrollrequestdata = { group_id: 'undefined', pagenumber: 0, is_individual: false, course_id: 'undefined' };
    this.getenrolledcoursesindividual(this.enrollrequestdata);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data?.username?.toLowerCase().includes(filter) || data?.full_name?.toLowerCase().includes(filter) ||
        data?.course_name?.toString().includes(filter) || data?.group_name?.toString().includes(filter)
        || data?.group_name?.toString().includes(filter) || data?.course_name?.toString().includes(filter) ;
    };
  }
  getenrolledcoursesindividual(data) {
    console.log(data);
    this.columns = [
      { columnDef: 'lxp_joined_date', header: 'Date Received', cell: (element: any) => `${moment(element.lxp_joined_date).format('LL')}` },
      { columnDef: 'full_name', header: 'Full Name', cell: (element: any) => `${element.full_name}` },
      { columnDef: 'course_name', header: 'Course', cell: (element: any) => `${element.course_name}` },
      { columnDef: 'group_name', header: 'User Group', cell: (element: any) => `${element.group_name}` },
      { columnDef: 'username', header: 'User Name', cell: (element: any) => `${element.username}` },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.adminservice.getenrolledcourses(data).subscribe((result: any) => {
      console.log(result.data);
      this.dataSource.data = result?.data?.getenrolledcourses?.message;
      this.resultsLength = result?.data?.getenrolledcourses?.enroll_count;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getenrolledcoursesgroup(pagenumber) {
    this.columns = [
      { columnDef: 'request_date', header: 'Last Received', cell: (element: any) => `${moment(element.request_date).format('LL')}` },
      { columnDef: 'course_name', header: 'Course', cell: (element: any) => `${element.course_name}` },
      { columnDef: 'totalCount', header: 'Enrollments', cell: (element: any) => `${element.totalCount}` },
      { columnDef: 'group_name', header: 'User Group', cell: (element: any) => `${element.group_name}` },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.adminservice.getenrolledcoursesgroup(pagenumber).subscribe((result: any) => {
      console.log(result.data);
      this.resultsLength = result?.data?.get_all_enrolledcourses?.enroll_count;
      this.dataSource.data = result?.data?.get_all_enrolledcourses?.message;
      const array = [];
      result?.data?.get_all_enrolledcourses?.message.forEach(element => {
             element.group_detail[0].request_date = element.request_date;
             element.group_detail[0].totalCount = element.totalCount;
             array.push(element.group_detail[0]);
      });
      console.log(array);
      this.dataSource.data = array;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getenrolledcoursesforgroup(data) {
    console.log(data);
    this.columns1 = [
      { columnDef: 'full_name', header: 'Full Name', cell: (element: any) => `${element.full_name}` },
      { columnDef: 'course_name', header: 'Course', cell: (element: any) => `${element.course_name}` },
      { columnDef: 'group_name', header: 'User Group', cell: (element: any) => `${element.group_name}` },
      { columnDef: 'username', header: 'User Name', cell: (element: any) => `${element.username}` },
    ];
    this.displayedColumns1 = (['selectall', 'sno']).concat(this.columns1.map(c => c.columnDef));
    this.adminservice.getenrolledcourses(data).subscribe((result: any) => {
      console.log(result.data);
      this.resultsLength1 = result?.data?.getenrolledcourses?.enroll_count;

      this.dataSource1.data = result?.data?.getenrolledcourses?.message;
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    });
  }

  radiobuttonchange() {
    this.selectall = false;
    this.selectedcheckbox = true;
    this.dataSource?.data?.forEach(element => { element.isChecked = false; });
    this.dataSource.data = [];
    if (this.selectiontype === 'user_group') {
      this.getenrolledcoursesgroup(0);
    } else {
      console.log(this.dataSource.data);
      this.getenrolledcoursesindividual(this.enrollrequestdata);
    }

  }

  selectallchange(value) {
    console.log(this.dataSource1);
    this.dataSource.data.forEach(element => {
      element.isChecked = value;
    });
    if (value === true) { this.selectedcheckbox = false; } else { this.selectedcheckbox = true; }
  }

  checkboxchange(row?) {
    const result = this.dataSource.data.some(element => element.isChecked === true);
    console.log(result);
    if (result === true) {
      this.selectedcheckbox = false;
    } else { this.selectedcheckbox = true; }
  }


  selectallchange1(value) {
    console.log(this.dataSource1);
    this.dataSource1.data.forEach(element => {
      element.isChecked = value;
    });
    if (value === true) { this.selectedcheckbox1 = false; } else { this.selectedcheckbox1 = true; }
  }

  checkboxchange1(row?) {
    const result = this.dataSource1.data.some(element => element.isChecked === true);
    console.log(result);
    if (result === true) {
      this.selectedcheckbox1 = false;
    } else { this.selectedcheckbox1 = true; }
  }

  approve(data) {
    Swal.fire({
      title: '<div>Approval Confirmation</div>',
      icon: 'warning',
      text: 'Are you sure want to proceed?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
      //  const array = data.filter( element => element.isChecked === true);
       Swal.fire(
          'Successfully Approved',
          'A Confirmation has been sent to the user Email ID',
          'success'
        );
      //  Swal.fire({
      //     icon: 'success',
      //     title: 'A Confirmation has been sent to the user Email ID ',
      //   });
      }
    });
  }

  reject(tablevalue) {
    console.log(tablevalue)
    Swal.fire({
      title: '<div> Reason for Rejection</div>',
      // title: 'Reason for Rejection',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
        const array = [];
        tablevalue.forEach(element => {
          if (element.isChecked === true) {
            if (this.selectiontype === 'user_group' && this.dialogopened === false) {
              array.push({group_id: element.group_id,
                course_id: element.course_id });
            } else if ( this.selectiontype === 'individual' || this.dialogopened === true ) {
              array.push({group_id: element.group_id,
                course_id: element.course_id , user_id: element.user_id });
            }
          }
        });
        const data = {  update_type: this.selectiontype,
        status_reason: result.value,
        enrollments: array};
        console.log(data);
        this.adminservice.rejectenrollment(data).subscribe(( response: any ) => {
        console.log(response);
        if (response?.data?.reject_enrollment?.success === true) {
          if (this.dialogopened === true) {
            const data = { group_id: this.selectedgroupid, pagenumber: 0,
              is_individual: true, course_id: 'undefined' };
            this.getenrolledcoursesforgroup(data);
          } else {
            this.dataSource.data = [];
            this.radiobuttonchange();
          }
          Swal.fire(
              'Rejection',
              'Rejection with the comments shared to the user mail ID',
              'error'
            );
        }
        });
      }
    });

  }


  datachange(row, column, templateRef: TemplateRef<any>) {
    console.log(column);
    console.log(row);
    if (column.header === 'User Group') {
      this.router.navigateByUrl('/Admin/auth/usergroup', { state: { group_id: row?.group_id || row.group_id } });
    } else if (column.header === 'Course' && this.selectiontype === 'individual') {
      let details = {
        id: row.course_id,
        wishlist: row?.wish_list ? true : false,
        wishlist_id: row?.wish_list ? row.wish_list.wish_list_id :  null
      };
      console.log(details);
      this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: details } });
    } else if (column.header === 'Full Name' || column.header === 'User Name') {
      const userdetail = { user_id: row.user_id, _id: row._id };
      this.router.navigateByUrl('/Admin/auth/learnerprofile', { state: { userid: userdetail } });
    } else if (column.header === 'Enrollments') {
      this.selectedgroupid = row.group_id;
      const data = { group_id: row.group_id, pagenumber: 0, is_individual: true, course_id: 'undefined' };
      this.dialogopened = true;
      this.dataSource1.data = [];
      this.getenrolledcoursesforgroup(data);
      this.dialog.open(templateRef);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    }
  }

  closedialogbox() {
    this.dialog.closeAll();
    this.dialogopened = false;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  next(e) {
    if (this.selectiontype === 'user_group') {
      this.getenrolledcoursesgroup(e.pageIndex);
    } else {
      const data = { group_id: 'undefined', pagenumber: e.pageIndex, is_individual: false };
      this.getenrolledcoursesindividual(data);
    }
  }

  next1(e) {
    const data = { group_id: this.selectedgroupid, pagenumber: e.pageIndex, is_individual: true };
    this.getenrolledcoursesforgroup(data);
  }

}
