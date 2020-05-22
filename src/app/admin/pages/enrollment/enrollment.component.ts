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
  constructor(private router: Router, private dialog: MatDialog, private adminservice: AdminServicesService) {
  }

  ngOnInit() {
    const data = { group_id: 'undefined', pagenumber: 0, is_individual: false };
    this.getenrolledcoursesindividual(data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.username.toLowerCase().includes(filter) || data.full_name.toLowerCase().includes(filter) ||
        data.course_name.toString().includes(filter);
    };
  }
  getenrolledcoursesindividual(data) {
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
      if (this.dialogopened === true) {
        this.dataSource1.data = result?.data?.getenrolledcourses?.message;
      }
    });
  }

  getenrolledcoursesgroup(pagenumber) {
    this.columns = [
      { columnDef: 'request_date', header: 'Last Received', cell: (element: any) => `${moment(element.request_date).format('LL')}` },
      { columnDef: 'course_name', header: 'Course', cell: (element: any) => `${element.group_detail[0].course_name}` },
      { columnDef: 'totalCount', header: 'Enrollments', cell: (element: any) => `${element.totalCount}` },
      { columnDef: 'group_name', header: 'User Group', cell: (element: any) => `${element.group_detail[0].group_name}` },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.adminservice.getenrolledcoursesgroup(pagenumber).subscribe((result: any) => {
      console.log(result.data);
      this.dataSource.data = result?.data?.get_all_enrolledcourses?.message;
    });
  }

  getenrolledcoursesforgroup(data) {
    this.columns1 = [
      { columnDef: 'full_name', header: 'Full Name', cell: (element: any) => `${element.full_name}` },
      { columnDef: 'course_name', header: 'Course', cell: (element: any) => `${element.course_name}` },
      { columnDef: 'group_name', header: 'User Group', cell: (element: any) => `${element.group_name}` },
      { columnDef: 'username', header: 'User Name', cell: (element: any) => `${element.username}` },
    ];
    this.displayedColumns1 = (['selectall', 'sno']).concat(this.columns1.map(c => c.columnDef));
    this.adminservice.getenrolledcourses(data).subscribe((result: any) => {
      console.log(result.data);
      this.dataSource1.data = result?.data?.getenrolledcourses?.message;
    });
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position1 + 1}`;
  // }

  radiobuttonchange() {
    this.selectall = false;
    this.selectedcheckbox = true;
    this.dataSource.data.forEach(element => { element.isChecked = false; })
    this.dataSource1.data = [];
    if (this.selectiontype === 'group') {
      this.getenrolledcoursesgroup(0);
    } else {
      const data = { group_id: 'undefined', pagenumber: 0, is_individual: false };
      this.getenrolledcoursesindividual(data);
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
    // if (row.isChecked === undefined || row.isChecked === false) {
    //   row.isChecked = true;
    //   // this.selectedArray.push(row);
    // } else {
    //   row.isChecked = !row.isChecked;
    //   // this.selectedArray = this.selectedArray.filter(i => i !== row);
    // }
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

  approve() {
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  reject() {
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
        console.log(result.value);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });

  }


  datachange(row, column, templateRef: TemplateRef<any>) {
    console.log(column);
    console.log(row);
    if (column.header === 'User Group') {
      this.router.navigateByUrl('/Admin/auth/usergroup', { state: { group_id: row?.group_id || row.group_detail[0].group_id } });
    } else if (column.header === 'Course') {
      // let details = {
      //   id: this.course.course_id,
      //   wishlist: this.course.wishlisted,
      //   wishlist_id: this.course.wishlist_id
      // };
      // this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: details } });
    } else if (column.header === 'Full Name' || column.header === 'User Name') {
      const userdetail = { user_id: row.user_id, _id: row._id };
      this.router.navigateByUrl('/Admin/auth/learnerprofile', { state: { userid: userdetail } });
    } else if (column.header === 'Enrollments') {
      const data = { group_id: row.group_detail[0].group_id, pagenumber: 0, is_individual: true };
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
