import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as myGlobals from '@core/globals';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { ToastrService } from 'ngx-toastr';
import { Form } from '@angular/forms';

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
  profileForm: Form;
  adminDetails: any;
  ELEMENT_DATA: PeriodicElement[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'user_id', 'name', 'email', 'mobile', 'active', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  resultsLength: number = null;
  selectedArray: any = [];
  profileDetails: {};
  trackDetails: any;
  loader = false;

  constructor(private router: Router, private gs: GlobalServiceService,
              private alert: AlertServiceService, private service: AdminServicesService, public toast: ToastrService,
              private dialog: MatDialog,
  ) {
    localStorage.setItem('role', 'admin');
    this.getAllUser(0);
  }

  getAllUser(pagenumber) {
    this.loader = true;
    this.resultsLength = null;

    this.service.getAllUsers(pagenumber, 1, 'undefined')
      .subscribe((result: any) => {
        if (result.data && result.data.get_all_user) {
          if (pagenumber === 0) {
            this.ELEMENT_DATA = [];
          }
          Array.prototype.push.apply(this.ELEMENT_DATA, result.data.get_all_user.message);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          // this.selection = new SelectionModel(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.resultsLength = result.data.get_all_user.learner_count;
          this.loader = false;
        } else {
          this.alert.openAlert('Please try again later', null);
          this.loader = false;
        }
      });
  }

  ngOnInit() {
    this.adminDetails = this.gs.checkLogout();
  }

  gotoAddUser() {
    this.router.navigate(['Admin/auth/addUser']);

  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator
  // }

  viewDetail(element, templateRef: TemplateRef<any>) {
    // this.service.getLearnerDetail(element.user_id)
    // .subscribe((result: any) => {
    this.service.getUserSession(element._id).subscribe((track: any) => {
      this.trackDetails = track.data && track.data.get_user_session_detail &&
        track.data.get_user_session_detail.message && track.data.get_user_session_detail.message[0];
      this.profileDetails = track.data && track.data.get_user_session_detail &&
        track.data.get_user_session_detail.message && track.data.get_user_session_detail.message[0];
      this.dialog.open(templateRef);
      // })
    });
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  checkboxLabel(row?) {
    if (row.isChecked === undefined || row.isChecked === false) {
      row.isChecked = true;
      this.selectedArray.push(row);
    } else {
      row.isChecked = !row.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== row);
    }
  }

  applyFilter(filterValue: string) {
    setTimeout(() => {
      if (filterValue.trim().toLowerCase().length > 3) {
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }

        this.service.searchUser(filterValue.trim().toLowerCase(), 0, 1)
          .subscribe((result: any) => {
            if (result.data.search_user.success && result.data.search_user.message && result.data.search_user.message.length > 0) {
              this.ELEMENT_DATA = [];
              this.ELEMENT_DATA = result.data.search_user.message;
              this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.resultsLength = 10;
            } else {
              this.getAllUser(0);
              this.alert.openAlert('Sorry', 'User doesnt exists');
            }

          });
      } else if (filterValue.trim().toLowerCase().length === 0) {
        this.getAllUser(0);
      }
    }, 1000);
  }

  deActivate(status, element?) {
    const count = element ? 'this user' : (this.selectedArray.length === 1 ? 'this user' : this.selectedArray.length + 'users');
    if (element || (this.selectedArray && this.selectedArray.length > 0)) {
      this.alert.openConfirmAlert(status === 'De-activate' ? 'De-activation Confirmation' :
        'Activation Confirmation', status === 'De-activate' ? 'Are you sure you want to de-activate ' + count :
        'Are you sure you want to activate ' + count).then((data) => {
          if (data) {
            const result = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.service.deActivate_And_reActivate_User(result, status === 'De-activate' ? false : true)
              .subscribe((userresult: any) => {
                this.selectedArray = [];
                if (userresult.data.deactivate_reactivate_user.success &&
                  userresult.data.deactivate_reactivate_user.message.updated_users.length > 0) {
                  this.getAllUser(0);
                } else {
                  this.alert.openAlert('Sorry, Please try again later', 'null');
                }
              });
          }
        });
    } else {
      this.alert.openAlert('Please select any record', null);
    }
  }

  block(status, element?) {
    if (element || (this.selectedArray && this.selectedArray.length > 0)) {
      const count = element ? 'this user' : (this.selectedArray.length === 1 ? 'this user' : this.selectedArray.length + 'users');
      this.alert.openConfirmAlert(status === 'Block' ? 'Block Confirmation' :
        'Un-block Confirmation', status === 'Block' ? 'Are you sure you want to block ' + count :
        'Are you sure you want to un-block ' + count).then((data) => {
          if (data) {
            const result = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.service.blockUser(result, status === 'Block' ? true : false)
              .subscribe((userresult: any) => {
                this.selectedArray = [];
                if (userresult.data.block_user.success && userresult.data.block_user.message.updated_users.length > 0) {
                  this.getAllUser(0);
                } else {
                  this.alert.openAlert('Sorry, Please try again later', 'null');
                }
              });
          }
        });
    } else {
      this.alert.openAlert('Please select any record', null);
    }
  }

  next(e) {
    this.getAllUser(e.pageIndex);
    this.selectedArray = [];
  }
}
