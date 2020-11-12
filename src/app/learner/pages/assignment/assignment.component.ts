import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  userDetail: any;
  checkDetails: any;
  courseid: any;
  assignmentContent: any;
  courseStartDate: any;
  courseEndDate: any;
  courseName: any;
  assFile: File;
  docpath: any = null;

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              public route: Router, public wcaservice: WcaService,
              private toastr: ToastrService, private dialog: MatDialog) { 
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid =  this.checkDetails ?  this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ?  this.checkDetails.courseName : localStorage.getItem('CourseName');
    this.getAssignmentmoduleData();
  }

  ngOnInit() {
  }

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

  previewDoc(templateRef: TemplateRef<any>, path) {
    console.log('path', path);
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

}
