import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {
  groups: any;
  subgroups: any;
  adminDetails: any;
  currentpath = null;
  constructor(private alert: AlertServiceService, private adminservice: AdminServicesService) { }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.getgroups();
  }

getgroups() {
  const data = {input_id: 'h1', type: 'hierarchy', pagenumber: 0};
  this.adminservice.getgroup(data).subscribe((result: any) => {
  console.log(result);
  this.groups = result.data.getgroup.message;
  console.log(this.groups);
});
}

loadsubgroup(group) {
  console.log(group);
  this.currentpath = group;
  const data = {input_id: group.group_id, type: 'group', pagenumber: 0};
  this.adminservice.getgroup(data).subscribe((result: any) => {
    console.log(result.data);
    // this.groups = result.data.getgroup.message;
  });
}
savegroup(form) {
  const data = {group_name: form.value.group_name, group_type: 'new',
  parent_group_id: this.currentpath.group_id ? this.currentpath.group_id : 'null',
  hierarchy_id: this.currentpath.group_id ? this.currentpath.hierarchy_id : 'h1',
  admin_id: this.adminDetails._id};
  console.log(data);
  this.adminservice.creategroup(data).subscribe((result: any) => {
    console.log(result);
    if (result.data.createusergroup.success === true) {
      this.alert.openAlert('Success !', 'Group Created Successfully');
    } else {
      this.alert.openAlert(result.data.createusergroup.message, null);
    }
  });
}

}



