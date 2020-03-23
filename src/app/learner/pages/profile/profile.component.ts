import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public qual: any[] = [{
    level: '',
    board: '',
    institute: '',
    discipline: '',
    spec: '',
    year: '',
    percentage: ''
  }];
  public links: any[] = [{
    certificate: ''
  }];
  
  //Declarations
  info: any;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  gender: any;
  user_id: string = "l9m2l2";
  countryValue: any;
  countryId: any;
  // countryDetails: any = [];


  constructor(
    private alert: AlertServiceService,
    public service: LearnerServicesService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAllcountry();
    // this.getprofileDetails();
  }
  //Country List
  getAllcountry(){
      this.service.get_country_details().subscribe(countryDetails => {
      console.log('sss',countryDetails);
      this.countryValue = countryDetails.data['get_country_details'].data;
      console.log('countryValue',this.countryValue)
    })
  }
  //State List
  // getAllState(){
  //   this.service.get_state_details()
  // }


  // getprofileDetails() {
  //   this.service.view_profile(this.user_id).subscribe(data => {
  //     console.log('values',this.user_id);
  //     // if (data.data['view_profile']['success'] == 'true') {
  //     //   this.alert.openAlert(data.data['view_profile'].message, null)
  //     // }
  //     // else{
  //     //   this.alert.openAlert(data.data['view_profile'].message, null)
  //     // }
  //   })
  // }
  addnewQual(){
    this.qual.push({
      level: '',
      board: '',
      institute: '',
      discipline: '',
      spec: '',
      year: '',
      percentage: ''
    });
  }
  addnewLink(){
    this.links.push({
      certificate: ''
    })
  }
  
  updateProfile() {
    console.log('info', this.info)
    console.log('gender',this.gender)
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     // data: {name: this.name, animal: this.animal}
  //   });
}