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
  @ViewChild('uploadInput') uploadInput;
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
  public isCollapsed = false;
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
  submitType: any;
  checkDetails: any;
  assignmentMessage = false;
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
  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router, public datePipe: DatePipe) {

    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    console.log('id', this.checkDetails);
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid =  this.checkDetails ?  this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.getAssignmentmoduleData();
    this.getprojectActivityData();
    this.getperformActivityData();
  }

  ngOnInit() { }
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
        this.assignmentMessage = true;
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
                    moment().format('DD-MM-YYYY HH:MM') <= this.courseEndDate
                  ) {
                    fileData.enableUpload = true;
                  } else if (
                    moment().format('DD-MM-YYYY HH:MM') <
                    fileData.assignmentStartDate ||
                    moment().format('DD-MM-YYYY HH:MM') > this.courseEndDate
                  ) {
                    fileData.enableUpload = false;
                  }
                }
              });
            });
          });
        }

      } else {
        this.assignmentMessage = true;
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
  downloadDoc(doc) {
    console.log('download', doc);
    const link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    link.href = doc.videourl;
    link.click();
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
      } else {
        this.toastr.warning(data.message);
      }
    });
  }

  getperformActivityData() {
    this.Lservice.getperformActivityData(this.userDetail.user_id , this.courseid).subscribe((data: any) => {
      this.performDetails = data.data.getperformActivityData.data;
      this.performDetails.forEach((element) => {
        const startDate = new Date(element.performActivity.activitystartdate);
        element.activityStartDate = moment(startDate).format('ll');
        element.startDate = moment(startDate).format('DD-MM-YYYY HH:MM');
        const endDate = new Date(element.performActivity.activityenddate);
        element.activityEndDate = moment(endDate).format('ll');
      });
    });
  }


  // --------------------- Perform document upload ----------------------------

  uploadDocument(event, perform) {
    this.selectPerformfile.push(event.target.files[0] as File);
    this.performlearnerUploadVideo();
  }

  uploadDocuments(perform, performans) {
    this.performsData = performans;
    this.itrationData = perform;
    this.fileInput.nativeElement.click();
  }

  performlearnerUploadVideo() {
    const currentDate = new Date();
    const performVideo = new FormData();
    performVideo.append('uploadvideo', this.selectPerformfile[0]);
    performVideo.append('course_id', this.performsData.performActivity.course_id);
    performVideo.append('module_id', this.performsData.performActivity.module_id);
    performVideo.append('topic_id', this.performsData.performActivity.topic_id);
    performVideo.append('user_id', this.userDetail.user_id);
    performVideo.append('submit_status', 'ontime');
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

  removeVideo(videoName) {
    // this.selectPerformfile = this.selectPerformfile.filter(data => data.lastModified !== videoName.lastModified);
  }
}
