import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as myGlobals from '@core/globals';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';



export interface PeriodicElement {
  fname: string;
  studendID: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  adminDetails: any;
  groups: any = [];


  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService,
    private alert: AlertServiceService, private service: AdminServicesService, ) { }

  ngOnInit() {
    // this.alert.openAlert('ok',null)
    // this.alert.openConfirmAlert('De-activation Confirmation', 'Are you sure you want to de-activate selected user ?').then((data: Boolean) => {
    //   console.log(data)
    // })
    this.addUserForm = this.formBuilder.group({
      username: new FormControl("", myGlobals.usernameVal),
      email: new FormControl("", myGlobals.emailVal),
      group: ['', myGlobals.req]
    });
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
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
    console.log(this.addUserForm.value);
    var admin = []
    admin.push(this.adminDetails._id)
    this.service.user_registration(this.addUserForm.value.email, this.addUserForm.value.username,
      true, this.addUserForm.value.group._id, this.addUserForm.value.group.group_name, admin
    ).subscribe((result: any) => {
      console.log(result.data.user_registration.message);
      if (result.data.user_registration.success == 'true')
        this.alert.openAlert("Success !", "User registered successfully")
      else
        this.alert.openAlert(result.data.user_registration.message, null)
    });
  }




  columnHeader = ['studendID', 'fname', 'weight', 'symbol','select'];

  tableData: PeriodicElement[] = [
    {studendID: 1, fname: 'Hydrogen', weight: 1.0079, symbol: 'H',},
    {studendID: 2, fname: 'Helium', weight: 4.0026, symbol: 'He'},
    {studendID: 3, fname: 'Lithium', weight: 6.941, symbol: 'Li'},
    {studendID: 4, fname: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {studendID: 5, fname: 'Boron', weight: 10.811, symbol: 'B'},
   
  ];

  next(e) {
    this.tableData = [{studendID: 6, fname: 'Carbon', weight: 12.0107, symbol: 'C'},
    {studendID: 7, fname: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {studendID: 8, fname: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {studendID: 9, fname: 'Fluorine', weight: 18.9984, symbol: 'F'},
    ]

    console.log(this.tableData)
  }

}
