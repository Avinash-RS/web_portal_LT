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
  selectfile: File;
  showSubmittedon = false;
  fileName: any;
  submitType: any;
  checkDetails: any;
  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router, public datePipe: DatePipe) {

    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
    this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    console.log(this.checkDetails);
    if (this.gs.checkLogout()) {
    this.userDetail = this.gs.checkLogout();
    }
    this.courseid =  this.checkDetails ?  this.checkDetails.course_id : localStorage.getItem('Courseid');
    this.getAssignmentmoduleData();
    this.getprojectActivityData();
    this.getperformActivityData();
  }

  ngOnInit() {}
  getSelectedIndex(i) {
    this.selectedIndex = i;
  }
  uploadDoc(event, project, submitAction) {
    console.log('sub', submitAction);
    this.selectfile = event.target.files[0] as File;
    this.learnerUploadVideo(project, submitAction);
  }
  uploadDocs() {
    this.fileInput.nativeElement.click();
  }

  // getperformActivityData
  getAssignmentmoduleData() {
    this.Lservice.getAssignmentmoduleData(
      this.courseid,
      this.userDetail.user_id
    ).subscribe((data: any) => {
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
        const startDate = new Date(element.projectActivity.activitystartdate);
        element.activityStartDate = moment(startDate).format('ll');
        element.startdate = moment(startDate).format('DD-MM-YYYY HH:MM');
        const endDate = new Date(element.projectActivity.activityenddate);
        element.activityEndDate = moment(endDate).format('ll');
        if (moment().format('DD-MM-YYYY HH:MM') < element.startdate) {
          element.enableSubmit = false;
        } else {
          element.enableSubmit = true;
        }
      });
 }
});
  }
// Pass courseid dynamically
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
    payload.append('uploadvideo', this.selectfile, this.selectfile.name);
    payload.append('course_id', 'r00owr2x');
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
      this.showSubmittedon = true;
      this.getprojectActivityData();
    });
  }

  // --------------------- Perform document upload ----------------------------

  uploadDocument(event, perform) {
    console.log('perform', perform);
    this.selectPerformfile.push(event.target.files[0] as File);
    this.performlearnerUploadVideo();
  }

  uploadDocuments(perform, performans) {
    console.log('perform', perform);
    console.log('performans', performans);
    this.performsData = performans;
    this.itrationData = perform;
    this.fileInput.nativeElement.click();
  }

  performlearnerUploadVideo() {
    console.log('this.performsData.activityEndDate', this.selectPerformfile);
    const currentDate = new Date();
    const performVideo = new FormData();
    performVideo.append('uploadvideo' , this.selectPerformfile[0]);
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
    console.log('performVideo', performVideo);
    this.Lservice.learnerUploadVideo(performVideo).subscribe((data: any) => {
      console.log('uploaded', data);
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
    console.log('removeVideo', videoName);
    // this.selectPerformfile = this.selectPerformfile.filter(data => data.lastModified !== videoName.lastModified);
  }
}
