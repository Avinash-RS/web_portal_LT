import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as myGlobals from '@core/globals';
import { MatTableDataSource, MatPaginator, MatSort, ThemePalette } from '@angular/material'
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  user_id: string;
  name: number;
  email: string;
  mobile: string;
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  adminDetails: any;
  ELEMENT_DATA: PeriodicElement[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'user_id', 'name', 'email', 'mobile', 'active', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  resultsLength: number = null;
  selectedArray: any = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService,
    private alert: AlertServiceService, private service: AdminServicesService, public toast: ToastrService,
  ) {
    this.getAllUser(0)
  }

  getAllUser(pagenumber) {
    // this.service.getAllLearner(0, 1)
    //   .subscribe((result: any) => {
    //     console.log(result.data)
    //   })
    this.resultsLength = null;
    if (pagenumber == 0)
      this.ELEMENT_DATA = []
    this.service.getAllUsers(pagenumber, 1)
      .subscribe((result: any) => {
        Array.prototype.push.apply(this.ELEMENT_DATA, result.data.get_all_user.message);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        console.log(this.ELEMENT_DATA)
        this.selection = new SelectionModel(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = result.data.get_all_user.learner_count;
      });
  }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'))
  }

  gotoAddUser() {
    this.router.navigate(['Admin/auth/addUser']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // checkboxLabel(row?): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  checkboxLabel(row?) {
    if (row.isChecked == undefined) {
      row.isChecked = true;
      this.selectedArray.push(row);
      console.log(this.selectedArray)
    }
    else {
      row.isChecked = !row.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== row);
      console.log(this.selectedArray)
    }
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue.trim().toLowerCase().length > 3) {
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.service.searchUser(filterValue.trim().toLowerCase(), 0, 1)
        .subscribe((result: any) => {
          if (result.data.search_user.success && result.data.search_user.message && result.data.search_user.message, length > 0)
            Array.prototype.push.apply(this.ELEMENT_DATA, result.data.search_user.message);
          else
            this.alert.openAlert("Sorry", 'No records found with "' + filterValue + '.."')
          // this.toast.warning('Course Name and Course image is Required !!!');
        });
    }

  }

  deActivate(status, element?) {
    let count = element ? 1 : this.selectedArray.length;
    // setTimeout(() => {
    if (element || (this.selectedArray && this.selectedArray.length > 0)) {
      this.alert.openConfirmAlert(status == 'De-activate' ? 'De-activation Confirmation' :
        'Activation Confirmation', status == 'De-activate' ? 'Are you sure you want to de-activate ' + count + ' users ?' :
        'Are you sure you want to activate ' + count + ' users ?').then((data: Boolean) => {
          if (data) {
            let result = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.service.deActivate_And_reActivate_User(result, status == 'De-activate' ? false : true)
              .subscribe((result: any) => {
                this.selectedArray = []
                if (result.data.deactivate_reactivate_user.success && result.data.deactivate_reactivate_user.message.updated_users.length > 0)
                  this.getAllUser(0)
                else
                  this.alert.openAlert('Sorry, Please try again later', 'null')
              });
          }
        })
    } else {
      this.alert.openAlert("Please select any record", null)
    }
    // }, 500);
  }

  block(status, element?) {
    if (element || (this.selectedArray && this.selectedArray.length > 0)) {
      let count = element ? 1 : this.selectedArray.length
      this.alert.openConfirmAlert(status == 'Block' ? 'Block Confirmation' :
        'Un-block Confirmation', status == 'Block' ? 'Are you sure you want to block ' + count + ' users ?' :
        'Are you sure you want to un-block ' + count + ' users ?').then((data: Boolean) => {
          if (data) {
            let result = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.service.blockUser(result, status == 'Block' ? true : false)
              .subscribe((result: any) => {
                this.selectedArray = []
                if (result.data.block_user.success && result.data.block_user.message.updated_users.length > 0)
                  this.getAllUser(0)
                else
                  this.alert.openAlert('Sorry, Please try again later', 'null')
              });
          }
        })
    } else {
      this.alert.openAlert("Please select any record", null)
    }
  }

  next(e) {
    console.log(e)
    this.getAllUser(e.pageIndex)
  }
}
