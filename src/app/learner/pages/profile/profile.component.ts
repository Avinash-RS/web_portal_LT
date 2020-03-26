import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as myGlobals from '../../../common/globals';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mailForm: FormGroup;
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
  profileDetails: any = [];
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  user_id: string = "l9m2l2";
  countryValue: any;
  countryId: any;
  showotp: boolean = false;
  qualification: any;
  // country: any = {};
  stateValue: any;
  levelValue: any;
  boardValue: any;
  // countryDetails: any = [];


  constructor(
    private alert: AlertServiceService,
    public service: LearnerServicesService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAllcountry();
    this.getAllLevels();
    this.getBoardsUniv();
    // this.getprofileDetails();
    this.mailForm = this.formBuilder.group({
      // username: new FormControl('', myGlobals.usernameVal),
      mailid: new FormControl('', myGlobals.emailVal),
      mobile: new FormControl('', myGlobals.mobileVal),
          otp1: new FormControl("", []),
          otp2: new FormControl("", []),
          otp3: new FormControl("", []),
          otp4: new FormControl("", []),
      currentpassword: new FormControl('', myGlobals.passwordVal),  
      newpassword: new FormControl('', myGlobals.passwordVal),  
      confirmpassword: new FormControl('', myGlobals.passwordVal),  
    }, {
    });
  }
  get f() { 
    return this.mailForm.controls; 
  }
  //Country List
  getAllcountry() {
    this.service.get_country_details().subscribe(countryDetails => {
      this.countryValue = countryDetails.data['get_country_details'].data;
    })
  }
  //State List
  getAllState(country){
    let countryId = country.value;
    this.service.get_state_details(countryId).subscribe(stateDetails => {
      console.log('state', stateDetails);
      this.stateValue = stateDetails.data['get_state_details'].data;
    })
  }
  getAllLevels(){
    this.service.get_qualification_details().subscribe(level => {
      this.levelValue = level.data[' get_qualification_details'].data;
      console.log('level',this.levelValue)
    })
  }
  getBoardsUniv(){
    this.service.get_board_university_details().subscribe(boards => {
      this.boardValue = boards.data['get_board_university_details'].data;
      console.log('board', this.boardValue);
    })
  }


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
  addnewQual() {
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
  addnewLink() {
    this.links.push({
      certificate: ''
    })
  }

  updateProfile() {
    
    if(this.profileDetails.gender === undefined){
      this.alert.openAlert('Select a value for gender', null)
    }
    if(this.profileDetails.profession === undefined){
      this.alert.openAlert('Select a value for profession', null)
    }
    if(this.profileDetails.country || this.profileDetails.state || this.profileDetails.city === undefined){
      this.alert.openAlert('Select values for all fields in location', null)
    }
  }

  editEmail(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  editmobno(mobRef: TemplateRef<any>) {
    this.dialog.open(mobRef);
  }
  editPassword(passRef: TemplateRef<any>) {
    this.dialog.open(passRef);
  }
  otpverification(){
    this.showotp = true;
  }
}