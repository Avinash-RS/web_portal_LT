import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material";
import { FormControl, FormGroup, FormBuilder, NgModel, Validators, FormArray } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { Certificate } from 'crypto';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import * as _ from "lodash";
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

//BEFORE
// export class ProfileComponent implements OnInit {
//   config = {
//     allowNumbersOnly: true,
//     length: 4,
//     isPasswordInput: false,
//     disableAutoFocus: false,
//     placeholder:'',
//     inputStyles: {
//       'width': '50px',
//       'height': '50px',
//       'background': '#B8D0FF'
//     }
//   };

//   //my3
//   qualification_obj: any = [];
//   //
//   user_id_data: any;
//   mailForm: FormGroup;
//   otpForm: FormGroup;
//   passwordForm: FormGroup;
//   enabel: Boolean = true

//   public qual: any[] = [{

//     board: [],
//     institute: [],
//     discipline: [],
//     specification_detail: [],
//     year_of_passing: [],
//     percentage: [],
//     level_detail: [],
//   }];
//   public links: any[] = [{
//     certificate: ''
//   }];

//   //Declarations
//   selectedDay: any;
//   currentUser: any = [];
//   otp: any;
//   info: any;
//   language: any;
//   profileDetails: any = [];
//   fieldArray: Array<any> = [];
//   newAttribute: any = {};
//   countryValue: any;
//   countryId: any;
//   showotp: boolean = false;

//   // country: any = {};
//   stateValue: any;
//   levelValue: any;
//   boardValue: any;
//   cityValue: any;
//   updatePass: any;
//   dis: any;
//   specValue: any;
//   institutes: any;
//   languageList: any;
//   isenable: boolean = true;
//   userData: any = {};
//   qualification: any = {};
//   showdeletedicon: boolean = true;
//   uniValue: void;
//   url: String = '';
//   // countryDetails: any = [];
//   selectfile = null;
//   urlImage: any
//   socialMedia: {}
//   certificate: any = []
//   profileDetailCheck: boolean = false;
//   progress: number = 0;
//   show_button: Boolean = false;
//   show_eye: Boolean = false;
//   showNewButton: Boolean = false;
//   showNewEyes: Boolean = false;
//   showconButton: Boolean = false;
//   showconEyes: Boolean = false;
//   prof: any = {};
//   sosocialMediaLinkc: any;
//   socialMediaLink: any;
//   lowercase: boolean = false;
//   uppercase: boolean = false;
//   number: boolean = false;
//   spicalcharacter: boolean = false;
//   undefinedCheck: boolean;

//   constructor(
//     private alert: AlertServiceService,
//     public service: LearnerServicesService,
//     private activeroute: ActivatedRoute,
//     private dialog: MatDialog,
//     private loader: Ng4LoadingSpinnerService,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private gs: GlobalServiceService
//   ) {
//     this.enabel = false
//   }
//   showPassword() {
//     this.show_button = !this.show_button;
//     this.show_eye = !this.show_eye;
//   }

//   shownewPassword() {
//     this.showNewButton = !this.showNewButton;
//     this.showNewEyes = !this.showNewEyes;
//   }
//   showconPassword() {
//     this.showconButton = !this.showconButton;
//     this.showconEyes = !this.showconEyes;
//   }

//   change(event) {
//     if (event.target.value.match(myGlobals.lowerCaseLetters)) {
//       this.lowercase = true;
//     } else {
//       this.lowercase = false;
//     }
//     if (event.target.value.match(myGlobals.upperCaseLetters)) {
//       this.uppercase = true;
//     } else {
//       this.uppercase = false;
//     }
//     if (event.target.value.match(myGlobals.numbers)) {
//       this.number = true;
//     } else {
//       this.number = false;
//     }
//     if (event.target.value.match(myGlobals.specialchar)) {
//       this.spicalcharacter = true;
//     } else {
//       this.spicalcharacter = false;
//     }

//   }
//   ngOnInit() {
//     if (this.gs.checkLogout()) {
//       this.activeroute.queryParams.subscribe(params => {
//         if (params["status"]) {
//           this.alert.openAlert(params['msg'], null);
//         }
//       });
//       this.urlImage = localStorage.getItem('user_img')
//       // var user = this.gs.checkLogout()
//       this.currentUser = this.gs.checkLogout()
//       if (!this.currentUser.is_profile_updated)
//         this.gs.preventBackButton()
//       this.getprofileDetails(this.currentUser.user_id);

//       this.getAllcountry();
//       this.getAllLanguage();
//       this.getBoardsUniv();
//       this.getInstitute();
//       this.getDiscipline();
//       this.getSpec();
//       this.getAllLevels();
//       // this.closedialogbox();




//     } else {
//       this.router.navigate(['/Learner/login'])
//     }

//   }

//   enableedit() {
//     this.showdeletedicon = false;
//   }
//   get f() {
//     if (this.mailForm) {
//       return this.mailForm.controls;
//     } else if (this.otpForm) {
//       return this.otpForm.controls;
//     } else if (this.passwordForm) {
//       return this.passwordForm.controls;
//     }

//   }
//   //Country List
//   getAllcountry() {
//     this.service.get_country_details().subscribe(countryDetails => {
//       this.countryValue = countryDetails.data['get_country_details'].data;
//     })
//   }
//   //State List
//   getAllState(country) {
//     let countryId = country.value;
//     this.service.get_state_details(countryId).subscribe(stateDetails => {
//       this.stateValue = stateDetails.data['get_state_details'].data;
//       if (this.stateValue == null) {
//         this.alert.openAlert(stateDetails.data['get_state_details'].message, null);
//       }
//     })
//   }

//   getAllLevels() {
//     this.service.get_qualification_details().subscribe(level => {
//       this.levelValue = level.data['get_qualification_details'].data;
//       if (this.levelValue == null) {
//         this.alert.openAlert(level.data['get_qualification_details'].message, null);
//       }
//     })
//   }
//   getBoardsUniv() {
//     this.service.get_board_university_details().subscribe(boards => {
//       this.boardValue = boards.data['get_board_university_details'].data['board'];
//       this.uniValue = boards.data['get_board_university_details'].data['university'];
//     })
//   }
//   getInstitute() {
//     this.service.get_institute_details().subscribe(institute => {
//       this.institutes = institute.data['get_institute_details'].data;
//     })
//   }

//   getDistrict(city) {
//     let stateId = city.value;
//     this.service.get_district_details(this.countryId, stateId).subscribe(city => {
//       this.cityValue = city.data['get_district_details'].data;
//     })
//   }
//   getDiscipline() {
//     this.service.get_discipline_details().subscribe(discipline => {
//       this.dis = discipline.data['get_discipline_details'].data;
//       // console.log(this.dis)
//     })
//   }
//   getSpec() {
//     this.service.get_specification_details().subscribe(spec => {
//       this.specValue = spec.data['get_specification_details'].data;
//     })
//   }
//   getAllLanguage() {
//     this.service.get_language_details().subscribe(language => {
//       this.languageList = language.data['get_language_details'].data;
//     })
//   }


//   // View Profile
//   getprofileDetails(userid) {
//     // console.log('inside getprofile')
//     this.loader.show();
//     this.service.view_profile(userid).subscribe(data => {
//       if (data.data['view_profile']) {
//         this.userData = data.data['view_profile'].message[0];
//         // this.profileDetails.about_you = this.userData.user_profile[0].about_you;gender
//         this.loader.hide();
//         // this.profileDetails.about_you 
//         if (this.userData.user_profile.length != 0) {
//           this.userData.progress = this.userData.user_profile[0].progress
//           var p = this.userData.progress.slice(0, -1);
//           this.progress = Number(p);
//           if (this.progress >= 60) {

//           } else {
//             this.gs.preventBackButton
//           }
//         } else {
//           this.userData.progress = this.userData.progress;
//           var p = this.userData.progress.slice(0, -1);
//           this.progress = Number(p);
//           if (this.progress >= 60) {

//           } else {
//             this.gs.preventBackButton
//           }
//         }
//         // if(this.profileDetails){
//         if (this.userData.user_profile.length == 0) {
//           this.userData.user_profile[0].about_you = null
//         }
//         localStorage.setItem('username', this.userData.user_dtl.username)
//         if (this.userData.user_profile.length != 0) {
//           localStorage.setItem('user_img', this.userData.user_profile[0].profile_img)
//         }
//         this.profileDetails = this.userData.user_profile[0];
//         // this.urlImage = this.userData.user_profile[0].profile_img;
//         // localStorage.setItem('user_img',this.urlImage)

//         // }
//         // console.log(this.words2)
//         this.qualification_obj = this.userData.user_profile[0].qualification.map(s => ({
//           qualification: s.qualification,
//           institute: s.institute,
//           board_university: s.board_university,
//           discipline: s.discipline,
//           specification: s.specification,
//           year_of_passing: s.year_of_passing,
//           percentage: s.percentage
//         }));
//         this.getAllState(this.profileDetails.country);
//         this.getDistrict(this.profileDetails.state);
//         this.qual = this.userData.qualification;
//         //if (this.userData.user_profile.length!=0 && this.userData.user_profile[0].certificate.length!=0 && this.userData.user_profile[0].certificate.length[0].value!=""){
//         this.words2 = this.userData.user_profile[0].certificate.map(s => ({
//           value: s
//         }));
//         this.prof = this.userData.user_profile[0].professional


//         //newly added mythreyi

//         this.qual = this.userData.qualification;
//         if (this.userData.user_profile.length != 0) {
//           this.socialMediaLink = this.userData.user_profile[0].social_media && this.userData.user_profile[0].social_media[0] && this.userData.user_profile[0].social_media[0].link;
//         }
//         // this.words2 = this.userData.user_profile[0].certificate



//         //end - mythreyi

//         // if(this.profileDetails)

//         // console.log( this.profileDetails,' this.profileDetails')
//         // console.log( this.qualification,' this.data')
//         // }
//       }
//     })
//   }
//   // addnewQual(index) {
//   //   console.log(index,q)
//   //   this.qual.push({
//   //     qualification: '',
//   //     board_university: '',
//   //     institute: '',
//   //     discipline: '',
//   //     specification: '',
//   //     year_of_passing: '',
//   //     percentage: ''
//   //   });
//   //   return true;
//   // }


//   getAllLEvel(e) {
//     console.log(e)
//   }
//   removelastQual(index) {
//     if (this.qual.length == 1) {
//       this.alert.openAlert("Can't delete the row when there is only one row", null);
//       return false;
//     } else {
//       this.qual.splice(index, 1);
//       return true;
//     }
//   }

//   addnewLink() {
//     this.links.push({
//       certificate: ''
//     })
//     // return true;
//   }



//   addcertificate(item, i) {
//     // this.words2.push(item);
//     // console.log(this.words2)
//     if (item != null)
//       this.words2.splice(i, 0, item)
//     // console.log(this.words2)
//   }
//   updateProfile(language, country, state, city, social, about_you, exp) {
//     // role = 'aaaasd';
//     // console.log(this.qual);
//     //profile imgg is not mandatory because of that 
//     /*if(!localStorage.getItem('user_img')){
//       this.alert.openAlert('Please update profile image.', null);
//       return
//     }*/
//     var certificate = this.words2.map(function (obj) {
//       return obj.value;
//     });


//     if (this.profileDetails.is_student_or_professional == 'student') {
//       this.prof.total_experience = '';
//       this.prof.organization = '';
//       this.prof.job_role = '';
//       if (this.profileDetails.gender && this.profileDetails.country &&
//         this.profileDetails.state && city && this.qualification_obj.qualification != '' &&
//         this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
//         && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
//         this.profileDetailCheck = true;
//       } else {
//         this.loader.hide();
//         this.profileDetailCheck = false;
//         this.alert.openAlert('Please fill all required fields', null);
//       }
//     } else if (this.profileDetails.is_student_or_professional == 'professional') {
//       // return false;
//       if (this.profileDetails.gender && this.prof.total_experience && this.prof.organization &&
//         this.prof.job_role && this.profileDetails.country &&
//         this.profileDetails.state && city && this.qualification_obj[0].qualification != '' &&
//         this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
//         && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
//         this.profileDetailCheck = true;
//         if (this.prof.total_experience > 70) {
//           this.alert.openAlert('Total experience should be less than or equal to 70 years', null);
//           this.profileDetailCheck = false;
//         }
//         if (this.prof.organization.length < 4) {
//           this.alert.openAlert('Current Organization must have minimum 4 characters length', null);
//           this.profileDetailCheck = false;
//         }
//         if (this.prof.job_role.length < 4) {
//           this.alert.openAlert('Current role must have minimum 4 characters length', null);
//           this.profileDetailCheck = false;
//         }

//       } else {
//         this.loader.hide();
//         this.profileDetailCheck = false;
//         this.alert.openAlert('Please fill all required fields', null);
//       }
//     } else {
//       if (this.profileDetails.gender && this.profileDetails.is_student_or_professional
//         && this.profileDetails.country &&
//         this.profileDetails.state && this.profileDetails.city && this.qual[0].qualification != '' &&
//         this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
//         && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
//         this.profileDetailCheck = true;
//       } else {
//         this.loader.hide();
//         this.profileDetailCheck = false;
//         this.alert.openAlert('Please fill all required fields', null);
//       }
//     }
//     if (this.profileDetailCheck === true) {
//       console.log(social)
//       // if(social) {
//       //   var social_media = social.map(s => ({
//       //     link: s.link,
//       //     img: s.img
//       //   }));
//       // }

//       var social_media = [{
//         link: this.socialMediaLink,
//         img: 'null'
//       }]
//       var progress;
//       // if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
//       //   country != undefined && this.qualification_obj != undefined && localStorage.getItem('user_img') == undefined &&
//       //   localStorage.getItem('user_img') == null) {
//       //   progress = '60%'
//       // } else if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && 
//       //   country != undefined && this.qual != undefined && localStorage.getItem('user_img') && language == undefined && this.words2.length == 1 && social.length == 1) {
//       //   progress = '90%'
//       // } else if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && country != undefined && this.qual != undefined
//       //   && localStorage.getItem('user_img') && language != undefined && this.words2 != undefined && social != undefined) {
//       //   progress = '100%'
//       // }
//       if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
//         country != undefined && state != undefined && city != undefined && this.qualification_obj != undefined) {
//         progress = '60%'
//         this.progress = 60;
//       } if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
//         country != undefined && this.qual != undefined  && language != undefined &&  this.words2.length == 1 && this.socialMediaLink) {
//         progress = '90%';
//         this.progress = 90;
//       } if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && country != undefined && this.qual != undefined
//         && localStorage.getItem('user_img') && language != undefined && this.words2 != undefined && social != undefined) {
//         progress = '100%';
//         this.progress = 100;
//       }
//       if(this.prof)
//       {
//         var prof = {
//         total_experience: this.prof.total_experience,
//         organization: this.prof.organization,
//         job_role: this.prof.job_role
//       }
//     }
//       // for (const iterator of this.words2) {
//       //     this.certificate.push(iterator.value)
//       //   } 
//       //  for (const iterator of this.words2) {
//       //         this.certificate.push(iterator)
//       //       } 
//       var jsonData = {
//         user_id: this.currentUser.user_id,
//         gender: this.profileDetails.gender,
//         year_of_birth: "05-08-1998",
//         profile_img: localStorage.getItem('user_img'),
//         is_student_or_professional: this.profileDetails.is_student_or_professional,
//         languages_known: language,
//         country: country,
//         state: state,
//         city_town: city,
//         qualification: this.qualification_obj,
//         certificate: certificate,
//         social_media: social_media,
//         about_you: about_you,
//         professional: prof,
//         progress: progress,
//         created_by_ip: localStorage.getItem('Systemip')
//       }

//       this.loader.show();
//       this.service.update_profile(jsonData).subscribe(data => {
//         if (data.data['update_profile']['success'] == 'true') {
//           this.loader.hide();
//           this.currentUser.is_profile_updated = true;
//           localStorage.setItem('UserDetails', JSON.stringify(this.currentUser))
//           this.alert.openAlert(data.data['update_profile'].message, null)
//           this.showdeletedicon = true;
//           this.router.navigate(['/Learner/MyCourse']);
//         } else {
//           this.alert.openAlert(data.data['update_profile'].message, null)
//         }
//       })
//     }

//   }

//   editEmail(templateRef: TemplateRef<any>) {
//     this.dialog.open(templateRef);
//     this.mailForm = this.formBuilder.group({
//       mailid: new FormControl('', myGlobals.emailVal)
//     });
//   }

//   editmobno(mobRef: TemplateRef<any>) {
//     this.dialog.open(mobRef);
//     this.isenable = true;
//     this.showotp = false;
//     this.otpForm = this.formBuilder.group({
//       mobile: new FormControl('', myGlobals.mobileVal),
//       otp: new FormControl("", []),
//       // otp2: new FormControl("", []),
//       // otp3: new FormControl("", []),
//       // otp4: new FormControl("", []),
//     })
//   }
//   editPassword(passRef: TemplateRef<any>) {
//     this.dialog.open(passRef);
//     this.passwordForm = this.formBuilder.group({
//       currentpassword: new FormControl('', myGlobals.passwordVal),
//       newpassword: new FormControl('', myGlobals.passwordVal),
//       confirmpassword: new FormControl('', myGlobals.passwordVal),
//     }, {
//       validator: MustMatch('newpassword', 'confirmpassword'),
//     });

//   }
//   //Update Mobile
//   otpverification() {
//     this.loader.show();
//     this.service.update_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile).subscribe(data => {
//       if (data.data['update_mobile_onprofile']['success'] == 'true') {
//         this.loader.hide();
//         this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
//         this.isenable = false;
//         this.showotp = true;
//       } else {
//         this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
//       }
//     })

//   }
//   onOtpChange(otp) {
//     this.otp = otp;
//   }
//   //Verify OTP
//   otpverify() {
//     // this.otp = this.otpForm.value.otp
//     this.service.update_verifyotp_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile, this.otp).subscribe(data => {
//       if (data.data['update_verifyotp_mobile_onprofile']['success'] == 'true') {
//         this.closedialogbox();
//         this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message, null)
//         this.showotp = false;
//         this.isenable = true;
//          this.getprofileDetails(this.currentUser.user_id)
//       } else {
//         this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message, null)
//         this.otpForm.setValue({mobile:this.otpForm.value.mobile,otp: ''})
//         this.showotp = false;
//         this.isenable = true;
//       }
//     })

//   }
//   //Resend OTP
//   Resendcode() {
//     this.otpForm.setValue({mobile:this.otpForm.value.mobile,otp: ''})
//     this.service.resend_otp_onprofile(this.currentUser.user_id).subscribe(data => {
//       if (data.data['resend_otp_onprofile']['success'] == 'true') {
//         this.alert.openAlert(data.data['resend_otp_onprofile']['message'], null)
//         this.showotp = true;
//       }
//     })
//   }
//   //Update Password
//   updatePassword() {
//     var psd = localStorage.getItem('ps');
//     var ps = atob(psd)
//     this.user_id_data = this.gs.checkLogout()
//     this.service.get_change_password_updateprofile(this.user_id_data.user_id, this.passwordForm.value.currentpassword, this.passwordForm.value.newpassword).subscribe(password => {

//       if (password.data['get_change_password_updateprofile']['success'] == 'true') {
//         this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
//         localStorage.clear();
//         this.router.navigate(['/Learner/login'])
//       } else {
//         this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
//       }
//     })
//     // this.dialog.closeAll();
//   }
//   //Update Email
//   updateEmail(mailForm) {
//     console.log(mailForm)
//     if (mailForm == false) {
//       this.alert.openAlert('Email Id is invalid', null)
//     } else {
//       this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe(data => {
//         if (data.data['update_email_onprofile']['success'] == 'true') {
//           console.log(data.data['update_email_onprofile'].message)
//           this.alert.openAlert(data.data['update_email_onprofile'].message, null);
//            this.getprofileDetails(this.currentUser.user_id)
//         } else {
//           this.alert.openAlert(data.data['update_email_onprofile'].message, null)
//         }
//       })
//     }

//   }
//   closedialogbox() {
//     this.dialog.closeAll();
//   }

//   onSelectFile(event) {
//     this.selectfile = <File>event.target.files[0];

//     if (this.selectfile && this.selectfile.type != 'image/png' && this.selectfile.type != 'image/jpeg') {
//       this.alert.openAlert('mage should be less than 1 MB and should be only Jpeg or png format', null)
//     }
//     else if (this.selectfile && this.selectfile.size > 100000) {

//       this.alert.openAlert('image should be less than 1 MB and should be only Jpeg or png format', null)
//     }
//     else {
//       if (this.selectfile) {
//         const fb = new FormData();
//         fb.append('image', this.selectfile, this.selectfile.name)
//         this.service.imageupload(fb).subscribe(data => {
//           this.urlImage = data
//           localStorage.setItem('user_img', 'https://edutechstorage.blob.core.windows.net/' + this.urlImage.path)
//           this.urlImage = localStorage.getItem('user_img')
//         })
//       }
//     }
//   }

//   uploadFile() {

//   }
//   profileUpdateData(img) {
//     var jsonData = {
//       user_id: this.currentUser.user_id,
//       profile_img: img
//     }
//     this.service.update_profile(jsonData).subscribe(data => {
//     })

//     if (this.profileDetails.gender === undefined) {
//       this.alert.openAlert('Select a value for gender', null)
//     }
//     if (this.profileDetails.is_student_or_professional === undefined) {
//       this.alert.openAlert('Select a value for profession', null)
//     }
//     if (this.profileDetails.country || this.profileDetails.state || this.profileDetails.city === undefined) {
//       this.alert.openAlert('Select values for all fields in location', null)
//     }
//   }
//   words2 = [{ value: '' }];

//   add(i) {
//     console.log(i, this.words2.length - 1, this.words2.length - 1 != i)
//     if (this.words2[i].value == "") {
//       this.alert.openAlert('Certificate link cannot be empty', null)
//     }
//     // else if (this.words2.length > 1 && this.words2.length-1 != i && _.find(this.words2, { value :this.words2[i].value})) {
//     //   this.alert.openAlert('Certificate link already present', null)
//     // } 
//     else
//       this.words2.push({ value: '' });
//     console.log(this.words2, i)
//   }

//   removenewLink(index) {
//     if (this.words2.length == 1) {
//       this.alert.openAlert("Can't delete  when there is only one row", null);
//       return false;
//     } else {
//       this.words2.splice(index, 1);
//       return true;
//     }

//   }


//   //ADDED BY MYTHREYI

//   addnewQual(index, q, qual) {
//     if (this.qual && this.qual[0] && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].qualification = this.qual[0].level_detail && this.qual[0].level_detail.length == 1 && this.qual[0].level_detail[0]._id || null;
//       this.qualification_obj[0].board_university = this.qual[0].board && this.qual[0].board.length == 1 && this.qual[0].board[0]._id || null;
//       this.qualification_obj[0].institute = this.qual[0].institute_detail && this.qual[0].institute_detail[0]._id || null;
//       this.qualification_obj[0].discipline = this.qual[0].discipline && this.qual[0].discipline.length == 1 && this.qual[0].discipline[0]._id || null;
//       this.qualification_obj[0].specification = this.qual[0].specification_detail && this.qual[0].specification_detail.length == 1 && this.qual[0].specification_detail[0]._id || null;
//       this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing || null;
//       this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage) || null;
//     }
//     if (this.qualification_obj[index].qualification == null ||
//       this.qualification_obj[index].board_university == null ||
//       this.qualification_obj[index].institute == null ||
//       this.qualification_obj[index].discipline == null ||
//       this.qualification_obj[index].percentage == null ||
//       this.qualification_obj[index].specification == null ||
//       this.qualification_obj[index].year_of_passing == null)
//       this.alert.openAlert('Please fill all details', null)
//     else {
//       this.qual.push({
//         board: '',
//         institute_detail: '',
//         discipline: '',
//         specification_detail: '',
//         year_of_passing: '',
//         percentage: '',
//         level_detail: '',
//       });
//       this.qualification_obj.push({
//         qualification: null,
//         board_university: null,
//         institute: null,
//         discipline: null,
//         percentage: null,
//         specification: null,
//         year_of_passing: null
//       })
//     }
//     return true;
//   }

//   getLevel(l, i) {
//     // console.log(l, i)
//     // if(this.qual[0].level_detail && this.qual[0].level_detail.length == 1) {
//     //   console.log(this.qualification_obj)
//     //   //workaround 2 - little complex
//     //   // this.qualification_obj.push({});
//     //   // this.qualification_obj[0].qualification = this.qual[0].level_detail[0];
//     //   //end
//     // }
//     // //workaround 1 - simple
//     this.qual[i].level_detail = []
//     this.qual[i].level_detail.push(l)
//     // console.log(this.qual)
//     // //end
//     // //workaround 2
//     // this.qualification_obj.push({});
//     // this.qualification_obj[i].qualification = l;
//     // console.log(this.qualification_obj)
//     //end

//     //woraround 3 - complex


//     if (this.qual[0].level_detail && this.qual[0].level_detail.length == 1 && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].qualification = this.qual[0].level_detail[0]._id;
//     }

//     if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].qualification == undefined) {
//         this.qualification_obj[0].qualification = l._id;
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { qualification: l._id })) {
//           this.qualification_obj[i].qualification = l._id;
//         } else {
//           this.alert.openAlert('Duplicate level', null);
//           this.qual[i].level_detail = null
//           // this.lvl.reset(null)
//         }
//       }
//       else
//         this.qualification_obj[i].qualification = l._id;
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { qualification: l._id })) {
//           this.qualification_obj[i].qualification = l._id;
//         } else {
//           this.alert.openAlert('Duplicate level', null);
//           this.qual[i].level_detail = null
//           // this.lvl.reset(null)
//         }
//       }
//       else
//         this.qualification_obj[i].qualification = l._id;
//     }

//   }
//   getboard(l, i) {
//     // if (this.qual[0].board && this.qual[0].board.length == 1) {
//     //   this.qual[0].board_university = {};
//     //   this.qual[0].board_university = this.qual[0].board[0]
//     // }
//     this.qual[i].board = []
//     this.qual[i].board.push(l)
//     // this.qual[i].board_university = {}
//     // this.qual[i].board_university = l;
//     // // console.log(this.qual)
//     //woraround 3
//     if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].board_university = this.qual[0].board[0]._id
//     }
//     if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].board_university == undefined) {
//         this.qualification_obj[0].board_university = l._id;
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { board_university: l._id })) {
//           this.qualification_obj[i].board_university = l._id;
//         } else {
//           this.alert.openAlert('Duplicate lever', null);
//           this.qual[i].board = null
//         }
//       }
//       else
//         this.qualification_obj[i].board_university = l._id;
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { board_university: l._id })) {
//           this.qualification_obj[i].board_university = l._id;
//         }
//         else {
//           this.alert.openAlert('Duplicate board', null);
//           this.qual[i].board = null
//         }
//       }
//       else
//         this.qualification_obj[i].board_university = l._id;
//     }
//   }
//   getIns(l, i) {
//     this.qual[i].institute_detail = []
//     this.qual[i].institute_detail.push(l)
//     if (this.qual[0].institute_detail && this.qual[0].institute_detail.length == 1 && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].institute = this.qual[0].institute_detail[0]._id
//     }
//     if (this.qual[0].institute_detail && this.qual[0].institute_detail.length == 1 && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].institute == undefined) {
//         this.qualification_obj[0].institute = l._id;
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { institute: l._id })) {
//           this.qualification_obj[i].institute = l._id;
//         } else {
//           this.alert.openAlert('Duplicate institute', null);
//           this.qual[i].institute_detail = null;
//         }
//       }
//       else
//         this.qualification_obj[i].institute = l._id;
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { institute: l._id })) {
//           this.qualification_obj[i].institute = l._id;
//         }
//         else {
//           this.alert.openAlert('Duplicate institute', null);
//           this.qual[i].institute_detail = null;
//         }
//       }
//       else
//         this.qualification_obj[i].institute = l._id;
//     }
//   }

//   getdis(l, i) {
//     this.qual[i].discipline = []
//     this.qual[i].discipline.push(l)
//     if (this.qual[0].discipline && this.qual[0].discipline.length == 1 && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].discipline = this.qual[0].discipline[0]._id
//     }
//     if (this.qual[0].discipline && this.qual[0].discipline.length == 1 && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].discipline == undefined) {
//         this.qualification_obj[0].discipline = l._id;
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { discipline: l._id })) {
//           this.qualification_obj[i].discipline = l._id;
//         } else {
//           this.alert.openAlert('Duplicate discipline', null);
//           this.qual[i].discipline = null
//         }
//       }
//       else
//         this.qualification_obj[i].discipline = l._id;
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { discipline: l._id })) {
//           this.qualification_obj[i].discipline = l._id;
//         } else {
//           this.alert.openAlert('Duplicate discipline', null);
//           this.qual[i].discipline = null
//         }
//       }
//       else
//         this.qualification_obj[i].discipline = l._id;
//     }
//   }
//   getspecicification(l, i) {
//     this.qual[i].specification_detail = []
//     this.qual[i].specification_detail.push(l)
//     if (this.qual[0].specification_detail && this.qual[0].specification_detail.length == 1 && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].specification = this.qual[0].specification_detail[0]._id
//     }
//     if (this.qual[0].specification_detail && this.qual[0].specification_detail.length == 1 && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].specification == undefined) {
//         this.qualification_obj[0].specification = l._id;
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { specification: l._id })) {
//           this.qualification_obj[i].specification = l._id;
//         }
//         else {
//           this.alert.openAlert('Duplicate specification', null);
//           this.qual[i].specification_detail = null
//         }
//       }
//       else
//         this.qualification_obj[i].specification = l._id;
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { specification: l._id })) {
//           this.qualification_obj[i].specification = l._id;
//         }
//         else {
//           this.alert.openAlert('Duplicate specification', null);
//           this.qual[i].specification_detail = null
//         }
//       }
//       else
//         this.qualification_obj[i].specification = l._id;
//     }
//   }

//   getYOP(item, i) {
//     if (this.qual[0].year_of_passing && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing
//     }
//     if (this.qual[0].year_of_passing && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].year_of_passing == undefined) {
//         this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { year_of_passing: item })) {
//           this.qualification_obj[i].year_of_passing = item
//         }
//         else {
//           this.qual[i].year_of_passing = null
//           this.alert.openAlert('Duplicate year', null);
//         }
//       }
//       else
//         this.qualification_obj[i].year_of_passing = item
//     } else if (this.qualification_obj[i] != undefined) {
//       if (this.qualification_obj.length > 1) {
//         if (!_.find(this.qualification_obj, { year_of_passing: item })) {
//           this.qualification_obj[i].year_of_passing = item
//         }
//         else {
//           this.qual[i].year_of_passing = null
//           this.alert.openAlert('Duplicate year', null);
//         }
//       }
//       else
//         this.qualification_obj[i].year_of_passing = item
//     }
//   }

//   getPerccent(item, i) {
//     if (this.qual[0].percentage && this.qualification_obj.length == 0) {
//       this.qualification_obj.push({});
//       this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage)
//     }
//     if (this.qual[0].percentage && this.qualification_obj.length > 0) {
//       if (this.qualification_obj[0].percentage == undefined) {
//         this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage)
//       }
//     }
//     if (this.qualification_obj[i] == undefined) {
//       this.qualification_obj.push({});
//       this.qualification_obj[i].percentage = parseFloat(item)
//     } else if (this.qualification_obj[i] != undefined) {
//       this.qualification_obj[i].percentage = parseFloat(item)
//     }
//   }
// }
//End of Sprint 1 code before- restructure




//AFTER restructure - Mythreyi

export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  mailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  cannotEdit: Boolean = true;
  languageList: any = [];
  stateValue: any = [];
  countryValue: any = [];
  cityValue: any = [];
  levelValue: any = [];
  boardValue: any = [];
  uniValue: any = [];
  institutes: any = [];
  specValue: any = [];
  disciplines: any = [];
  currentUser: any;
  userData: any = {};
  show: Boolean = false;
  showNew: Boolean = false;
  showConNew: Boolean = false;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  spicalcharacter: boolean;
  selectfile: File;
  showotp: boolean;
  isenable: boolean = true;
  timeLeft: number;
  resendtimeLeft: number = 60;
  interval;
  status: string;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'background': '#B8D0FF',
      // 'margin-top': '24px'
    }
  };
  otp: any;
  verifybutton: Boolean = false;
  resendOtp: Boolean = false;
  sendOtp: Boolean = false;
  levelCode: any;
  minutes: number;
  seconds: number;
  startYear: number;
  endYear: number;
  editpopup: Boolean = true;
  resendLabel: Boolean = false;
  constructor(
    private alert: AlertServiceService, public service: LearnerServicesService,
    private activeroute: ActivatedRoute, private dialog: MatDialog,
    private loader: Ng4LoadingSpinnerService, private formBuilder: FormBuilder,
    private router: Router, private gs: GlobalServiceService) {
    if (this.gs.checkLogout()) {
      // this.urlImage = localStorage.getItem('user_img')
      this.currentUser = this.gs.checkLogout();
      this.getprofileDetails(this.currentUser.user_id);
      if (!this.currentUser.is_profile_updated)
        this.gs.preventBackButton()
    }

    this.getAllLanguage();
    this.getAllcountry();
    this.getAllLevels();
    this.getBoardsUniv();
    this.getInstitute();
    this.getDiscipline();
    this.getSpec();
  }

  ngOnInit() {
    console.log('user',this.currentUser.is_profile_updated);
    if (this.currentUser.is_profile_updated){
      this.cannotEdit = true;
    }
    else{
      this.cannotEdit = false;
    }
    moment().year();
    this.profileForm = this.formBuilder.group({
      about_you: new FormControl("", [Validators.minLength(3), Validators.maxLength(1000)]),
      gender: new FormControl("", myGlobals.req),
      is_student_or_professional: new FormControl("", myGlobals.req),
      languages_known: [''],
      country: ['', myGlobals.req],
      state: ['', myGlobals.req],
      city_town: ['', myGlobals.req],
      progress: [],
      certificate: this.formBuilder.array([new FormControl("")]),
      qualification: this.formBuilder.array([this.createQualItem()]),
      social_media: this.formBuilder.array([this.createSocialMedia()]),
      year_of_birth: "05-08-1998",
      profile_img: [],
      user_id: [],
      created_by_ip: [],
      professional: this.formBuilder.group({
        job_role: new FormControl(""),
        organization: new FormControl(""),
        total_experience: new FormControl("")
      })
    });
    console.log('form', this.profileForm);
    console.log('stud', this.profileForm.get('is_student_or_professional'))
    const job_role = this.profileForm.get('professional.job_role');
    const org = this.profileForm.get('professional.organization');
    const totalExp = this.profileForm.get('professional.total_experience');
    this.profileForm.get('is_student_or_professional').valueChanges
      .subscribe(is_student_or_professional => {
        console.log('inside')
        if (is_student_or_professional === 'professional') {
          job_role.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z]*$/)])
          org.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z]*$/)])
          totalExp.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[0-6][0-9]{1}$/)])
        } else {
          job_role.setValidators(null)
          org.setValidators(null)
          totalExp.setValidators(null)
        }
        job_role.updateValueAndValidity();
        org.updateValueAndValidity();
        totalExp.updateValueAndValidity();
        console.log(this.profileForm.get('professional'))
      })
  }

  //to get controls for validation
  get f() {
    return this.profileForm.controls;
  }

  get c() {
    if (this.mailForm)
      return this.mailForm.controls;
    else if (this.otpForm)
      return this.otpForm.controls;
    else if (this.passwordForm)
      return this.passwordForm.controls;
  }

  // edit(){
  //   this.cannotEdit = false;
  // }

  getprofileDetails(userid) {
    this.loader.show();
    this.service.view_profile(userid).subscribe((data: any) => {
      if (data.data.view_profile.success) {
        let profileDetails = data.data.view_profile.message && data.data.view_profile.message[0].user_profile[0];
        this.userData = data.data.view_profile.message[0];
        if (profileDetails) {
          profileDetails.qualification.length > 0 && profileDetails.qualification.forEach(v => delete v.__typename);
          profileDetails.social_media.length > 0 && profileDetails.social_media.forEach(v => delete v.__typename);
          if (profileDetails.progress.includes("%"))
            profileDetails.progress = Number(profileDetails.progress.slice(0, -1));
          else
            profileDetails.progress = Number(profileDetails.progress);
          if (profileDetails.progress <= 60)
            this.gs.preventBackButton
          const qualification = this.profileForm.get('qualification') as FormArray;
          const certificate = this.profileForm.get('certificate') as FormArray;
          while (qualification.length) {
            qualification.removeAt(0);
          }
          // localStorage.setItem('user_img',this.urlImage)
          while (profileDetails.certificate && profileDetails.certificate.length > 0 && certificate.length) {
            certificate.removeAt(0);
          }
          this.profileForm.patchValue(profileDetails);
          this.getAllState();
          this.getDistrict();
          profileDetails.qualification.length > 0 && profileDetails.qualification.forEach(qual => qualification.push(this.formBuilder.group(qual)));
          profileDetails.certificate && profileDetails.certificate.length > 0 && profileDetails.certificate.forEach(certif => certificate.push(this.formBuilder.control(certif)));
          // console.log(data.data.view_profile.message[0], 'profileDetails', profileDetails)
          this.loader.hide();
        } else
          this.loader.hide();
      }
    })
  }
  yearOfpassing(index) {
    this.startYear = moment().year() - 60;
    this.endYear = moment().year() + 3;

    this.profileForm.value.qualification.forEach(element => {
      if (element.year_of_passing > this.endYear || element.year_of_passing < this.startYear) {
        this.alert.openAlert('Invalid year', null);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').reset();
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').setValidators([Validators.required, Validators.minLength(4)]);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').updateValueAndValidity();
      }
    });
  }
  updateProfile() {
    // /console.log(this.profileForm)
    if (this.profileForm.value.gender && this.profileForm.value.is_student_or_professional && this.profileForm.value.country && this.profileForm.value.state
      && this.profileForm.value.city_town)
      this.profileForm.controls['progress'].setValue(60);
    if (this.profileForm.value.progress == 60 && this.profileForm.value.certificate && this.profileForm.value.languages_known && this.profileForm.value.social_media)
      this.profileForm.controls['progress'].setValue(90);
    if (this.profileForm.value.progress == 90 && this.profileForm.value.profile_img)
      this.profileForm.controls['progress'].setValue(100);

    var ip = localStorage.getItem('Systemip');
    this.profileForm.controls['created_by_ip'].setValue(ip);
    this.profileForm.controls['user_id'].setValue(this.currentUser.user_id);

    // console.log('jsonData', this.profileForm.value)
    // if(this.profileForm.value && this.profileForm.value.qualification) {
    //   this.profileForm.value.qualification.forEach(element => {
    //     if(element.qualification!={}) {element.qualification = element.qualification._id}
    //   });
    // }
    console.log('jsonData', this.profileForm.value)

    this.service.update_profile(this.profileForm.value).subscribe(data => {
      if (data.data['update_profile']['success'] == 'true') {
        this.loader.hide();
        this.currentUser.is_profile_updated = true;
        localStorage.setItem('UserDetails', JSON.stringify(this.currentUser))
        this.alert.openAlert(data.data['update_profile'].message, null)
        this.router.navigate(['/Learner/MyCourse']);
      } else {
        this.alert.openAlert(data.data['update_profile'].message, null)
      }
    })
  }

  //Dynamic add rows
  get certificate() {
    return this.profileForm.get('certificate') as FormArray;
  }

  addCertificates(c, i) {
    var arrayT = this.certificate.value.filter(i => i === c);
    if (arrayT.length > 1) {
      this.alert.openAlert("This certificate link is already filled", null)
      this.certificate.removeAt(i);;
    }
    else if (c[0] == '')
      this.alert.openAlert("Please enter certificate", null)
    else
      this.certificate.push(this.formBuilder.control(['']));
  }

  removeCertificates(i) {
    this.certificate.removeAt(i);
  }

  createQualItem(): FormGroup {
    return this.formBuilder.group({
      qualification: ['', myGlobals.req],
      institute: ['', myGlobals.req],
      board_university: ['', myGlobals.req],
      discipline: ['', myGlobals.req],
      specification: ['', myGlobals.req],
      year_of_passing: ['', myGlobals.req],
      percentage: ['', myGlobals.req]
    });
  }

  get qualification() {
    return this.profileForm.get('qualification') as FormArray;
  }

  addQualification() {
    this.qualification.push(this.createQualItem());
  }

  removeQualification(i) {
    this.qualification.removeAt(i);;
  }

  createSocialMedia(): FormGroup {
    return this.formBuilder.group({
      link: [''],
      img: [''],
    });
  }

  get social_media() {
    return this.profileForm.get('social_media') as FormArray;
  }

  addSocialMedia() {
    this.social_media.push(this.createSocialMedia());
  }

  removeSocialMedia(i) {
    this.social_media.removeAt(i);;
  }
  // ENd of Dynamic Add rows

  getAllLanguage() {
    this.service.get_language_details().subscribe(language => {
      this.languageList = language.data['get_language_details'].data;
    })
  }

  //Country List
  getAllcountry() {
    this.service.get_country_details().subscribe(countryDetails => {
      this.countryValue = countryDetails.data['get_country_details'].data.filter(cnt =>
        cnt.countryname === 'India'
      );
    })
  }
  //State List
  getAllState() {
    this.service.get_state_details(this.profileForm.value.country).subscribe(stateDetails => {
      this.stateValue = stateDetails.data['get_state_details'].data;
      this.getDistrict();
      if (this.stateValue == null)
        this.alert.openAlert(stateDetails.data['get_state_details'].message, null);
    })
  }

  getDistrict() {
    this.service.get_district_details(this.profileForm.value.country, this.profileForm.value.state).subscribe(city => {
      this.cityValue = city.data['get_district_details'].data;
    })
  }

  getAllLevels() {
    this.service.get_qualification_details().subscribe(level => {
      this.levelValue = level.data['get_qualification_details'].data;
      this.levelValue.forEach(element => {
        element.allowed = 'Y';
      });
    })
  }

  getBoardsUniv() {
    // this.service.get_institute_details().subscribe(institute => {
    //   this.boardValue = institute.data['get_institute_details'].data;
    //   this.uniValue= institute.data['get_institute_details'].data;
    // })
    this.service.get_board_university_details().subscribe(boards => {
      this.boardValue = boards.data['get_board_university_details'].data['board'];
      this.uniValue = boards.data['get_board_university_details'].data['university'];

    })
  }

  getInstitute() {
    this.service.get_institute_details().subscribe(institute => {
      this.institutes = institute.data['get_institute_details'].data;
    })
  }

  getDiscipline() {
    this.service.get_discipline_details().subscribe(discipline => {
      this.disciplines = discipline.data['get_discipline_details'].data;
    })
  }

  getSpec() {
    // this.service.get_institute_details().subscribe(institute => {

    //   this.specValue= institute.data['get_institute_details'].data;
    // })
    this.service.get_specification_details().subscribe(spec => {
      this.specValue = spec.data['get_specification_details'].data;
    })
  }

  //All dialogs
  closedialogbox() {
    this.dialog.closeAll();
  }

  editEmail(templateRef: TemplateRef<any>) {
    this.mailForm = this.formBuilder.group({
      mailid: new FormControl('', myGlobals.emailVal)
    });
    this.dialog.open(templateRef);
  }

  updateEmail(mailForm) {
    if (mailForm == false) {
      Swal.fire('Email Id is invalid')
    } else {
      this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe(data => {
        if (data.data['update_email_onprofile']['success'] == 'true') {
          Swal.fire(data.data['update_email_onprofile'].message);
          this.getprofileDetails(this.currentUser.user_id);
          this.mailForm.reset();
        } else {
          Swal.fire(data.data['update_email_onprofile'].message)
        }
      })
    }

  }

  editmobno(mobRef: TemplateRef<any>) {
    this.isenable = true;
    this.showotp = false;
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      otp: new FormControl("", []),
    })
    this.dialog.open(mobRef);
  }

  editPassword(passRef: TemplateRef<any>) {
    this.dialog.open(passRef)
    this.passwordForm = this.formBuilder.group({
      currentpassword: new FormControl('', myGlobals.passwordVal),
      newpassword: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', myGlobals.passwordVal),
    }, {
      validator: MustMatch('newpassword', 'confirmpassword'),
    });
    ;
  }

  otpverification() {
    this.loader.show();
    this.resendOtp = false;
    this.sendOtp = true;
    this.resendLabel = true;
    this.service.update_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile).subscribe(data => {
      if (data.data['update_mobile_onprofile']['success'] == 'true') {
        this.loader.hide();
        // this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
        Swal.fire(data.data['update_mobile_onprofile'].message);
        this.isenable = false;
        this.showotp = true;
        //Timer
        this.timeLeft = 60;
        // if(this.timeLeft > 60){
        this.interval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
            this.minutes = Math.floor(this.timeLeft / 60);
            this.seconds = this.timeLeft - this.minutes * 60;

          } else {
            // this.minutes = 0;
            this.verifybutton = true;
          }
        }, 1000)

      } else
        // this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
        Swal.fire(data.data['update_mobile_onprofile'].message);
    })
  }

  onOtpChange(otp) {
    // this.otpForm.value.otp = otp;
    this.otp = otp;
  }

  otpverify() {
    this.service.update_verifyotp_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile, this.otp).subscribe(data => {
      if (data.data['update_verifyotp_mobile_onprofile']['success'] == 'true') {
        this.closedialogbox();
        Swal.fire(data.data['update_verifyotp_mobile_onprofile'].message)
        this.showotp = false;
        this.isenable = true;
        this.getprofileDetails(this.currentUser.user_id)
      } else {
        Swal.fire(data.data['update_verifyotp_mobile_onprofile'].message)
        this.otpForm.setValue({ mobile: this.otpForm.value.mobile, otp: '' })
        this.showotp = false;
        this.isenable = true;
      }
    })
  }

  Resendcode() {
    this.resendOtp = true;
    this.sendOtp = false;
    this.otpForm.setValue({ mobile: this.otpForm.value.mobile, otp: '' })
    this.service.resend_otp_onprofile(this.currentUser.user_id).subscribe(data => {
      if (data.data['resend_otp_onprofile']['success'] == 'true') {
        Swal.fire(data.data['resend_otp_onprofile']['message'])
        this.showotp = true;
        this.interval = setInterval(() => {
          if (this.resendtimeLeft > 0) {
            this.resendtimeLeft--;
            this.minutes = Math.floor(this.resendtimeLeft / 60);
            this.seconds = this.resendtimeLeft - this.minutes * 60;

          } else {
            this.minutes = 0;
            this.verifybutton = true;
          }
        }, 1000)
      }
    })
  }

  updatePassword() {
    this.service.get_change_password_updateprofile(this.currentUser.user_id, this.passwordForm.value.currentpassword, this.passwordForm.value.newpassword).subscribe(password => {
      if (password.data['get_change_password_updateprofile']['success'] == 'true') {
        Swal.fire(password.data['get_change_password_updateprofile'].message);
        localStorage.clear();
        this.dialog.closeAll();
        this.router.navigate(['/Learner/login'])
      } else
        Swal.fire(password.data['get_change_password_updateprofile'].message);
    })
  }

  onSelectFile(event) {
    this.selectfile = <File>event.target.files[0];
    if (this.selectfile && this.selectfile.type != 'image/png' && this.selectfile.type != 'image/jpeg') {
      this.alert.openAlert('mage should be less than 1 MB and should be only Jpeg or png format', null)
    }
    else if (this.selectfile && this.selectfile.size > 100000) {
      this.alert.openAlert('image should be less than 1 MB and should be only Jpeg or png format', null)
    }
    else {
      if (this.selectfile) {
        const fb = new FormData();
        fb.append('image', this.selectfile, this.selectfile.name)
        this.service.imageupload(fb).subscribe(data => {
          this.profileForm.controls['profile_img'].setValue(data);
          localStorage.setItem('user_img', 'https://edutechstorage.blob.core.windows.net/' + this.profileForm.value.profile_img.path)
          this.profileForm.controls['profile_img'].setValue(localStorage.getItem('user_img'))
        })
      }
    }
  }

  change(event) {
    if (event.target.value.match(myGlobals.lowerCaseLetters))
      this.lowercase = true;
    else
      this.lowercase = false;
    if (event.target.value.match(myGlobals.upperCaseLetters))
      this.uppercase = true;
    else
      this.uppercase = false;
    if (event.target.value.match(myGlobals.numbers))
      this.number = true;
    else
      this.number = false;
    if (event.target.value.match(myGlobals.specialchar))
      this.spicalcharacter = true;
    else
      this.spicalcharacter = false;
  }
  //Percentage
  //   public setTwoNumberDecimal($event) {
  //     $event.target.value = parseFloat($event.target.value).toFixed(2);
  // }


  duplicateValueCheck = []
  changed(value, index) {
    this.duplicateValueCheck[index] = value;
    this.checkFunction();
  }

  checkFunction() {
    this.levelValue.forEach((type) => {
      if (type.level_code == '10' || type.level_code == '12') {
        let selected = this.duplicateValueCheck.includes(type._id);
        if (selected) type.allowed = 'N'
        else type.allowed = 'Y'
      }
    });
  }

  checkSpec(a, spec, quali, level) {
    // console.log(a, b, c, d);
    quali = this.profileForm.get('qualification');
    const specification = quali.controls[spec].controls.specification;
    if (level.level_code !== '10' && level.level_code !== '12')
      specification.setValidators([Validators.required]);
    else
      specification.setValidators(null)
    specification.updateValueAndValidity();
    console.log(specification)
  }
  formatPercentage(index){
    let val = this.profileForm.get('qualification').get(String(index)).get('percentage').value;
    let per = parseFloat(val).toFixed(2);
    this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
  }
}
