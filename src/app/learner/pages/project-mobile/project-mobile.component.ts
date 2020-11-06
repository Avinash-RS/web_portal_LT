import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-mobile',
  templateUrl: './project-mobile.component.html',
  styleUrls: ['./project-mobile.component.scss']
})
export class ProjectMobileComponent implements OnInit {

  @ViewChild('uploadInput') uploadInput;
  userDetail: any;
  checkDetails: any;
  courseid: any;
  courseName: any;
  projectDetails: any;
  projectdetailPage = false;
  isCollapsed = false;
  selectfile = [];
  showSubmittedon = false;

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router) {
                const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
                this.checkDetails = detail;
                if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
                this.courseid = this.checkDetails ? this.checkDetails.courseId : localStorage.getItem('Courseid');
                this.courseName = this.checkDetails ? this.checkDetails.courseName : localStorage.getItem('CourseName');
  }

  ngOnInit() {
    this.getprojectActivityData();
  }
  goToCourse() {
    this.route.navigateByUrl('/Learner/MyCourse');
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

}
