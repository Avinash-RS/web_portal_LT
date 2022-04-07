import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AnonymousCredential, BlobServiceClient, newPipeline } from '@azure/storage-blob';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-performance-page-mobile',
  templateUrl: './performance-page-mobile.component.html',
  styleUrls: ['./performance-page-mobile.component.scss'],
})
export class PerformancePageMobileComponent implements OnInit {
  // @Input() performDetailsSend: any;
  @Input() performDetailPageData: any;
  @ViewChild('VideoInputPerform') videoInputPerform;
  blobKey = environment.blobKey;
  selectedName = 'Perform';
  selectedTabIndex: number;
  checkDetails: any;
  arrowUP = false;
  performId: any;
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
  currentFile: any;
  uploadedPercentage;
  fileSize = 0;
  flag: any;
  type: any;
  splitSize: any;
  fileTotalSize: any;
  verfyingCondition: any;
  isProgress = false;
  jsonData: any;
  ongoingPerformTask;
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
  pagination = false;
  page = 0;
  noofItems = 0;
  constructor(
    private commonServices: CommonServicesService,
    public Lservice: LearnerServicesService,
    private gs: GlobalServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public route: Router,
    public datePipe: DatePipe,
    private ngxLoader: NgxUiLoaderService,
    public translate: TranslateService
  ) {
    let lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');

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
  ngOnDestroy() {
    this.ngxLoader.stop();
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

  getperformActivityData() {
    this.performDetails = [];
    this.Lservice.getperformActivityData(
      this.userDetail.user_id,
      this.courseid, this.pagination, this.page, this.noofItems
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

 async performlearnerUploadVideo() {
    this.ngxLoader.start();
    const performVideo = new FormData();
    const startDate1 = new Date(this.performActivityData.activitystartdate);
    const startDate = moment(startDate1);
    const endDate1 = new Date(this.performActivityData.activityenddate);
    const endDate = moment(endDate1);
    if (moment() >= startDate &&
      moment() <= endDate) {
        this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectPerformfile.length; i++) {
      this.currentFile = this.selectPerformfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectPerformfile[i].type;
      var sizeData = this.currentFile.size / 1024;
      var sizeDatakb = sizeData / 1024;
      var finalSize = sizeDatakb.toFixed(2);
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] == 0) {
           this.fileTotalSize = sizeData.toFixed(2) + ' KB';
           this.verfyingCondition = sizeDatakb.toFixed(2);
       } else {
           this.verfyingCondition = sizeDatakb.toFixed(2);
           this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB';
       }
      performVideo.append('uploadvideo', this.selectPerformfile[i]);

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
      this.Lservice.learnerUploadVideo(performVideo).subscribe(async ( data: any) => {
      i = i + 1;
      if (data.success === true) {
        await this.multiFileUpload(data, i);
      } else {
        this.toastr.warning(data.message);
        this.ngxLoader.stop();
        setTimeout(() => {
          this.Lservice.sendMessage('', '0.00');
        }, 1000);
      }
    });
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
            ' course_id ': this.performsData.course_id,
            ' module_id ': this.performsData.module_id,
            ' topic_id ': this.performsData.topic_id,
            ' user_id ': this.userDetail.user_id,
            ' submit_status ': this.submitStatus,
            ' total_mark ': this.itrationData.total_mark,
            ' submitType ': 'perform',
            ' submitAction ': this.submitType,
            ' iterationid ': this.itrationData.iterationid,
            ' object_id ': this.performsData.perform_id,
            videodetails: [{
              doc_type: this.type,
              videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
              name: this.currentFile.name,
              size: this.fileTotalSize,
              id:  this.performsData.perform_id,
              uploaded_date: new Date(),
              is_active: true
            }]
          };
           let checkRes = await this.insertActivityRecord(this.jsonData);
           if (this.selectPerformfile.length == len) {
          this.toastr.success(data.message);
          this.ngxLoader.stop();
          this.selectPerformfile = [];
          setTimeout(() => {
            this.Lservice.sendMessage('', '0.00');
          }, 1000);
        }
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
  uploadDocument(event) {
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.mp4|\.mov|\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload video file only.');
      if (this.videoInputPerform) {
        this.videoInputPerform.nativeElement.value = '';
      }
      return;
    }
    let fileSize = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      fileSize += event.target.files[i].size;
      this.selectPerformfile.push(event.target.files[i]);
    }
    if ( fileSize / 1024 / 1024 > 150) {
      this.toastr.warning('The file size can not exceed 150 MB');
      this.selectPerformfile = [];
      if (this.videoInputPerform) {
        this.videoInputPerform.nativeElement.value = '';
      }
      return;
    }
    this.performlearnerUploadVideo();
  }

  uploadDocuments(itration, perform) {
    if (itration.videodetails.length == 3) {
      this.toastr.warning('You are allowed only to upload a maximum of 3 files');
      if (this.videoInputPerform) {
        this.videoInputPerform.nativeElement.value = '';
      }
      return false;
    }
    this.performsData = perform;
    this.itrationData = itration;
    this.videoInputPerform.nativeElement.click();
  }


// ----------------- Dialog Functions --------------------------

  closedialogbox() {
    this.dialog.closeAll();
  }

  playVideo(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
    if (path.imageurl) {
      path.path = path.imageurl;
    }
    if (path.videourl) {
      path.path = path.videourl;
    }
    if (docType !== 'video/mp4' && docType !== 'video/quicktime') {
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
      this.videoPreview(videoDialog, path);
    }
  }

playVideoMaterial(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
  let pathdata = {videourl:  path.path};
  if (docType !== 'video/mp4' || docType !== 'video/quicktime') {
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
    panelClass: 'popupModalContainer'
  });
  if (path.path.includes('?sv=')) {
  } else {
    path.path = path.path + this.blobKey;
  }
  this.docpath = path;
}

videoPreview(templateRef: TemplateRef<any>, path) {
  this.videoSource = path.path;
  this.dialog.open(templateRef, {
    width: '100%',
    height: '100%',
    panelClass: 'matDialogMat',
    closeOnNavigation: true,
    disableClose: true,
  });
}


mobileResponsive() {
  this.Lservice.closeMobileResp$.next(false);
}
}
