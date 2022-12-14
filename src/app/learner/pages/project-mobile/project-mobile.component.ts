import { Component, OnInit, TemplateRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AnonymousCredential, BlobServiceClient, newPipeline } from '@azure/storage-blob';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-project-mobile',
  templateUrl: './project-mobile.component.html',
  styleUrls: ['./project-mobile.component.scss']
})
export class ProjectMobileComponent implements OnInit, OnDestroy {

  @ViewChild('uploadFile') uploadFile;
  @Input() projectDetailPageData: any;
  blobKey = environment.blobKey;
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
  groupCount: any;
  learnerGroupDetails = [];
  previewDoc: any;
  videoSource: any;
  openedIndex;
  selectedName = 'Project';
  selectedTabIndex: number;
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
  indexNumber: number;
  projectActivityData: any;
  ongoingProjectTask;
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
  pagination = false;
  page = 0;
  noofItems = 0;
  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              private dialog: MatDialog, private toastr: ToastrService,
              public route: Router,  private commonServices: CommonServicesService,
              private ngxLoader: NgxUiLoaderService, public translate: TranslateService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en') ;
                const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
                this.checkDetails = detail;
                if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
                this.courseid = this.checkDetails ? this.checkDetails.courseId : localStorage.getItem('Courseid');
                this.courseName = this.checkDetails ? this.checkDetails.courseName : localStorage.getItem('CourseName');
  }

  ngOnDestroy() {
    this.ngxLoader.stop();
  }
  ngOnInit() {
    this.projectDetails = this.projectDetailPageData;
    this.getprojectActivityData();
    if (this.projectDetails) {
      this.projectDetails.forEach(element => {
        this.groupDetails = element.projectActivity.groupDetails;
        element.showLearnerList = false;
        // element.isCollapsed = false;
        // Batch date
        const batchEndDate = new Date(element.projectActivity.batchenddate);
        element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');
        if (moment().format('DD-MM-YYYY HH:mm') <= element.batchEndDate) {
          element.submitType = true;
        } else {
          element.submitType = false;
        }
        // Activity Dates
        const startDate = new Date(element.projectActivity.activitystartdate);
        element.activityStartDate = moment(startDate).format('ll');
        element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
        const endDate = new Date(element.projectActivity.activityenddate);
        element.activityEndDate = moment(endDate).format('ll');
        // const submitDate = new Date(element.projectActivity.submitted_on);
        // element.submittedOn = moment(submitDate).format('ll');
        element.submittedOn = element.projectActivity.submitted_date;
        if (moment().format('DD-MM-YYYY HH:mm') < element.startdate) {
          element.enableSubmit = false;
        } else {
          element.enableSubmit = true;
        }
      });
    } else {
      this.projectDetails = [];
    }
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
    this.route.navigateByUrl('/Landing/MyCourse');
  }

  uploadDoc(event, project, submitAction) {
    if (project?.projectActivity.videodetails.length === 3) {
      this.toastr.warning('You are allowed only to upload a maximum of 3 files');
      if (this.uploadFile) {
        this.uploadFile.nativeElement.value = '';
      }
      return false;
    }
    const filePath = event.target.files[0].name;
    const re = /(\.jpg|\.jpeg|\.png|\.pdf|\.mp4|\.mov)$/i;
    if (!re.exec(filePath)) {
      this.toastr.warning('Upload a valid file format');
      if (this.uploadFile) {
        this.uploadFile.nativeElement.value = '';
      }
      return;
    }
    let fileSizeval = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      fileSizeval += event.target.files[i].size;
      this.selectfile.push(event.target.files[i]);
    }
    if (fileSizeval / 1024 / 1024 > 150) {
      this.toastr.warning('The file size can not exceed 150 MB');
      this.selectfile = [];
      if (this.uploadFile) {
        this.uploadFile.nativeElement.value = '';
      }
      return;
    }
    this.learnerUploadVideo(project, submitAction);
  }
  uploadDocs(event) {
    event.stopPropagation();
    this.uploadFile.nativeElement.click();
  }

  getprojectActivityData() {
    this.Lservice.getprojectActivityData(this.userDetail.user_id, this.courseid,
      this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      if (data && data.data && data.data.getprojectActivityData && data.data.getprojectActivityData.data) {
      this.projectDetails = data.data.getprojectActivityData.data;
      this.projectDetails.forEach((element, i) => {
        if (this.openedIndex === i) {
          if (element.isOpen) {
            element.isOpen = false;
          } else {
            element.isOpen = true;
          }
        } else {
          element.isOpen = false;
        }
        this.groupDetails = element.projectActivity.groupDetails;
        element.showLearnerList = false;
        // element.isCollapsed = false;
        // Batch date
        const batchEndDate = new Date(element.projectActivity.batchenddate);
        element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');
        element.submitType = moment().isSameOrBefore(batchEndDate);
        if (moment().format('DD-MM-YYYY') === moment(batchEndDate).format('DD-MM-YYYY')) {
          element.submitType = true;
        }
        // if (moment().format('DD-MM-YYYY HH:mm') <= element.batchEndDate) {
        //   element.submitType = true;
        // } else {
        //   element.submitType = false;
        // }
        // Activity Dates
        // const startDate = new Date(element.projectActivity.activitystartdate);
        // element.activityStartDate = moment(startDate).format('ll');
        // element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
        // const endDate = new Date(element.projectActivity.activityenddate);
        // element.activityEndDate = moment(endDate).format('ll');

        const crrDate = new Date();
        const startDate = new Date(element.projectActivity.activitystartdate);
        // element.activityStartDate = moment(startDate).format('ll');
        element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
        const endDate = new Date(element.projectActivity.activityenddate);
        // element.activityEndDate = moment(endDate).format('ll');
        // element.enableSubmit = this.dateDiff(startDate,
        //   endDate, crrDate);
        element.enableSubmit = moment().isSameOrAfter(startDate);
        // const submitDate = new Date(element.projectActivity.submitted_on);
        // element.submittedOn = moment(submitDate).format('ll');
        element.submittedOn = element.projectActivity.submitted_date;
        // if (moment().format('DD-MM-YYYY HH:mm') < element.startdate) {
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

  async learnerUploadVideo(project, submitAction) {
    this.ngxLoader.start();
    const startDate1 = new Date(project.projectActivity.activitystartdate);
    // project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:mm');
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    // project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:mm');
    project.actendDate = moment(endDate1);

    // let submitStatus = '';
    // if (moment().format('DD-MM-YYYY HH:mm') >= project.actstartDate &&
    //   moment().format('DD-MM-YYYY HH:mm') <= project.actendDate) {
    //   submitStatus = 'ontime';
    // } else if (moment().format('DD-MM-YYYY HH:mm') > project.actendDate) {
    //   submitStatus = 'late';
    // }
    let submitStatus = '';
    if (moment() >= project.actstartDate &&
      moment() <= project.actendDate) {
      submitStatus = 'ontime';
    } else if (moment() > project.actendDate) {
      submitStatus = 'late';
    }
    const payload = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectfile.length; i++) {
      payload.append('uploadvideo', this.selectfile[i]);
      this.currentFile = this.selectfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectfile[i].type;
      const sizeData = this.currentFile.size / 1024;
      const sizeDatakb = sizeData / 1024;
      const finalSize = sizeDatakb.toFixed(2);
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] === 0) {
        this.fileTotalSize = sizeData.toFixed(2) + ' KB';
        this.verfyingCondition = sizeDatakb.toFixed(2);
      } else {
        this.verfyingCondition = sizeDatakb.toFixed(2);
        this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB';
      }
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
    this.Lservice.learnerUploadVideo(payload).subscribe(async (data: any) => {
      if (data.success === true) {
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
            this.Lservice.sendMessage('', this.uploadedPercentage.toString());
          },
          blobHTTPHeaders: { blobContentType: this.currentFile.type }
        });

        if (response._response.status === 201) {

          this.jsonData = {
            ' course_id ': this.courseid,
            ' module_id ': project.projectActivity.module_id,
            ' topic_id ': project.projectActivity.topic_id,
            ' user_id ': this.userDetail.user_id,
            ' submit_status ': submitStatus,
            ' total_mark ': project.projectActivity.total_mark,
            ' submitType ': 'project',
            ' submitAction ': submitAction,
            ' iterationid ': project.projectActivity.project_id,
            ' object_id ': project.projectActivity.project_id,
            videodetails: [{
              doc_type: this.type,
              videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
              name: this.currentFile.name,
              size: this.fileTotalSize,
              id: project.projectActivity.project_id,
              uploaded_date: new Date(),
              is_active: true
            }]

          };
          const checkRes = await this.insertActivityRecordProject(this.jsonData);
          this.toastr.success(data.message);
          this.ngxLoader.stop();
          this.showSubmittedon = true;
          // this.getprojectActivityData();
          this.selectfile = [];
          this.flag = 1;
          setTimeout(() => {
            this.Lservice.sendMessage('', '0.00');
          }, 1000);
        }
      } else {
        this.ngxLoader.stop();
        this.toastr.warning(data.message);
        setTimeout(() => {
          this.Lservice.sendMessage('', '0.00');
        }, 1000);
      }
    });
  }
  insertActivityRecordProject = async (performVideo) => {
    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if (data.success) {
        this.flag = 1;
        this.getprojectActivityData();
      } else {
        this.flag = 0;
      }
    });
  }
  // Submit or Delete
  learnerSumbitdeleteVideo(project, deleteItem, submitAction) {
    if (this.ongoingProjectTask) {
      return false;
    }
    this.ongoingProjectTask = true;
    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1);
    let submitStatus = '';
    if (moment() >= project.actstartDate &&
    moment() <= project.actendDate) {
      submitStatus = 'ontime';
    } else if (moment() > project.actendDate) {
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
      this.ongoingProjectTask = false;
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
    this.groupCount = project.projectActivity.groupDetails.length;
    this.learnerGroupDetails = project.projectActivity.groupDetails;
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
      openDocument(templateRef: TemplateRef<any>, path, docType) {
        if (path == null) {
          this.toastr.warning('No Reports Found');
          return false;
        }
        path.path = path.imageurl;
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
        });
        if (path.path.includes('?sv=')) {
        } else {
          path.path = path.path + this.blobKey;
        }
        this.previewDoc = path;
      }
      playVideo(templateRef: TemplateRef<any>, videoDialog,  path, docType) {
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
        if (path.doc_type !== 'video/mp4' && path.doc_type !== 'video/quicktime') {
          this.dialog.open(templateRef, {
            width: '100%',
            height: '100%',
            closeOnNavigation: true,
            disableClose: true,
          });
          if (path.path.includes('?sv=')) {
          } else {
            path.path = path.path + this.blobKey;
          }
          this.previewDoc = path;
        } else {
          this.videoSource = path.path;
          this.videoPreview(videoDialog, path.path);
        }
      } else if (type === 'files') {
        this.showDownload = true;
        if (path.doc_type !== 'video/mp4' && path.doc_type !== 'video/quicktime') {
          this.dialog.open(templateRef, {
            width: '100%',
            height: '100%',
            closeOnNavigation: true,
            disableClose: true,
          });
          path.path = path.videourl;
          if (path.path.includes('?sv=')) {
          } else {
            path.path = path.path + this.blobKey;
          }
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

    downloadFile(data) {
      if (data.includes('?sv=')) {
        window.open(data);
      } else {
        window.open(data + this.blobKey);
      }
    }
    resourseAccord(courseResource, index) {
      this.openedIndex = index;
      if (courseResource) {
        courseResource.forEach((element, i) => {
          if (index === i) {
            if (element.isOpen) {
              element.isOpen = false;
            } else {
              element.isOpen = true;
            }
          } else {
            element.isOpen = false;
          }
        });
      }
    }
}
