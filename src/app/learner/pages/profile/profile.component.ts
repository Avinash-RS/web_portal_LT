import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { Certificate } from 'crypto';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mailForm: FormGroup;
  enabel:Boolean=true
  public qual: any[] = [{
    qualification: '',
    board_university: '',
    institute: '',
    discipline: '',
    specification: '',
    year_of_passing: '',
    percentage: ''
  }];
  public links: any[] = [{
    certificate: ''
  }];

  //Declarations
  selectedDay:any;
  currentUser: any = [];
  otp: any;
  info: any;
  language: any;
  profileDetails: any = [];
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  countryValue: any;
  countryId: any;
  showotp: boolean = false;

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
  userData:any = {};
  showdeletedicon:boolean = false;
  uniValue: void;
  url:String = '';
  // countryDetails: any = [];
  selectfile = null;
  urlImage:any
  socialMedia:{}
  certificate:any=[]
  constructor(
    private alert: AlertServiceService,
    public service: LearnerServicesService,
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private loader:Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
  ) { 
    this.enabel=false
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if(params["status"]){
        
        this.alert.openAlert(params['msg'], null);
      }
    });
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    this.getprofileDetails(this.currentUser.user_id);
    this.getAllLevels();
    this.getAllcountry();
    this.getAllLanguage();
    this.getBoardsUniv();
    this.getInstitute();
    this.getDiscipline();
    this.getSpec();
    this.mailForm = this.formBuilder.group({
      // info: new FormControl('', myGlobals.fullnameVal),
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
      
      this.levelValue = level.data['get_qualification_details'].data;
      if(this.levelValue == null){
        this.alert.openAlert(level.data['get_qualification_details'].message, null);
      }
      
    })
  }
  getBoardsUniv(){
    this.service.get_board_university_details().subscribe(boards => {
      
      this.boardValue = boards.data['get_board_university_details'].data['board'];
      this.uniValue = boards.data['get_board_university_details'].data['university'];

    })
  }
  getInstitute(){
    this.service.get_institute_details().subscribe(institute => {
      
      this.institutes = institute.data['get_institute_details'].data;
      
    })
  }

  getDistrict(city){
    let stateId = city.value;
    this.service.get_district_details(this.countryId,stateId).subscribe(city => {
      this.cityValue = city.data['get_district_details'].data;
      
    })
  }
  getDiscipline(){
    this.service.get_discipline_details().subscribe(discipline => {
      this.dis =discipline.data['get_discipline_details'].data;
      
    })
  }
  getSpec(){
    this.service.get_specification_details().subscribe(spec => {
      this.specValue =spec.data['get_specification_details'].data;
      
    })
  }
  getAllLanguage(){
    this.service.get_language_details().subscribe(language => {
      this.languageList = language.data['get_language_details'].data;
      
    })
  }

// View Profile
  getprofileDetails(userid) {
    this.service.view_profile(userid).subscribe(data => {
      
      this.userData = data.data['view_profile'].message[0];
      
    })
  }
  addnewQual(index) {
    this.qual.push({
      qualification: '',
      board_university: '',
      institute: '',
      discipline: '',
      specification: '',
      year_of_passing: '',
      percentage: ''
    });
    console.log(this.qual)
    return true;  
  }
  removelastQual(index){
    if(this.qual.length == 1){
      this.alert.openAlert("Can't delete the row when there is only one row", null);  
      return false;  
    }else{
      this.qual.splice(index, 1);   
      return true;  
    }
  
  }

  addnewLink() {

    this.links.push({
      certificate: ''
    })
    console.log(this.links,'lllllllllllllllllllllllll')
    // return true;
  }

  removenewLink(index){
    if(this.words2.length == 1){
      this.alert.openAlert("Can't delete  when there is only one row", null);  
      return false;  
    }else{
      this.words2.splice(index, 1);   
      return true;  
    }
  
  }

  updateProfile(language,country,state,city,social,about_you,exp,org,role) {
    var social_media =[{
      link:social,
      img:""
    }]
    var progress;
    console.log(this.words2.length,'  ',social_media.length)
    if(this.profileDetails.gender!=undefined&&this.profileDetails.profession!=undefined&&country!=undefined&&this.qual!=undefined&&localStorage.getItem('user_img')==undefined&&localStorage.getItem('user_img')==null){
      progress='60%'
    }else if(this.profileDetails.gender!=undefined&&this.profileDetails.profession!=undefined&&country!=undefined&&this.qual!=undefined &&localStorage.getItem('user_img')&&language==undefined&&this.words2.length==1&&social_media.length==1){
      progress='90%'
    }else if(this.profileDetails.gender!=undefined&&this.profileDetails.profession!=undefined&&country!=undefined&&this.qual!=undefined 
      &&localStorage.getItem('user_img')&&language!=undefined&&this.words2!=undefined&& social!=undefined){
      progress='100%'
    }

    var professional={
      total_experience:exp,
      organization:org,
      job_role:role
    }
for (const iterator of this.words2) {
  this.certificate.push(iterator.value)
}
    
    var jsonData={
      user_id:this.currentUser.user_id,
      gender:this.profileDetails.gender,
      year_of_birth: "05-08-1998",
      profile_img:localStorage.getItem('user_img'),
      profession:this.profileDetails.profession,
      languages_known:language,
      country:country,
      state:state,
      city_town:city,
      qualification:this.qual,
     certificate:this.certificate,
     social_media:social_media,
     about_you:about_you ,
     professional:professional,
     progress:progress,
     created_by_ip:localStorage.getItem('Systemip')
    }
   console.log(jsonData)
    this.loader.show();
    this.service.update_profile(jsonData).subscribe(data => {
      console.log(data)
      if(data.data['update_profile']['success'] == 'true'){
        this.loader.hide();
        this.alert.openAlert('Profile updated successfully.',null)
      
      } else{
        this.alert.openAlert(data.data['update_profile'].message,null)
      }
    })
    
    
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
    this.service.update_mobile_onprofile(this.currentUser.user_id,this.mailForm.value.mobile).subscribe(data => {
      
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
  
          if (data.data['update_verifyotp_mobile_onprofile']['success'] == 'true') {
            this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message,null)
            this.showotp = true;
          } else{
            this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message,null)
          }
      })

  }
  //Update Password
  updatePassword(){
    var psd = localStorage.getItem('ps');
    var ps = atob(psd)
    this.service.get_change_password_updateprofile(this.currentUser.username,ps,this.mailForm.value.newpassword).subscribe(password => {
      
      if(password.data['get_change_password_updateprofile']['success'] == 'true'){
        this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
      } else{
        this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
      }
    })
  }
  //Update Email
  updateEmail(){
    this.service.update_email_onprofile(this.currentUser.user_id,this.mailForm.value.mailid).subscribe(data => {
      if(data.data['update_email_onprofile']['success'] == 'true'){
        this.alert.openAlert(data.data['update_email_onprofile'].message, null);
      } else {
        this.alert.openAlert(data.data['update_email_onprofile'].message, null)
      }
    })
  }
  

  onSelectFile(event) {
     this.selectfile = <File>event.target.files[0];

     if( this.selectfile && this.selectfile.type != 'image/png' && this.selectfile.type!='image/jpeg'){
       this.alert.openAlert('mage should be less than 1 MB and should be only Jpeg or png format', null)
     } 
     else if (this.selectfile && this.selectfile.size > 100000){

      this.alert.openAlert('image should be less than 1 MB and should be only Jpeg or png format', null)
     } 
     else {
       if(this.selectfile){
       const fb = new FormData();
       fb.append('image',this.selectfile,this.selectfile.name)
       this.service.imageupload(fb).subscribe(data =>{
           
           this.urlImage=data
           localStorage.setItem('user_img',this.urlImage.url)
           //this.profileUpdateData(this.urlImage.url)
       })
      }
     }
  }
   profileUpdateData(img){
     var jsonData={
      user_id:this.currentUser.user_id,
      profile_img:img
     }
     console.log(jsonData)
         this.service.update_profile(jsonData).subscribe(data => {
        console.log(data)
    })
    
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
   words2 = [{value: ''}];
   add() {
    this.words2.push({value: ''});
    console.log(this.words2)
  }
}
