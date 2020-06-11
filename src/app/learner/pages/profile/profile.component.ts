import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, NgModel, Validators, FormArray } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { Certificate } from 'crypto';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import * as _ from 'lodash';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

// AFTER restructure - Mythreyi

export class ProfileComponent implements OnInit {

  enableMobileEdit;

  constructor(
    private alert: AlertServiceService, public service: LearnerServicesService,
    private activeroute: ActivatedRoute, private dialog: MatDialog, private httpC: HttpClient,
    private loader: Ng4LoadingSpinnerService, private formBuilder: FormBuilder,
    private router: Router, private gs: GlobalServiceService) {
    // const x = localStorage.getItem('OTPFeature') || false;
    // console.log(x);
    this.enableMobileEdit = false;
    if (this.gs.checkLogout()) {
      // this.urlImage = localStorage.getItem('user_img')
      this.currentUser = this.gs.checkLogout();
      this.getprofileDetails(this.currentUser.user_id);
      if (!this.currentUser.is_profile_updated) {
        this.gs.preventBackButton();
      }
    }

    this.getAllLanguage();
    this.getAllcountry();
    this.getAllLevels();
    this.getBoardsUniv();
    this.getInstitute();
    this.getDiscipline();
    this.getSpec();
  }

  // to get controls for validation
  get f() {
    return this.profileForm.controls;
  }

  get c() {
    return this.passwordForm.controls;
  }

  get a() {
    return this.otpForm.controls;
  }

  get b() {
    return this.mailForm.controls;
  }

  // Dynamic add rows
  get certificate() {
    return this.profileForm.get('certificate') as FormArray;
  }

  get qualification() {
    return this.profileForm.get('qualification') as FormArray;
  }

  get social_media() {
    return this.profileForm.get('social_media') as FormArray;
  }

  profileForm: FormGroup;
  mailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  cannotEdit = true;
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
  show = false;
  showNew = false;
  showConNew = false;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  checkdedTPO = false;
  spicalcharacter: boolean;
  selectfile: File;
  showotp: boolean;
  isenable = true;
  timeLeft: number;
  resendtimeLeft = 60;
  interval;
  status: string;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
      background: '#B8D0FF',
      // 'margin-top': '24px'
    }
  };
  otp: any;
  verifybutton = false;
  levelCode: any;
  minutes: number;
  seconds: number;
  startYear: number;
  endYear: number;
  editpopup = true;
  resendLabel = false;
  duplicateValueCheck = [];
  selectedinstitute = false;
  ngOnInit() {
    if (this.currentUser.is_profile_updated) {
      this.cannotEdit = true;
    } else {
      this.cannotEdit = false;
    }
    // moment().year();
    this.profileForm = this.formBuilder.group({
      about_you: new FormControl('', [Validators.minLength(3), Validators.maxLength(1000)]),
      // gender: new FormControl('', myGlobals.req),
      // is_student_or_professional: new FormControl('', myGlobals.req),
      gender: new FormControl(''),
      is_student_or_professional: new FormControl(''),
      languages_known: [''],
      addressline1: ['', myGlobals.req],
      addressline2: [''],
      pincode: ['', myGlobals.pincode],
      country: ['', myGlobals.req],
      state: ['', myGlobals.req],
      city_town: ['', myGlobals.req],
      neft: new FormControl(''),
      iAgree: new FormControl(true, []),
      throughTPO: new FormControl(false, []),
      progress: [],
      certificate: this.formBuilder.array([new FormControl('')]),
      qualification: this.formBuilder.array([this.createQualItem()]),
      social_media: this.formBuilder.array([this.createSocialMedia()]),
      year_of_birth: '05-08-1998',
      profile_img: [],
      user_id: [],
      created_by_ip: [],
      professional: this.formBuilder.group({
        job_role: new FormControl(''),
        organization: new FormControl(''),
        total_experience: new FormControl('')
      })
    });

    // for (let i = 0; i < 2; i++) {
    //   debugger;
    //   // if (this.qualification.controls.length < 3) {
    //   // }
    // }



    const job_role = this.profileForm.get('professional.job_role');
    const org = this.profileForm.get('professional.organization');
    const totalExp = this.profileForm.get('professional.total_experience');
    this.profileForm.get('is_student_or_professional').valueChanges
      .subscribe((val: any) => {
        if (val === 'professional') {
          job_role.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z a-z]*$/)]);
          org.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z a-z]*$/)]);
          totalExp.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(3),
            // Validators.pattern(/^[0-6][0-9]{1}$/)
          ]);
        } else {
          job_role.setValidators(null);
          org.setValidators(null);
          totalExp.setValidators(null);
        }
        job_role.updateValueAndValidity();
        org.updateValueAndValidity();
        totalExp.updateValueAndValidity();
      });

    const neft = this.profileForm.get('neft');
    this.profileForm.get('throughTPO').valueChanges
      .subscribe((val: any) => {
        console.log(val);
        if (val === true) {
          neft.setValidators([Validators.pattern(/^[0-9]*$/),
          Validators.minLength(16), Validators.maxLength(22)
          ]);
        } else {
          neft.setValidators([Validators.required, Validators.pattern(/^[0-9]*$/),
          Validators.minLength(16), Validators.maxLength(22)
          ]);
        }
        neft.updateValueAndValidity();
      });

  }

  // edit(){
  //   this.cannotEdit = false;
  // }

  getprofileDetails(userid) {
    this.loader.show();
    this.service.view_profile(userid).subscribe((data: any) => {
      if (data.data.view_profile.success) {
        const profileDetails = data.data.view_profile.message && data.data.view_profile.message[0].user_profile[0];
        this.userData = data.data.view_profile.message[0];
        if (profileDetails) {
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach(v => delete v.__typename);
          }
          if (profileDetails.social_media.length > 0) {
            profileDetails.social_media.forEach(v => delete v.__typename);
          }
          if (profileDetails.progress.includes('%')) {
            profileDetails.progress = Number(profileDetails.progress.slice(0, -1));
          } else {
            profileDetails.progress = Number(profileDetails.progress);
          }
          profileDetails.iAgree = profileDetails.iAgree == null ? true : profileDetails.iAgree;
          if (profileDetails.progress <= 60) {
            this.gs.preventBackButton();
          }
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
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach(qual =>
              qualification.push(this.formBuilder.group(qual)));
          }
          if (profileDetails.certificate && profileDetails.certificate.length > 0) {
            profileDetails.certificate.forEach(certif =>
              certificate.push(this.formBuilder.control(certif)));
          }
          this.loader.hide();
        } else {
          this.loader.hide();
        }
      }
    });
  }

  updateProfile() {
    // changed for Koushalys - 10th june
    if (this.profileForm.value.qualification[0].board_university !== '' && this.profileForm.value.qualification[0].qualification !== '' &&
      this.profileForm.value.qualification[0].discipline !== '' && this.profileForm.value.qualification[0].institute !== '' &&
      this.profileForm.value.qualification[0].percentage !== '' && this.profileForm.value.qualification[0].year_of_passing !== '') {
      if (this.profileForm.value.addressline1 && this.profileForm.value.addressline2 &&
        this.profileForm.value.country && this.profileForm.value.state && this.profileForm.value.neft !== ''
        && this.profileForm.value.city_town && this.profileForm.value.iAgree) {
        this.profileForm.controls.progress.setValue(80);
      }
      if (this.profileForm.value.progress === 80 && this.profileForm.value.certificate.length > 0 &&
        this.profileForm.value.certificate[0] !== '' && this.profileForm.value.social_media[0].link !== '') {
        this.profileForm.controls.progress.setValue(90);
      }
      if (this.profileForm.value.progress === 90 && this.profileForm.value.profile_img) {
        this.profileForm.controls.progress.setValue(100);
      }

      const ip = localStorage.getItem('Systemip');
      this.profileForm.controls.created_by_ip.setValue(ip);
      this.profileForm.controls.user_id.setValue(this.currentUser.user_id);

      this.profileForm.value.pincode = Number(this.profileForm.value.pincode);
      this.profileForm.value.is_student_or_professional = 'student';

      console.log('jsonData', this.profileForm.value);

      this.service.update_profile(this.profileForm.value).subscribe((data: any) => {
        if (data.data.update_profile.success === 'true') {
          this.loader.hide();
          this.currentUser.is_profile_updated = true;
          localStorage.setItem('UserDetails', JSON.stringify(this.currentUser));
          // this.alert.openAlert(data.data.update_profile.message, null);
          this.router.navigate(['/Learner/Thankyou']);
        } else {
          this.alert.openAlert(data.data.update_profile.message, null);
        }
      });
    } else {
      this.alert.openAlert('Please fill all qualification details', null);
    }
    // if (this.profileForm.value.gender && this.profileForm.value.is_student_or_professional &&
    //   this.profileForm.value.country && this.profileForm.value.state
    //   && this.profileForm.value.city_town) {
    //   this.profileForm.controls.progress.setValue(60);
    // }
    // if (this.profileForm.value.progress === 60 && this.profileForm.value.certificate && this.profileForm.value.languages_known
    //   && this.profileForm.value.social_media) {
    //   this.profileForm.controls.progress.setValue(90);
    // }
    // if (this.profileForm.value.progress === 90 && this.profileForm.value.profile_img) {
    //   this.profileForm.controls.progress.setValue(100);
    // }


  }

  yearOfpassing(index) {
    this.startYear = 2020 - 60;
    this.endYear = 2020 + 3;
    // this.startYear = moment().year() - 60;
    // this.endYear = moment().year() + 3;

    this.profileForm.value.qualification.forEach(element => {
      if (element.year_of_passing > this.endYear || element.year_of_passing < this.startYear) {
        this.alert.openAlert('Invalid year', null);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').reset();
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').setValidators(
          [Validators.required, Validators.minLength(4)]);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').updateValueAndValidity();
      }
    });
  }

  addCertificates(c, i) {
    const arrayT = this.certificate.value.filter(val => val === c);
    if (arrayT.length > 1) {
      this.alert.openAlert('This certificate link is already filled', null);
      this.certificate.removeAt(i);
    } else if (c[0] === '') {
      this.alert.openAlert('Please enter certificate', null);
    } else {
      this.certificate.push(this.formBuilder.control(['']));
    }
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
      percentage: ['', new FormControl('', [Validators.required, Validators.pattern(/^[1-9.]$/),
      Validators.minLength(1), Validators.maxLength(5)])]
      // ,
      ,
    });
  }

  addQualification(i) {
    // if (this.profileForm.value.qualification[i].board_university !== '' &&
    //   this.profileForm.value.qualification[i].qualification !== '' &&
    //   this.profileForm.value.qualification[i].discipline !== '' && this.profileForm.value.qualification[i].institute !== '' &&
    //   this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== '') {
    //   this.qualification.push(this.createQualItem());
    //   console.log(this.qualification);
    // } else {
    //   this.alert.openAlert('Please fill all details', null);
    // }

    if (this.profileForm.value.qualification[i].qualification === '5e7dedc1dba4466d9704b3f2' ||
      this.profileForm.value.qualification[i].qualification === '5e7deddfdba4466d9704b44a') {
      if (this.profileForm.value.qualification[i].board_university !== '' && this.profileForm.value.qualification[i].institute !== '' &&
        this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== '') {
        this.qualification.push(this.createQualItem());
      } else {
        this.alert.openAlert('Please fill all details', null);
      }
    } else {
      if (this.profileForm.value.qualification[i].board_university !== '' && this.profileForm.value.qualification[i].institute !== '' &&
        this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== ''
        && this.profileForm.value.qualification[i].discipline !== '') {
        this.qualification.push(this.createQualItem());
      } else {
        this.alert.openAlert('Please fill all details', null);
      }
    }

  }

  // addQualification() {
  //   this.qualification.push(this.createQualItem());
  //   this.qualification.push(this.createQualItem());
  //   console.log(this.qualification.controls, this.qualification);
  // }

  removeQualification(i) {
    this.qualification.removeAt(i);
  }

  createSocialMedia(): FormGroup {
    return this.formBuilder.group({
      link: [''],
      img: [''],
    });
  }

  addSocialMedia() {
    this.social_media.push(this.createSocialMedia());
  }

  removeSocialMedia(i) {
    this.social_media.removeAt(i);
  }
  // ENd of Dynamic Add rows

  getAllLanguage() {
    this.service.get_language_details().subscribe((language: any) => {
      this.languageList = language.data.get_language_details.data;
    });
  }

  // Country List
  getAllcountry() {
    this.service.get_country_details().subscribe((countryDetails: any) => {
      this.countryValue = countryDetails.data.get_country_details.data.filter(cnt =>
        cnt.countryname === 'India'
      );
    });
  }
  // State List
  getAllState() {
    this.service.get_state_details(this.profileForm.value.country).subscribe((stateDetails: any) => {
      this.stateValue = stateDetails.data.get_state_details.data;
      this.getDistrict();
      if (this.stateValue == null) {
        this.alert.openAlert(stateDetails.data.get_state_details.message, null);
      }
    });
  }

  getDistrict() {
    this.service.get_district_details(this.profileForm.value.country, this.profileForm.value.state).subscribe((city: any) => {
      this.cityValue = city.data.get_district_details.data;
    });
  }

  getAllLevels() {
    this.service.get_qualification_details().subscribe((level: any) => {
      this.levelValue = level.data.get_qualification_details.data;
      this.levelValue.forEach(element => {
        element.allowed = 'Y';
      });
    });
  }

  getBoardsUniv() {
    // this.service.get_institute_details().subscribe(institute => {
    //   this.boardValue = institute.data['get_institute_details'].data;
    //   this.uniValue= institute.data['get_institute_details'].data;
    // })
    this.service.get_board_university_details().subscribe((boards: any) => {
      this.boardValue = boards.data.get_board_university_details.data.board;
      this.uniValue = boards.data.get_board_university_details.data.university;

    });
  }

  getInstitute() {
    this.service.get_institute_details().subscribe((institute: any) => {
      this.institutes = institute.data.get_institute_details.data;
    });
  }

  getDiscipline() {
    this.service.get_discipline_details().subscribe((discipline: any) => {
      this.disciplines = discipline.data.get_discipline_details.data;
    });
  }

  getSpec() {
    // this.service.get_institute_details().subscribe(institute => {

    //   this.specValue= institute.data['get_institute_details'].data;
    // })
    this.service.get_specification_details().subscribe((spec: any) => {
      this.specValue = spec.data.get_specification_details.data;
    });
  }

  // All dialogs
  closedialogbox() {
    this.dialog.closeAll();
    this.passwordForm?.reset();
    this.mailForm?.reset();
    this.otpForm?.reset();
  }

  editEmail(templateRef: TemplateRef<any>) {
    this.passwordForm?.reset();
    this.otpForm?.reset();
    this.mailForm = this.formBuilder.group({
      mailid: new FormControl('', myGlobals.emailVal)
    });
    this.dialog.open(templateRef);
  }

  updateEmail(mailForm) {
    if (mailForm === false) {
      Swal.fire('Email id is invalid');
    } else {
      this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe((data: any) => {
        this.dialog.closeAll();
        if (data.data.update_email_onprofile.success === 'true') {
          Swal.fire(data.data.update_email_onprofile.message);
          this.getprofileDetails(this.currentUser.user_id);
          this.mailForm.reset();
        } else {
          Swal.fire(data.data.update_email_onprofile.message);
        }
      });
    }

  }

  editmobno(mobRef: TemplateRef<any>) {
    this.passwordForm?.reset();
    this.mailForm?.reset();
    this.isenable = true;
    this.showotp = false;
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      otp: new FormControl('', []),
    });
    this.dialog.open(mobRef);
  }

  editPassword(passRef: TemplateRef<any>) {
    this.mailForm?.reset();
    this.otpForm?.reset();
    this.passwordForm = this.formBuilder.group({
      currentpassword: new FormControl('', myGlobals.passwordVal),
      newpassword: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', myGlobals.passwordVal),
    }, {
      validator: MustMatch('newpassword', 'confirmpassword'),
    });
    this.dialog.open(passRef);
  }

  otpverification() {
    this.loader.show();
    this.resendLabel = true;
    this.service.update_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile).subscribe((data: any) => {
      if (data.data.update_mobile_onprofile.success === 'true') {
        this.loader.hide();
        // this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
        Swal.fire(data.data.update_mobile_onprofile.message);
        this.isenable = false;
        this.showotp = true;
        // Timer
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
        }, 1000);

      } else {
        // this.alert.openAlert(data.data['update_mobile_onprofile'].message, null)
        Swal.fire(data.data.update_mobile_onprofile.message);
      }
    });
  }

  onOtpChange(otp) {
    // this.otpForm.value.otp = otp;
    this.otp = otp;
  }

  otpverify() {
    this.service.update_verifyotp_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile, this.otp)
      .subscribe((data: any) => {
        if (data.data.update_verifyotp_mobile_onprofile.success === 'true') {
          this.closedialogbox();
          Swal.fire(data.data.update_verifyotp_mobile_onprofile.message);
          this.showotp = false;
          this.isenable = true;
          this.getprofileDetails(this.currentUser.user_id);
        } else {
          Swal.fire(data.data.update_verifyotp_mobile_onprofile.message);
          this.otpForm.setValue({ mobile: this.otpForm.value.mobile, otp: '' });
          this.showotp = false;
          this.isenable = true;
        }
      });
  }

  Resendcode() {
    this.otpForm.setValue({ mobile: this.otpForm.value.mobile, otp: '' });
    this.service.resend_otp_onprofile(this.currentUser.user_id).subscribe((data: any) => {
      if (data.data.resend_otp_onprofile.success === 'true') {
        Swal.fire(data.data.resend_otp_onprofile.message);
        this.showotp = true;
        clearTimeout(this.interval);
        this.interval = setInterval(() => {
          if (this.resendtimeLeft > 0) {
            this.resendtimeLeft--;
            this.minutes = Math.floor(this.resendtimeLeft / 60);
            this.seconds = this.resendtimeLeft - this.minutes * 60;

          } else {
            this.minutes = 0;
            this.verifybutton = true;
          }
        }, 1000);
      }
    });
  }

  updatePassword() {
    this.service.get_change_password_updateprofile(this.currentUser.user_id, this.passwordForm.value.currentpassword,
      this.passwordForm.value.newpassword).subscribe((password: any) => {
        this.passwordForm.reset();
        this.dialog.closeAll(); // Asok said
        if (password.data.get_change_password_updateprofile.success === 'true') {
          Swal.fire(password.data.get_change_password_updateprofile.message);
          localStorage.clear();
          this.httpC.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
            localStorage.setItem('Systemip', res.ip);
          });
          // this.dialog.closeAll();
          this.router.navigate(['/Learner/login']);
        } else {
          Swal.fire(password.data.get_change_password_updateprofile.message);
        }
      });
  }

  onSelectFile(event) {
    this.selectfile = event.target.files[0] as File;
    if (this.selectfile && this.selectfile.type !== 'image/png' && this.selectfile.type !== 'image/jpeg') {
      this.alert.openAlert('mage should be less than 5 MB and should be only Jpeg or png format', null);
    } else if (this.selectfile && this.selectfile.size > 500000) {
      this.alert.openAlert('image should be less than 5 MB and should be only Jpeg or png format', null);
    } else {
      if (this.selectfile) {
        const fb = new FormData();
        fb.append('image', this.selectfile, this.selectfile.name);
        this.service.imageupload(fb).subscribe(data => {
          this.profileForm.controls.profile_img.setValue(data);
          localStorage.setItem('user_img', 'https://edutechstorage.blob.core.windows.net/' + this.profileForm.value.profile_img.path);
          this.profileForm.controls.profile_img.setValue(localStorage.getItem('user_img'));
        });
      }
    }
  }

  change(event) {
    if (event.target.value.match(myGlobals.lowerCaseLetters)) {
      this.lowercase = true;
    } else {
      this.lowercase = false;
    }
    if (event.target.value.match(myGlobals.upperCaseLetters)) {
      this.uppercase = true;
    } else {
      this.uppercase = false;
    }
    if (event.target.value.match(myGlobals.numbers)) {
      this.number = true;
    } else {
      this.number = false;
    }
    if (event.target.value.match(myGlobals.specialchar)) {
      this.spicalcharacter = true;
    } else {
      this.spicalcharacter = false;
    }
  }

  changed(value, index) {
    this.duplicateValueCheck[index] = value;
    this.checkFunction();
  }
  // checkinstitute(event , value) {
  //   if (event.source.selected) {
  //     this.selectedinstitute = value;
  //   }
  //   console.log(this.selectedinstitute);
  // }
  checkFunction() {
    this.levelValue.forEach((type) => {
      if (type.level_code === '10' || type.level_code === '12') {
        const selected = this.duplicateValueCheck.includes(type._id);
        if (selected) { type.allowed = 'N'; } else { type.allowed = 'Y'; }
      }
    });
  }

  checkSpec(a, spec, quali, level) {
    quali = this.profileForm.get('qualification');
    const specification = quali.controls[spec].controls.specification;
    if (level.level_code !== '10' && level.level_code !== '12') {
      specification.setValidators([Validators.required]);
    } else {
      specification.setValidators(null);
    }
    specification.updateValueAndValidity();
  }

  formatPercentage(index) {
    const val = this.profileForm.get('qualification').get(String(index)).get('percentage').value;
    if (val.includes('.')) {
      // console.log(val, typeof val);
    } else {
      if (val.length > 2) {
        const per = val.slice(0, 2) + '.' + val.slice(2, val.length - 1);
        // const per = parseFloat(val).toFixed(2);
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      } else if (val.length === 0) {
        const per = '';
        // const per = parseFloat(val).toFixed(2);
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      } else {
        const per = val + '.00';
        // const per = parseFloat(val).toFixed(2);
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      }
    }
  }

  // radiobuttonchange(e) {
  //   const neft = this.profileForm.get('neft');
  //   this.profileForm.get('throughTPO').valueChanges
  //     .subscribe((val: any) => {
  //       if (val === true) {
  //         neft.setValidators([Validators.required, Validators.pattern(/^[0-9]*$/),
  //         Validators.minLength(16), Validators.maxLength(22)
  //         ]);
  //       } else {
  //         neft.setValidators([Validators.pattern(/^[0-9]*$/),
  //         Validators.minLength(16), Validators.maxLength(22)
  //         ]);
  //       }
  //     });
  //   console.log(e, this.checkdedTPO, this.profileForm);
  // }
}
