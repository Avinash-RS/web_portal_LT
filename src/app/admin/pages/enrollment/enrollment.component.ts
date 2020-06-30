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
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectiontype = 'user_group';
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
  resultsLength: number = null;
  resultsLength1: any;
  loading = false;
  enrollmentrecords: any;
  groupenrollmentrecords: any;
  constructor(private router: Router, public dialog: MatDialog, private adminservice: AdminServicesService) {
  }

  ngOnInit() {
    this.enrollrequestdata = { group_id: 'undefined', pagenumber: 0, is_individual: false, course_id: 'undefined' };
    this.getenrolledcoursesgroup(0);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // tslint:disable-next-line:only-arrow-functions
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data?.username?.toLowerCase().includes(filter) || data?.full_name?.toLowerCase().includes(filter) ||
        data?.course_name?.toLowerCase().includes(filter) || data?.group_name?.toLowerCase().includes(filter) ;
    };

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      return '2' + data[sortHeaderId].toLocaleLowerCase();
    };
    // this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
    //   if (typeof data[sortHeaderId] === 'string') {
    //     return data[sortHeaderId].toLocaleLowerCase();
    //   }
    //   return data[sortHeaderId];
    // };
  }
  getenrolledcoursesindividual(data) {
    this.resultsLength = null;
    this.columns = [
      { columnDef: 'enroll_date', header: 'Date received', cell: (element: any) => `${element?.enroll_date || ' '}` },
      { columnDef: 'full_name', header: 'Full name', cell: (element: any) => `${element?.full_name || ' '}` },
      { columnDef: 'course_name', header: 'Course name', cell: (element: any) => `${element?.course_name || ' '}` },
      { columnDef: 'group_name', header: 'User group', cell: (element: any) => `${element?.group_name || ' '}` },
      { columnDef: 'username', header: 'User name', cell: (element: any) => `${element?.username || ' '}` },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.loading = true;
    this.adminservice.getenrolledcourses(data).subscribe((result: any) => {
      // console.log(result?.data?.getenrolledcourses?.message);
      this.loading = false;
      if (data.pagenumber === 0) {
        this.enrollmentrecords = [];
      }
      result?.data?.getenrolledcourses?.message.forEach(element => {
        const date = moment(element.enroll_date);
        element.enroll_date = date.utc().format('MMMM Do YYYY');
      });
      Array.prototype.push.apply(this.enrollmentrecords, result.data.getenrolledcourses.message);
      this.dataSource.data = this.enrollmentrecords;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.resultsLength = result?.data?.getenrolledcourses?.enroll_count;
    });
  }

  getenrolledcoursesgroup(pagenumber) {
    this.resultsLength = null;
    this.columns = [
      { columnDef: 'request_date', header: 'Date received', cell: (elem: any) => `${elem?.request_date || ' '}` },
      { columnDef: 'course_name', header: 'Course name', cell: (elem: any) => `${elem?.course_name || ' ' }` },
      { columnDef: 'totalCount', header: 'Enrolments', cell: (elem: any) => `${elem?.totalCount || ' '}` },
      { columnDef: 'group_name', header: 'User group', cell: (elem: any) => `${elem?.group_name}` },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.loading = true;
    this.adminservice.getenrolledcoursesgroup(pagenumber).subscribe((result: any) => {
      this.loading = false;
      const array = [];
      result?.data?.get_all_enrolledcourses?.message.forEach(element => {
             element.group_detail[0].totalCount = element.totalCount;
             const date = moment(element.request_date);
             element.group_detail[0].request_date = date.utc().format('MMMM Do YYYY');
             array.push(element.group_detail[0]);
      });
      if (pagenumber === 0) {
        this.enrollmentrecords = [];
      }
      Array.prototype.push.apply(this.enrollmentrecords, array);
      this.dataSource.data = this.enrollmentrecords;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.resultsLength = result?.data?.get_all_enrolledcourses?.enroll_count;
    });
  }

  getenrolledcoursesforgroup(data) {
    this.columns1 = [
      { columnDef: 'full_name', header: 'Full name', cell: (element: any) => `${element.full_name}` },
      { columnDef: 'course_name', header: 'Course name', cell: (element: any) => `${element.course_name}` },
      { columnDef: 'group_name', header: 'User group', cell: (element: any) => `${element.group_name}` },
      { columnDef: 'username', header: 'User name', cell: (element: any) => `${element.username}` },
    ];
    this.displayedColumns1 = (['selectall', 'sno']).concat(this.columns1.map(c => c.columnDef));
    this.adminservice.getenrolledcourses(data).subscribe((result: any) => {
      if (data.pagenumber === 0) {
        this.groupenrollmentrecords = [];
      }
      // console.log(result?.data?.getenrolledcourses?.message);
      Array.prototype.push.apply(this.groupenrollmentrecords, result?.data?.getenrolledcourses?.message);
      this.resultsLength1 = result?.data?.getenrolledcourses?.enroll_count;
      // this.dataSource1.data = result?.data?.getenrolledcourses?.message;
      this.dataSource1.data = this.groupenrollmentrecords;
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
      this.getenrolledcoursesindividual(this.enrollrequestdata);
    }

  }

  selectallchange(value) {
    this.dataSource.data.forEach(ele => {
      ele.isChecked = value;
    });
    if (value === true) { this.selectedcheckbox = false; } else { this.selectedcheckbox = true; }
  }

  checkboxchange(row?) {
    const result = this.dataSource.data.some(element => element.isChecked === true);
    if (result === true) {
      this.selectedcheckbox = false;
    } else { this.selectedcheckbox = true; }
  }


  selectallchange1(value) {
    this.dataSource1.data.forEach(element => {
      element.isChecked = value;
    });
    if (value === true) { this.selectedcheckbox1 = false; } else { this.selectedcheckbox1 = true; }
  }

  checkboxchange1(row?) {
    const result = this.dataSource1.data.some(element => element.isChecked === true);
    if (result === true) {
      this.selectedcheckbox1 = false;
    } else { this.selectedcheckbox1 = true; }
  }

  approve(tablevalue) {
    Swal.fire({
      title: '<div>Approval confirmation</div>',
      // icon: 'warning',
      text: 'Are you sure you want to proceed?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
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
      status_reason: 'Approved',
      enrollments: array};
      // this.loading = true;
      this.adminservice.approveenrollment(data).subscribe(( response: any ) => {
        if (response?.data?.approve_enrollment?.success === true) {
          this.loading = false;
          if (this.dialogopened === true) {
            const data1 = { group_id: this.selectedgroupid, pagenumber: 0,
              is_individual: true, course_id: 'undefined' };
            this.getenrolledcoursesforgroup(data1);
            this.getenrolledcoursesgroup(0);
          } else {
            this.dataSource.data = [];
            this.radiobuttonchange();
          }
          const c = array.length > 1 ?  array.length + ' courses' : array.length + ' course';
          const learner = array.length > 1 ?  array.length + ' learners' : array.length + ' learner';
          Swal.fire({
            title:   c + '&nbsp;<div> approved successfully</div> <br> ',
            text: 'Confirmation email sent to ' + learner ,
          });
        }
      });
      }
    });
  }

  reject(tablevalue) {
    Swal.fire({
      title: '<div> Reason for rejection</div>',
      // title: 'Reason for Rejection',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
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
        // this.loading = true;
        this.adminservice.rejectenrollment(data).subscribe(( response: any ) => {
        if (response?.data?.reject_enrollment?.success === true) {
        this.loading = false;
        if (this.dialogopened === true) {
            const data1 = { group_id: this.selectedgroupid, pagenumber: 0,
              is_individual: true, course_id: 'undefined' };
            this.getenrolledcoursesforgroup(data1);
          } else {
            this.dataSource.data = [];
            this.radiobuttonchange();
          }
        Swal.fire(
              'Rejection',
              'Rejection with the comments shared to the user mail id',
              // 'error'
            );
        }
        });
      }
    });

  }


  datachange(row, column, templateRef: TemplateRef<any>) {
    if (column.header === 'User group') {
      this.router.navigateByUrl('/Admin/auth/usergroup', { state: { group_id: row?.group_id || row.group_id } });
    } else if (column.header === 'Course name') {
      // let details = {
      //   id: row.course_id,
      //   wishlist: row?.wish_list ? true : false,
      //   wishlist_id: row?.wish_list ? row.wish_list.wish_list_id :  null
      // };
      // (keyup)="addCategoryForm.patchValue({category_name: $event.target.value[0].
      // toUpperCase() + $event.target.value.substr(1).toLowerCase()})"
      const details = {
        type: 'publish', id: row.course_id , type1: 'enrollment'
      };
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: details } });
    } else if (column.header === 'Full name' || column.header === 'User name') {
      const userdetail = { user_id: row.user_id, _id: row.user_obj_id };
      this.router.navigateByUrl('/Admin/auth/learnerprofile', { state: { userid: userdetail } });
    } else if (column.header === 'Enrolments') {
      this.selectedgroupid = row.group_id;
      const data = { group_id: row.group_id, pagenumber: 0, is_individual: true, course_id: row.course_id };
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
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  next(e) {
    if (this.selectiontype === 'user_group') {
      this.getenrolledcoursesgroup(e.pageIndex);
    } else {
      const data = { course_id: 'undefined', group_id: 'undefined', pagenumber: e.pageIndex, is_individual: false };
      this.getenrolledcoursesindividual(data);
    }
  }

  next1(e) {
    const data = { group_id: this.selectedgroupid, pagenumber: e.pageIndex, is_individual: true };
    this.getenrolledcoursesforgroup(data);
  }
 // tslint:disable-next-line:use-life-cycle-interface
 ngOnDestroy() {
  if (this.dialog) {
      this.dialog.closeAll();
  }
}

}
