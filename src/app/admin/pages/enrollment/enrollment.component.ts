import { Component, OnInit, TemplateRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';

export interface PeriodicElement {
  course: string;
  fullname: string;
  date_received: string;
  usergroup: string;
  username: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  selectiontype = 'group';
  selection = new SelectionModel<PeriodicElement>(true, []);
  ELEMENT_DATA1: any[] = [
    {position1: 1, name: 'ffff', weight: 1.0079, symbol: 'H'},
    {position1: 2, name: 'vvv', weight: 4.0026, symbol: 'He'},
    {position1: 3, name: 'vv', weight: 6.941, symbol: 'Li'},
    {position1: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position1: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position1: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position1: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position1: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position1: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position1: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  columns = [
    { columnDef: 'position', header: 'Date Received',    cell: (element: any) => `${element.position}` },
    { columnDef: 'name',     header: 'Full Name',   cell: (element: any) => `${element.name}`     },
    { columnDef: 'weight',   header: 'Course', cell: (element: any) => `${element.weight}`   },
    { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
  ];

  displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
  dataSource1 = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA1);

  constructor(private router: Router, private dialog: MatDialog) {
   }

  ngOnInit() {

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
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
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

radiobuttonchange() {
  if (this.selectiontype === 'group') {
  } else {
    this.columns = [
      { columnDef: 'position1', header: 'Date Received',    cell: (element: any) => `${element.position}` },
      { columnDef: 'name',     header: 'Course',   cell: (element: any) => `${element.name}`     },
      { columnDef: 'weight',   header: 'Enrollments', cell: (element: any) => `${element.weight}`   },
      { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.dataSource1 = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA1);
  }

}


selectallchange(value) {
  console.log(this.dataSource1);
  this.ELEMENT_DATA1.forEach(element => {
    element.isChecked = value;
  });
  this.dataSource1 = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA1); }

checkboxchange(row?) {
  if (row.isChecked === undefined || row.isChecked === false) {
    row.isChecked = true;
    // this.selectedArray.push(row);
  } else {
    row.isChecked = !row.isChecked;
    // this.selectedArray = this.selectedArray.filter(i => i !== row);
  }
}


approve() {
  Swal.fire({
    title: '<div style="background:yellow">Approval Confirmation</div>',
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
    title: '<h2 style="background-color:yellow">Reason for Rejection</h2>',
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
  if (column.columnDef === 'symbol') {
    this.router.navigateByUrl('/Admin/auth/usergroup', { state: { group_id: 'ga8umba' } });
  } else if (column.columnDef === 'course_name') {
    this.router.navigateByUrl('/Admin/auth/userManagement', { state: { course_id: 'vv' } });
  } else if (column.columnDef === 'fullname') {
    this.router.navigateByUrl('/Admin/auth/userManagement', { state: { user_id: 'vv' } });
  } else if (column.header === 'Enrollments') {
    this.dialog.open(templateRef);
  }
}

closedialogbox() {
  this.dialog.closeAll();
}

}
