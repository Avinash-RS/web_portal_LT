import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatSlideToggleChange } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';

export interface PeriodicElement {
  user_id: string;
  name: number;
  email: string;
  mobile: string;
}
@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
})

export class GroupManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  groups: any;
  adminDetails: any;
  currentpath = null;
  editstatus: any = true;
  pagenumber = 0;
  formsubmitted = false;
  @Input()
  disabled = true;
  toggleevent: any;
  editgroupname: string;
  group_name: any;
  loader = false ;
  ELEMENT_DATA: PeriodicElement[] = [];
  resultsLength: number = null;
  displayedColumns: string[] = ['select', 'user_id', 'name', 'email', 'mobile', 'active', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  groupid: any;
  checked: any = 'Deactivate';
  selectedArray: any = [];
  trackDetails: any;
  profileDetails: any;
  changeGrpForm: any;
  userGroupChange: any;
  catalogueList: any;
  catalogue: any;
  allgroups: any;
  selectedcatalogue: any;
  oldcatalogue: any;
  trackBy:any;
  toggle: any;
    /** tree source stuff */
    readonly dataSource$: BehaviorSubject<any[]>;
    readonly treeSource: MatTreeNestedDataSource<any>;
    /** tree control */
    readonly treeControl = new NestedTreeControl<any>(node => node.children);
    readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  constructor(private alert: AlertServiceService, private gs: GlobalServiceService,
              private cdr: ChangeDetectorRef, private adminservice: AdminServicesService, private formBuilder: FormBuilder,
              private router: Router, private dialog: MatDialog, ) {

    this.groupid = (this.router.getCurrentNavigation().extras?.state?.group_id);
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    localStorage.setItem('role', 'admin');
    // this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.adminDetails = this.gs.checkLogout();
    this.getgroups();
    this.getallcatelogue();
    // this.getallgroups();
  }

  getgroups() {
    this.pagenumber = 0;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: 0 };
    this.adminservice.getgroup(data)
      .subscribe((result: any) => {
        this.groups = result.data.getgroup.message;
        this.adminservice.getgroup(data).subscribe((result1: any) => {
          this.groups = result1.data.getgroup.message;
          this.treeSource.data = null;
          // this.groups[0].checkbox = true;
          this.treeSource.data = this.groups;
          this.dataSource$.next(this.groups);
          // if (this.groupid && this.treeSource.data.length) {
          //   const index = this.treeSource.data.findIndex( value => value.group_id === this.groupid);
          //   this.treeSource.data[index].checkbox = true;
          //   this.selectgroup(this.treeSource.data[index]);
          // }
        });
      });
  }
  getallcatelogue() {
    this.adminservice.getcatalogues().subscribe((result: any) => {
      this.catalogueList = result?.data?.getallcatalogue?.message;
    });
  }

  getallgroups() {
    this.adminservice.getUserGroup()
      .subscribe((result: any) => {
        this.allgroups = result.data.get_user_group.message;
      });
  }
  /** sub group */
  loadsubgroup(node?: any) {
    const data = { input_id: node.group_id, type: 'group', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const group = result.data.getgroup.message;
      if (node) {
        // node.children = [
        //   ...(node.children || []),
        //   group
        // ];
        node.children = group;
        // if (!this.treeControl.isExpanded(node)) {
        this.treeControl.expand(node);
        // }
      } else {
        this.dataSource$.next([
          ...this.dataSource$.value, group[0]]);
      }
      const array = this.treeSource.data;
      this.treeSource.data = null;
      this.treeSource.data = array;
    });
  }

  /**
   * Determines whether scroll down on
   */
  onScrollDown() {
    this.pagenumber = this.pagenumber + 1;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: this.pagenumber };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const resultdata = result.data.getgroup.message;
      if (resultdata.length) {
        let array: any;
        array = resultdata;
        this.groups = this.treeSource.data;
        this.groups.push(...array);
        this.treeSource.data = null;
        this.treeSource.data = this.groups;
      }
    });
  }


  selectcatalogue(event, state: any) {
    if (event.source.selected) {
      this.selectedcatalogue = state;
    }
  }

 update(items, id, name) {
    let item;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
        item = items[i];
        if (item.group_id === id) {
            item.checkbox = name;
            return;
        }
        if (item.children) {
             this.update(item.children, id, name);
        }
    }
}
  selectgroup(node, groupform) {
    if (this.currentpath) {
     this.update(this.treeSource.data, this.currentpath?.group_id, false);
  }
    groupform.form.markAsPristine();
    if (node.checkbox === true) {
      this.currentpath = null;
      this.currentpath = node;
      this.disabled = false;
      this.editstatus = false;
      this.editgroupname = node.group_name;
      this.group_name = node.group_name;
      this.toggle = node.is_active;
      this.getAllUser(0);
      this.adminservice.getgroupbyid(node.group_id).subscribe((result: any ) => {
        this.catalogue = result?.data?.getgroupbyid?.message[0]?.catalogue_mapping_details?.catalogue_details?.catalogue_id;
        this.oldcatalogue = result?.data?.getgroupbyid?.message[0]?.catalogue_mapping_details?.catalogue_details;
      });
    } else {
      this.disabled = true;
      this.editstatus = true;
      this.currentpath = null;
      this.editgroupname = '';
      this.oldcatalogue = '';
      this.catalogue = '';
    }
  }


  viewDetail(element, templateRef: TemplateRef<any>) {
    this.adminservice.getUserSession(element._id).subscribe((track: any) => {
      this.trackDetails = track.data && track.data.get_user_session_detail &&
        track.data.get_user_session_detail.message && track.data.get_user_session_detail.message[0];
      this.adminservice.getLearnerDetail(element.user_id)
        .subscribe((result: any) => {
          this.profileDetails = result.data && result.data.get_all_learner_detail &&
            result.data.get_all_learner_detail.message && result.data.get_all_learner_detail.message[0];
          this.dialog.open(templateRef);
        });
    });
  }

  closedialogbox() {
    this.dialog.closeAll();
  }
  changeGroup(passRef: TemplateRef<any>, element) {
    this.getallgroups();
    this.userGroupChange = null;
    this.userGroupChange = element;
    this.changeGrpForm = this.formBuilder.group({
      group: ['', myGlobals.req]
    });
    this.dialog.open(passRef);
  }
  get f() {
    return this.changeGrpForm.controls;
  }
  updateGroup() {
    this.dialog.closeAll();
    // this.getAllUser(0);
    this.adminservice.updateGroup(this.userGroupChange._id, this.changeGrpForm.value.group.group_name,
      this.changeGrpForm.value.group.group_id).subscribe((result: any) => {
      if (result.data.update_group.success) {
        this.alert.openAlert('User Group Updated Successfully', null);
        this.getAllUser(0);
      } else {
        this.alert.openAlert(result.data.update_group.message, null);
        this.dialog.closeAll();
      }

    });
  }
  savegroup(form) {
    let hierarchy;
    let str;
    let strvalue;
    this.formsubmitted = true;
    // form.value.group_name.replace(/^[ ]+|[ ]+$/g,'');
    form.value.group_name = form.value.group_name.trim().replace(/&nbsp;/g, '').replace(/<[^\/>][^>]*><\/[^>]+>/g, '');
    if (form.valid) {
      this.formsubmitted = false;
      if (this.currentpath) {
        if (this.currentpath.hierarchy_id) {
          str = this.currentpath.hierarchy_id.split('h');
          strvalue = Number(str[1]);
          hierarchy = 'h' + (Number(str[1]) + Number(1));
        } else {
          strvalue = 0;
        }
      }
      if (this.currentpath && Number(str[1]) >= 7) {
        this.alert.openAlert('Error !', 'Reached Maximum level');
      } else {
        const data = {
          group_name: form.value.group_name, group_type: 'new',
          parent_group_id: this.currentpath ? this.currentpath.group_id : 'null',
          hierarchy_id: this.currentpath ? hierarchy : 'h1',
          admin_id: this.adminDetails._id, catalogue_id: form.value.catalogue
        };
        this.adminservice.creategroup(data).subscribe((result: any) => {
          if (result.data.createusergroup.success === true) {
            this.alert.openAlert('Success !', this.currentpath?.group_id ?
            'Sub group created successfully' : 'Group created successfully' );
            this.reset();
            form.reset();
            this.getgroups();
          } else {
            this.alert.openAlert(result.data.createusergroup.error_msg, null);
          }
        });
      }
    }
  }

  // toggle(event: MatSlideToggleChange) {
  //   this.toggleevent = event.checked;
  //   this.currentpath.is_active = event.checked;
  // }
  updategroupdetails(groupform) {
    // let value: any;
    // value = this.toggleevent ? this.toggleevent : this.currentpath.is_active;
    // this.toggleevent = '';
    groupform.value.group_name = groupform.value.group_name.trim().replace(/&nbsp;/g, '').replace(/<[^\/>][^>]*><\/[^>]+>/g, '');
    // const status = this.currentpath.is_active === true ? 'Deactivate' : 'Activate';
    Swal.fire({
      title: 'Are you sure you want to update the  ' + this.currentpath.group_name + '?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        const data = {
          catalogue_id: this.oldcatalogue?.catalogue_id === groupform.value.catalogue  ? 'null' : groupform.value.catalogue          ,
          catalogue_name: this.oldcatalogue?.catalogue_id === groupform.value.catalogue  ? 'null' : this.selectedcatalogue.catalogue_name,
          is_active: groupform.value.toggle, group_id : this.currentpath.group_id, group_name: groupform.value.group_name,
          group_type: this.currentpath.group_type, parent_group_id : this.currentpath.parent_group_id,
          hierarchy_id: this.currentpath.hierarchy_id, admin_id: this.currentpath.admin_id, created_by: this.currentpath.created_by
        };
        this.adminservice.updategroupdetails(data).subscribe((result1: any) => {
          if (result1.data.groupstatus.success === true) {
            this.toggleevent = '';
            this.reset();
            this.getgroups();
            this.cdr.detectChanges();
            Swal.fire(
              'Group  has been  updated successfully',
            );
          } else {
            Swal.fire({
              // icon: 'error',
              // title: 'Oops...',
              text: result1.data.groupstatus.message,
            });
          }
        });
      }
    });
    // this.checked ="Deactivate"
  }
  edit(data: boolean, groupname) {
    if (data) {
      this.editstatus = false;

      this.editgroupname = groupname;
      this.catalogue = this.oldcatalogue?.catalogue_id;

    } else {
      this.editstatus = true;
      this.editgroupname = '';
      this.catalogue = '';

    }

  }
  reset() {
    this.editstatus = true;
    this.editgroupname = '';
    this.disabled = true;
    this.currentpath = null;
    this.catalogue = '';
  }

  gotoAddUser() {
    this.router.navigate(['Admin/auth/addUser']);
  }

  getAllUser(pagenumber) {
    this.loader = true;
    this.resultsLength = null;
    if (pagenumber === 0) {
      this.ELEMENT_DATA = [];
    }
    this.adminservice.getAllUsers(pagenumber, 1, this.currentpath.group_id)
      .subscribe((result: any) => {
        if (result.data && result.data.get_all_user) {
          if (pagenumber === 0) {
            this.ELEMENT_DATA = [];
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          }
          Array.prototype.push.apply(this.ELEMENT_DATA, result.data.get_all_user.message);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          this.selection = new SelectionModel(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.resultsLength = result.data.get_all_user.learner_count;
          this.loader = false;
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
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

  deActivate(status, element?) {
    const count = element ? 'this user' : (this.selectedArray.length === 1 ? 'this user' : this.selectedArray.length + 'users');
    if (element || (this.selectedArray && this.selectedArray.length > 0)) {
      this.alert.openConfirmAlert(status === 'De-activate' ? 'De-activation Confirmation' :
        'Activation Confirmation', status === 'De-activate' ? 'Are you sure you want to de-activate ' + count :
        'Are you sure you want to activate ' + count).then((data) => {
          if (data) {
            const result1 = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.adminservice.deActivate_And_reActivate_User(result1, status === 'De-activate' ? false : true)
              .subscribe((result: any) => {
                this.selectedArray = [];
                if (result.data.deactivate_reactivate_user.success &&
                  result.data.deactivate_reactivate_user.message.updated_users.length > 0) {
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
            const result1 = this.selectedArray && this.selectedArray.length > 0 ?
              this.selection.selected.map((item: any) => item.user_id) : [element.user_id];
            this.adminservice.blockUser(result1, status === 'Block' ? true : false)
              .subscribe((result: any) => {
                this.selectedArray = [];
                if (result.data.block_user.success && result.data.block_user.message.updated_users.length > 0) {
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
  }

  tabClick(event) {
    if (event.index === 1 && this.currentpath) {
      const pagenumber = 0;
      this.getAllUser(pagenumber);
    }
  }
}
