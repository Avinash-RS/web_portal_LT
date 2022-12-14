import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { AnonymousCredential, BlobServiceClient, newPipeline } from '@azure/storage-blob';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  @ViewChild('navWork', { read: DragScrollComponent }) dsWork: DragScrollComponent;
  @ViewChild('navActivity', { read: DragScrollComponent }) dsActivity: DragScrollComponent;
  @ViewChild('navSubmissions', { read: DragScrollComponent }) dsSubmissions: DragScrollComponent;
  @ViewChild('fileInput') fileInput;
  @ViewChild('videoInput') videoInput;
  @ViewChild('uploadInput') uploadInput;
  blobKey = environment.blobKey;
  perfornDetaildata: any;
  performdetailPageView = false;
  projectDetaildata: any;
  projectdetailPageView = false;
  hover = false;
  isLoader = false;
  hoverfile = false;
  itrationStarted: boolean;
  itrationEnded: boolean;
  selectPerformfile: any[] = [];
  performsData: any;
  itrationData: any;
  assignmentContent: any;
  courseStartDate: any;
  courseEndDate: any;
  courseid: any;
  groupDetailsName: any;
  userDetail: any;
  docpath: any = null;
  assignmentFile: File;
  openList = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isCollapsed = false;
  projectId: any;
  isperformColaps = false;
  performId: any;
  projectDetails: any;
  groupDetails: any;
  activityStartDate: string;
  activityEndDate: string;
  performDetails: any;
  iterationDetails: any;
  selectedIndex: any;
  selectfile = [];
  showSubmittedon = false;
  fileName: any;
  submitType: string;
  submitStatus: string;
  checkDetails: any;
  mobileResponsive: boolean;
  screenHeight: number;
  screenWidth: number;
  currentFile: any;
  uploadedPercentage;
  fileSize = 0;
  jsonData: any;
  isProgress = false;
  flag: any;
  type: any;
  splitSize: any;
  fileTotalSize: any;
  verfyingCondition: any;
  fromCalender = false;
  fromupskill;
  multiArray = [];
  trendingItration: any = {
    loop: false, // dont make it true
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    navSpeed: 900,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 2
      },
      740: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      },
      940: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      },
      1200: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      }
    },
    nav: true
  };
  trendingCategorires: any = {
    loop: false, // dont make it true
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    navSpeed: 900,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3,
        autoHeight: true,
      },
      940: {
        items: 3,
        autoHeight: true,
      },
      1200: {
        items: 4,
        autoHeight: true,
      }
    },
    nav: true
  };
  courseName: any;
  mouseOverIndex: any;
  videoSource: any;
  projectMobileResponsive = false;
  demo1TabIndex = 0;
  currentTab: any;
  assigmentMobileResponsive = false;
  leftNavDisabled = false;
  rightNavDisabled = false;
  leftNavDisabledWork = false;
  rightNavDisabledWork = false;
  leftNavDisabledSubmissions = false;
  rightNavDisabledSubmissions = false;
  leftNavDisabledActivity = false;
  rightNavDisabledActivity = false;
  previewDoc;
  openedIndex;
  spinnerType = SPINNER.circle;
  loaderText = 'Downloading...';
  isProgressBar = false;
  emptyAssignment = false;
  assignmentpreContent;
  ongoingPerformTask;
  ongoingProjectTask;
  isDownloadLoader;
  pagination = false;
  page = 0;
  noofItems = 0;
  AssigmnemtPayload: FormData;
  labpracticeData: any;
  labNoCard = false;
  assignmentLoader = false;
  performLoader = false;
  projectLoader = false;
  praticalsLoader = false;
  constructor(public Lservice: LearnerServicesService,
              private gs: GlobalServiceService,
              private commonServices: CommonServicesService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              public route: Router,
              public datePipe: DatePipe,
              private ngxLoader: NgxUiLoaderService,
              public activateroute: ActivatedRoute,
              public translate: TranslateService) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en') ;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    if (!this.userDetail?.is_password_updated) {
      this.route.navigate(['/Learner/profile']);
      return;
    }
    this.activateroute.queryParams.subscribe((result) => {
        const detail = {
          courseId: atob(result.courseId),
          courseName : atob(result.courseName),
          batchId : atob(result?.batchId),
          activityType : result.activityType
        };
        this.checkDetails = detail;
      });
    this.courseid = this.checkDetails ? this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ? this.checkDetails.courseName : localStorage.getItem('CourseName');
    // tslint:disable-next-line: no-var-keyword
    var index;
    if (this.checkDetails?.activityType) {
      this.fromCalender = true;
      if (this.checkDetails?.activityType === 'Assignment') {
        index = '0';
      } else if (this.checkDetails?.activityType === 'Perform') {
        index = '1';
      } else if (this.checkDetails?.activityType === 'Lab Practical') {
        index = '3';
      } else {
        index = '2';
      }
    } else {
      this.fromCalender = false;
      index = localStorage.getItem('userTabLocation');
    }

    if (index) {
      // tslint:disable-next-line:radix
      this.demo1TabIndex = parseInt(index);
    }
    if (this.demo1TabIndex.toString() === '0') {
      this.getAssignmentmoduleData();
    } else if (this.demo1TabIndex.toString() === '1') {
      this.getperformActivityData();
    } else if (this.demo1TabIndex.toString() === '3') {
      this.getLabPracticeData();
    } else {
      this.getprojectActivityData();
    }
  }

  ngOnInit() {
    this.fromupskill = true;
    this.Lservice.closeMobileResp$.subscribe((data: any) => {
      this.performdetailPageView = data;
    });
    this.Lservice.closeMobileResp$.subscribe((data: any) => {
      this.projectdetailPageView = data;
    });
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.currentTab === 'Perform' || this.demo1TabIndex === 1 && this.screenWidth < 800) {
      this.mobileResponsive = true;
    } else {
      this.mobileResponsive = false;
    }
    if (this.currentTab === 'Project' || this.demo1TabIndex === 2 && this.screenWidth < 800) {
      this.projectDetaildata = this.projectDetails;
      this.projectMobileResponsive = true;
    } else {
      this.projectMobileResponsive = false;
    }
    if (this.currentTab === 'Assignments' || this.demo1TabIndex === 0 && this.screenWidth < 800) {
      this.assigmentMobileResponsive = true;
    } else {
      this.assigmentMobileResponsive = false;
    }
  }

  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  moveLeftWork() {
    this.dsWork.moveLeft();
  }
  moveRightWork() {
    this.dsWork.moveRight();
  }
  moveLeftSubmissions() {
    this.dsSubmissions.moveLeft();
  }
  moveRightSubmissions() {
    this.dsSubmissions.moveRight();
  }
  moveLeftActivity() {
    this.dsActivity.moveLeft();
  }
  moveRightActivity() {
    this.dsActivity.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }
  // Your Work
  leftBoundStatWork(reachesLeftBound: boolean) {
    this.leftNavDisabledWork = reachesLeftBound;
  }
  rightBoundStatWork(reachesRightBound: boolean) {
    this.rightNavDisabledWork = reachesRightBound;
  }
  // Submissions
  leftBoundStatSubmissions(reachesLeftBound: boolean) {
    this.leftNavDisabledSubmissions = reachesLeftBound;
  }
  rightBoundStatSubmissions(reachesRightBound: boolean) {
    this.rightNavDisabledSubmissions = reachesRightBound;
  }
  // Activity
  leftBoundStatActivity(reachesLeftBound: boolean) {
    this.leftNavDisabledActivity = reachesLeftBound;
  }
  rightBoundStatActivity(reachesRightBound: boolean) {
    this.rightNavDisabledActivity = reachesRightBound;
  }

  activeTab(event) {
    localStorage.setItem('userTabLocation', event.index);
  }

  resourseAccord(courseResource, index) {
    this.openedIndex = index;
    if (courseResource) {
      courseResource.forEach((element, i) => {
        if (index === i) {
          if (element.isOpen) {
            element.isOpen = false;
          } else {
            element.isOpen = true;
          }
        } else {
          element.isOpen = false;
        }
      });
    }
  }

  tabChanged(event) {
    this.currentTab = event.tab.textLabel;
    if (event.tab.textLabel === 'Perform') {
      this.getperformActivityData('tab');
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.mobileResponsive = true;
      } else {
        this.mobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Project') {
      this.getprojectActivityData('tab');
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.projectDetaildata = this.projectDetails;
        this.projectMobileResponsive = true;
      } else {
        this.projectMobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Assignment') {
      this.getAssignmentmoduleData('tab');
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.assigmentMobileResponsive = true;
      } else {
        this.assigmentMobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Practice Online') {
      this.getLabPracticeData();
    }
  }

  goToCourse() {
    if (this.fromCalender) {
      if (this.userDetail.org_type === 'Corporate') {
        this.route.navigate(['/Learner/upskillcalendar']);
      } else {
        this.route.navigate(['/Learner/calendaractivity']);
      }
    } else {
      this.route.navigateByUrl('/Landing/MyCourse');
    }
  }
  getSelectedIndex(i) {
    this.selectedIndex = i;
  }
  uploadDoc(event, project, submitAction) {
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.mp4|\.mov|\.pdf|\.xlsx|\.csv|\.xls)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload a valid file');
      if (this.uploadInput) {
        this.uploadInput.nativeElement.value = '';
      }
      return false;
    }
    if (project?.projectActivity.videodetails.length === 3) {
      this.toastr.warning('You are allowed only to upload a maximum of 3 files');
      if (this.uploadInput) {
        this.uploadInput.nativeElement.value = '';
      }
      return false;
    }
    let fileSizeval = 0;
    if (event.target.files.length === 1) {
    for (let i = 0; i < event.target.files.length; i++) {
      fileSizeval += event.target.files[i].size;
      this.selectfile.push(event.target.files[i]);
    }
    if (fileSizeval / 1024 / 1024 > 150) {
        this.toastr.warning('The file size cannot exceed 150 MB');
        this.selectfile = [];
        if (this.uploadInput) {
          this.uploadInput.nativeElement.value = '';
        }
        return;
      }
    this.learnerUploadVideo(project, submitAction);
    } else if (event.target.files.length) {
      this.toastr.warning('You cannot upload more than 1 file at a one slot.');
    }
  }
  uploadDocs() {
    this.uploadInput.nativeElement.click();
  }
  // getLabPracticeData
  getLabPracticeData() {
    this.praticalsLoader = true;
    const labdata = {
      userId: this.userDetail.user_id,
      courseId: this.courseid,
      pagination: false,
      page: 0,
      noofItems: 0,
      username: this.userDetail.username
    };
    this.Lservice.getlabactivity(labdata).subscribe((result: any) => {
      this.praticalsLoader = false;
      if (result.data.getlabActivityData.success) {
        this.labpracticeData = result.data.getlabActivityData.data;
        this.labNoCard = false;
      } else {
        this.labNoCard = true;
        this.toastr.warning(result.data.getlabActivityData.message);
      }
    });
  }

  getEboxURL(eAttemptId) {
      const labactivitydetails = {
        username: this.userDetail.username,
        attempt_id: eAttemptId
      };
      this.Lservice.labactivity(labactivitydetails).subscribe((result: any) => {
        if (result.data.labactivity.data.url !== '') {
          this.redirectLabpractice(result.data.labactivity.data.url);
        } else {
          this.toastr.warning(result.data.labactivity.data.message);
        }
      });
    }
  redirectLabpractice(url) {
    window.open(url, 'Practice');
  }

  getAssignmentmoduleData(value?) {
  // getperformActivityData
  this.assignmentLoader = true;
  this.Lservice.getAssignmentmoduleData(this.userDetail.user_id, this.courseid, this.pagination,
    this.page, this.noofItems).subscribe((data: any) => {
      this.assignmentLoader = false;
      if (data.data.getAssignmentmoduleData.success) {
       this.assignmentContent = data?.data?.getAssignmentmoduleData?.data;
       console.log(this.assignmentContent, 'assignment Content')
       this.assignmentpreContent = data?.data?.getAssignmentmoduleData;
       if (this.assignmentContent == null) {
          this.emptyAssignment = true;
        } else {
          this.emptyAssignment = false;
        }

       if (this.assignmentpreContent.courseStartDate && this.assignmentpreContent.courseEndDate) {
          const batchStartDate = new Date(this.assignmentpreContent.courseStartDate);
          const batchEndDate = new Date(this.assignmentpreContent.courseEndDate);
          this.courseStartDate = moment(batchStartDate);
          this.courseEndDate = moment(batchEndDate).endOf('day').toDate();

          this.assignmentContent.forEach((fileData, i) => {
            if (this.openedIndex === i && !value) {
              if (fileData.isOpen) {
                fileData.isOpen = false;
              } else {
                fileData.isOpen = true;
              }
            } else {
              fileData.isOpen = false;
            }
            if (fileData.files.activitystartdate && fileData.files.activityenddate) {
                  const date1 = new Date(fileData.files.activitystartdate);
                  fileData.files.assignmentStartDate = moment(date1);
                  const date2 = new Date(fileData.files.activityenddate);
                  fileData.files.assignmentEndDate = moment(date2);
                  if (moment() >= fileData.files.assignmentStartDate) {
                    fileData.files.enableView = true;
                  } else {
                    fileData.files.enableView = false;
                  }

                  if (moment() >= fileData.files.assignmentStartDate &&
                    moment() <= this.courseEndDate) {
                    fileData.files.enableUpload = true;
                  } else if (moment() < fileData.files.assignmentStartDate ||
                    moment() > this.courseEndDate) {
                    fileData.files.enableUpload = false;
                  }
                }
          });
        }
      }
    });
  }



  projectPreviewDoc(templateRef: TemplateRef<any>, videoDialog, path, type) {
    if(path.doc_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      return false;
    }
    if (type === 'material') {
      if (path.doc_type !== 'video/mp4' && path.doc_type !== 'video/quicktime') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
        });
        if (path.path.includes('?sv=')) {
        } else {
          path.path = path.path + this.blobKey;
        }
        this.previewDoc = path;
      } else {
        this.videoSource = path.path;
        this.videoPreview(videoDialog, path);
      }
    } else if (type === 'files') {
      if (path.doc_type !== 'video/mp4' && path.doc_type !== 'video/quicktime') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
        });
        path.path = path.videourl;
        if (path.path.includes('?sv=')) {
        } else {
          path.path = path.path + this.blobKey;
        }
        this.previewDoc = path;
      } else {
        path.path = path.videourl;
        this.videoSource = path.videourl;
        this.videoPreview(videoDialog, this.videoSource);
      }
    }
  }

  downloadPdf(doc) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    link.href = doc.path;
    link.click();
  }
  closedialogbox() {
    this.dialog.closeAll();
  }

  uploadAssignmentsFile(event, assignemnt) {
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.xlsx|\.csv|\.xls)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload a valid file');
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
      return false;
    }
    let fileSize = 0;
    fileSize = event.target.files[0].size;
    if (fileSize / 1024 / 1024 > 10) {
        this.toastr.warning('The file size cannot exceed 10 MB');
        return;
      } else {
      this.assignmentFile = event.target.files[0] as File;
      this.fileInput.nativeElement.value = '';
      this.postAssignmentsFile(assignemnt.file_id, assignemnt.module_id, assignemnt.topic_id,
        assignemnt.activityname, assignemnt.total_mark, assignemnt.activityenddate);
    }
  }

  postAssignmentsFile(fileId, modulename, topicname, assignemtname, score, endDate) {
    this.ngxLoader.start();
    this.AssigmnemtPayload = null;
    if (!score) {
      score = 50;
    }
    const payload = new FormData();
    payload.append('learnerdoc', this.assignmentFile, this.assignmentFile.name);
    payload.append('user_id', this.userDetail.user_id);
    payload.append('course_id', this.courseid);
    payload.append('topic_id', topicname);
    payload.append('module_id', modulename);
    payload.append('file_id', fileId);
    payload.append('type_name', assignemtname);
    payload.append('submit_status', 'notsubmitted');
    payload.append('total_mark', score);
    payload.append('assignmentAction', 'upload');
    this.AssigmnemtPayload = payload;
    this.Lservice.uploadAssignments(this.AssigmnemtPayload).subscribe((data: any) => {
      if (data.success === true) {
        this.ngxLoader.stop();
        this.toastr.success(data.message, null);
        this.AssigmnemtPayload = null;
        this.getAssignmentmoduleData();
      } else {
        this.ngxLoader.stop();
        this.toastr.warning(data.message, null);
      }
    });
  }
  submitAssigmnemtData(assignemnt) {
    let submitStatus ;
    const todayDate = moment().toDate();
    const startDate = moment(assignemnt.activityenddate).toDate();
    if (todayDate > startDate) {
      submitStatus = 'late';
    } else {
      submitStatus = 'ontime';
    }
    const apidata = {
      course_id: assignemnt.course_id,
      file_id: assignemnt.file_id,
      user_id: this.userDetail.user_id,
      assignmentAction: 'submit',
      submit_status : submitStatus
  };
    this.Lservice.assignmentAction(apidata).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message, null);
        this.getAssignmentmoduleData();
      } else {
        this.toastr.warning(data.message, null);
      }
    });
  }
  deleteAssigmnemtData(assignemnt) {
    const apidata = {
      course_id : assignemnt.course_id,
      file_id : assignemnt.file_id,
      user_id : this.userDetail.user_id,
      assignmentAction : 'delete',
      submit_status : 'notsubmitted'
  };
    this.Lservice.assignmentAction(apidata).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message, null);
        this.getAssignmentmoduleData();
      } else {
        this.toastr.warning(data.message, null);
      }
    });
  }

  getprojectActivityData(value?) {
    this.projectLoader = true;
    this.Lservice.getprojectActivityData(this.userDetail.user_id, this.courseid, this.pagination,
      this.page, this.noofItems).subscribe((data: any) => {
      this.projectLoader = false;
      if (data && data.data && data.data.getprojectActivityData && data.data.getprojectActivityData.data) {
        this.projectDetails = data.data.getprojectActivityData.data;
        this.projectDetails.forEach((element, i) => {
          if (this.openedIndex === i && !value) {
            if (element.isOpen) {
              element.isOpen = false;
            } else {
              element.isOpen = true;
            }
          } else {
            element.isOpen = false;
          }
          element.showLearnerList = false;
          // Batch date
          const batchEndDate = new Date(element.projectActivity.batchenddate);
          element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');

          element.submitType = moment().isSameOrBefore(batchEndDate);
          if (moment().format('DD-MM-YYYY') === moment(batchEndDate).format('DD-MM-YYYY')) {
            element.submitType = true;
          }
          // Activity Dates
          const startDate = new Date(element.projectActivity.activitystartdate);
          element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
          const endDate = new Date(element.projectActivity.activityenddate);
          element.enableSubmit = moment().isSameOrAfter(startDate);
          element.submittedOn = element.projectActivity.submitted_date;
        });
      }
    });
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  downloadDoc(doc, type) {
    if (type === 'material') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      if (doc.path.includes('?sv=')) {
        link.href = doc.path;
      } else {
        link.href = doc.path + this.blobKey;
      }
      link.click();
    } else if (type === 'files') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      if (doc.videourl.includes('?sv=')) {
        link.href = doc.videourl;
      } else {
        link.href = doc.videourl + this.blobKey;
      }
      link.click();
    }
  }

  getperformActivityData(value?) {
    this.performLoader = true;
    this.Lservice.getperformActivityData(
      this.userDetail.user_id, this.courseid, this.pagination, this.page, this.noofItems
    ).subscribe((data: any) => {
      this.performLoader = false;
      if (data && data.data && data.data.getperformActivityData && data.data.getperformActivityData.data) {
        this.performDetails = data.data.getperformActivityData.data;
        this.performDetails.forEach((element, i) => {
          if (this.openedIndex === i && !value) {
            if (element.isOpen) {
              element.isOpen = false;
            } else {
              element.isOpen = true;
            }
          } else {
            element.isOpen = false;
          }

          const batchEndDate = new Date(element.performActivity.batchenddate);
          element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');

          element.performSubmitType = moment().isSameOrBefore(batchEndDate);
          if (moment().format('DD-MM-YYYY') === moment(batchEndDate).format('DD-MM-YYYY')) {
            element.performSubmitType = true;
          }

          const crrDate = new Date();
          const startDate = new Date(element.performActivity.activitystartdate);
          element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
          const endDate = new Date(element.performActivity.activityenddate);
          element.itrationStarted = moment().isSameOrAfter(startDate);
        });
      }
    });
  }

  dateDiff(startDate, endDate, currentDate) {
    const startDateDiff = startDate - currentDate;
    const endDateDiff = endDate - currentDate;
    if ((startDateDiff <= 0) && (endDateDiff >= 0)) {
      return true;
    } else {
      return false;
    }
  }

  groupDetailsPopup(event, templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '720px',
      height: '500px',
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'groupDetails'
    });
    this.groupDetailsName = event;
    console.log(this.groupDetailsName, 'popup');
  }

  async learnerUploadVideo(project, submitAction) {
    this.ngxLoader.start();
    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1);
    let submitStatus = '';
    if (moment() >= project.actstartDate &&
      moment() <= project.actendDate) {
      submitStatus = 'ontime';
    } else if (moment() > project.actendDate) {
      submitStatus = 'late';
    }
    const payload = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectfile.length; i++) {
      payload.append('uploadvideo', this.selectfile[i]);
      this.currentFile = this.selectfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectfile[i].type;
      // tslint:disable-next-line: prefer-const
      var sizeData = this.currentFile.size / 1024;
      var sizeDatakb = sizeData / 1024;
      var finalSize = sizeDatakb.toFixed(2);
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] === 0) {
        this.fileTotalSize = sizeData.toFixed(2) + ' KB';
        this.verfyingCondition = sizeDatakb.toFixed(2);
      } else {
        this.verfyingCondition = sizeDatakb.toFixed(2);
        this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB';
      }
    }
    payload.append('course_id', this.courseid);
    payload.append('module_id', project.projectActivity.module_id);
    payload.append('topic_id', project.projectActivity.topic_id);
    payload.append('user_id', this.userDetail.user_id);
    payload.append('submit_status', submitStatus);
    payload.append('total_mark', project.projectActivity.total_mark);
    payload.append('submitType', 'project');
    payload.append('submitAction', submitAction);
    payload.append('iterationid', project.projectActivity.project_id);
    payload.append('object_id', project.projectActivity.project_id);
    this.Lservice.learnerUploadVideo(payload).subscribe(async (data: any) => {
      if (data.success === true) {
        const sas = data.data;
        const pipeline = newPipeline(new AnonymousCredential(), {
          retryOptions: { maxTries: 4 }, // Retry options
          userAgentOptions: { userAgentPrefix: 'AdvancedSample V1.0.0' }, // Customized telemetry string
          keepAliveOptions: {
            // Keep alive is enabled by default, disable keep alive by setting false
            enable: false
          }
        });
        const blobServiceClient = new BlobServiceClient(`${sas.storageUri}?${this.blobKey}`, pipeline);
        const containerClient = blobServiceClient.getContainerClient(sas.containerName);
        if (!containerClient.exists()) {
          await containerClient.create();
        }
        const client = containerClient.getBlockBlobClient(this.currentFile.name);
        this.isProgress = true;
        this.uploadedPercentage = 0;
        const response = await client.uploadBrowserData(this.currentFile, {
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => {
            const uploaded = ev.loadedBytes;
            const percnt = uploaded * 100 / this.fileSize;
            this.uploadedPercentage = percnt.toFixed(2);
            this.Lservice.sendMessage('', this.uploadedPercentage.toString());
          },
          blobHTTPHeaders: { blobContentType: this.currentFile.type }
        });
        if (response._response.status === 201) {
          this.jsonData = {
            course_id : this.courseid, module_id : project.projectActivity.module_id, topic_id : project.projectActivity.topic_id,
            user_id : this.userDetail.user_id, submit_status : submitStatus, total_mark : project.projectActivity.total_mark,
            submitType : 'project', submitAction, iterationid : project.projectActivity.project_id,
            object_id : project.projectActivity.project_id,
            videodetails: [{
              doc_type: this.type,
              videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
              name: this.currentFile.name,
              size: this.fileTotalSize,
              id: project.projectActivity.project_id,
              uploaded_date: new Date(),
              is_active: true
            }]
          };
          const checkRes = await this.insertActivityRecordProject(this.jsonData);
          this.ngxLoader.stop();
          this.toastr.success(data.message);
          setTimeout(() => {
            this.Lservice.sendMessage('', '0.00');
          }, 1000);
          this.flag = 1;
        }
        this.selectPerformfile = [];
        this.showSubmittedon = true;
        this.selectfile = [];
      } else {
        this.selectfile = [];
        this.ngxLoader.stop();
        this.toastr.warning(data.message);
        setTimeout(() => {
          this.Lservice.sendMessage('', '0.00');
        }, 1000);
      }
    });
  }

  // Submit or Delete
  learnerSumbitdeleteVideo(project, deleteItem, submitAction) {
    if (this.ongoingProjectTask) {
      return false;
    }
    this.ongoingProjectTask = true;
    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1);
    // --------- date comparison should not do using format string or else it wont compare monthwise dates
    // commented by avinash
    // const startDate1 = new Date(project.projectActivity.activitystartdate);
    // project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:mm');
    // const endDate1 = new Date(project.projectActivity.activityenddate);
    // project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:mm');

    // --------- date comparison should not do using format string or else it wont compare monthwise dates
    let submitStatus = '';
    if (moment() >= project.actstartDate &&
      moment() <= project.actendDate) {
      submitStatus = 'ontime';

    } else if (moment() > project.actendDate) {
      submitStatus = 'late';
    }
    // commented by avinash
    // if (moment().format('DD-MM-YYYY HH:mm') >= project.actstartDate &&
    // moment().format('DD-MM-YYYY HH:mm') <= project.actendDate) {
    //   submitStatus = 'ontime';
    // } else if (moment().format('DD-MM-YYYY HH:mm') > project.actendDate) {
    //   submitStatus = 'late';
    // }
    const submitData = {
      course_id: this.courseid,
      module_id: project.projectActivity.module_id,
      topic_id: project.projectActivity.topic_id,
      user_id: this.userDetail.user_id,
      submit_status: submitStatus,
      total_mark: project.projectActivity.total_mark,
      submitType: 'project',
      submitAction,
      iterationid: project.projectActivity.project_id,
      object_id: project.projectActivity.project_id,
      videodetails: submitAction === 'delete' ? [deleteItem] : []
    };
    this.Lservice.learnerSumbitdeleteVideo(submitData).subscribe((data: any) => {
      this.ongoingProjectTask = false;
      if (data.success === true) {
        this.toastr.success(data.message);
        this.showSubmittedon = true;
        this.getprojectActivityData();
        deleteItem = [];
      } else {
        this.toastr.warning(data.message);
      }
    });
  }

  // --------------------- Perform document upload ----------------------------

  uploadDocument(event, perform) {
    // this.selectPerformfile.push(event.target.files[0] as File);
    if (event.target.files.length === 1) {
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.mp4|\.mov|\.pdf|\.xlsx|\.csv|\.xls)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload a valid file.');
      if (this.videoInput) {
        this.videoInput.nativeElement.value = '';
      }
      return;
    } else {
      let fileSize = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        fileSize += event.target.files[i].size;
        this.selectPerformfile.push(event.target.files[i]);
      }
      if (fileSize / 1024 / 1024 > 150) {
        this.toastr.warning('The file size cannot exceed 150 MB');
        this.selectPerformfile = [];
        if (this.videoInput) {
          this.videoInput.nativeElement.value = '';
        }
        return;
      }
      this.performlearnerUploadVideo();
    }
  } else if (event.target.files.length) {
    this.toastr.warning('You cannot upload more than 1 file at a one slot.');
  }
  }

  uploadDocuments(e, perform, performans) {
    if (perform.videodetails.length === 3) {
      this.toastr.warning('You are allowed only to upload a maximum of 3 files');
      if (this.videoInput) {
        this.videoInput.nativeElement.value = '';
      }
      return false;
    }
    this.performsData = performans;
    this.itrationData = perform;
    this.videoInput.nativeElement.click();
  }

  async performlearnerUploadVideo() {
    this.ngxLoader.start();
    this.uploadedPercentage = 0;
    this.flag = 0;
    const performVideo = new FormData();
    const startDate1 = new Date(this.performsData.performActivity.activitystartdate);
    const startDate = moment(startDate1);
    const endDate1 = new Date(this.performsData.performActivity.activityenddate);
    const endDate = moment(endDate1);
    if (moment() >= startDate &&
      moment() <= endDate) {
      this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }

    for (let i = 0; i < this.selectPerformfile.length; i++) {
      this.currentFile = this.selectPerformfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectPerformfile[i].type;
      var sizeData = this.currentFile.size / 1024;
      // tslint:disable-next-line: prefer-const
      var sizeDatakb = sizeData / 1024;
      var finalSize = sizeDatakb.toFixed(2);
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] === 0) {
        this.fileTotalSize = sizeData.toFixed(2) + ' KB';
        this.verfyingCondition = sizeDatakb.toFixed(2);
      } else {
        this.verfyingCondition = sizeDatakb.toFixed(2);
        this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB';
      }
      performVideo.append('uploadvideo', this.selectPerformfile[i]);
      if (this.verfyingCondition <= 150) {
        performVideo.append('course_id', this.performsData.performActivity.course_id);
        performVideo.append('module_id', this.performsData.performActivity.module_id);
        performVideo.append('topic_id', this.performsData.performActivity.topic_id);
        performVideo.append('user_id', this.userDetail.user_id);
        performVideo.append('submit_status', this.submitStatus);
        performVideo.append('total_mark', this.itrationData.total_mark);
        performVideo.append('submitType', 'perform');
        performVideo.append('submitAction', this.submitType);
        performVideo.append('iterationid', this.itrationData.iterationid);
        performVideo.append('object_id', this.performsData.performActivity.perform_id);
        this.Lservice.learnerUploadVideo(performVideo).subscribe(async (data: any) => {
          if (data.success === true) {
            await this.multiFileUpload(data, ( i + 1));
          } else {
            this.selectPerformfile = [];
            this.ngxLoader.stop();
            this.toastr.warning(data.message);
            setTimeout(() => {
              this.Lservice.sendMessage('', '0.00');
            }, 1000);
           }
        });
      } else {
        this.ngxLoader.stop();
        this.toastr.warning('File size should not greater than 150 MB');
        setTimeout(() => {
          this.Lservice.sendMessage('', '0.00');
        }, 1000);
      }
    }

  }
  async multiFileUpload(data,  len) {
    const sas = data.data;
    const pipeline = newPipeline(new AnonymousCredential(), {
      retryOptions: { maxTries: 4 }, // Retry options
      userAgentOptions: { userAgentPrefix: 'AdvancedSample V1.0.0' }, // Customized telemetry string
      keepAliveOptions: {
        // Keep alive is enabled by default, disable keep alive by setting false
        enable: false
      }
    });
    const blobServiceClient = new BlobServiceClient(`${sas.storageUri}?${this.blobKey}`, pipeline);
    const containerClient = blobServiceClient.getContainerClient(sas.containerName);
    if (!containerClient.exists()) {
      await containerClient.create();
    }
    const client = containerClient.getBlockBlobClient(this.currentFile.name);
    this.isProgress = true;
    this.uploadedPercentage = 0;
    const response = await client.uploadBrowserData(this.currentFile, {
      blockSize: 4 * 1024 * 1024, // 4MB block size
      concurrency: 20, // 20 concurrency
      onProgress: (ev) => {
        const uploaded = ev.loadedBytes;
        const percnt = uploaded * 100 / this.fileSize;
        this.uploadedPercentage = percnt.toFixed(2);
        if (this.selectPerformfile.length > 1) {
          this.Lservice.sendMessage(len + '/' + this.selectPerformfile.length, this.uploadedPercentage.toString());
        } else {
          this.Lservice.sendMessage('', this.uploadedPercentage.toString());

        }

      },
      blobHTTPHeaders: { blobContentType: this.currentFile.type }
    });

    if (response._response.status === 201) {

      this.jsonData = {
        course_id: this.performsData.performActivity.course_id,
        module_id : this.performsData.performActivity.module_id,
        topic_id : this.performsData.performActivity.topic_id,
        user_id : this.userDetail.user_id,
        submit_status : this.submitStatus,
        total_mark : this.itrationData.total_mark,
        submitType : 'perform',
        submitAction : this.submitType,
        iterationid : this.itrationData.iterationid,
        object_id : this.performsData.performActivity.perform_id,
        videodetails: [{
          doc_type: this.type,
          videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
          name: this.currentFile.name,
          size: this.fileTotalSize,
          id: this.performsData.performActivity.perform_id,
          uploaded_date: new Date(),
          is_active: true
        }]

      };
      const checkRes = await this.insertActivityRecord(this.jsonData);
      if (this.selectPerformfile.length === len) {
        this.toastr.success(data.message);
        this.ngxLoader.stop();
        setTimeout(() => {
          this.Lservice.sendMessage('', '0.00');
        }, 1000);
        this.selectPerformfile = [];
      }
      this.flag = 1;
    }



  }
  insertActivityRecord = async (performVideo) => {

    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if (data.success) {
        this.flag = 1;
        this.getperformActivityData();
      } else {
        this.flag = 0;
      }

    });
  }
  insertActivityRecordProject = async (performVideo) => {

    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if (data.success) {
        this.flag = 1;
        this.getprojectActivityData();
      } else {
        this.flag = 0;
      }

    });
  }
  submitDeleteVideo(videoName, itrdata, perform) {
    if (this.ongoingPerformTask) {
      return false;
    }
    this.ongoingPerformTask = true;
    let videoFile = [];
    videoFile.push(videoName);
    const startDate1 = new Date(perform.activitystartdate);
    const startDate = moment(startDate1);
    const endDate1 = new Date(perform.activityenddate);
    const endDate = moment(endDate1);
    if (moment() >= startDate &&
      moment() <= endDate) {
      this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }

    const data = {
      course_id: perform.course_id,
      module_id: perform.module_id,
      topic_id: perform.topic_id,
      user_id: this.userDetail.user_id,
      submit_status: this.submitStatus,
      total_mark: itrdata.total_mark,
      submitType: 'perform',
      submitAction: this.submitType,
      iterationid: itrdata.iterationid,
      object_id: perform.perform_id,
      videodetails: this.submitType === 'delete' ? videoFile : []
    };
    this.Lservice.learnerSumbitdeleteVideo(data).subscribe((response: any) => {
      this.ongoingPerformTask = false;
      if (response.success === true) {
        this.toastr.success(response.message);
        this.getperformActivityData();
        videoFile = [];
      } else {
        this.toastr.warning(response.message);
      }
    });
  }

  previewAssignment(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'popupModalContainer'
    });
    if (path.path.includes('?sv=')) {
    } else {
      path.path = path.path + this.blobKey;
    }
    this.docpath = path;
  }

  openDocument(templateRef: TemplateRef<any>, path, docType) {
    if (path == null) {
      this.toastr.warning('No Reports Found');
      return false;
    }
    path.path = path.imageurl;

    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'popupModalContainer'
    });
    if (path.path.includes('?sv=')) {
    } else {
      path.path = path.path + this.blobKey;
    }
    this.previewDoc = path;
  }

  playVideo(templateRef: TemplateRef<any>, videoDialog, path, docType) {
    if (docType === 'image/jpeg' || docType === 'application/pdf' || docType === 'image/png') {
      this.dialog.open(templateRef, {
        width: '100%',
        height: '100%',
        closeOnNavigation: true,
        disableClose: true,
        panelClass: 'popupModalContainer'
      });
      if (path.videourl) {
        path.path = path.videourl;
      }
      if (path.path.includes('?sv=')) {
        path.path = path.path;
      } else {
        path.path = path.path + this.blobKey;
      }
      this.previewDoc = path;
    } else if (docType === 'video/mp4' || docType === 'video/quicktime') {
      if (path.videourl) {
        path.path = path.videourl;
      }
      this.videoSource = path.path;
      this.videoPreview(videoDialog, path.path);
    } else {
      // this.toastr.warning('Invalid format');
    }
  }

  videoPreview(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      width: '90%',
      height: '95%',
      panelClass: 'matDialogMat',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  mouseover(index) {
    this.mouseOverIndex = index;
  }

  performdetailPage(index, performData) {
    this.perfornDetaildata = { perfornData: performData, index };
  }
  downloadProject(url, fileName) {
this.isDownloadLoader = true;
fetch(url)
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    const objectURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    if (link.download !== undefined) {
      link.setAttribute('href', objectURL);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.isDownloadLoader = false;
    }
});
  }

}
