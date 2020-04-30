import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupManagementComponent implements OnInit {
  groups: any;
  adminDetails: any;
  currentpath = null;
  pagenumber = 0;

  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  constructor(private alert: AlertServiceService, private adminservice: AdminServicesService) {
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.getgroups();
  }

  getgroups() {
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      this.groups = result.data.getgroup.message;
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
    this.pagenumber = this.pagenumber + 10;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: this.pagenumber };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const resultdata = result.data.getgroup.message;
      if (resultdata.length) {
        let array: any;
        array = resultdata;
        this.groups = this.treeSource.data;
        array.push(...this.groups);
        this.treeSource.data = null;
        this.treeSource.data = array;
      }
    });
  }



  selectgroup(node) {
    if (node.checkbox === true) {
      this.currentpath = node;
    } else {
      this.currentpath = null;
    }
  }
  savegroup(form) {
    let hierarchy;
    if (form.valid) {
      if (this.currentpath) {
        const str = this.currentpath.hierarchy_id.split('h');
        hierarchy = 'h' + (Number(str[1]) + Number(1));
      }
      const data = {
        group_name: form.value.group_name, group_type: 'new',
        parent_group_id: this.currentpath ? this.currentpath.group_id : 'null',
        hierarchy_id: this.currentpath ? hierarchy : 'h1',
        admin_id: this.adminDetails._id
      };
      this.adminservice.creategroup(data).subscribe((result: any) => {
        if (result.data.createusergroup.success === true) {
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
