import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { AlertServiceService } from '@core/services/handlers/alert-service.service';
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
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

// AFTER restructure - Mythreyi

export class ProfileComponent implements OnInit {

  userImage;
  enableMobileEdit;
  boardValue1: any;
  uniValue1: any;
  boardValue3: any;
  uniValue3: any;
  disciplines1: any;
  disciplines2: any;
  payment_mode: any;
  ref_no1: any;

  constructor(
    private el: ElementRef, public service: LearnerServicesService,
    private activeroute: ActivatedRoute, private dialog: MatDialog, private httpC: HttpClient,
    private loader: Ng4LoadingSpinnerService, private formBuilder: FormBuilder,
    private router: Router, private gs: GlobalServiceService, private toastr: ToastrService,) {
    // const x = localStorage.getItem('OTPFeature') || false;
    // console.log(x);
    this.enableMobileEdit = false;
    this.getAllLanguage();
    this.getAllcountry();
    this.getAllLevels();
    // this.getBoardsUniv();
    this.getInstitute();
    // this.getDiscipline();
    this.getSpec();
    if (this.gs.checkLogout()) {
      // this.urlImage = localStorage.getItem('user_img')
      this.currentUser = this.gs.checkLogout();
      this.getprofileDetails(this.currentUser.user_id);
      if (!this.currentUser.is_profile_updated) {
        this.gs.preventBackButton();
      }
    }


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

  // get social_media() {
  //   return this.profileForm.get('social_media') as FormArray;
  // }

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
  selecteddiscipline = false;
  isSelfEnable: boolean;
  isTpoEnable: boolean;

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (params.status) {
        this.toastr.success('Email updated successfully');
      }
    });
    if (this.currentUser.is_profile_updated) {
      this.cannotEdit = true;
    } else {
      this.cannotEdit = false;
    }
    // moment().year();
    this.profileForm = this.formBuilder.group({
      about_you: new FormControl('', [Validators.minLength(3), Validators.maxLength(1000)]),
      gender: new FormControl('', myGlobals.req),

      college_name: new FormControl('', myGlobals.req),
      college_stream: new FormControl('', myGlobals.req),
      // country_name:new FormControl('', myGlobals.req),
      state_name: new FormControl('', myGlobals.req),
      district_name: new FormControl('', myGlobals.req),

      payment_mode: new FormControl('', myGlobals.req),
      ref_no1: new FormControl('', [Validators.pattern(/^[A-Z a-z 0-9]*$/),
      Validators.minLength(16), Validators.maxLength(22), Validators.required]),
      ref_no: new FormControl(''),
      // is_student_or_professional: new FormControl('', myGlobals.req),
      // gender: new FormControl('',myGlobals.req),
      is_student_or_professional: new FormControl(''),
      languages_known: [''],
      addressline1: ['', myGlobals.textVal],
      addressline2: [''],
      pincode: ['', myGlobals.pincode],
      country: ['', myGlobals.req],
      state: ['', myGlobals.req],
      city_town: ['', myGlobals.req],
      iAgree: new FormControl(true, []),
      throughTPO: new FormControl(false, []),
      progress: [],
      certificate: this.formBuilder.array([new FormControl('')]),
      qualification: this.formBuilder.array([this.createQualItem()]),
      // social_media: this.formBuilder.array([this.createSocialMedia()]),
      year_of_birth: '05-08-1998',
      profile_img: [],
      user_id: [],
      created_by_ip: [],
      professional: this.formBuilder.group({
        job_role: new FormControl(''),
        organization: new FormControl(''),
        total_experience: new FormControl('')
      }),
      domain: environment.domain
      // payment:this.formBuilder.group({
      //   payment_mode: this.profileForm?.value.payment_mode,
      //   ref_no: this.profileForm?.value.ref_no,
      //   ref_no1: this.profileForm?.value.ref_no1
      // })
    });


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

    // const ref_no1 = this.profileForm.get('ref_no1');
    // const payment_mode =  this.profileForm.get('payment.payment_mode');
    // const ref_no =  this.profileForm.get('payment.ref_no');
    // payment_mode.setValidators(null);
    //     ref_no.setValidators(null);
    // this.profileForm.get('throughTPO').valueChanges
    //   .subscribe((val: any) => {
    //     if (val === true) {
    //       ref_no1.setValidators([Validators.pattern(/^[A-Z a-z 0-9]*$/),
    //       Validators.minLength(16), Validators.maxLength(22)
    //       ]);
    //     } else {
    //       ref_no1.setValidators([Validators.pattern(/^[A-Z a-z 0-9]*$/),
    //       Validators.minLength(16), Validators.maxLength(22), Validators.required
    //       ]);
    //     }
    //     ref_no1.updateValueAndValidity();
    //   });

  }



  radioChange(event) {
    const ref_no1 = this.profileForm.get('ref_no1');
    if (event.value === 'tpo') {
      this.profileForm.get('ref_no1').setValue('');
      this.isTpoEnable = true;
      this.isSelfEnable = false;
      ref_no1.setValidators([Validators.pattern(/^[A-Z a-z 0-9]*$/),
      Validators.minLength(16), Validators.maxLength(22)
      ]);
    } else if (event.value === 'self') {
      this.profileForm.get('ref_no').setValue('');
      this.isTpoEnable = false;
      this.isSelfEnable = true;
      ref_no1.setValidators([Validators.pattern(/^[A-Z a-z 0-9]*$/),
      Validators.minLength(16), Validators.maxLength(22), Validators.required
      ]);

    } else {
      this.isTpoEnable = false;
      this.isSelfEnable = false;
    }
    ref_no1.updateValueAndValidity();
  }

  getprofileDetails(userid) {
    this.loader.show();
    this.service.view_profile(userid).subscribe((data: any) => {
      if (data.data.view_profile.success) {
        const profileDetails = data.data.view_profile.message && data.data.view_profile.message[0].user_profile[0];
        this.userData = data.data.view_profile.message[0];
        this.payment_mode = profileDetails?.payment?.payment_mode;
        if (this.payment_mode === 'self') {
          this.isSelfEnable = true;
          profileDetails.ref_no1 = profileDetails.payment.ref_no;
          profileDetails.payment_mode = profileDetails.payment.payment_mode;
        } else if (this.payment_mode === 'tpo') {
          this.isTpoEnable = true;
          profileDetails.ref_no = profileDetails.payment.ref_no;
          profileDetails.payment_mode = profileDetails.payment.payment_mode;
        }

        this.userData.ref = profileDetails?.payment?.pay_status;
        this.ref_no1 = profileDetails?.payment?.ref_no;

        if (profileDetails) {
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach(v => delete v.__typename);
          }
          // if (profileDetails.social_media.length > 0) {
          //   profileDetails.social_media.forEach(v => delete v.__typename);
          // }
          if (profileDetails.progress && profileDetails.progress.includes('%')) {
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
          while (profileDetails.certificate && profileDetails.certificate.length > 0 && certificate.length) {
            certificate.removeAt(0);
          }

          let diplomaVal = -1;
          this.levelValue.forEach((type) => {
            for (let i = 0; i < profileDetails.qualification.length; i++) {
              if (profileDetails.qualification[i].qualification === type._id && type.level_code === 'diploma') {
                diplomaVal = i;
              }
            }
          });
          // const ind = profileDetails.qualification.findIndex(x => x.qualification === '5e7dee15dba4466d9704b4d2');
          // if (ind !== -1) {
          if (diplomaVal !== -1) {

            if (profileDetails.qualification[diplomaVal].institute.startsWith('5')) {
              this.selectedinstitute = false;
            } else {
              this.selectedinstitute = true;
            }
            if (profileDetails.qualification[diplomaVal].discipline.startsWith('5')) {
              this.selecteddiscipline = false;
            } else {
              this.selecteddiscipline = true;
            }

          } else {
            this.selectedinstitute = false;
            this.selecteddiscipline = false;
          }

          this.profileForm.patchValue(profileDetails);
          this.getAllState();
          this.getDistrict();
          if (profileDetails.qualification.length > 0) {
            profileDetails.qualification.forEach((qual, index) => {
              let unique = '';
              this.levelValue.forEach(element => {
                if ((element._id === qual.qualification && element.level_code === '10') ||
                  (element._id === qual.qualification && element.level_code === '12')) {
                  element.allowed = 'N';
                  unique = element.level_code;
                } else if (element._id === qual.qualification && element.level_code === 'diploma') {
                  unique = element.level_code;
                }
              });
              if (unique) {
                qualification.push(this.formBuilder.group(qual));
                let q;
                q = qualification.controls[index];
                q.insCheck = unique;
              } else {
                qualification.push(this.formBuilder.group(qual));
                let a;
                a = qualification.controls[index];
                a.insCheck = unique;
              }
            });
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
    // console.log(this.profileForm);
    if (this.profileForm.value.payment_mode === 'self') {
      if (this.profileForm && this.profileForm.value && this.profileForm.value.ref_no1 === '') {
        this.toastr.warning('Please enter the NEFT/RTGS reference number', null);
        // this.invalidForm();
      }

    }
    // changed for Koushalys - 10th june
    if (this.profileForm.value.qualification[0].institute !== '' && this.profileForm.value.qualification[0].qualification !== '' &&
      this.profileForm.value.qualification[0].percentage !== '' && this.profileForm.value.qualification[0].year_of_passing !== '' &&
      (this.profileForm.value.qualification[1]  === undefined  ||
        (this.profileForm.value.qualification[1] !== undefined && this.profileForm.value.qualification[1].qualification !== '' &&
          this.profileForm.value.qualification[1].institute !== '' && this.profileForm.value.qualification[1].year_of_passing !== '' &&
          this.profileForm.value.qualification[1].percentage !== ''))) {
      const index = this.profileForm.value.qualification.findIndex(x => x.qualification === '5e7dedc1dba4466d9704b3f2');
      const index1 = this.profileForm.value.qualification.findIndex(x => x.qualification === '5e7dee15dba4466d9704b4d2');
      const index2 = this.profileForm.value.qualification.findIndex(x => x.qualification === '5e7deddfdba4466d9704b44a');
      if (index === -1) {
        this.toastr.warning('Please fill 10th qualification details', null);
      } else if (this.profileForm.value.iAgree === false) {
        this.toastr.warning('Please fill all mandatory feilds', null);
      } else {
        // console.log(this.profileForm.value.qualification);
        // if (this.profileForm.value.qualification(index).board_university !== '' ||
        //   this.profileForm.value.qualification(index).institute !== '' ||
        //   this.profileForm.value.qualification(index).percentage !== '' ||
        //   this.profileForm.value.qualification(index).year_of_passing !== '' ||
        //   this.profileForm.value.qualification(index1).discipline !== '' ||
        //   this.profileForm.value.qualification(index1).institute !== '' ||
        //   this.profileForm.value.qualification(index1).percentage !== '' ||
        //   this.profileForm.value.qualification(index1).year_of_passing !== '') {
        // this.profileForm.value.qualification[index1].board_university = '5ee28a037d0045bb0edc1df9';
        // this.profileForm.value.qualification[index1].specification = '5ee2877b7d0045bb0edc19c2';
        // this.profileForm.value.qualification[index].specification = '5ee2877b7d0045bb0edc19c2';

        // ******* */
        if (index2 !== -1) {
          this.profileForm.value.qualification[index2].specification = '5ee2877b7d0045bb0edc19c2';
        }
        if (this.profileForm.value.addressline1 && this.profileForm.value.gender !== '' &&
          this.profileForm.value.country && this.profileForm.value.state
          && this.profileForm.value.city_town && this.profileForm.value.iAgree) {
          this.profileForm.controls.progress.setValue(100);
        }
        // if (this.profileForm.value.progress === 60 &&
        //   this.profileForm.value.certificate.length > 0 && this.profileForm.value.addressline2 !== '' &&
        //   this.profileForm.value.certificate[0] !== '' && this.profileForm.value.pincode !== '')

        //  && this.profileForm.value.social_media[0].link !== ''
        //   {
        //   this.profileForm.controls.progress.setValue(90);
        // }
        // if (this.profileForm.value.progress === 90 && this.profileForm.value.profile_img) {
        //   this.profileForm.controls.progress.setValue(100);
        // }

        if (this.profileForm.value.throughTPO) {
          this.profileForm.value.throughTPO = Boolean(this.profileForm.value.throughTPO);
        }
        const ip = localStorage.getItem('Systemip');
        this.profileForm.controls.created_by_ip.setValue(ip);
        this.profileForm.controls.user_id.setValue(this.currentUser.user_id);
        const p = this.profileForm.value.progress;
        this.profileForm.value.progress = p.toString();
        if (this.profileForm.value.pincode !== '' && this.profileForm.value.pincode !== null) {
          this.profileForm.value.pincode = Number(this.profileForm.value.pincode);
        } else {
          this.profileForm.value.pincode = null;
        }
        this.profileForm.value.is_student_or_professional = 'student';
        // commented because 10th, 12th will not have all data --- Mythreyi --- the below logic fails in this scenario
        // Bug raised by Ram in QA - 20-06-2020, also in dev
        // let found;
        // if (this.profileForm?.value?.qualification[1]) {
        //   const obj = JSON.parse(JSON.stringify(this.profileForm?.value?.qualification[1]));
        //   found = Object.keys(obj).filter(function (key) {
        //     return obj[key] === '';
        //   });
        // }
        // if (found?.length) {
        //   this.toastr.warning('Please fill all qualification details.', null);
        // }
        // else {
        const jsonData = {
          pay_status: true,
          payment_mode: this.profileForm.value.payment_mode,
          ref_no: this.profileForm.value.ref_no1 ? this.profileForm.value.ref_no1 : this.profileForm.value.ref_no
        };
        this.profileForm.value.payment = jsonData;

        this.service.update_profile(this.profileForm.value).subscribe((data: any) => {
          if (data.data.update_profile.success === 'true') {
            this.loader.hide();
            this.currentUser.is_profile_updated = true;
            localStorage.setItem('UserDetails', JSON.stringify(this.currentUser));
            if(this.userImage){
              localStorage.setItem('user_img', this.userImage);
            }
            this.toastr.success('Profile updated successfully', null);
            this.router.navigate(['/Learner/home']);
          } else {
            this.toastr.error(data.data.update_profile.message, null);
          }
        });
        // }
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

        // } else {
        //   this.alert.openAlert('Please fill all qualification details', null);
        // }
      }
    } else {
      this.toastr.warning('Please fill all qualification details', null);
      // this.invalidForm();
    }
  }

  invalidForm() {
    for (const key of Object.keys(this.profileForm.controls)) {
      if (this.profileForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  yearCheck(index) {
    let tenYear;
    let twelveYear;
    this.levelValue.forEach((type) => {
      this.profileForm.value.qualification.forEach((element, index) => {
        if (type.level_code === '10' && element.qualification === type._id) {
          tenYear = this.profileForm.get('qualification').get(String(index)).get('year_of_passing').value;
        } else if (type.level_code === '12' && element.qualification === type._id) {
          twelveYear = this.profileForm.get('qualification').get(String(index)).get('year_of_passing').value;
        }
      });
    });
    if (tenYear >= twelveYear) {
      this.toastr.warning('10th year of passing should not be greater than 12th', null);
      this.profileForm.get('qualification').get(String(index)).get('year_of_passing').reset();
    }
  }
  yearOfpassing(index) {
    this.yearCheck(index);
    this.startYear = 2020 - 60;
    this.endYear = 2020 + 3;
    // this.startYear = moment().year() - 60;
    // this.endYear = moment().year() + 3;

    this.profileForm.value.qualification.forEach(element => {
      if (element.year_of_passing > this.endYear || element.year_of_passing < this.startYear) {
        this.toastr.warning('Invalid year');
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').reset();
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').setValidators(
          []);
        this.profileForm.get('qualification').get(String(index)).get('year_of_passing').updateValueAndValidity();
      }
    });
  }

  addCertificates(c, i) {
    const arrayT = this.certificate.value.filter(val => val === c);
    if (arrayT.length > 1) {
      this.toastr.warning('This certificate link is already filled', null);
      this.certificate.removeAt(i);
    } else if (c[0] === '') {
      this.toastr.warning('Please enter certificate', null);
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
      percentage: ['', new FormControl('', [Validators.pattern(/^[1-9.]$/),
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
    let tenVal = false;
    let twelveVal = false;
    this.levelValue.forEach((type) => {
      if (type.level_code === '12' && this.profileForm.value.qualification[i].qualification !== type._id) {
        twelveVal = true;
      } else if (type.level_code === '10' && this.profileForm.value.qualification[i].qualification === type._id) {
        tenVal = true;
      }
    });
    if (twelveVal) {
      if (tenVal) {
        if (this.profileForm.value.qualification[i].board_university !== '' && this.profileForm.value.qualification[i].institute !== '' &&
          this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== '') {
          this.qualification.push(this.createQualItem());
        } else {
          this.toastr.warning('Please fill all details', null);
        }
      } else {
        if (this.profileForm.value.qualification[i].institute !== '' &&
          this.profileForm.value.qualification[i].percentage !== '' && this.profileForm.value.qualification[i].year_of_passing !== ''
          && this.profileForm.value.qualification[i].discipline !== '') {
          // && this.profileForm.value.qualification[i].discipline !== '') {
          this.qualification.push(this.createQualItem());
        } else {
          this.toastr.warning('Please fill all details', null);
        }
      }
    } else {
      this.qualification.push(this.createQualItem());
    }
  }

  // addQualification() {
  //   this.qualification.push(this.createQualItem());
  //   this.qualification.push(this.createQualItem());
  //   console.log(this.qualification.controls, this.qualification);
  // }

  removeQualification(i) {
    this.levelValue.forEach(level => {
      if ((level._id === this.qualification.controls[i].value.qualification && level.level_code === '10') ||
        (level._id === this.qualification.controls[i].value.qualification && level.level_code === '12')) {
        level.allowed = 'Y';
      }
    });
    this.qualification.removeAt(i);
  }

  // createSocialMedia(): FormGroup {
  //   return this.formBuilder.group({
  //     link: [''],
  //     img: [''],
  //   });
  // }

  // addSocialMedia() {
  //   this.social_media.push(this.createSocialMedia());
  // }

  // removeSocialMedia(i) {
  //   this.social_media.removeAt(i);
  // }
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
        this.toastr.warning(stateDetails.data.get_state_details.message, null);
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
        this.getBoardsUniv(element._id);
        this.getDiscipline(element._id);
      });
    });
  }

  getBoardsUniv(levelid) {
    // this.service.get_institute_details().subscribe(institute => {
    //   this.boardValue = institute.data['get_institute_details'].data;
    //   this.uniValue= institute.data['get_institute_details'].data;
    // })
    let boardforTen = false;
    let boardforTwelve = false;
    this.levelValue.forEach((type) => {
      if ((type.level_code === '10' && levelid === type._id)) {
        boardforTen = true;
      } else if ((type.level_code === '12' && levelid === type._id)) {
        boardforTwelve = true;
      }
    });
    this.service.get_board_university_details(levelid).subscribe((boards: any) => {
      if (boardforTen) {
        this.boardValue = boards.data.get_board_university_details?.data?.board;
        this.uniValue = boards.data.get_board_university_details?.data?.university;
      } else if (boardforTwelve) {
        this.boardValue1 = boards.data.get_board_university_details?.data?.board;
        this.uniValue1 = boards.data.get_board_university_details?.data?.university;
      } else {
        this.boardValue3 = boards.data.get_board_university_details?.data?.board;
        this.uniValue3 = boards.data.get_board_university_details?.data?.university;
      }
    });
  }

  getInstitute() {
    this.service.get_institute_details().subscribe((institute: any) => {
      this.institutes = institute.data.get_institute_details.data;
    });
  }

  getDiscipline(levelid) {
    let tenVar = false;
    let twelveVar = false;
    this.levelValue.forEach((type) => {
      if (type.level_code === '10' && levelid === type._id) {
        tenVar = true;
      } else if (type.level_code === '12' && levelid === type._id) {
        twelveVar = true;
      }
    });
    this.service.get_discipline_details(levelid).subscribe((discipline: any) => {
      if (tenVar) {
        this.disciplines = discipline.data.get_discipline_details?.data;
      } else if (twelveVar) {
        this.disciplines1 = discipline.data.get_discipline_details?.data;
      } else {
        this.disciplines2 = discipline.data.get_discipline_details?.data;
      }
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
      this.toastr.error('Email id is invalid');
    } else {
      this.service.update_email_onprofile(this.currentUser.user_id, this.mailForm.value.mailid).subscribe((data: any) => {
        this.dialog.closeAll();
        if (data.data.update_email_onprofile.success === 'true') {
          this.toastr.success(data.data.update_email_onprofile.message);
          this.getprofileDetails(this.currentUser.user_id);
          this.mailForm.reset();
        } else {
          this.toastr.error(data.data.update_email_onprofile.message);
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
        this.toastr.error(data.data.update_mobile_onprofile.message);
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
          this.toastr.success(data.data.update_verifyotp_mobile_onprofile.message);
          this.showotp = false;
          this.isenable = true;
          this.getprofileDetails(this.currentUser.user_id);
        } else {
          this.toastr.error(data.data.update_verifyotp_mobile_onprofile.message);
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
          this.toastr.success(password.data.get_change_password_updateprofile.message);
          localStorage.clear();
          this.httpC.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
            localStorage.setItem('Systemip', res.ip);
          });
          // this.dialog.closeAll();
          this.router.navigate(['/Learner/login']);
        } else {
          this.toastr.error(password.data.get_change_password_updateprofile.message);
        }
      });
  }

  onSelectFile(event) {
    this.selectfile = event.target.files[0] as File;
    if (this.selectfile && this.selectfile.type !== 'image/png' && this.selectfile.type !== 'image/jpeg') {
      this.toastr.warning('Image should be less than 5 MB and should be only Jpeg or png format', null);
    } else if (this.selectfile && this.selectfile.size > 500000) {
      this.toastr.warning('Image should be less than 5 MB and should be only Jpeg or png format', null);
    } else {
      if (this.selectfile) {
        const fb = new FormData();
        fb.append('image', this.selectfile, this.selectfile.name);
        this.service.imageupload(fb).subscribe(data => {
          this.profileForm.controls.profile_img.setValue(data);
          this.userImage = 'https://edutechstorage.blob.core.windows.net/' + this.profileForm.value.profile_img.path
          this.profileForm.controls.profile_img.setValue(this.userImage);
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
    this.profileForm.get('qualification').get(String(spec)).get('percentage').setValue('');
    this.profileForm.get('qualification').get(String(spec)).get('institute').setValue('');
    this.profileForm.get('qualification').get(String(spec)).get('board_university').setValue('');
    this.profileForm.get('qualification').get(String(spec)).get('year_of_passing').setValue('');
    quali = this.profileForm.get('qualification');
    const specification = quali.controls[spec].controls.specification;
    if (level.level_code !== '10' && level.level_code !== '12') {
      // specification.setValidators([Validators.required]);
      a.insCheck = level.level_code;
      specification.setValidators([]);
    } else {
      a.insCheck = level.level_code;
      specification.setValidators(null);
    }
    specification.updateValueAndValidity();
    this.getDiscipline(level._id);
    this.getBoardsUniv(level._id);
  }


  checkinstitute(level) {
    let unique = false;
    this.levelValue.forEach((type) => {
      if (type.level_code === 'diploma' && level._id === type._id) {
        unique = true;
      }
    });
    if (unique) {
      this.selectedinstitute = false;
      this.selecteddiscipline = false;
    }
  }
  formatPercentage(index) {
    const val = this.profileForm.get('qualification').get(String(index)).get('percentage').value;
    if (val && val.includes('.')) {
      const ind = val.indexOf('.');

      if (ind > 2) {
        const val1 = val.replace('.', '');
        if (val1.length > 2) {
          const per = val1.slice(0, 2) + '.' + val1.slice(2, val1.length - 1);
          // const per = parseFloat(val).toFixed(2);
          this.profileForm.get('qualification').get(String(index)).get('percentage').setValue(per);
        }
      }
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
  download() {
    const redirectWindow =
      window.open('https://edutechstorage.blob.core.windows.net/container1/images/LnT%20Kaushalya%202020_Brochure.pdf', '_blank');
    redirectWindow.location;
  }
}

