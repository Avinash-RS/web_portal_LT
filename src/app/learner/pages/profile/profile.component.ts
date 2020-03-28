import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as myGlobals from '@core/globals';
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
  currentUser: any = [];
  otp: any;
  profileDetails: any = [];
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  countryValue: any;
  countryId: any;
  showotp: boolean = false;
  qualification: any;
  // country: any = {};
  stateValue: any;
  levelValue: any;
  boardValue: any;
  cityValue: any;
  updatePass: any;
  dis: any;
  specValue: any;
  institutes: any;
  languageList: any;
  isenable:boolean = true;
  userData: any;
  uniValue: void;
  // countryDetails: any = [];


  constructor(
    private alert: AlertServiceService,
    public service: LearnerServicesService,
    private dialog: MatDialog,
    private loader:Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    // this.getprofileDetails();
    this.getAllLevels();
    this.getAllcountry();
    this.getAllLanguage();
    this.getBoardsUniv();
    this.getInstitute();
    this.getDiscipline();
    this.getSpec();
    this.mailForm = this.formBuilder.group({
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
      this.stateValue = stateDetails.data['get_state_details'].data;
      if(this.stateValue == null){
        this.alert.openAlert(stateDetails.data['get_state_details'].message, null);
      }
    })
  }
  getAllLevels(){
    this.service.get_qualification_details().subscribe(level => {
      console.log('level',level)
      this.levelValue = level.data['get_qualification_details'].data;
      if(this.levelValue == null){
        this.alert.openAlert(level.data['get_qualification_details'].message, null);
      }
      
    })
  }
  getBoardsUniv(){
    this.service.get_board_university_details().subscribe(boards => {
      console.log('b',boards)
      this.boardValue = boards.data['get_board_university_details'].data['board'];
      this.uniValue = boards.data['get_board_university_details'].data['university'];
      console.log('board', this.boardValue);
      console.log('uni', this.uniValue);
    })
  }
  getInstitute(){
    this.service.get_institute_details().subscribe(institute => {
      console.log('firstins',institute)
      this.institutes = institute.data['get_institute_details'].data;
      console.log('ins',this.institutes)
    })
  }

  getDistrict(city){
    let stateId = city.value;
    this.service.get_district_details(this.countryId,stateId).subscribe(city => {
      this.cityValue = city.data['get_district_details'].data;
      console.log('city',this.cityValue)
    })
  }
  getDiscipline(){
    this.service.get_discipline_details().subscribe(discipline => {
      this.dis =discipline.data['get_discipline_details'].data;
      console.log('dis',this.dis)
    })
  }
  getSpec(){
    this.service.get_specification_details().subscribe(spec => {
      this.specValue =spec.data['get_specification_details'].data;
      console.log('spec',this.specValue);
    })
  }
  getAllLanguage(){
    this.service.get_language_details().subscribe(language => {
      this.languageList = language.data['get_language_details'].data;
      console.log('lang',this.languageList)
    })
  }

//View Profile
  // getprofileDetails() {
  //   this.service.view_profile(this.currentUser.user_id).subscribe(data => {
  //     console.log('user',this.currentUser.user_id);
  //     this.userData = data.data['view_profile'].message;
  //     console.log('userdata',this.userData)
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
  //Update Mobile
  otpverification(){
    this.loader.show();
    this.service.update_mobile_onprofile().subscribe(data => {
      if(data.data['update_mobile_onprofile']['success'] == 'true'){
        this.loader.hide();
        this.alert.openAlert(data.data['update_mobile_onprofile'].message,null)
        this.isenable = false;
        this.showotp = true;
      } else{
        this.alert.openAlert(data.data['update_mobile_onprofile'].message,null)
      }
    })
  
  }
  //Verify OTP
  otpverify(){
    this.otp = this.mailForm.value.otp1+this.mailForm.value.otp2+this.mailForm.value.otp3+this.mailForm.value.otp4
    this.service.update_verifyotp_mobile_onprofile(this.currentUser.user_id,this.mailForm.value.mobile,this.otp,).subscribe(data => {
      console.log('mob',this.mailForm.value.mobile)
      console.log('data',data);
          if (data.data['update_verifyotp_mobile_onprofile']['success'] == 'true') {
            this.alert.openAlert(data.data['uupdate_verifyotp_mobile_onprofile'].message,null)
            this.showotp = true;
          } else{
            this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message,null)
          }
      })

  }
  // updatePassword(){
  //   this.service.get_change_password_updateprofile(this.currentUser.username,this.currentUser.ps).subscribe(password => {
  //     console.log('uname',this.currentUser.username);
  //     console.log('ps',this.currentUser.ps)
  //     this.updatePass = password.data['get_change_password_updateprofile'].data;
  //   })
  // }
  updateEmail(){
    this.service.update_email_onprofile(this.currentUser.user_id,this.currentUser.email).subscribe(data => {
      if(data.data['update_email_onprofile']['success'] == 'true'){
        this.alert.openAlert(data.data['update_email_onprofile'].message, null);
      } else {
        this.alert.openAlert(data.data['update_email_onprofile'].message, null)
      }
    })
  }
}
