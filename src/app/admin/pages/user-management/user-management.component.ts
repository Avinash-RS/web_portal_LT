import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
// import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as myGlobals from '@core/globals';
import { MatTableDataSource, MatPaginator, MatSort, ThemePalette } from '@angular/material'
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
  adminDetails: any;

  ELEMENT_DATA: PeriodicElement[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'active', 'blocked', 'deactivate', 'block'];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  resultsLength: number = null;

  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService,
    private alert: AlertServiceService, private service: AdminServicesService,
  ) {
    this.getAllUser(0)
  }


  getAllUser(pagenumber) {
    this.resultsLength = null;
    this.service.getAllUsers(pagenumber, 1)
      .subscribe((result: any) => {
        console.log(result.data)
        this.ELEMENT_DATA = (result.data.get_all_user.message);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.selection = new SelectionModel<PeriodicElement>(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
        this.resultsLength = 20;
      });
  }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'))
    this.addUserForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameVal),
      email: new FormControl("", myGlobals.emailVal),
      group: ['', myGlobals.req]
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  gotoAddUser() {
    this.router.navigate(['Admin/auth/addUser']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    // this.service.searchUser(this.dataSource.filter, 0, 1)
    //   .subscribe((result: any) => {
    //     console.log(result.data)
    //   });

  }

  deActivate(element?) {
    if (element) {
      console.log(element)
      this.selection.selected.push(element)
      this.alert.openConfirmAlert('De-activation Confirmation',
        element.is_active ? 'Are you sure you want to de-activate selected user ?' :
          'Are you sure you want to activate selected user ?').then((data: Boolean) => {
            console.log(data, this.selection)
            if (data) {
              let result = this.selection.selected.map((item: any) => item.user_id);
              console.log('this', this.selection.selected, result)
              this.service.deActivate_And_reActivate_User(result, !element.is_active)
                .subscribe((result: any) => {
                  console.log(result.data)
                  if (result.data.deactivate_reactivate_user.success && result.data.deactivate_reactivate_user.message.updated_users.length > 0)
                    this.getAllUser(0)
                  else
                    this.alert.openAlert('Sorry, Please try again later', 'null')
                });
            }
          })
    } else if (this.selection.selected && this.selection.selected.length > 0) {
      this.alert.openConfirmAlert('De-activation Confirmation', 'Are you sure you want to de-activate selected user ?').then((data: Boolean) => {
        console.log(data, this.selection)
        if (data) {
          let result = this.selection.selected.map((item: any) => item.user_id);
          console.log('this', this.selection.selected, result)
          this.service.deActivate_And_reActivate_User(result, false)
            .subscribe((result: any) => {
              if (result.data.deactivate_reactivate_user.success && result.data.deactivate_reactivate_user.message.updated_users.length > 0)
                this.getAllUser(0)
              else
                this.alert.openAlert('Sorry, Please try again later', 'null')
            });
        }
      })
    } else {
      this.alert.openAlert("Please select any record to de-activate", null)
    }
  }

  block(element?) {
    if (element) {
      console.log(element)
      this.selection.selected.push(element)
      this.alert.openConfirmAlert('Block Confirmation',
        element.is_blocked ? 'Are you sure you want to un-block selected user ?' :
          'Are you sure you want to block selected user ?').then((data: Boolean) => {
            console.log(data, this.selection)
            if (data) {
              let result = this.selection.selected.map((item: any) => item.user_id);
              console.log('this', this.selection.selected, result)
              this.service.blockUser(result, !element.is_blocked)
                .subscribe((result: any) => {
                  if (result.data.block_user.success && result.data.block_user.message.updated_users.length > 0)
                    this.getAllUser(0)
                  else
                    this.alert.openAlert('Sorry, Please try again later', 'null')
                });
            }
          })
    } else if (this.selection.selected && this.selection.selected.length > 0) {
      this.alert.openConfirmAlert('Block Confirmation', 'Are you sure you want to block selected user ?').then((data: Boolean) => {
        console.log(data, this.selection)
        if (data) {
          let result = this.selection.selected.map((item: any) => item.user_id);
          console.log('this', this.selection.selected, result)
          this.service.deActivate_And_reActivate_User(result, true)
            .subscribe((result: any) => {
              if (result.data.block_user.success && result.data.block_user.message.updated_users.length > 0)
                this.getAllUser(0)
              else
                this.alert.openAlert('Sorry, Please try again later', 'null')
            });
        }
      })
    } else {
      this.alert.openAlert("Please select any record to block", null)
    }

  }

  next(e) {
    console.log(e)
    this.getAllUser(e.pageIndex)
  }
}

// export class ProgressSpinnerConfigurableExample {
//   color: ThemePalette = 'primary';
// }