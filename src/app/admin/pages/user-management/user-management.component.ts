import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
// import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as myGlobals from '@core/globals';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material'
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  addUserForm: FormGroup;
  openAddUser: boolean = false;
  groups: any = [];
  admin: any = [];
  adminDetails: any;

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    // { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    // { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    // { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    // { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    // { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    // { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    // { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    // { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    // { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'deactivate', 'block'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService,
    private alert: AlertServiceService, private service: AdminServicesService,
    // private learnerService: LearnerServicesService
  ) { }

  ngOnInit() {
    // this.gs.checkLogout();
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'))
    this.admin.push(this.adminDetails._id)
    this.addUserForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameVal),
      email: new FormControl("", myGlobals.emailVal),
      group: ['', myGlobals.req]
    });

    this.service.getUserGroup()
      .subscribe((result: any) => {
        console.log(result.data.get_user_group.message)
        this.groups = result.data.get_user_group.message
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get f() {
    return this.addUserForm.controls;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  addUser() {
    console.log(this.addUserForm.value)
    this.service.user_registration(this.addUserForm.value.email, this.addUserForm.value.username,
      true, this.addUserForm.value.group._id, this.addUserForm.value.group.group_name,
      this.admin
    ).subscribe((result: any) => {
      console.log(result.data.user_registration.message);
      if (result.data.user_registration.success  == 'true')
        this.alert.openAlert("Success !", "User registered successfully")
      else
        this.alert.openAlert(result.data.user_registration.message, null)
    });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // console.log(numSelected,numRows)
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deActivate(e?: any) {
    console.log(e);
    console.log('this', this.selection.selected)
  }
}
