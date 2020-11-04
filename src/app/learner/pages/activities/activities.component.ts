import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { appendFile } from 'fs';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @ViewChild('videoInput') videoInput;
  @ViewChild('uploadInput') uploadInput;
  hover = false;
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
  selectedIndex = 0;
  selectfile = [];
  showSubmittedon = false;
  fileName: any;
  submitType: string;
  submitStatus: string;
  checkDetails: any;
  mobileResponsive: boolean;
  // assignmentMessage = false;
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

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router, public datePipe: DatePipe) {
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid =  this.checkDetails ?  this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ?  this.checkDetails.courseName : localStorage.getItem('CourseName');
    this.getAssignmentmoduleData();
    this.getprojectActivityData();
    this.getperformActivityData();
  }

  ngOnInit() { }
  goToCourse() {
    this.route.navigateByUrl('/Learner/MyCourse');
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
        this.assignmentContent = data.data.getAssignmentmoduleData.data[0];
        if (
          this.assignmentContent.courseStartDate &&
          this.assignmentContent.courseEndDate
        ) {
          const batchStartDate = new Date(this.assignmentContent.courseStartDate);
          const batchEndDate = new Date(this.assignmentContent.courseEndDate);
          this.courseStartDate = moment(batchStartDate).format('DD-MM-YYYY');
          this.courseEndDate = moment(batchEndDate).format('DD-MM-YYYY');
          this.assignmentContent.coursedetails.forEach((element) => {
            element.moduledetails.forEach((moduleData) => {
              moduleData.resourse.files.forEach((fileData) => {
                if (fileData.startDate && fileData.endDate) {
                  const date1 = JSON.parse(JSON.stringify(fileData.startDate));
                  const date2 = JSON.parse(JSON.stringify(fileData.endDate));
                  const startDate = new Date(date1);
                  const endDate = new Date(date2);
                  fileData.assignmentStartDate = moment(startDate).format(
                    'DD-MM-YYYY HH:MM'
                  );
                  fileData.assignmentEndDate = moment(endDate).format(
                    'DD-MM-YYYY HH:MM'
                  );
                  if (
                    moment().format('DD-MM-YYYY HH:MM') >=
                    fileData.assignmentStartDate
                  ) {
                    fileData.enableView = true;
                  } else {
                    fileData.enableView = false;
                  }
                  if (
                    moment().format('DD-MM-YYYY HH:MM') >=
                    fileData.assignmentStartDate &&
                    moment().format('DD-MM-YYYY') <= this.courseEndDate
                  ) {
                    fileData.enableUpload = true;
                  } else if (
                    moment().format('DD-MM-YYYY HH:MM') <
                    fileData.assignmentStartDate ||
                    moment().format('DD-MM-YYYY') > this.courseEndDate
                  ) {
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

  previewDoc(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
    });
    this.docpath = path;
  }

  projectPreviewDoc(templateRef: TemplateRef<any>, videoDialog, path, type) {
    if (type === 'material') {
      if (path.doc_type !== 'video/mp4') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
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
        // element.isCollapsed = false;
        // Batch date
        const batchEndDate = new Date(element.projectActivity.batchenddate);
        element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:MM');
        console.log('batch', element.batchEndDate);
        if (moment().format('DD-MM-YYYY HH:MM') <= element.batchEndDate) {
          element.submitType = true;
        } else {
          element.submitType = false;
        }
        // Activity Dates
        const startDate = new Date(element.projectActivity.activitystartdate);
        element.activityStartDate = moment(startDate).format('ll');
        element.startdate = moment(startDate).format('DD-MM-YYYY HH:MM');
        const endDate = new Date(element.projectActivity.activityenddate);
        element.activityEndDate = moment(endDate).format('ll');
        const submitDate = new Date(element.projectActivity.submitted_on);
        element.submittedOn = moment(submitDate).format('ll');
        if (moment().format('DD-MM-YYYY HH:MM') < element.startdate) {
          element.enableSubmit = false;
        } else {
          element.enableSubmit = true;
        }
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
      this.userDetail.user_id,  this.courseid
      // this.courseid
    ).subscribe((data: any) => {
      if (data && data.data && data.data.getperformActivityData && data.data.getperformActivityData.data) {
      this.performDetails = data.data.getperformActivityData.data;
      this.performDetails.forEach((element) => {
        const startDate = new Date(element.performActivity.activitystartdate);
        element.activityStartDate = moment(startDate).format('ll');
        element.startDate = moment(startDate).format('DD-MM-YYYY HH:MM');
        const endDate = new Date(element.performActivity.activityenddate);
        element.activityEndDate = moment(endDate).format('ll');
        if (moment(new Date()).format('ll') < element.activityStartDate) {
          this.itrationStarted = true;
        } else {
          this.itrationStarted = false;
        }
        if ( moment(new Date()).format('ll') > element.activityEndDate) {
          this.itrationEnded = true;
          this.submitStatus = 'ontime';
        } else {
          this.itrationEnded = false;
          this.submitStatus = 'late';
        }
      });
    }
    });
  }
  learnerUploadVideo(project, submitAction) {
    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:MM');
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:MM');
    let submitStatus = '';
    if (moment().format('DD-MM-YYYY HH:MM') >= project.actstartDate &&
      moment().format('DD-MM-YYYY HH:MM') <= project.actendDate) {
      submitStatus = 'ontime';
    } else if (moment().format('DD-MM-YYYY HH:MM') > project.actendDate) {
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
    project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:MM');
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:MM');
    let submitStatus = '';
    if (moment().format('DD-MM-YYYY HH:MM') >= project.actstartDate &&
    moment().format('DD-MM-YYYY HH:MM') <= project.actendDate) {
    submitStatus = 'ontime';
    } else if (moment().format('DD-MM-YYYY HH:MM') > project.actendDate) {
      submitStatus = 'late';
    }
    const submitData = {
      course_id : this.courseid,
      module_id : project.projectActivity.module_id,
      topic_id : project.projectActivity.topic_id,
      user_id : this.userDetail.user_id,
      submit_status : submitStatus,
      total_mark : project.projectActivity.total_mark,
      submitType : 'project',
      submitAction,
      iterationid : project.projectActivity.project_id,
      object_id : project.projectActivity.project_id,
      videodetails : submitAction === 'delete' ? [deleteItem] : []
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
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectPerformfile.push(event.target.files[i]);
  }
    this.performlearnerUploadVideo();
  }

  uploadDocuments(perform, performans) {
    this.performsData = performans;
    this.itrationData = perform;
    this.videoInput.nativeElement.click();
  }

  performlearnerUploadVideo() {
    const currentDate = new Date();
    const performVideo = new FormData();
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

  playVideo(previewDialog, videoDialog, path, docType) {
    if (docType === 'image/jpeg') {
    this.projectPreviewDoc(previewDialog, videoDialog, path, docType);
    } else if (docType === 'video/mp4') {
      this.videoSource = path;
      this.videoPreview(videoDialog, path);
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

}
