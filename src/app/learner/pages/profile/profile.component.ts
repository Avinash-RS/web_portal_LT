import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as myGlobals from '@core/globals';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { LearnerServicesService } from '../../services/learner-services.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // animations: [ slideInAnimation ]
})

// AFTER restructure - Mythreyi

export class ProfileComponent implements OnInit {
  @ViewChild('passwordDialog', { static: true }) passwordDialog: TemplateRef<any>;
  @ViewChild('fileInput', { static: true }) fileInput;
  blobKey = environment.blobKey;
  loader: boolean = false;
  constructor(public translate: TranslateService,
              private alert: AlertServiceService, public service: LearnerServicesService,
              private activeroute: ActivatedRoute, private dialog: MatDialog, private httpC: HttpClient, private formBuilder: FormBuilder,
              private router: Router, private gs: GlobalServiceService,
              private services: CommonServicesService,
              private toastr: ToastrService,
              private location: LocationStrategy) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    if (this.gs.checkLogout()) {
      // this.urlImage = localStorage.getItem('user_img')
      this.currentUser = this.gs.checkLogout();
      this.getAllLevels();
      this.getprofileDetails(this.currentUser.user_id);
    }

    this.getAllLanguage();
    this.getAllcountry();
        // this.getBoardsUniv();
   // this.getInstitute();
    // this.getDiscipline();
  //  this.getSpec();
    setTimeout (() => {
    if (!this.currentUser.is_password_updated) {
      this.toastr.warning('Please change your password to continue');
      this.editPassword(this.passwordDialog);
    }
  }, 1000);
}

  // to get controls for validation
  get f() {
    return this.profileForm.controls;
  }

  get c() {
    if (this.mailForm) {
      return this.mailForm.controls;
    } else if (this.otpForm) {
      return this.otpForm.controls;
    } else if (this.passwordForm) {
      return this.passwordForm.controls;
    }
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
  uniValue1: any;
  uniValue3: any;
  boardValue1: any;
  boardValue3: any;
  disciplines1: any;
  disciplines2: any;
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
  morphed: any = [];
  currentUser: any;
  userData: any = {};
  showConNew = false;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
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
  enableMobileEdit: any;
  collegename;
  deptname;
  UserDetails;
  // Percentage
  //   public setTwoNumberDecimal($event) {
  //     $event.target.value = parseFloat($event.target.value).toFixed(2);
  // }
hide = true;
hideConfirm = true;
showNew = true;
  duplicateValueCheck = [];
  college_name;
  profileDetails;
  certificationDetails;
  // tslint:disable-next-line: use-life-cycle-interface
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
  this.dialog.closeAll();
  }
  ngOnInit() {
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.translate.use(localStorage.getItem('language'));
    if (this.currentUser.is_profile_updated) {
      this.cannotEdit = true;
    } else {
      this.cannotEdit = false;
    }
    // moment().year();
    this.profileForm = this.formBuilder.group({
      about_you: new FormControl('', [Validators.minLength(3), Validators.maxLength(1000)]),
      gender: new FormControl('', myGlobals.req),
      is_student_or_professional: new FormControl(''),
      deptName: new FormControl(''),
      collegeName : new FormControl(''),
      languages_known: [''],
      country: ['', myGlobals.req],
      state: ['', myGlobals.req],
      city_town: ['', myGlobals.req],
      progress: [''],
      profile_img: [''],
      user_id: [],
      domain: environment.domain
    });

    const jobRole = this.profileForm.get('professional.job_role');
    const org = this.profileForm.get('professional.organization');
    const totalExp = this.profileForm.get('professional.total_experience');
    this.profileForm.get('is_student_or_professional').valueChanges
      .subscribe(isStudentOrProfessional => {
        if (isStudentOrProfessional === 'professional') {
          jobRole.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z a-z ]*$/)]);
          org.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z a-z]*$/)]);
          totalExp.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(2),
          ]);
        } else {
          jobRole.setValidators(null);
          org.setValidators(null);
          totalExp.setValidators(null);
        }
        jobRole.updateValueAndValidity();
        org.updateValueAndValidity();
        totalExp.updateValueAndValidity();
      });
  }

  downloadLink(url) {
    if (url) {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      link.href = url + this.blobKey;
      link.click();
    } else {
      this.toastr.warning('URL not available');
    }
  }

  getprofileDetails(userid) {
    this.service.view_profile(userid).subscribe((data: any) => {
      if (data.data.view_profile.success) {
        this.certificationDetails = data.data.view_profile.message && data.data.view_profile.message[0].certificateDetails;
        this.profileDetails = data.data.view_profile.message && data.data.view_profile.message[0].profileObject;
        this.userData = data.data.view_profile.message[0];
        if (this.userData?.mobile_no) {
          const mobNumber = this.userData.mobile_no;
          const morphed = mobNumber[0] + mobNumber[1] + '******' + mobNumber[8] + mobNumber[9];
          this.userData.mobile_no = morphed;
        }
        if (this.profileDetails) {
          this.profileForm.patchValue({
            profile_img : this.profileDetails?.profile_img ? this.profileDetails?.profile_img : '',
            deptName : this.profileDetails?.department ? this.profileDetails?.department : '',
            country : this.profileDetails?.country?.id ? this.profileDetails.country.id : '',
            state : this.profileDetails?.state?.id ? this.profileDetails.state?.id : {id: '', name: ''},
            city_town : this.profileDetails?.city_town?.id ? this.profileDetails.city_town?.id : {id: '', name: ''},
            gender : this.profileDetails?.gender ? this.profileDetails?.gender : '',
            collegeName : this.profileDetails?.college_name ? this.profileDetails?.college_name : ''
          });
          this.getAllState();
          this.getDistrict();
          this.deptname = this.profileDetails?.department ? this.profileDetails?.department : '';
          if (this.userData.language_detail?.length > 0) {
                      var result = this.userData.language_detail.map(a => a.name);
                    } else {
                      result = [];
          }
          this.profileForm.controls.languages_known.setValue(result);
        } else {
        }
      }
    });
  }
  yearOfpassing(index) {
    this.startYear = 2020 - 60;
    this.endYear = 2020 + 3;
    this.profileForm.value.qualification.forEach(element => {
      if (element.year_of_passing > this.endYear || element.year_of_passing < this.startYear) {
        this.alert.openAlert('Invalid year', null);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').reset();
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').setValidators([Validators.required,
        Validators.minLength(4)]);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').updateValueAndValidity();
      }
    });
  }
  updateProfile() {
    if (this.profileForm.value.gender == '0') {
      this.toastr.warning('Gender cannot be empty');
      return false;
    }
    if (this.profileForm.value.country === 'null' || this.profileForm.value.state == 'null' || this.profileForm.value.city_town == 'null') {
      this.toastr.warning('Location details cannot be empty');
      return false;
    }
    if (this.deptname?.length > 50) {
      this.toastr.warning('Department name must not exceed 50 characters');
      return false;
    }
    if (this.profileForm.value.gender && this.profileForm.value.is_student_or_professional &&
      this.profileForm.value.country && this.profileForm.value.state
      && this.profileForm.value.city_town) {
      this.profileForm.controls.progress.setValue(60);
    }
    if (this.deptname || this.deptname === '') {
      this.profileForm.controls.deptName.setValue(this.deptname);
    }


    const ip = localStorage.getItem('Systemip');
    this.profileForm.controls.user_id.setValue(this.currentUser.user_id);
    if  (this.profileForm?.value?.qualification) {
      delete this.profileForm.value.qualification; }

    if  (this.profileForm?.value?.country) {
       var countryName = this.countryValue.filter(e => e._id == this.profileForm?.value?.country);
      }
    if  (this.profileForm?.value?.state) {
        var statename = this.stateValue.filter(e => e._id == this.profileForm?.value?.state);
       }
    if  (this.profileForm?.value?.city_town) {
        var cityname = this.cityValue.filter(e => e._id == this.profileForm?.value?.city_town);
       }
    if (this.profileForm?.value?.languages_known && this.profileForm.value.languages_known.length > 0) {
        var langARR = [];
        this.profileForm.value.languages_known.forEach(element => {
         langARR.push({name: element});
        });
       }
    if (this.profileForm?.value.profile_img && this.profileForm?.value.profile_img != '') {
        localStorage.setItem('user_img', this.profileForm?.value.profile_img);
       }
    const apidata = {
        gender: this.profileForm?.value.gender,
        deptName: this.profileForm?.value.deptName,
        collegeName : this.profileForm?.value.collegeName,
        languages_known: langARR,
        country: {id: this.profileForm?.value.country, name: countryName[0].countryname ? countryName[0].countryname : ''},
        state: {id: this.profileForm?.value.state, name: statename[0].statename ? statename[0].statename : ''},
        city_town: {id: this.profileForm?.value.city_town, name: cityname[0].districtname ? cityname[0].districtname : ''},
        profile_img: this.profileForm?.value.profile_img,
        user_id: this.profileForm?.value.user_id,
        domain: environment.domain
       };

    this.service.update_profile(apidata).subscribe((data: any) => {
      if (data.data.update_profile.success === 'true') {
        this.currentUser.is_profile_updated = true;
        localStorage.setItem('UserDetails', JSON.stringify(this.currentUser));
        this.alert.openAlert(data.data.update_profile.message, null);
        this.cannotEdit = true;
        this.getprofileDetails(this.currentUser.user_id);
        this.services.updateProfilePic.next('updated');
      } else {
        this.alert.openAlert(data.data.update_profile.message, null);
      }
    });
  }

  addCertificates(c, i) {
    const arrayT = this.certificate.value.filter(ind => ind === c);
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
      qualification: [''],
      institute: [''],
      board_university: [''],
      discipline: [''],
      specification: [''],
      year_of_passing: [''],
      percentage: ['']
    });
  }

  addQualification(i) {
    let unique = false;
    this.levelValue.forEach((type) => {
      if ((type.level_code === '10' && this.profileForm.value.qualification[i].qualification === type._id)
        || (type.level_code === '12' && this.profileForm.value.qualification[i].qualification === type._id)) {
        unique = true;
      }
    });
    if (unique) {
      if (this.profileForm.value.qualification[i].board_university !== '' &&
        this.profileForm.value.qualification[i].qualification !== '' &&
        this.profileForm.value.qualification[i].discipline !== '' && this.profileForm.value.qualification[i].institute !== '' &&
        this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== '') {
        this.qualification.push(this.createQualItem());
      } else {
        this.alert.openAlert('Please fill all details', null);
      }
    } else {
      const isEmpty = Object.values(this.profileForm.value.qualification[i]).some(x => (x === ''));
      if (isEmpty) {
        this.alert.openAlert('Please fill all details', null);
      } else {
        this.qualification.push(this.createQualItem());
      }
    }

  }

  removeQualification(i) {
    this.levelValue.forEach(level => {
      if ((level._id === this.qualification.controls[i].value.qualification && level.level_code === '10') ||
        (level._id === this.qualification.controls[i].value.qualification && level.level_code === '12')) {
        level.allowed = 'Y';
      }
    });
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
    this.service.get_state_details(this.profileForm.value.country ? this.profileForm.value.country : '5bd0597eb339b81c30d3e7f2')
    .subscribe((stateDetails: any) => {
      this.stateValue = stateDetails.data.get_state_details.data;
      this.getDistrict();
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
    });
  }

  getBoardsUniv(levelid, ind?) {
    this.service.get_board_university_details(levelid).subscribe((boards: any) => {
      this.boardValue[ind] = boards.data.get_board_university_details.data?.board;
      this.uniValue[ind] = boards.data.get_board_university_details.data?.university;
    });
  }

  getInstitute() {
    this.service.get_institute_details().subscribe((institute: any) => {
      this.institutes = institute.data.get_institute_details?.data;
    });
  }

  getDiscipline(levelid, ind?) {
    this.service.get_discipline_details(levelid).subscribe((discipline: any) => {
      this.disciplines[ind] = discipline.data.get_discipline_details?.data;
    });
  }

  getSpec() {
    this.service.get_specification_details().subscribe((spec: any) => {
      this.specValue = spec.data.get_specification_details?.data;
    });
  }

  // All dialogs
  closedialogbox() {
    if (!this.currentUser.is_password_updated) {
      this.toastr.warning('Please change the password');
      return false;
    }
    this.dialog.closeAll();
  }

  editEmail(templateRef: TemplateRef<any>) {
    this.mailForm = this.formBuilder.group({
      mailid: new FormControl('', myGlobals.emailVal)
    });
    this.dialog.open(templateRef);
  }

  updateEmail(mailForm) {
    if (mailForm === false) {
      Swal.fire('Email Id is invalid');
    } else {
      this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe((data: any) => {
        if (data.data.update_email_onprofile.success === 'true') {
          Swal.fire(data.data.update_email_onprofile.message);
          this.getprofileDetails(this.currentUser.user_id);
          this.mailForm.reset();
          this.dialog.closeAll();
        } else {
          Swal.fire(data.data.update_email_onprofile.message);
        }
      });
    }

  }

  editmobno(mobRef: TemplateRef<any>) {
    this.isenable = true;
    this.showotp = false;
    this.otpForm = this.formBuilder.group({
      mobile: new FormControl('', myGlobals.mobileVal),
      otp: new FormControl('', []),
    });
    this.dialog.open(mobRef);
  }

  editPassword(passRef: TemplateRef<any>) {
    this.dialog.open(passRef , {
      panelClass: 'custom-modalbox',
      disableClose: true
    });

      // Disabling right click
    const dialogContainer = document.getElementsByClassName('mat-dialog-container');
    dialogContainer[0].addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    const cdkoverlay  =  document.querySelector('.cdk-overlay-backdrop');
    cdkoverlay.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

    if (!this.currentUser.is_password_updated) {
    document.querySelector('.cdk-overlay-backdrop').classList.add('blurBackground');
    }
    this.passwordForm = this.formBuilder.group({
      currentpassword: new FormControl('', myGlobals.passwordVal),
      newpassword: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', myGlobals.passwordVal, ),
    }, {
      validator: MustMatch('newpassword', 'confirmpassword'),
    });

  }

  otpverification() {
    this.resendLabel = true;
    this.service.update_mobile_onprofile(this.currentUser.user_id, this.otpForm.value.mobile).subscribe((data: any) => {
      if (data.data.update_mobile_onprofile.success === 'true') {
        Swal.fire(data.data.update_mobile_onprofile.message);
        this.isenable = false;
        this.showotp = true;
        this.timeLeft = 60;
        this.interval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
            this.minutes = Math.floor(this.timeLeft / 60);
            this.seconds = this.timeLeft - this.minutes * 60;

          } else {
            this.verifybutton = true;
          }
        }, 1000);

      } else {
        Swal.fire(data.data.update_mobile_onprofile.message);
      }
    });
  }

  onOtpChange(otp) {
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
    this.loader = true;
    this.service.get_change_password_updateprofile(this.currentUser.user_id, this.passwordForm.value.currentpassword,
      this.passwordForm.value.newpassword).subscribe((password: any) => {
        if (password.data.get_change_password_updateprofile.success === 'true') {
          this.loader = false;
          Swal.fire(password.data.get_change_password_updateprofile.message);
          this.services.logout(this.currentUser.user_id, false).subscribe((logout: any) => {
          this.dialog.closeAll();
          this.router.navigate(['/Learner/login']);
          localStorage.clear();
          sessionStorage.clear();
          this.services.getIpAddressByUrl();
          });
        } else {
          this.loader = false;
          Swal.fire(password.data.get_change_password_updateprofile.message);
        }
      });
  }

  onSelectFile(event) {
    this.selectfile = event.target.files[0] as File;
    if (this.selectfile && this.selectfile.type !== 'image/png' && this.selectfile.type !== 'image/jpeg') {
      this.alert.openAlert('image should be less than 5 MB and should be only Jpeg or png format', null);
    } else if (this.selectfile && this.selectfile.size > 5000000) {
      this.alert.openAlert('image should be less than 5 MB and should be only Jpeg or png format', null);
    } else {
      if (this.selectfile) {
        const fb = new FormData();
        fb.append('image', this.selectfile, this.selectfile.name);
        this.service.imageupload(fb).subscribe(data => {
          this.profileForm.controls.profile_img.setValue(data['url']);
          this.currentUser.profile_img = data['url'];
        });
      }
    }
  }
  onEdit() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.cannotEdit = !this.cannotEdit;
    if (this.cannotEdit) {
      this.profileForm.controls.profile_img.setValue(localStorage.getItem('user_img'));
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
    let q;
    this.getBoardsUniv(value, index);
    this.getDiscipline(value, index);
    q = this.profileForm.controls.qualification;
    q.controls[index].controls.institute.setValue('');
    this.duplicateValueCheck[index] = value;
    this.checkFunction();
  }

  checkFunction() {
    this.levelValue.forEach((type) => {
      if (type.level_code === '10' || type.level_code === '12') {
        const selected = this.duplicateValueCheck.includes(type._id);
        if (selected) { type.allowed = 'N'; } else {
          const quali = this.profileForm.controls.qualification;
          let unique = true;
          quali.value.forEach(element => {
            if (element.qualification === type._id) {
              unique = false;
            }
          });
          if (unique) { type.allowed = 'Y'; }
        }
      }
    });
  }

  checkSpec(a, spec, quali, level) {
    quali = this.profileForm.get('qualification');
    const specification = quali.controls[spec].controls.specification;
    if (level.level_code !== '10' && level.level_code !== '12') {
      a.insCheck = false;
      specification.setValidators([Validators.required]);
    } else {
      a.insCheck = true;
      specification.setValidators(null);
    }
    specification.updateValueAndValidity();
    this.getDiscipline(level._id);
    this.getBoardsUniv(level._id);
  }

  formatPercentage(index) {
    const val = this.profileForm.get('qualification').get(String(index)).get('percentage').value;
    if (val && val.includes('.')) {
      const ind = val.indexOf('.');

      if (ind > 2) {
        const val1 = val.replace('.', '');
        if (val1.length > 2) {
          const per = val1.slice(0, 2) + '.' + val1.slice(2, val1.length - 1);
          this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
        }
      }
    } else {
      if (val.length > 2) {
        const per = val.slice(0, 2) + '.' + val.slice(2, val.length - 1);
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      } else if (val.length === 0) {
        const per = '';
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      } else {
        const per = val + '.00';
        this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
      }
    }
  }
}
