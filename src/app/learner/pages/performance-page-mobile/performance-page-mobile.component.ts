import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-performance-page-mobile',
  templateUrl: './performance-page-mobile.component.html',
  styleUrls: ['./performance-page-mobile.component.scss'],
})
export class PerformancePageMobileComponent implements OnInit {
  // @Input() performDetailsSend: any;
  @Input() performDetailPageData: any;
  @ViewChild('videoInput') videoInput;
  selectedName = 'Perform';
  selectedTabIndex: number;
  checkDetails: any;
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
    this.indexNumber = this.performDetailPageData.index;
    this.performActivityData = this.performDetailPageData.perfornData;
    this.Lservice.closeRecoderdData$.subscribe((data: any) => {
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

  getperformActivityData() {
    this.performDetails = [];
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
        this.getPerformActivity(this.indexNumber, this.performDetails[this.indexNumber - 1].performActivity);
        this.performDetails.forEach((element) => {
          // const startDate = this.datePipe.transform(element.performActivity.activitystartdate, 'dd-MM-yyyy');
          // const endDate = this.datePipe.transform(element.performActivity.activityenddate, 'dd-MM-yyyy');
          // const batchendDate = this.datePipe.transform(element.performActivity.batchenddate, 'dd-MM-yyyy');
          // const crrDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
          // if (startDate <= crrDate && batchendDate >= crrDate) {
          //   element.itrationStarted = true;
          // } else {
          //   element.itrationStarted = false;
          // }
          const crrDate = new Date();
          const startDate = new Date(element.performActivity.activitystartdate);
          const endDate = new Date(element.performActivity.batchenddate);

            // tslint:disable-next-line:no-string-literal
          element['itrationStarted']  = this.dateDiff(startDate,
            endDate , crrDate);
        });
        const filterData = this.performDetails.filter((performData: any) => {
          return performData.performActivity.perform_id === this.performActivityData.perform_id;
        });
        this.performActivityData = filterData[0];
      } else {
        this.performDetails = [];
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

  emiteData() {
    if (this.selectedName === 'perform') {
    const data = {
      selectedName: this.selectedName,
      selectedTabIndex: this.selectedTabIndex,
    };
    this.commonServices.menuSelectedPerform$.next(data);
  } else {
    // this.Lservice.performView.next('performData', false)
  }
}

  openItration(index) {
    this.openIndex = index;
  }

  getPerformActivity(index, performActivity) {
    this.indexNumber = index;
    this.performActivityData = performActivity;
  }

  performlearnerUploadVideo() {
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const performVideo = new FormData();
    const startDate = this.datePipe.transform(this.performActivityData.activitystartdate, 'dd-MM-yyyy');
    const endDate = this.datePipe.transform(this.performActivityData.activityenddate, 'dd-MM-yyyy');
    if (currentDate >= startDate && currentDate <= endDate) {
      this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectPerformfile.length; i++) {
      performVideo.append('uploadvideo', this.selectPerformfile[i]);
    }
    performVideo.append('course_id', this.performsData.course_id);
    performVideo.append('module_id', this.performsData.module_id);
    performVideo.append('topic_id', this.performsData.topic_id);
    performVideo.append('user_id', this.userDetail.user_id);
    performVideo.append('submit_status', this.submitStatus);
    performVideo.append('total_mark', this.itrationData.total_mark);
    performVideo.append('submitType', 'perform');
    performVideo.append('submitAction', this.submitType);
    performVideo.append('iterationid', this.itrationData.iterationid);
    performVideo.append('object_id', this.performsData.perform_id);
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


// ----------------- Dialog Functions --------------------------

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

playVideoMaterial(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
  let pathdata = {videourl:  path.path};
  if (docType !== 'video/mp4') {
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
    });
    this.previewDoc = path.path;
} else {
  this.videoPreview(videoDialog, pathdata);
}
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

videoPreview(templateRef: TemplateRef<any>, path) {
  this.videoSource = path.videourl;
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
