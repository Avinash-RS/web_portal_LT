import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from "@angular/core";
import { GlobalServiceService } from "@core/services/handlers/global-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonServicesService } from "@core/services/common-services.service";
import { MatDialog } from "@angular/material";
import { MatAccordion } from "@angular/material/expansion";
import { LearnerServicesService } from "@learner/services/learner-services.service";
import { WcaService } from "@wca/services/wca.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { appendFile } from "fs";


@Component({
  selector: "app-performance-page-mobile",
  templateUrl: "./performance-page-mobile.component.html",
  styleUrls: ["./performance-page-mobile.component.scss"],
})
export class PerformancePageMobileComponent implements OnInit {
  // @Input() performDetailsSend: any;

  @ViewChild("videoInput") videoInput;
  selectedName = "Perform";
  selectedTabIndex: number;
  checkDetails: any;
  performdetailPage = false;
  arrowUP = false;
  videoPerview = false;
  @Input() detailDataToPerform;
  @Input() courceDetails;
  @Output() menuSelected = new EventEmitter<any>();
  userDetail: any;
  courseName: any;
  courseid: any;
  performDetails: any;
  itrationStarted: boolean;
  itrationEnded: boolean;
  submitStatus: string;
  performActivityData: any;
  indexNumber: number;
  openIndex: number;
  performsData: any;
  itrationData: any;
  selectPerformfile: any[] = [];
  submitType: string;
  videoRecord = false;
  itrationDataSend: any;
  docpath: any = null;
  videoSource: any;
  preview: boolean;
  videoUrl: any;
  videoStart = false;
  performDetailsSend: any;
  itrationSend: any;
  videoDetails: any;

  constructor(
    private commonServices: CommonServicesService,
    public Lservice: LearnerServicesService,
    private gs: GlobalServiceService,
    private dialog: MatDialog,
    public wcaservice: WcaService,
    private toastr: ToastrService,
    public route: Router,
    public datePipe: DatePipe
  ) {
    const detail =
      this.route.getCurrentNavigation() &&
      this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state &&
      this.route.getCurrentNavigation().extras.state.data;
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
      this.courseid = this.checkDetails
        ? this.checkDetails.courseId
        : localStorage.getItem('Courseid');
      this.courseName = this.checkDetails
        ? this.checkDetails.courseName
        : localStorage.getItem('CourseName');
    }
  }

  ngOnInit() {
    this.Lservice.closeRecoderdData$.subscribe((data: any) => {
      console.log('data', data);
      this.videoUrl = data.videourl;
      this.videoDetails = data;
      if (this.videoUrl) {
      this.videoStart = true;
      }
    });
    this.Lservice.performDetailsSend$.subscribe((data: any) => {
      this.performDetailsSend = data;
    });
    this.Lservice.itrationSend$.subscribe((data: any) => {
      this.itrationSend = data;
    });

    console.log('this.videoStart', this.videoStart);
    this.getperformActivityData();
  }

  getData(templateRef: TemplateRef<any>, itration) {
    this.itrationDataSend = itration;
    this.videoStart = false;
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      panelClass: 'matDialogMat1',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
 
    submitDeleteVideo(videoName, itrdata, perform) {
      let videoFile = [];
      videoFile.push(videoName);
      let data = {
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

  getperformActivityData() {
    // console.log("this.performDetails 1234");
    this.Lservice.getperformActivityData(
      this.userDetail.user_id,
      this.courseid
      // this.courseid
    ).subscribe((data: any) => {
      if (
        data &&
        data.data &&
        data.data.getperformActivityData &&
        data.data.getperformActivityData.data
      ) {
        this.performDetails = data.data.getperformActivityData.data;
        console.log("this.performDetails", this.performDetails);
        this.performDetails.forEach((element) => {
          const startDate = new Date(element.performActivity.activitystartdate);
          element.activityStartDate = moment(startDate).format("ll");
          element.startDate = moment(startDate).format("DD-MM-YYYY HH:MM");
          const endDate = new Date(element.performActivity.activityenddate);
          element.activityEndDate = moment(endDate).format("ll");
          if (moment(new Date()).format("DD-MM-YYYY HH:MM") < element.activityStartDate) {
            this.itrationStarted = true;
          } else {
            this.itrationStarted = false;
          }
          if (moment(new Date()).format("DD-MM-YYYY HH:MM") > element.activityEndDate) {
            this.itrationEnded = true;
            this.submitStatus = 'late';
          } else {
            this.itrationEnded = false;
            this.submitStatus = 'ontime';
          }
        });
      } else {
        this.performDetails = [];
      }
    });
  }

  emiteData() {
    if (this.selectedName === 'perform') {
    const data = {
      selectedName: this.selectedName,
      selectedTabIndex: this.selectedTabIndex,
    };
    console.log("data", data);
    this.commonServices.menuSelectedPerform$.next(data);
  } else {
    // this.Lservice.performView.next('performData', false)
  }
}

  openItration(index) {
    this.openIndex = index;
  }

  getPerformActivity(number, performActivity) {
    console.log("performActivity", number, performActivity);
    this.indexNumber = number;
    this.performActivityData = performActivity;
  }

  performlearnerUploadVideo() {
    const currentDate = new Date();
    const performVideo = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectPerformfile.length; i++) {
      performVideo.append('uploadvideo', this.selectPerformfile[i]);
    }
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

  uploadDocument(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectPerformfile.push(event.target.files[i]);
    }
    this.performlearnerUploadVideo();
  }

  uploadDocuments(itration, perform) {
    this.performsData = perform;
    this.itrationData = itration;
    this.videoInput.nativeElement.click();
  }


//----------------- Dialog Functions --------------------------

  closedialogbox() {
    this.dialog.closeAll();
    // this.addThreadForm?.reset();
  }

  playVideo(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
     if (docType !== 'video/mp4') {
      this.dialog.open(templateRef, {
        width: '100%',
        height: '100%',
        closeOnNavigation: true,
        disableClose: true,
      });
      this.previewDoc = path;
  } else {
    this.videoPreview(videoDialog, path);
  }
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

videoPreview(templateRef: TemplateRef<any>, path) {
  console.log('path', path);
  this.videoSource = path.videourl;
  console.log('this.videoSource', this.videoSource);
  this.dialog.open(templateRef, {
    width: '100%',
    height: '100%',
    panelClass: 'matDialogMat',
    closeOnNavigation: true,
    disableClose: true,
  });
}

// upload recorded video
learnerRecordVideo() {
  const performVideo = {
    course_id : this.performDetailsSend.course_id,
    module_id : this.performDetailsSend.module_id,
    topic_id : this.performDetailsSend.topic_id,
    user_id: this.userDetail.user_id,
    submit_status: 'ontime',
    total_mark: this.itrationSend.total_mark,
    submitType: 'perform',
    submitAction: 'upload',
    recordvideo : true,
    iterationid: this.itrationSend.iterationid,
    object_id: this.performDetailsSend.perform_id,
    videodetails : {
        doc_type : 'video/mp4',
        videourl : this.videoDetails.videourl,
        name : this.videoDetails.fileName,
        size : this.videoDetails.size,
        id : this.performDetailsSend.perform_id,
        uploaded_date : new Date(),
        is_active : true
    }
  };
  this.Lservice.learnerRecordVideo(performVideo).subscribe((data: any) => {
    if (data.success === true) {
      this.toastr.success(data.message);
      this.videoStart = false;
      this.performDetailsSend = {};
      this.videoDetails = {};
      this.itrationSend = {};
      this.closeDialog();
      this.getperformActivityData();
    } else {
      this.toastr.warning(data.message);
    }
  });
}

mobileResponsive() {
  this.Lservice.closeMobileResp$.next(false);
}
}
