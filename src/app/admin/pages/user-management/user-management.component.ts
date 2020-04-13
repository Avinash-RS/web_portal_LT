import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as myGlobals from '@core/globals';

interface Food {
  value: string;
  viewValue: string;
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

  constructor(private router: Router, private formBuilder: FormBuilder,
    private alert: AlertServiceService, private service: AdminServicesService, ) { }

  ngOnInit() {
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
  }

  get f() {
    return this.addUserForm.controls;
  }

  addUser() {
    // this.service.user_registration(this.registerForm.value.email,this.registerForm.value.fullname,this.registerForm.value.termsandconditions)
    // .subscribe(data => {
    //       if (data.data['user_registration']['success'] == 'true') {
    //         this.alert.openAlert(data.data['user_registration'].message,null)
    //         localStorage.setItem('UserDetails',JSON.stringify(data.data['user_registration'].data))
    //         this.loader.hide();
    //         this.registerForm.reset();
    //       } else{
    //         this.alert.openAlert(data.data['user_registration'].message,null)
    //         this.loader.hide();
    //       }
    //   })
    console.log(this.addUserForm.value)
    this.service.postUserGroup(1, 2, 3, 4)
      .subscribe((result: any) => {
        console.log(result.data.get_user_group.message)
        this.groups = result.data.get_user_group.message
      });
  }
}
