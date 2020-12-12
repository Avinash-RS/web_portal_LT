import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-mobile',
  templateUrl: './project-mobile.component.html',
  styleUrls: ['./project-mobile.component.scss']
})
export class ProjectMobileComponent implements OnInit {

  @ViewChild('uploadFile') uploadFile;
  @Input() projectDetailPageData: any;
  userDetail: any;
  checkDetails: any;
  courseid: any;
  courseName: any;
  projectDetails: any;
  projectdetailPage = false;
  isCollapsed = false;
  selectfile = [];
  showSubmittedon = false;
  fileName: any;
  groupDetails = [];
  groupName: any;
  previewDoc: any;
  videoSource: any;
  selectedName = 'Project';
  selectedTabIndex: number;

  indexNumber: number;
  projectActivityData: any;
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
  showDownload: boolean;

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
              public route: Router,  private commonServices: CommonServicesService) {
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
    this.projectDetails = this.projectDetailPageData;
    this.getprojectActivityData();
    this.projectDetails.forEach(element => {
      this.groupDetails = element.projectActivity.groupDetails;
      element.showLearnerList = false;
      // element.isCollapsed = false;
      // Batch date
      const batchEndDate = new Date(element.projectActivity.batchenddate);
      element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:MM');
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
  emiteData() {
    if (this.selectedName === 'project') {
    const data = {
      selectedName: this.selectedName,
      selectedTabIndex: this.selectedTabIndex,
    };
    this.commonServices.menuSelectedPerform$.next(data);
  } else {
    // this.Lservice.performView.next('performData', false)
  }
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
  uploadDocs(event) {
    event.stopPropagation();
    this.uploadFile.nativeElement.click();
  }

  getprojectActivityData() {
    this.Lservice.getprojectActivityData(this.userDetail.user_id, this.courseid).subscribe((data: any) => {
      if (data && data.data && data.data.getprojectActivityData && data.data.getprojectActivityData.data) {
      this.projectDetails = data.data.getprojectActivityData.data;
      this.projectDetails.forEach(element => {
        this.groupDetails = element.projectActivity.groupDetails;
        element.showLearnerList = false;
        // element.isCollapsed = false;
        // Batch date
        const batchEndDate = new Date(element.projectActivity.batchenddate);
        element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:MM');
        if (moment().format('DD-MM-YYYY HH:MM') <= element.batchEndDate) {
          element.submitType = true;
        } else {
          element.submitType = false;
        }
        // Activity Dates
        // const startDate = new Date(element.projectActivity.activitystartdate);
        // element.activityStartDate = moment(startDate).format('ll');
        // element.startdate = moment(startDate).format('DD-MM-YYYY HH:MM');
        // const endDate = new Date(element.projectActivity.activityenddate);
        // element.activityEndDate = moment(endDate).format('ll');

        const crrDate = new Date();
        const startDate = new Date(element.projectActivity.activitystartdate);
        // element.activityStartDate = moment(startDate).format('ll');
        element.startdate = moment(startDate).format('DD-MM-YYYY HH:MM');
        const endDate = new Date(element.projectActivity.activityenddate);
        // element.activityEndDate = moment(endDate).format('ll');
        element.enableSubmit = this.dateDiff(startDate,
          endDate, crrDate);
        const submitDate = new Date(element.projectActivity.submitted_on);
        element.submittedOn = moment(submitDate).format('ll');
        // if (moment().format('DD-MM-YYYY HH:MM') < element.startdate) {
        //   element.enableSubmit = false;
        // } else {
        //   element.enableSubmit = true;
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
  learnerView(templateRef: TemplateRef<any>, project) {
    this.groupName = project.projectActivity.groupname;
    this.dialog.open(templateRef, {
          width: '50%',
          height: '30%',
          panelClass: 'learnerDialog',
          closeOnNavigation: true,
          disableClose: true,
        });
        // this.previewDoc = path;
      }
      closedialogbox() {
        this.dialog.closeAll();
      }

      playVideo(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
        console.log('check path...', path);
        if (docType !== 'video/mp4') {
          this.dialog.open(templateRef, {
            width: '100%',
            height: '100%',
            closeOnNavigation: true,
            disableClose: true,
          });
          this.previewDoc = path;
      } else {
        this.videoPreview(videoDialog, path.path);
      }
    }
    videoPreview(templateRef: TemplateRef<any>, path) {
      this.videoSource = path;
      this.dialog.open(templateRef, {
        width: '100%',
        height: '100%',
        panelClass: 'matDialogMat',
        closeOnNavigation: true,
        disableClose: true,
      });
    }

    projectPreviewDoc(templateRef: TemplateRef<any>, videoDialog, path, type) {
      if (type === 'material') {
        this.showDownload = false;
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
          this.videoPreview(videoDialog, path.path);
        }
      } else if (type === 'files') {
        this.showDownload = true;
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
      console.log('doc', doc);
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      link.href = doc.path;
      link.click();
    }

    downloadFile(data) {
      window.open(data);
    }
}
