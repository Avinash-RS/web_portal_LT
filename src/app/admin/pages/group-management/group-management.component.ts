import { Component, OnInit, ViewChild, Input, ChangeDetectorRef  } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatSlideToggleChange } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections';
import { MatSlideToggleModule } from '@angular/material';

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
  disabled: boolean = false;
  toggleevent: any;
  editgroupname: string;
  loader: boolean = false;
  ELEMENT_DATA: PeriodicElement[] = [];
  resultsLength: number = null;
  displayedColumns: string[] = ['select', 'user_id', 'name', 'email', 'mobile', 'active'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  checked: any = 'Deactivate';
  constructor(private alert: AlertServiceService, private cdr: ChangeDetectorRef, private adminservice: AdminServicesService) {
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.getgroups();
    this.getAllUser(0);
  }

  getgroups() {
    this.pagenumber = 0;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      this.groups = result.data.getgroup.message;
      console.log(this.groups);
      this.treeSource.data = null;
      this.treeSource.data = this.groups;
      this.dataSource$.next(this.groups);
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
    console.log(this.pagenumber);
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: this.pagenumber };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      console.log(result.data.getgroup.message);
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

  selectgroup(node) {
    if (node.checkbox === true) {
      this.currentpath = node;
      this.disabled = false;
      this.editstatus = false;
      this.editgroupname = node.group_name;
    } else {
      this.disabled = true;
      this.editstatus = true;
      this.currentpath = null;
      this.editgroupname = '';
    }
    console.log(this.currentpath);
  }

  savegroup(form) {
    let hierarchy;
    let str;
    this.formsubmitted = true;
    console.log(form.valid);
    if (form.valid) {
      this.formsubmitted = false;
      if (this.currentpath) {
        str = this.currentpath.hierarchy_id.split('h');
        hierarchy = 'h' + (Number(str[1]) + Number(1));
      }
      if (Number(str[1]) >= 7 ){
        this.alert.openAlert('Error !', 'Reached Maximum level');
      } else {
      const data = {
        group_name: form.value.group_name, group_type: 'new',
        parent_group_id: this.currentpath ? this.currentpath.group_id : 'null',
        hierarchy_id: this.currentpath ? hierarchy : 'h1',
        admin_id: this.adminDetails._id
      };
      this.adminservice.creategroup(data).subscribe((result: any) => {
        if (result.data.createusergroup.success === true) {
          this.reset();
          this.alert.openAlert('Success !', 'Group Created Successfully');

          form.reset();
          this.getgroups();
        } else {
          this.alert.openAlert(result.data.createusergroup.message, null);
        }
      });
    }
  }
}

toggle(event: MatSlideToggleChange) {
  console.log(event.checked);
  this.toggleevent = event.checked;
  this.currentpath.is_active = !event.checked;
  console.log(this.currentpath.is_active);
}

  changegroupstatus() {
    console.log('current', !this.currentpath.is_active)
    let value: any;
    value = this.toggleevent ? this.toggleevent : !this.currentpath.is_active;
    console.log(value);
    const status = this.currentpath.is_active === true ? 'Deactivate' : 'Activate';
    Swal.fire({
      title: 'Are you sure want to ' + status +
      ' the group  ' + this.currentpath.group_name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.adminservice.changegroupstatus(this.currentpath.group_id , value).subscribe(( result : any) => {
          console.log(result);
          if (result.data.groupstatus.success === true) {
            this.editstatus = true;
            this.currentpath = null;
            this.editgroupname = "";
            this.getgroups();
            this.cdr.detectChanges();
            Swal.fire(
               status,
              'Group  has been ' + status + 'd',
              'success'
            );
           } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result.data.groupstatus.message,
            });
          }
        });
      }
    });
    // this.checked ="Deactivate"
  }
  edit(data: boolean, group_name){
    console.log('---' + group_name)
    if (data){
      this.editstatus = false;
      
      this.editgroupname = group_name;
     
    }else{
      this.editstatus = true;
      this.editgroupname = "";

    }

  }
  reset(){
    this.editstatus = true;
    this.editgroupname = '';
    this.disabled = true;
    this.currentpath.group_name = null;
    console.log('currentpath' + this.currentpath.group_name);
  }


  getAllUser(pagenumber) {
    this.loader = true;
    this.resultsLength = null;
    if (pagenumber === 0) {
    this.ELEMENT_DATA = [];
    }
    this.adminservice.getAllUsers(pagenumber, 1)
      .subscribe((result: any) => {
        Array.prototype.push.apply(this.ELEMENT_DATA, result.data.get_all_user.message);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.selection = new SelectionModel(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = result.data.get_all_user.learner_count;
        this.loader = false;
      });
  }
  next(e) {
    this.getAllUser(e.pageIndex);
  }
}
