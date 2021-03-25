import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AnonymousCredential, BlobServiceClient, newPipeline } from '@azure/storage-blob';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-performance-page-mobile',
  templateUrl: './performance-page-mobile.component.html',
  styleUrls: ['./performance-page-mobile.component.scss'],
})
export class PerformancePageMobileComponent implements OnInit {
  // @Input() performDetailsSend: any;
  @Input() performDetailPageData: any;
  @ViewChild('VideoInputPerform') videoInputPerform;
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
  flag:any;
  type:any;
  splitSize:any;
  fileTotalSize:any;
  verfyingCondition:any;
  isProgress = false;
  jsonData:any;
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
    public datePipe: DatePipe,
    private ngxLoader: NgxUiLoaderService
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
      // const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm a');
      // const startDate = this.datePipe.transform(perform?.activitystartdate, 'dd-MM-yyyy HH:mm a');
      // const endDate = this.datePipe.transform(perform?.activityenddate, 'dd-MM-yyyy HH:mm a');
      // if (currentDate >= startDate && currentDate <= endDate) {
      //   this.submitStatus = 'ontime';
      // } else {
      //   this.submitStatus = 'late';
      // }

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
    // const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const performVideo = new FormData();
    // const startDate = this.datePipe.transform(this.performActivityData.activitystartdate, 'dd-MM-yyyy HH:mm a');
    // const endDate = this.datePipe.transform(this.performActivityData.activityenddate, 'dd-MM-yyyy HH:mm a');
    // if (currentDate >= startDate && currentDate <= endDate) {
    //   this.submitStatus = 'ontime';
    // } else {
    //   this.submitStatus = 'late';
    // }

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
       this.type=this.selectPerformfile[i].type
       var sizeData = this.currentFile.size / 1024
       var sizeDatakb = sizeData / 1024
       var finalSize = sizeDatakb.toFixed(2)
       this.splitSize = finalSize.split('.');
       if (this.splitSize[0] == 0) {
           this.fileTotalSize = sizeData.toFixed(2) + ' KB'
           this.verfyingCondition=sizeDatakb.toFixed(2)
       } else {
           this.verfyingCondition=sizeDatakb.toFixed(2)
           this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB'
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
    this.Lservice.learnerUploadVideo(performVideo).subscribe(async(data: any) => {
      i=i+1
      if (data.success === true) {
        await this.multiFileUpload(data, i)
        
      } else {
        this.toastr.warning(data.message);
        this.ngxLoader.stop();
        setTimeout(()=>{
          this.Lservice.sendMessage('','0.00');
        },1000)
      }
    });
  }
  }
  async multiFileUpload(data,len){
    const sas = data.data;
        const pipeline = newPipeline(new AnonymousCredential(), {
          retryOptions: { maxTries: 4 }, // Retry options
          userAgentOptions: { userAgentPrefix: 'AdvancedSample V1.0.0' }, // Customized telemetry string
          keepAliveOptions: {
            // Keep alive is enabled by default, disable keep alive by setting false
            enable: false
          }
        });
        const blobServiceClient = new BlobServiceClient(`${sas.storageUri}?${sas.storageAccessToken}`, pipeline);
        const containerClient = blobServiceClient.getContainerClient(sas.containerName);
        if (!containerClient.exists()) {
          await containerClient.create();
        }
        const client = containerClient.getBlockBlobClient(this.currentFile.name);
        this.isProgress = true;
        this.uploadedPercentage=0
        const response = await client.uploadBrowserData(this.currentFile, {
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => {
            const uploaded = ev.loadedBytes;
            const percnt = uploaded * 100 / this.fileSize;
            this.uploadedPercentage = percnt.toFixed(2);
            if (this.selectPerformfile.length > 1) {
              this.Lservice.sendMessage(len + '/' + this.selectPerformfile.length,this.uploadedPercentage.toString()); 
            } else {
              this.Lservice.sendMessage('',this.uploadedPercentage.toString()); 
    
            }
          },
          blobHTTPHeaders: { blobContentType: this.currentFile.type }
        });
        
        if (response._response.status === 201) {
        
           this.jsonData = {
            'course_id': this.performsData.course_id,
            'module_id': this.performsData.module_id,
            'topic_id': this.performsData.topic_id,
            'user_id': this.userDetail.user_id,
            'submit_status': this.submitStatus,
            'total_mark': this.itrationData.total_mark,
            'submitType': 'perform',
            'submitAction': this.submitType,
            'iterationid': this.itrationData.iterationid,
            'object_id':this.performsData.perform_id,
            videodetails:[{
              doc_type:this.type,
              videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
              name: this.currentFile.name,
              size: this.fileTotalSize,
              id:  this.performsData.perform_id,
              uploaded_date: new Date(),
              is_active: true
            }]
            
          }
        let checkRes=await this.insertActivityRecord(this.jsonData)
        if (this.selectPerformfile.length == len) {
          this.toastr.success(data.message);
          this.ngxLoader.stop();
          this.selectPerformfile = [];
          setTimeout(()=>{
            this.Lservice.sendMessage('','0.00');
          },1000)
        }
       // this.getperformActivityData();
      
        }
  }
  insertActivityRecord=async(performVideo)=>{
  
    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if(data.success){
        this.flag=1
        this.getperformActivityData();
      }else{
        this.flag=0
      }
      
    })
  }	
  uploadDocument(event) {
    let fileSize = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      fileSize += event.target.files[i].size;
      this.selectPerformfile.push(event.target.files[i]);
    }
    if(fileSize/1024/1024 > 150){
      this.toastr.warning("The file size can not exceed 150 MB");
      this.selectPerformfile = [];
      return;
    }
    this.performlearnerUploadVideo();
  }

  uploadDocuments(itration, perform) {
    if(itration.videodetails.length == 3) {
      this.toastr.warning("You are allowed only to upload a maxiumum of 3 files");
      return false;
    }
    this.performsData = perform;
    this.itrationData = itration;
    this.videoInputPerform.nativeElement.click();
  }


// ----------------- Dialog Functions --------------------------

  closedialogbox() {
    this.dialog.closeAll();
    // this.addThreadForm?.reset();
  }

  playVideo(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
    if (path.imageurl) {
      path.path = path.imageurl;
    }
    if (path.videourl) {
      path.path = path.videourl;
    }
     if (docType !== 'video/mp4') {
      this.dialog.open(templateRef, {
        width: '100%',
        height: '100%',
        closeOnNavigation: true,
        disableClose: true,
        panelClass: 'popupModalContainer'
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
      panelClass: 'popupModalContainer'
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
    panelClass: 'popupModalContainer'
  });
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
