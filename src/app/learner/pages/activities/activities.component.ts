import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;
  @ViewChild('navWork', {read: DragScrollComponent}) dsWork: DragScrollComponent;
  @ViewChild('navActivity', {read: DragScrollComponent}) dsActivity: DragScrollComponent;
  @ViewChild('navSubmissions', {read: DragScrollComponent}) dsSubmissions: DragScrollComponent;
  @ViewChild('fileInput') fileInput;
  @ViewChild('videoInput') videoInput;
  @ViewChild('uploadInput') uploadInput;
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
  userDetail: any;
  docpath: any = null;
  assFile: File;
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
  // assignmentMessage = false;
  fromCalender = false;
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

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService, private commonServices: CommonServicesService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router, public datePipe: DatePipe) {
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid = this.checkDetails ? this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ? this.checkDetails.courseName : localStorage.getItem('CourseName');
    var index;
    if (this.checkDetails?.activityType) {
      this.fromCalender = true
      if(this.checkDetails?.activityType == 'Assignment'){
        index = '0'
      } else if (this.checkDetails?.activityType == 'Perform'){
        index = '1'
      } else {
        index = '2'
      }
    }else{
      this.fromCalender = false
       index = localStorage.getItem('userTabLocation');
    }
    
    if (index) {
      // tslint:disable-next-line:radix
      this.demo1TabIndex = parseInt(index);
    }
    if (this.demo1TabIndex.toString() == '0') {
      this.getAssignmentmoduleData();
    } else if (this.demo1TabIndex.toString() == '1') {
      this.getperformActivityData();
    } else {
      this.getprojectActivityData();
    }
  }

  ngOnInit() {
    // this.projectDetaildata = this.projectDetails;
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
  //Your Work
  leftBoundStatWork(reachesLeftBound: boolean) {
    this.leftNavDisabledWork = reachesLeftBound;
  }
  rightBoundStatWork(reachesRightBound: boolean) {
    this.rightNavDisabledWork = reachesRightBound;
  }
  //Submissions
  leftBoundStatSubmissions(reachesLeftBound: boolean) {
    this.leftNavDisabledSubmissions = reachesLeftBound;
  }
  rightBoundStatSubmissions(reachesRightBound: boolean) {
    this.rightNavDisabledSubmissions = reachesRightBound;
  }
  //Activity
  leftBoundStatActivity(reachesLeftBound: boolean) {
    this.leftNavDisabledActivity = reachesLeftBound;
  }
  rightBoundStatActivity(reachesRightBound: boolean) {
    this.rightNavDisabledActivity = reachesRightBound;
  }

  activeTab(event) {
    localStorage.setItem('userTabLocation', event.index);
  }

  tabChanged(event) {
    // if (this.demo1TabIndex.toString() == '0') {
    //   this.getAssignmentmoduleData();
    // } else if (this.demo1TabIndex.toString() == '1') {
    //   this.getperformActivityData();
    // } else {
    //   this.getprojectActivityData();
    // }

    this.currentTab = event.tab.textLabel;
    if (event.tab.textLabel === 'Perform') {
      this.getperformActivityData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.mobileResponsive = true;
      } else {
        this.mobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Project') {
      this.getprojectActivityData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.projectDetaildata = this.projectDetails;
        this.projectMobileResponsive = true;
      } else {
        this.projectMobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Assignments') {
      this.getAssignmentmoduleData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.assigmentMobileResponsive = true;
      } else {
        this.assigmentMobileResponsive = false;
      }
    }
  }

  goToCourse() {
    if(this.fromCalender){
      this.route.navigateByUrl('/Learner/calendar');
    } else {
      this.route.navigateByUrl('/Learner/MyCourse');
    }
  }
  getSelectedIndex(i) {
    this.selectedIndex = i;
  }
  uploadDoc(event, project, submitAction) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectfile.push(event.target.files[i]);
    }
    this.learnerUploadVideo(project, submitAction);
  }
  uploadDocs() {
    this.uploadInput.nativeElement.click();
  }

  // getperformActivityData
  getAssignmentmoduleData() {
    this.Lservice.getAssignmentmoduleData(
      this.courseid,
      this.userDetail.user_id
    ).subscribe((data: any) => {
      if (data.data.getAssignmentmoduleData.success) {
        // this.assignmentMessage = true;
        this.assignmentContent = data?.data?.getAssignmentmoduleData?.data[0];
        if (
          this.assignmentContent.courseStartDate &&
          this.assignmentContent.courseEndDate
        ) {
          const batchStartDate = new Date(this.assignmentContent.courseStartDate);
          const batchEndDate = new Date(this.assignmentContent.courseEndDate);          
          // this.courseStartDate = moment(batchStartDate).format('DD-MM-YYYY');
          // this.courseEndDate = moment(batchEndDate).format('DD-MM-YYYY');

          this.courseStartDate = moment(batchStartDate);
          this.courseEndDate = moment(batchEndDate);

          this.assignmentContent.coursedetails.forEach((element) => {
            element.moduledetails.forEach((moduleData) => {
              moduleData.resourse.files.forEach((fileData) => {
                if (fileData.startDate && fileData.endDate) {
                  //---------
                  // const date1 = JSON.parse(JSON.stringify(fileData.startDate));
                  // const date2 = JSON.parse(JSON.stringify(fileData.endDate));
                  // const startDate = new Date(date1);
                  // const endDate = new Date(date2);

                  let date1 = new Date(fileData.startDate);
                  fileData.assignmentStartDate = moment(date1);
                  let date2 = new Date(fileData.endDate);
                  fileData.assignmentEndDate = moment(date2);

                  // fileData.assignmentStartDate = moment(startDate).format(
                  //   'DD-MM-YYYY HH:mm'
                  // );
                  // fileData.assignmentEndDate = moment(endDate).format(
                  //   'DD-MM-YYYY HH:mm'
                  // );
                  
                  // if (
                  //   moment().format('DD-MM-YYYY HH:mm') >=
                  //   fileData.assignmentStartDate
                  // ) {
                  //   fileData.enableView = true;
                  // } else {
                  //   fileData.enableView = false;
                  // }
                  // if (
                  //   moment().format('DD-MM-YYYY HH:mm') >=
                  //   fileData.assignmentStartDate &&
                  //   moment().format('DD-MM-YYYY') <= this.courseEndDate
                  // ) {
                  //   fileData.enableUpload = true;
                  // } else if (
                  //   moment().format('DD-MM-YYYY HH:mm') <
                  //   fileData.assignmentStartDate ||
                  //   moment().format('DD-MM-YYYY') > this.courseEndDate
                  // ) {
                  //   fileData.enableUpload = false;
                  // }
                  
                  if (
                    moment() >=
                    fileData.assignmentStartDate
                  ) {
                    fileData.enableView = true;
                  } else {
                    fileData.enableView = false;
                  }

                  if (moment() >= fileData.assignmentStartDate &&
                    moment() <= this.courseEndDate) {
                      fileData.enableUpload = true;
                  } else if (moment() < fileData.assignmentStartDate || 
                    moment() > this.courseEndDate) {
                    fileData.enableUpload = false;
                  }
                }
              });
            });
          });
        }

      } else {
        // this.assignmentMessage = false;
      }
    });
  }



  projectPreviewDoc(templateRef: TemplateRef<any>, videoDialog, path, type) {
    if (type === 'material') {
      if (path.doc_type !== 'video/mp4') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
        });
        this.previewDoc = path;
      } else {
        this.videoSource = path.path;
        this.videoPreview(videoDialog, path);
      }
    } else if (type === 'files') {
      if (path.doc_type !== 'video/mp4') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
        });
        path.path = path.videourl;
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
    // this.addThreadForm?.reset();
  }

  uploadAssignmentsFile(
    event,
    fileId,
    modulename,
    topicname,
    assName,
    score,
    endDate,
    path
  ) {
    this.assFile = event.target.files[0] as File;
    this.postAssignmentsFile(
      fileId,
      modulename,
      topicname,
      assName,
      score,
      endDate,
      path
    );
  }

  postAssignmentsFile(
    fileId,
    modulename,
    topicname,
    assName,
    score,
    endDate,
    path
  ) {
    if (!score) {
      score = 50;
    }
    let submitStatus = 'ontime';
    const todayDate = moment().toDate();
    const startDate = moment(endDate).toDate();
    if (todayDate > startDate) {
      submitStatus = 'late';
    } else {
      submitStatus = 'ontime';
    }

    const payload = new FormData();
    payload.append('learnerdoc', this.assFile, this.assFile.name);
    payload.append('user_id', this.userDetail.user_id);
    payload.append('course_id', this.courseid);
    payload.append('topic_id', topicname);
    payload.append('module_id', modulename);
    payload.append('file_id', fileId);
    payload.append('type_name', assName);
    payload.append('submit_status', submitStatus);
    payload.append('total_mark', score);
    payload.append('questionUrl', path);
    this.wcaservice.uploadAssignments(payload).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message, null);
        this.getAssignmentmoduleData();
      } else {
        this.toastr.warning(data.message, null);
      }
    });
  }

  getprojectActivityData() {
    this.Lservice.getprojectActivityData(this.userDetail.user_id, this.courseid).subscribe((data: any) => {
      if (data && data.data && data.data.getprojectActivityData && data.data.getprojectActivityData.data) {
        this.projectDetails = data.data.getprojectActivityData.data; 
               
        this.projectDetails.forEach(element => {
          element.showLearnerList = false;
          // Batch date
          const batchEndDate = new Date(element.projectActivity.batchenddate);
          element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');
          
          element.submitType = moment().isSameOrBefore(batchEndDate);
          if (moment().format('DD-MM-YYYY') == moment(batchEndDate).format('DD-MM-YYYY')) {
            element.submitType = true;
          }
          // Activity Dates
          const startDate = new Date(element.projectActivity.activitystartdate);
          element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
          const endDate = new Date(element.projectActivity.activityenddate);
          element.enableSubmit = moment().isSameOrAfter(startDate);
          element.submittedOn = element.projectActivity.submitted_date
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
      link.href = doc.path;
      link.click();
    } else if (type === 'files') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      link.href = doc.videourl;
      link.click();
    }
  }

  getperformActivityData() {
    this.Lservice.getperformActivityData(
      this.userDetail.user_id, this.courseid
    ).subscribe((data: any) => {
      if (data && data.data && data.data.getperformActivityData && data.data.getperformActivityData.data) {
        this.performDetails = data.data.getperformActivityData.data;
        this.performDetails.forEach((element) => {
          // const startDate = this.datePipe.transform(element.performActivity.activitystartdate, 'dd-MM-yyyy HH:MM aa');
          // const endDate = this.datePipe.transform(element.performActivity.activityenddate, 'dd-MM-yyyy HH:MM aa');
          // const batchendDate = this.datePipe.transform(element.performActivity.batchenddate, 'dd-MM-yyyy HH:MM aa');
          // const crrDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy  HH:MM  aa');
          
          const batchEndDate = new Date(element.performActivity.batchenddate);
          element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');
          
          element.performSubmitType = moment().isSameOrBefore(batchEndDate);
          if (moment().format('DD-MM-YYYY') == moment(batchEndDate).format('DD-MM-YYYY')) {
            element.performSubmitType = true;
          }
  
          const crrDate = new Date();
          const startDate = new Date(element.performActivity.activitystartdate);
          element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
          const endDate = new Date(element.performActivity.activityenddate);
          element.itrationStarted = moment().isSameOrAfter(startDate);
          
          // const crrDate = new Date();
          // const startDate = new Date(element.performActivity.activitystartdate);
          // const endDate = new Date(element.performActivity.batchenddate);

            // tslint:disable-next-line:no-string-literal
          // element['itrationStarted']  = this.dateDiff(startDate,
          //   endDate , crrDate);
          // if (startDate <= crrDate && batchendDate >= crrDate) {
          //   // tslint:disable-next-line:no-string-literal
          //   element['itrationStarted'] = true;
          // } else {
          //   // tslint:disable-next-line:no-string-literal
          //   element['itrationStarted'] = false;
          // }
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

  learnerUploadVideo(project, submitAction) {
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
    }
    // payload.append('uploadvideo', this.selectfile, this.selectfile.name);
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
    this.commonServices.loader$.next(true);
    this.Lservice.learnerUploadVideo(payload).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message);
        this.showSubmittedon = true;
        this.getprojectActivityData();
        this.selectfile = [];
      } else {
        this.toastr.warning(data.message);
      }
    });
  }

  // Submit or Delete
  learnerSumbitdeleteVideo(project, deleteItem, submitAction) {

    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1);
    //----- pradeep comment-------
    //--------- date comparison should not do using format string or else it wont compare monthwise dates
    // commented by avinash
    // const startDate1 = new Date(project.projectActivity.activitystartdate);
    // project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:mm');
    // const endDate1 = new Date(project.projectActivity.activityenddate);
    // project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:mm');

    //----- pradeep comment-------
    //--------- date comparison should not do using format string or else it wont compare monthwise dates
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
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.mp4)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload video file only.');
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectPerformfile.push(event.target.files[i]);
      }
      this.performlearnerUploadVideo();
    }
  }

  uploadDocuments(e, perform, performans) {
    this.performsData = performans;
    this.itrationData = perform;
    this.videoInput.nativeElement.click();
  }

  performlearnerUploadVideo() {
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm a');
    const performVideo = new FormData();
    const startDate = this.datePipe.transform(this.performsData.performActivity.activitystartdate, 'dd-MM-yyyy HH:mm a');
    const endDate = this.datePipe.transform(this.performsData.performActivity.activityenddate, 'dd-MM-yyyy HH:mm a');
    if (currentDate >= startDate && currentDate <= endDate) {
      this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectPerformfile.length; i++) {
      performVideo.append('uploadvideo', this.selectPerformfile[i]);
    }
    // performVideo.append('uploadvideo' , this.selectPerformfile[0]);
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
    this.commonServices.loader$.next(true);
    this.Lservice.learnerUploadVideo(performVideo).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message);
        this.getperformActivityData();
        this.selectPerformfile = [];
      } else {
        this.toastr.warning(data.message);
      }
    });
  }

  submitDeleteVideo(videoName, itrdata, perform) {
    let videoFile = [];
    videoFile.push(videoName);
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm a');
    const performVideo = new FormData();
    const startDate = this.datePipe.transform(perform?.activitystartdate, 'dd-MM-yyyy HH:mm a');
    const endDate = this.datePipe.transform(perform?.activityenddate, 'dd-MM-yyyy HH:mm a');
    if (currentDate >= startDate && currentDate <= endDate) {
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
    this.docpath = path;
  }

  openDocument(templateRef: TemplateRef<any>, path, docType) {
    if(path == null) {
      this.toastr.warning("No Reports Found")
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
      this.previewDoc = path;
    } else if (docType === 'video/mp4') {
      if (path.videourl) {
        path.path = path.videourl;
      }
      this.videoSource = path.path;
      this.videoPreview(videoDialog, path.path);
    }
    else{
      this.toastr.warning("Invalid format")
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

}
