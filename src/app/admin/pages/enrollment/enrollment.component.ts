import { Component, OnInit, TemplateRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  selectiontype = 'group';
  selectedcheckbox = true;
  selectedcheckbox1 = true;
  selection = new SelectionModel<any>(true, []);
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

  selectall: any;
  ELEMENT_DATA2: any[] = [
    {position1: 11, name1: 'ffff', weight: 1.0079, symbol: 'H', symbol1 : 'ee'},
    {position1: 22, name1: 'vvv', weight: 4.0026, symbol: 'He' , symbol1 : 'ee'},
    {position1: 3, name1: 'vv', weight: 6.941, symbol: 'Li',symbol1 : 'ee' },
    {position1: 4, name1: 'Beryllium', weight: 9.0122, symbol: 'Be',symbol1 : 'ee'},
    {position1: 5, name1: 'Boron', weight: 10.811, symbol: 'B',symbol1 : 'ee'},
    {position1: 6, name1: 'Carbon', weight: 12.0107, symbol: 'C',symbol1 : 'ee'},
    {position1: 7, name1: 'Nitrogen', weight: 14.0067, symbol: 'N',symbol1 : 'ee'},
    {position1: 8, name1: 'Oxygen', weight: 15.9994, symbol: 'O',symbol1 : 'ee'},
    {position1: 9, name1: 'Fluorine', weight: 18.9984, symbol: 'F',symbol1 : 'ee'},
    {position1: 10, name1: 'Neon', weight: 20.1797, symbol: 'Ne',symbol1 : 'ee'},
  ];

  columns = [
    { columnDef: 'position', header: 'Date Received',    cell: (element: any) => `${element.position}` },
    { columnDef: 'name',     header: 'Course',   cell: (element: any) => `${element.name}`     },
    { columnDef: 'weight',   header: 'Enrollments', cell: (element: any) => `${element.weight}`   },
    { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
  ];
  columns1: any;
  displayedColumns1: any;
  displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  constructor(private router: Router, private dialog: MatDialog) {
   }

  ngOnInit() {
   this.dataSource.data = this.ELEMENT_DATA1;
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
  this.selectedcheckbox = true ;
  this.dataSource.data.forEach(element => { element.isChecked = false; })
  if (this.selectiontype === 'group') {
    this.columns = [
      { columnDef: 'position', header: 'Date Received',    cell: (element: any) => `${element.position}` },
      { columnDef: 'name',     header: 'Course',   cell: (element: any) => `${element.name}`     },
      { columnDef: 'weight',   header: 'Enrollments', cell: (element: any) => `${element.weight}`   },
      { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.dataSource.data = this.ELEMENT_DATA1;
  } else {
    this.columns = [
      { columnDef: 'position1', header: 'Date Received',    cell: (element: any) => `${element.position1}` },
      { columnDef: 'name1',     header: 'Full Name',   cell: (element: any) => `${element.name1}`     },
      { columnDef: 'weight',   header: 'Course', cell: (element: any) => `${element.weight}`   },
      { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
      { columnDef: 'symbol1',   header: 'User Name', cell: (element: any) => `${element.symbol}`   },
    ];
    this.displayedColumns = (['selectall', 'sno']).concat(this.columns.map(c => c.columnDef));
    this.dataSource.data = this.ELEMENT_DATA2 ;
    console.log(this.dataSource1);
  }

}


selectallchange(value) {
  console.log(this.dataSource1);
  this.dataSource.data.forEach(element => {
    element.isChecked = value;
  });
  if (value === true) { this.selectedcheckbox = false; } else { this.selectedcheckbox = true;}
 }

checkboxchange(row?) {
  const result = this.dataSource.data.some(element => element.isChecked === true );
  console.log(result);
  if (result === true) {
    this.selectedcheckbox = false;
  } else {this.selectedcheckbox = true; }
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
  if (value === true) { this.selectedcheckbox1 = false; } else { this.selectedcheckbox1 = true;}
 }

checkboxchange1(row?) {
  const result = this.dataSource1.data.some(element => element.isChecked === true );
  console.log(result);
  if (result === true) {
    this.selectedcheckbox1 = false;
  } else {this.selectedcheckbox1 = true; }
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
  if (column.columnDef === 'symbol') {
    this.router.navigateByUrl('/Admin/auth/usergroup', { state: { group_id: 'ga8umba' } });
  } else if (column.columnDef === 'course_name') {
    // let details = {
    //   id: this.course.course_id,
    //   wishlist: this.course.wishlisted,
    //   wishlist_id: this.course.wishlist_id
    // };
    // this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: details } });
  } else if (column.columnDef === 'name1') {
    this.router.navigateByUrl('/Admin/auth/learnerprofile', { state: { user_id: 'vv' } });
  } else if (column.header === 'Enrollments') {
    this.columns1 = [
      { columnDef: 'name1',     header: 'Full Name',   cell: (element: any) => `${element.name1}`     },
      { columnDef: 'weight',   header: 'Course', cell: (element: any) => `${element.weight}`   },
      { columnDef: 'symbol',   header: 'User Group', cell: (element: any) => `${element.symbol}`   },
      { columnDef: 'symbol1',   header: 'User Name', cell: (element: any) => `${element.symbol}`   },
    ];
    this.displayedColumns1 = (['selectall', 'sno']).concat(this.columns1.map(c => c.columnDef));
    this.dataSource1.data = this.ELEMENT_DATA2;
    this.dialog.open(templateRef);
  }
}

closedialogbox() {
  this.dialog.closeAll();
}

}
