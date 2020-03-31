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


  //my3
  qualification_obj: any = [];
  //
  mailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  enabel: Boolean = true
  public qual: any[] = [{

    board: [],
    institute: [],
    discipline: [],
    specification_detail: [],
    year_of_passing: [],
    percentage: [],
    level_detail: [],
  }];
  public links: any[] = [{
    certificate: ''
  }];

  //Declarations
  selectedDay: any;
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
  isenable: boolean = true;
  userData: any = {};
  qualification: any = {};
  showdeletedicon: boolean = true;
  uniValue: void;
  url: String = '';
  // countryDetails: any = [];
  selectfile = null;
  urlImage: any
  socialMedia: {}
  certificate: any = []
  profileDetailCheck: boolean = false;
  progress: number = 0;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  showNewButton: Boolean = false;
  showNewEyes: Boolean = false;
  showconButton: Boolean = false;
  showconEyes: Boolean = false;
  prof: any = {}
    ;
  constructor(
    private alert: AlertServiceService,
    public service: LearnerServicesService,
    private activeroute: ActivatedRoute,
    private dialog: MatDialog,
    private loader: Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.enabel = false

  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  shownewPassword() {
    this.showNewButton = !this.showNewButton;
    this.showNewEyes = !this.showNewEyes;
  }
  showconPassword() {
    this.showconButton = !this.showconButton;
    this.showconEyes = !this.showconEyes;
  }


  ngOnInit() {
    if (localStorage.getItem('UserDetails')) {


      this.activeroute.queryParams.subscribe(params => {
        if (params["status"]) {
          this.alert.openAlert(params['msg'], null);
        }
      });
      this.urlImage = localStorage.getItem('user_img')
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




    } else {
      this.router.navigate(['/Learner/login'])
    }

  }

  enableedit() {
    this.showdeletedicon = false;
  }
  get f() {
    if (this.mailForm) {
      return this.mailForm.controls;
    } else if (this.otpForm) {
      return this.otpForm.controls;
    } else if (this.passwordForm) {
      return this.passwordForm.controls;
    }

  }
  //Country List
  getAllcountry() {
    this.service.get_country_details().subscribe(countryDetails => {
      this.countryValue = countryDetails.data['get_country_details'].data;
    })
  }
  //State List
  getAllState(country) {
    let countryId = country.value;
    this.service.get_state_details(countryId).subscribe(stateDetails => {
      this.stateValue = stateDetails.data['get_state_details'].data;
      if (this.stateValue == null) {
        this.alert.openAlert(stateDetails.data['get_state_details'].message, null);
      }
    })
  }

  getAllLevels() {
    this.service.get_qualification_details().subscribe(level => {
      this.levelValue = level.data['get_qualification_details'].data;
      if (this.levelValue == null) {
        this.alert.openAlert(level.data['get_qualification_details'].message, null);
      }
    })
  }
  getBoardsUniv() {
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

  getDistrict(city) {
    let stateId = city.value;
    this.service.get_district_details(this.countryId, stateId).subscribe(city => {
      this.cityValue = city.data['get_district_details'].data;
    })
  }
  getDiscipline() {
    this.service.get_discipline_details().subscribe(discipline => {
      this.dis = discipline.data['get_discipline_details'].data;
      console.log(this.dis)
    })
  }
  getSpec() {
    this.service.get_specification_details().subscribe(spec => {
      this.specValue = spec.data['get_specification_details'].data;
    })
  }
  getAllLanguage() {
    this.service.get_language_details().subscribe(language => {
      this.languageList = language.data['get_language_details'].data;
    })
  }

  // View Profile
  getprofileDetails(userid) {
    console.log('inside getprofile')
    this.loader.show();
    this.service.view_profile(userid).subscribe(data => {
      if (data.data['view_profile']) {
        this.userData = data.data['view_profile'].message[0];
        // this.profileDetails.about_you = this.userData.user_profile[0].about_you;gender
        this.loader.hide();
        // this.profileDetails.about_you 
        console.log(this.userData)
        // if(this.profileDetails){
        this.profileDetails = this.userData.user_profile[0];
        this.urlImage = this.userData.user_profile[0].profile_img
        this.getAllState(this.profileDetails.country);
        this.getDistrict(this.profileDetails.state)
        //added mythreyi
        var p = this.userData.progress.slice(0, -1);
        this.progress = Number(p);
        this.qual = this.userData.qualification;

        // this.words2 = this.userData.user_profile[0].certificate

        this.words2 = this.userData.user_profile[0].certificate.map(s => ({
          value: s
        }));
        console.log(this.words2)
        this.qualification_obj = this.userData.user_profile[0].qualification.map(s => ({
          qualification: s.qualification,
          institute: s.institute,
          board_university: s.board_university,
          discipline: s.discipline,
          specification: s.specification,
          year_of_passing: s.year_of_passing,
          percentage: s.percentage
        }));

        this.prof = this.userData.user_profile[0].professional
        //end - mythreyi

        // if(this.profileDetails)

        // console.log( this.profileDetails,' this.profileDetails')
        // console.log( this.qualification,' this.data')
        // }
      }
    })
  }
  // addnewQual(index) {
  //   console.log(index,q)
  //   this.qual.push({
  //     qualification: '',
  //     board_university: '',
  //     institute: '',
  //     discipline: '',
  //     specification: '',
  //     year_of_passing: '',
  //     percentage: ''
  //   });
  //   return true;
  // }


  getAllLEvel(e) {
    console.log(e)
  }
  removelastQual(index) {
    if (this.qual.length == 1) {
      this.alert.openAlert("Can't delete the row when there is only one row", null);
      return false;
    } else {
      this.qual.splice(index, 1);
      return true;
    }
  }

  addnewLink() {
    this.links.push({
      certificate: ''
    })
    // return true;
  }

  removenewLink(index) {
    if (this.words2.length == 1) {
      this.alert.openAlert("Can't delete  when there is only one row", null);
      return false;
    } else {
      this.words2.splice(index, 1);
      return true;
    }

  }

  addcertificate(item, i) {
    // this.words2.push(item);
    console.log(this.words2)
    if (item != null)
      this.words2.splice(i, 0, item)
    console.log(this.words2)
  }
  updateProfile(language, country, state, city, social, about_you, exp) {
    // role = 'aaaasd';
    // console.log(this.qual);
    console.log(this.profileDetails, exp,this.prof)
    console.log(this.words2)
    var certificate = this.words2.map(function (obj) {
      return obj.value;
    });
    
    debugger
    if (this.profileDetails.is_student_or_professional == 'student') {
      if (this.profileDetails.gender && this.profileDetails.country &&
        this.profileDetails.state && city && this.qualification_obj.qualification != '' &&
        this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
        && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
        this.profileDetailCheck = true;
      } else {
        this.loader.hide();
        this.profileDetailCheck = false;
        this.alert.openAlert('Please fill all required fields', null);
      }
    } else if (this.profileDetails.is_student_or_professional == 'professional') {
      // return false;
      if (this.profileDetails.gender && this.prof.total_experience && this.prof.organization &&
        this.prof.job_role && this.profileDetails.country &&
        this.profileDetails.state && city && this.qualification_obj[0].qualification != '' &&
        this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
        && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
        this.profileDetailCheck = true;

      } else {
        this.loader.hide();
        this.profileDetailCheck = false;
        this.alert.openAlert('Please fill all required fields', null);
      }
    } else {
      if (this.profileDetails.gender && this.profileDetails.is_student_or_professional
        && this.profileDetails.country &&
        this.profileDetails.state && this.profileDetails.city && this.qual[0].qualification != '' &&
        this.qualification_obj[0].board_university != '' && this.qualification_obj[0].institute != '' && this.qualification_obj[0].discipline != ''
        && this.qualification_obj[0].specification != '' && this.qualification_obj[0].year_of_passing != '' && this.qualification_obj[0].percentage != '') {
        this.profileDetailCheck = true;
      } else {
        this.loader.hide();
        this.profileDetailCheck = false;
        this.alert.openAlert('Please fill all required fields', null);
      }
    }
    if (this.profileDetailCheck === true) {
      console.log(social)
      if(social) {
        var social_media = social.map(s => ({
          link: s.link,
          img: s.img
        }));
      }
  
      var progress;
      // if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
      //   country != undefined && this.qualification_obj != undefined && localStorage.getItem('user_img') == undefined &&
      //   localStorage.getItem('user_img') == null) {
      //   progress = '60%'
      // } else if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && 
      //   country != undefined && this.qual != undefined && localStorage.getItem('user_img') && language == undefined && this.words2.length == 1 && social.length == 1) {
      //   progress = '90%'
      // } else if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && country != undefined && this.qual != undefined
      //   && localStorage.getItem('user_img') && language != undefined && this.words2 != undefined && social != undefined) {
      //   progress = '100%'
      // }
      if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
        country != undefined && this.qualification_obj != undefined) {
        progress = '60%'
      } if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined &&
        country != undefined && this.qual != undefined && localStorage.getItem('user_img') && language == undefined && this.words2.length == 1 && social.length == 1) {
        progress = '90%'
      } if (this.profileDetails.gender != undefined && this.profileDetails.is_student_or_professional != undefined && country != undefined && this.qual != undefined
        && localStorage.getItem('user_img') && language != undefined && this.words2 != undefined && social != undefined) {
        progress = '100%'
      }

  
      // for (const iterator of this.words2) {
      //     this.certificate.push(iterator.value)
      //   } 
      //  for (const iterator of this.words2) {
      //         this.certificate.push(iterator)
      //       } 
      var jsonData = {
        user_id: this.currentUser.user_id,
        gender: this.profileDetails.gender,
        year_of_birth: "05-08-1998",
        profile_img: localStorage.getItem('user_img'),
        is_student_or_professional: this.profileDetails.is_student_or_professional,
        languages_known: language,
        country: country,
        state: state,
        city_town: city,
        qualification: this.qualification_obj,
        certificate: certificate,
        social_media: social_media,
        about_you: about_you,
        professional: this.prof,
        progress: progress,
        created_by_ip: localStorage.getItem('Systemip')
      }
      console.log(jsonData)
      // debugger
      this.loader.show();
      this.service.update_profile(jsonData).subscribe(data => {
        if (data.data['update_profile']['success'] == 'true') {
          this.loader.hide();
          this.alert.openAlert(data.data['update_profile'].message, null)
          this.showdeletedicon = true;

          console.log(data.data['update_profile'])

        } else {
          this.alert.openAlert(data.data['update_profile'].message, null)
        }
      })
    }

  }

  editEmail(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
    this.mailForm = this.formBuilder.group({
      mailid: new FormControl('', myGlobals.emailVal)
    });
  }

  editmobno(mobRef: TemplateRef<any>) {
    this.dialog.open(mobRef);
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      otp1: new FormControl("", []),
      otp2: new FormControl("", []),
      otp3: new FormControl("", []),
      otp4: new FormControl("", []),
    })
  }
  editPassword(passRef: TemplateRef<any>) {
    this.dialog.open(passRef);
    this.passwordForm = this.formBuilder.group({
      currentpassword: new FormControl('', myGlobals.passwordVal),
      newpassword: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', myGlobals.passwordVal),
    });
  }
  //Update Mobile
  otpverification() {
    this.loader.show();
    this.service.update_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile).subscribe(data => {

      if (data.data['update_mobile_onprofile']['success'] == 'true') {
        this.loader.hide();
        this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
        this.isenable = false;
        this.showotp = true;
      } else {
        this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
      }
    })

  }
  //Verify OTP
  otpverify() {
    this.otp = this.otpForm.value.otp1 + this.otpForm.value.otp2 + this.otpForm.value.otp3 + this.otpForm.value.otp4
    this.service.update_verifyotp_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile, this.otp).subscribe(data => {

      if (data.data['update_verifyotp_mobile_onprofile']['success'] == 'true') {
        this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message, null)
        this.showotp = true;
      } else {
        this.alert.openAlert(data.data['update_verifyotp_mobile_onprofile'].message, null)
      }
    })
    this.dialog.closeAll();
  }
  Resendcode() {
    this.loader.show();
    this.service.submit_otp(this.currentUser.user_id, 'this.currentUser._id', this.otpForm.value.mobile, this.currentUser.email).subscribe(data => {
      this.otp = '';
      if (data.data['user_registration_mobile_otp_send']['success'] == 'true') {
        this.loader.hide();
        this.alert.openAlert(data.data['user_registration_mobile_otp_send']['message'], null)
        this.showotp = true;
      }
    })
  }
  //Update Password
  updatePassword() {
    var psd = localStorage.getItem('ps');
    var ps = atob(psd)
    this.service.get_change_password_updateprofile(this.currentUser.username, ps, this.passwordForm.value.newpassword).subscribe(password => {

      if (password.data['get_change_password_updateprofile']['success'] == 'true') {
        this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
      } else {
        this.alert.openAlert(password.data['get_change_password_updateprofile'].message, null);
      }
    })
    this.dialog.closeAll();
  }
  //Update Email
  updateEmail() {
    this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe(data => {
      if (data.data['update_email_onprofile']['success'] == 'true') {
        this.alert.openAlert(data.data['update_email_onprofile'].message, null);
      } else {
        this.alert.openAlert(data.data['update_email_onprofile'].message, null)
      }
    })
    this.dialog.closeAll();
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

          this.urlImage = data
          localStorage.setItem('user_img', 'https://rajeshkumarranjan.blob.core.windows.net/' + this.urlImage.path)
          //this.profileUpdateData(this.urlImage.url)
        })
      }
    }
  }
  profileUpdateData(img) {
    var jsonData = {
      user_id: this.currentUser.user_id,
      profile_img: img
    }
    this.service.update_profile(jsonData).subscribe(data => {
    })

    if (this.profileDetails.gender === undefined) {
      this.alert.openAlert('Select a value for gender', null)
    }
    if (this.profileDetails.is_student_or_professional === undefined) {
      this.alert.openAlert('Select a value for profession', null)
    }
    if (this.profileDetails.country || this.profileDetails.state || this.profileDetails.city === undefined) {
      this.alert.openAlert('Select values for all fields in location', null)
    }
  }
  words2 = [{ value: '' }];

  add() {
    this.words2.push({ value: '' });
  }




  //ADDED BY MYTHREYI

  addnewQual(index, q, qual) {
    console.log(this.qualification_obj, this.qual)
    if (this.qual && this.qual[0] && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      console.log(this.qualification_obj)
      this.qualification_obj[0].qualification = this.qual[0].level_detail && this.qual[0].level_detail.length == 1 && this.qual[0].level_detail[0]._id || null;
      this.qualification_obj[0].board_university = this.qual[0].board && this.qual[0].board.length == 1 && this.qual[0].board[0]._id || null;
      this.qualification_obj[0].institute = this.qual[0].institute_detail && this.qual[0].institute_detail[0]._id || null;
      this.qualification_obj[0].discipline = this.qual[0].discipline && this.qual[0].discipline[0]._id || null;
      this.qualification_obj[0].specification = this.qual[0].specification_detail && this.qual[0].specification_detail[0]._id || null;
      this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing || null;
      this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage) || null;
      // console.log(this.qualification_obj)
    }
    // console.log(index, q, qual, this.qual)
    this.qual.push({
      board: '',
      institute_detail: '',
      discipline: '',
      specification_detail: '',
      year_of_passing: '',
      percentage: '',
      level_detail: '',
    });
    return true;
  }

  getLevel(l, i) {
    // console.log(l, i)
    // if(this.qual[0].level_detail && this.qual[0].level_detail.length == 1) {
    //   console.log(this.qualification_obj)
    //   //workaround 2 - little complex
    //   // this.qualification_obj.push({});
    //   // this.qualification_obj[0].qualification = this.qual[0].level_detail[0];
    //   //end
    // }
    // //workaround 1 - simple
    // // this.qual[i].level_detail = []
    // // this.qual[i].level_detail.push(l)
    // //end
    // //workaround 2
    // this.qualification_obj.push({});
    // this.qualification_obj[i].qualification = l;
    // console.log(this.qualification_obj)
    //end

    //woraround 3 - complex
    if (this.qual[0].level_detail && this.qual[0].level_detail.length == 1 && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].qualification = this.qual[0].level_detail[0]._id;
      // console.log(this.qualification_obj)
    }

    if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].qualification == undefined) {
        this.qualification_obj[0].qualification = l._id;
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].qualification = l._id;
      console.log(this.qualification_obj)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].qualification = l._id;
      console.log(this.qualification_obj)
    }

  }
  getboard(l, i) {
    // if (this.qual[0].board && this.qual[0].board.length == 1) {
    //   this.qual[0].board_university = {};
    //   this.qual[0].board_university = this.qual[0].board[0]
    // }
    // // this.qual[i].board = []
    // // this.qual[i].board.push(l)
    // this.qual[i].board_university = {}
    // this.qual[i].board_university = l;
    // // console.log(this.qual)
    //woraround 3
    if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].board_university = this.qual[0].board[0]._id
      // console.log(this.qualification_obj)
    }
    if (this.qual[0].board && this.qual[0].board.length == 1 && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].board_university == undefined) {
        this.qualification_obj[0].board_university = l._id;
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].board_university = l._id;
      // console.log(this.qualification_obj)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].board_university = l._id;
      // console.log(this.qualification_obj)
    }
  }

  getIns(l, i) {
    if (this.qual[0].institute_detail && this.qual[0].institute_detail.length == 1 && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].institute = this.qual[0].institute_detail[0]._id
      // console.log(this.qualification_obj)
    }
    if (this.qual[0].institute_detail && this.qual[0].institute_detail.length == 1 && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].institute == undefined) {
        this.qualification_obj[0].institute = l._id;
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].institute = l._id;
      // console.log(this.qualification_obj)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].institute = l._id;
      // console.log(this.qualification_obj)
    }
  }

  getdis(l, i) {
    if (this.qual[0].discipline && this.qual[0].discipline.length == 1 && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].discipline = this.qual[0].discipline[0]._id
      // console.log(this.qualification_obj)
    }
    if (this.qual[0].discipline && this.qual[0].discipline.length == 1 && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].discipline == undefined) {
        this.qualification_obj[0].discipline = l._id;
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].discipline = l._id;
      // console.log(this.qualification_obj)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].discipline = l._id;
      // console.log(this.qualification_obj)
    }
  }
  getspecicification(l, i) {
    if (this.qual[0].specification_detail && this.qual[0].specification_detail.length == 1 && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].specification = this.qual[0].specification_detail[0]._id
      // console.log(this.qualification_obj)
    }
    if (this.qual[0].specification_detail && this.qual[0].specification_detail.length == 1 && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].specification == undefined) {
        this.qualification_obj[0].specification = l._id;
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].specification = l._id;
      // console.log(this.qualification_obj)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].specification = l._id;
      // console.log(this.qualification_obj)
    }
  }

  getYOP(item, i) {
    if (this.qual[0].year_of_passing && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing
    }
    if (this.qual[0].year_of_passing && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].year_of_passing == undefined) {
        this.qualification_obj[0].year_of_passing = this.qual[0].year_of_passing
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].year_of_passing = item
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].year_of_passing = item
    }
  }

  getPerccent(item, i) {
    if (this.qual[0].percentage && this.qualification_obj.length == 0) {
      this.qualification_obj.push({});
      this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage)
    }
    if (this.qual[0].percentage && this.qualification_obj.length > 0) {
      if (this.qualification_obj[0].percentage == undefined) {
        this.qualification_obj[0].percentage = parseFloat(this.qual[0].percentage)
      }
    }
    if (this.qualification_obj[i] == undefined) {
      this.qualification_obj.push({});
      this.qualification_obj[i].percentage = parseFloat(item)
    } else if (this.qualification_obj[i] != undefined) {
      this.qualification_obj[i].percentage = parseFloat(item)
    }
  }


  test() {
    console.log(this.qualification_obj)

  }
}
