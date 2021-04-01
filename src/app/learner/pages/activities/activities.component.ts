import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { AnonymousCredential, BlobServiceClient, newPipeline } from '@azure/storage-blob';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  @ViewChild('navWork', { read: DragScrollComponent }) dsWork: DragScrollComponent;
  @ViewChild('navActivity', { read: DragScrollComponent }) dsActivity: DragScrollComponent;
  @ViewChild('navSubmissions', { read: DragScrollComponent }) dsSubmissions: DragScrollComponent;
  @ViewChild('fileInput') fileInput;
  @ViewChild('videoInput') videoInput;
  @ViewChild('uploadInput') uploadInput;

  perfornDetaildata: any;
  performdetailPageView = false;
  projectDetaildata: any;
  projectdetailPageView = false;
  hover = false;
  isLoader = false;
  hoverfile = false;
  itrationStarted: boolean;
  itrationEnded: boolean;
  selectPerformfile: any[] = [];
  performsData: any;
  itrationData: any;
  assignmentContent: any;
  courseStartDate: any;
  courseEndDate: any;
  courseid: any;
  userDetail: any;
  docpath: any = null;
  assignmentFile: File;
  openList = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isCollapsed = false;
  projectId: any;
  isperformColaps = false;
  performId: any;
  projectDetails: any;
  groupDetails: any;
  activityStartDate: string;
  activityEndDate: string;
  performDetails: any;
  iterationDetails: any;
  selectedIndex: any;
  selectfile = [];
  showSubmittedon = false;
  fileName: any;
  submitType: string;
  submitStatus: string;
  checkDetails: any;
  mobileResponsive: boolean;
  screenHeight: number;
  screenWidth: number;
  currentFile: any;
  uploadedPercentage;
  fileSize = 0;
  jsonData: any;
  isProgress = false;
  flag: any;
  type: any;
  splitSize: any;
  fileTotalSize: any;
  verfyingCondition: any;
  // assignmentMessage = false;
  fromCalender = false;
  multiArray = [];
  trendingItration: any = {
    loop: false, // dont make it true
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    navSpeed: 900,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 2
      },
      740: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      },
      940: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      },
      1200: {
        items: 2,
        autoHeight: true,
        autoWidth: true
      }
    },
    nav: true
  };
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
  courseName: any;
  mouseOverIndex: any;
  videoSource: any;
  projectMobileResponsive = false;
  demo1TabIndex = 0;
  currentTab: any;
  assigmentMobileResponsive = false;
  leftNavDisabled = false;
  rightNavDisabled = false;
  leftNavDisabledWork = false;
  rightNavDisabledWork = false;
  leftNavDisabledSubmissions = false;
  rightNavDisabledSubmissions = false;
  leftNavDisabledActivity = false;
  rightNavDisabledActivity = false;
  previewDoc;
  openedIndex;
  spinnerType = SPINNER.circle;
  loaderText = 'Downloading...';
  isProgressBar = false;
  emptyAssignment = false;
  assignmentpreContent;
  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService, private commonServices: CommonServicesService,
    private dialog: MatDialog, public wcaservice: WcaService, private toastr: ToastrService,
    public route: Router, public datePipe: DatePipe, private ngxLoader: NgxUiLoaderService) {
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid = this.checkDetails ? this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ? this.checkDetails.courseName : localStorage.getItem('CourseName');
    var index;
    if (this.checkDetails?.activityType) {
      this.fromCalender = true
      if (this.checkDetails?.activityType == 'Assignment') {
        index = '0'
      } else if (this.checkDetails?.activityType == 'Perform') {
        index = '1'
      } else {
        index = '2'
      }
    } else {
      this.fromCalender = false
      index = localStorage.getItem('userTabLocation');
    }

    if (index) {
      // tslint:disable-next-line:radix
      this.demo1TabIndex = parseInt(index);
    }
    if (this.demo1TabIndex.toString() == '0') {
      this.getAssignmentmoduleData();
    } else if (this.demo1TabIndex.toString() == '1') {
      this.getperformActivityData();
    } else {
      this.getprojectActivityData();
    }
  }

  ngOnInit() {
    // this.projectDetaildata = this.projectDetails;
    this.Lservice.closeMobileResp$.subscribe((data: any) => {
      this.performdetailPageView = data;
    });
    this.Lservice.closeMobileResp$.subscribe((data: any) => {
      this.projectdetailPageView = data;
    });
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.currentTab === 'Perform' || this.demo1TabIndex === 1 && this.screenWidth < 800) {
      this.mobileResponsive = true;
    } else {
      this.mobileResponsive = false;
    }
    if (this.currentTab === 'Project' || this.demo1TabIndex === 2 && this.screenWidth < 800) {
      this.projectDetaildata = this.projectDetails;
      this.projectMobileResponsive = true;
    } else {
      this.projectMobileResponsive = false;
    }
    if (this.currentTab === 'Assignments' || this.demo1TabIndex === 0 && this.screenWidth < 800) {
      this.assigmentMobileResponsive = true;
    } else {
      this.assigmentMobileResponsive = false;
    }
  }

  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  moveLeftWork() {
    this.dsWork.moveLeft();
  }
  moveRightWork() {
    this.dsWork.moveRight();
  }
  moveLeftSubmissions() {
    this.dsSubmissions.moveLeft();
  }
  moveRightSubmissions() {
    this.dsSubmissions.moveRight();
  }
  moveLeftActivity() {
    this.dsActivity.moveLeft();
  }
  moveRightActivity() {
    this.dsActivity.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }
  //Your Work
  leftBoundStatWork(reachesLeftBound: boolean) {
    this.leftNavDisabledWork = reachesLeftBound;
  }
  rightBoundStatWork(reachesRightBound: boolean) {
    this.rightNavDisabledWork = reachesRightBound;
  }
  //Submissions
  leftBoundStatSubmissions(reachesLeftBound: boolean) {
    this.leftNavDisabledSubmissions = reachesLeftBound;
  }
  rightBoundStatSubmissions(reachesRightBound: boolean) {
    this.rightNavDisabledSubmissions = reachesRightBound;
  }
  //Activity
  leftBoundStatActivity(reachesLeftBound: boolean) {
    this.leftNavDisabledActivity = reachesLeftBound;
  }
  rightBoundStatActivity(reachesRightBound: boolean) {
    this.rightNavDisabledActivity = reachesRightBound;
  }

  activeTab(event) {
    localStorage.setItem('userTabLocation', event.index);
  }

  resourseAccord(courseResource, index) {
    this.openedIndex = index
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

  tabChanged(event) {
    // if (this.demo1TabIndex.toString() == '0') {
    //   this.getAssignmentmoduleData();
    // } else if (this.demo1TabIndex.toString() == '1') {
    //   this.getperformActivityData();
    // } else {
    //   this.getprojectActivityData();
    // }

    this.currentTab = event.tab.textLabel;
    if (event.tab.textLabel === 'Perform') {
      this.getperformActivityData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.mobileResponsive = true;
      } else {
        this.mobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Project') {
      this.getprojectActivityData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.projectDetaildata = this.projectDetails;
        this.projectMobileResponsive = true;
      } else {
        this.projectMobileResponsive = false;
      }
    } else if (event.tab.textLabel === 'Assignments') {
      this.getAssignmentmoduleData();
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 800) {
        this.assigmentMobileResponsive = true;
      } else {
        this.assigmentMobileResponsive = false;
      }
    }
  }

  goToCourse() {
    if (this.fromCalender) {
      this.route.navigateByUrl('/Learner/calendar');
    } else {
      this.route.navigateByUrl('/Learner/MyCourse');
    }
  }
  getSelectedIndex(i) {
    this.selectedIndex = i;
  }
  uploadDoc(event, project, submitAction) {
    if(project?.projectActivity.videodetails.length == 3) {
      this.toastr.warning("You are allowed only to upload a maximum of 3 files");
      if (this.uploadInput) {
        this.uploadInput.nativeElement.value = '';
      }     
       return false;
    }
    let fileSizeval = 0;
    if(event.target.files.length==1){
    for (let i = 0; i < event.target.files.length; i++) {
      fileSizeval += event.target.files[i].size;
      this.selectfile.push(event.target.files[i]);
    }
       if(fileSizeval/1024/1024 > 150){
        this.toastr.warning("The file size can not exceed 150 MB");
        this.selectfile = [];
        if (this.uploadInput) {
          this.uploadInput.nativeElement.value = '';
        } 
        return;
      }
    this.learnerUploadVideo(project, submitAction);
    }else if(event.target.files.length){
      this.toastr.warning('You cannot upload more than 1 file at a one slot.')
    }
  }
  uploadDocs() {
    this.uploadInput.nativeElement.click();
  }

  // getperformActivityData
  getAssignmentmoduleData() {
    this.Lservice.getAssignmentmoduleData(this.userDetail.user_id,this.courseid).subscribe((data: any) => {
      if (data.data.getAssignmentmoduleData.success) {
       console.log("Assignment", data)
       this.assignmentContent = data?.data?.getAssignmentmoduleData?.data;
       this.assignmentpreContent = data?.data?.getAssignmentmoduleData
        if (this.assignmentContent == null) {
          this.emptyAssignment = true;
        } else {
          this.emptyAssignment = false
        }

        if (this.assignmentpreContent.courseStartDate && this.assignmentpreContent.courseEndDate) 
        {
          const batchStartDate = new Date(this.assignmentpreContent.courseStartDate);
          const batchEndDate = new Date(this.assignmentpreContent.courseEndDate);
          this.courseStartDate = moment(batchStartDate);
          // this.courseEndDate = moment(batchEndDate);
          this.courseEndDate = moment(batchEndDate).endOf('day').toDate();

          this.assignmentContent.forEach((fileData) => {
                if (fileData.files.activitystartdate && fileData.files.activityenddate) {
                  let date1 = new Date(fileData.files.activitystartdate);
                  fileData.files.assignmentStartDate = moment(date1);
                  let date2 = new Date(fileData.files.activityenddate);
                  fileData.files.assignmentEndDate = moment(date2);
                  if (moment() >= fileData.files.assignmentStartDate) {
                    fileData.files.enableView = true;
                  } else {
                    fileData.files.enableView = false;
                  }

                  if (moment() >= fileData.files.assignmentStartDate &&
                    moment() <= this.courseEndDate) {
                    fileData.files.enableUpload = true;
                  } else if (moment() < fileData.files.assignmentStartDate ||
                    moment() > this.courseEndDate) {
                    fileData.files.enableUpload = false;
                  }
                }
          });
          console.log(this.assignmentContent)
        }
      } else {
        
      }
    });
  }



  projectPreviewDoc(templateRef: TemplateRef<any>, videoDialog, path, type) {
    if (type === 'material') {
      if (path.doc_type !== 'video/mp4') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
        });
        this.previewDoc = path;
      } else {
        this.videoSource = path.path;
        this.videoPreview(videoDialog, path);
      }
    } else if (type === 'files') {
      if (path.doc_type !== 'video/mp4') {
        this.dialog.open(templateRef, {
          width: '100%',
          height: '100%',
          closeOnNavigation: true,
          disableClose: true,
          panelClass: 'popupModalContainer'
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

  uploadAssignmentsFile(event,assignemnt) {
      let fileSize = 0;
        fileSize = event.target.files[0].size;
      if(fileSize/1024/1024 > 10){
        this.toastr.warning("The file size can not exceed 10 MB");
        return;
      }
    else{
      this.assignmentFile = event.target.files[0] as File;
      this.fileInput.nativeElement.value = '';
      this.postAssignmentsFile(assignemnt.file_id,assignemnt.module_id,assignemnt.topic_id,assignemnt.activityname,assignemnt.total_mark,assignemnt.activityenddate );
    }
  }

  postAssignmentsFile(fileId,modulename,topicname,assignemtname,score,endDate,) {
    this.ngxLoader.start();
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
    payload.append('learnerdoc', this.assignmentFile, this.assignmentFile.name);
    payload.append('user_id', this.userDetail.user_id);
    payload.append('course_id', this.courseid);
    payload.append('topic_id', topicname);
    payload.append('module_id', modulename);
    payload.append('file_id', fileId);
    payload.append('type_name', assignemtname);
    payload.append('submit_status', submitStatus);
    payload.append('total_mark', score);
    this.wcaservice.uploadAssignments(payload).subscribe((data: any) => {
      if (data.success === true) {
        this.ngxLoader.stop();
        this.toastr.success(data.message, null);
        this.getAssignmentmoduleData();
      } else {
        this.ngxLoader.stop();
        this.toastr.warning(data.message, null);
      }
    });
  }

  getprojectActivityData() {
    
    this.Lservice.getprojectActivityData(this.userDetail.user_id, this.courseid).subscribe((data: any) => {
      console.log('Project',data)
      if (data && data.data && data.data.getprojectActivityData && data.data.getprojectActivityData.data) {
        this.projectDetails = data.data.getprojectActivityData.data;

        this.projectDetails.forEach((element, i) => {
          // if (this.openedIndex === i) {
          //   if (element.isOpen) {
          //     element.isOpen = false;
          //   } else {
          //     element.isOpen = true;
          //   }
          // } else {
          //   element.isOpen = false;
          // }
          element.showLearnerList = false;
          // Batch date
          const batchEndDate = new Date(element.projectActivity.batchenddate);
          element.batchEndDate = moment(batchEndDate).format('DD-MM-YYYY HH:mm');

          element.submitType = moment().isSameOrBefore(batchEndDate);
          if (moment().format('DD-MM-YYYY') == moment(batchEndDate).format('DD-MM-YYYY')) {
            element.submitType = true;
          }
          // Activity Dates
          const startDate = new Date(element.projectActivity.activitystartdate);
          element.startdate = moment(startDate).format('DD-MM-YYYY HH:mm');
          const endDate = new Date(element.projectActivity.activityenddate);
          element.enableSubmit = moment().isSameOrAfter(startDate);
          element.submittedOn = element.projectActivity.submitted_date
        });
      }
    });
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  downloadDoc(doc, type) {
    if (type === 'material') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      link.href = doc.path;
      link.click();
    } else if (type === 'files') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.style.display = 'none';
      link.href = doc.videourl;
      link.click();
    }
  }

  getperformActivityData() {
    this.Lservice.getperformActivityData(
      this.userDetail.user_id, this.courseid
    ).subscribe((data: any) => {
      if (data && data.data && data.data.getperformActivityData && data.data.getperformActivityData.data) {
        this.performDetails = data.data.getperformActivityData.data;
        this.performDetails.forEach((element, i) => {
          // const startDate = this.datePipe.transform(element.performActivity.activitystartdate, 'dd-MM-yyyy HH:MM aa');
          // const endDate = this.datePipe.transform(element.performActivity.activityenddate, 'dd-MM-yyyy HH:MM aa');
          // const batchendDate = this.datePipe.transform(element.performActivity.batchenddate, 'dd-MM-yyyy HH:MM aa');
          // const crrDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy  HH:MM  aa');
          // if (this.openedIndex === i) {
          //   if (element.isOpen) {
          //     element.isOpen = false;
          //   } else {
          //     element.isOpen = true;
          //   }
          // } else {
          //   element.isOpen = false;
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
          // if (startDate <= crrDate && batchendDate >= crrDate) {
          //   // tslint:disable-next-line:no-string-literal
          //   element['itrationStarted'] = true;
          // } else {
          //   // tslint:disable-next-line:no-string-literal
          //   element['itrationStarted'] = false;
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
    const payload = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectfile.length; i++) {
      payload.append('uploadvideo', this.selectfile[i]);
      this.currentFile = this.selectfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectfile[i].type
      var sizeData = this.currentFile.size / 1024
      var sizeDatakb = sizeData / 1024
      var finalSize = sizeDatakb.toFixed(2)
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] == 0) {
        this.fileTotalSize = sizeData.toFixed(2) + ' KB'
        this.verfyingCondition = sizeDatakb.toFixed(2)
      } else {
        this.verfyingCondition = sizeDatakb.toFixed(2)
        this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB'
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
        const blobServiceClient = new BlobServiceClient(`${sas.storageUri}?${sas.storageAccessToken}`, pipeline);
        const containerClient = blobServiceClient.getContainerClient(sas.containerName);
        if (!containerClient.exists()) {
          await containerClient.create();
        }
        const client = containerClient.getBlockBlobClient(this.currentFile.name);
        this.isProgress = true;
        this.uploadedPercentage = 0
        const response = await client.uploadBrowserData(this.currentFile, {
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => {
            const uploaded = ev.loadedBytes;
            const percnt = uploaded * 100 / this.fileSize;
            this.uploadedPercentage = percnt.toFixed(2);
            this.Lservice.sendMessage('',this.uploadedPercentage.toString());   
          },
          blobHTTPHeaders: { blobContentType: this.currentFile.type }
        });

        if (response._response.status === 201) {

          this.jsonData = {
            'course_id': this.courseid,
            'module_id': project.projectActivity.module_id,
            'topic_id': project.projectActivity.topic_id,
            'user_id': this.userDetail.user_id,
            'submit_status': submitStatus,
            'total_mark': project.projectActivity.total_mark,
            'submitType': 'project',
            'submitAction': submitAction,
            'iterationid': project.projectActivity.project_id,
            'object_id': project.projectActivity.project_id,
            videodetails: [{
              doc_type: this.type,
              videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
              name: this.currentFile.name,
              size: this.fileTotalSize,
              id: project.projectActivity.project_id,
              uploaded_date: new Date(),
              is_active: true
            }]

          }
          let checkRes = await this.insertActivityRecordProject(this.jsonData)
          this.getprojectActivityData();
          this.ngxLoader.stop();
          this.toastr.success(data.message);
          setTimeout(()=>{
            this.Lservice.sendMessage('','0.00');
          },1000)
          
          this.flag = 1
        }


        this.selectPerformfile = [];

        //this.toastr.success(data.message);
        this.showSubmittedon = true;
        //this.getprojectActivityData();
        this.selectfile = [];
      } else {
        this.ngxLoader.stop();
        this.toastr.warning(data.message);
        setTimeout(()=>{
          this.Lservice.sendMessage('','0.00');
        },1000)      
      }
    });
  }

  // Submit or Delete
  learnerSumbitdeleteVideo(project, deleteItem, submitAction) {

    const startDate1 = new Date(project.projectActivity.activitystartdate);
    project.actstartDate = moment(startDate1);
    const endDate1 = new Date(project.projectActivity.activityenddate);
    project.actendDate = moment(endDate1);
    //--------- date comparison should not do using format string or else it wont compare monthwise dates
    // commented by avinash
    // const startDate1 = new Date(project.projectActivity.activitystartdate);
    // project.actstartDate = moment(startDate1).format('DD-MM-YYYY HH:mm');
    // const endDate1 = new Date(project.projectActivity.activityenddate);
    // project.actendDate = moment(endDate1).format('DD-MM-YYYY HH:mm');

    //--------- date comparison should not do using format string or else it wont compare monthwise dates
    let submitStatus = '';
    if (moment() >= project.actstartDate &&
      moment() <= project.actendDate) {
      submitStatus = 'ontime';

    } else if (moment() > project.actendDate) {
      submitStatus = 'late';
    }
    // commented by avinash
    // if (moment().format('DD-MM-YYYY HH:mm') >= project.actstartDate &&
    // moment().format('DD-MM-YYYY HH:mm') <= project.actendDate) {
    //   submitStatus = 'ontime';
    // } else if (moment().format('DD-MM-YYYY HH:mm') > project.actendDate) {
    //   submitStatus = 'late';
    // }
    const submitData = {
      course_id: this.courseid,
      module_id: project.projectActivity.module_id,
      topic_id: project.projectActivity.topic_id,
      user_id: this.userDetail.user_id,
      submit_status: submitStatus,
      total_mark: project.projectActivity.total_mark,
      submitType: 'project',
      submitAction,
      iterationid: project.projectActivity.project_id,
      object_id: project.projectActivity.project_id,
      videodetails: submitAction === 'delete' ? [deleteItem] : []
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

  // --------------------- Perform document upload ----------------------------

  uploadDocument(event, perform) {
    // this.selectPerformfile.push(event.target.files[0] as File);
    if(event.target.files.length==1){
    const filePath = event.target.files[0].name;
    const allowedExtensions = /(\.mp4)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toastr.warning('Please upload video file only.');
      if (this.videoInput) {
        this.videoInput.nativeElement.value = '';
      } 
    } else {
      // tslint:disable-next-line: prefer-for-of
      let fileSize = 0;
      for (let i = 0; i < event.target.files.length; i++) {
        fileSize += event.target.files[i].size;
        this.selectPerformfile.push(event.target.files[i]);
      }
      if(fileSize/1024/1024 > 150){
        this.toastr.warning("The file size can not exceed 150 MB");
        this.selectPerformfile = [];
        if (this.videoInput) {
          this.videoInput.nativeElement.value = '';
        } 
        return;
      }
      this.performlearnerUploadVideo();
    }
  }else if(event.target.files.length){
    this.toastr.warning('You cannot upload more than 1 file at a one slot.')
  }
  }

  uploadDocuments(e, perform, performans) {
    if(perform.videodetails.length == 3) {
      this.toastr.warning("You are allowed only to upload a maximum of 3 files");
      if (this.videoInput) {
        this.videoInput.nativeElement.value = '';
      } 
      return false;
    }
    this.performsData = performans;
    this.itrationData = perform;
    this.videoInput.nativeElement.click();
  }

  async performlearnerUploadVideo() {
    this.ngxLoader.start();
    this.uploadedPercentage = 0
    this.flag = 0
    const performVideo = new FormData();
    const startDate1 = new Date(this.performsData.performActivity.activitystartdate);
    const startDate = moment(startDate1);
    const endDate1 = new Date(this.performsData.performActivity.activityenddate);
    const endDate = moment(endDate1);
    if (moment() >= startDate &&
      moment() <= endDate) {
      this.submitStatus = 'ontime';
    } else {
      this.submitStatus = 'late';
    }

    for (let i = 0; i < this.selectPerformfile.length; i++) {
      this.currentFile = this.selectPerformfile[i];
      this.fileSize = this.currentFile.size;
      this.type = this.selectPerformfile[i].type
      var sizeData = this.currentFile.size / 1024
      var sizeDatakb = sizeData / 1024
      var finalSize = sizeDatakb.toFixed(2)
      this.splitSize = finalSize.split('.');
      if (this.splitSize[0] == 0) {
        this.fileTotalSize = sizeData.toFixed(2) + ' KB'
        this.verfyingCondition = sizeDatakb.toFixed(2)
      } else {
        this.verfyingCondition = sizeDatakb.toFixed(2)
        this.fileTotalSize = sizeDatakb.toFixed(2) + ' MB'
      }
      performVideo.append('uploadvideo', this.selectPerformfile[i]);
      //}
      if (this.verfyingCondition <= 150) {
        // performVideo.append('uploadvideo' , this.selectPerformfile[0]);
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
        //    this.commonServices.loader$.next(true);
        this.Lservice.learnerUploadVideo(performVideo).subscribe(async (data: any) => {
          if (data.success === true) {
            await this.multiFileUpload(data,( i+1))
          } else {
            this.ngxLoader.stop();
            this.toastr.warning(data.message);
            setTimeout(()=>{
              this.Lservice.sendMessage('','0.00');
            },1000)         
           }
        });
      } else {
        this.ngxLoader.stop();
        this.toastr.warning('File size should not greater than 150 MB');
        setTimeout(()=>{
          this.Lservice.sendMessage('','0.00');
        },1000)      
      }
    }

  }
  async multiFileUpload(data,  len) {
    
    // this.ngxLoader.start();
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
    this.uploadedPercentage = 0
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
        'course_id': this.performsData.performActivity.course_id,
        'module_id': this.performsData.performActivity.module_id,
        'topic_id': this.performsData.performActivity.topic_id,
        'user_id': this.userDetail.user_id,
        'submit_status': this.submitStatus,
        'total_mark': this.itrationData.total_mark,
        'submitType': 'perform',
        'submitAction': this.submitType,
        'iterationid': this.itrationData.iterationid,
        'object_id': this.performsData.performActivity.perform_id,
        videodetails: [{
          doc_type: this.type,
          videourl: sas.storageUri + sas.containerName + '/' + this.currentFile.name,
          name: this.currentFile.name,
          size: this.fileTotalSize,
          id: this.performsData.performActivity.perform_id,
          uploaded_date: new Date(),
          is_active: true
        }]

      }
      let checkRes = await this.insertActivityRecord(this.jsonData)
      if (this.selectPerformfile.length == len) {
        this.toastr.success(data.message);
        this.ngxLoader.stop();
        setTimeout(()=>{
          this.Lservice.sendMessage('','0.00');
        },1000)
        this.selectPerformfile = [];
      }
      this.flag = 1
    }


  
  }
  insertActivityRecord = async (performVideo) => {

    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if (data.success) {
        this.flag = 1
        this.getperformActivityData();
      } else {
        this.flag = 0
      }

    })
  }
  insertActivityRecordProject = async (performVideo) => {

    this.Lservice.insertRecord(performVideo).subscribe(async (data: any) => {
      if (data.success) {
        this.flag = 1
        this.getprojectActivityData();
      } else {
        this.flag = 0
      }

    })
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

  previewAssignment(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'popupModalContainer'
    });
    this.docpath = path;
  }

  openDocument(templateRef: TemplateRef<any>, path, docType) {
    if (path == null) {
      this.toastr.warning("No Reports Found")
      return false;
    }
    path.path = path.imageurl;

    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'popupModalContainer'
    });
    this.previewDoc = path;
  }

  playVideo(templateRef: TemplateRef<any>, videoDialog, path, docType) {
    if (docType === 'image/jpeg' || docType === 'application/pdf' || docType === 'image/png') {
      this.dialog.open(templateRef, {
        width: '100%',
        height: '100%',
        closeOnNavigation: true,
        disableClose: true,
        panelClass: 'popupModalContainer'
      });
      this.previewDoc = path;
    } else if (docType === 'video/mp4') {
      if (path.videourl) {
        path.path = path.videourl;
      }
      this.videoSource = path.path;
      this.videoPreview(videoDialog, path.path);
    }
    else {
      this.toastr.warning("Invalid format")
    }
  }

  videoPreview(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      width: '90%',
      height: '95%',
      panelClass: 'matDialogMat',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  mouseover(index) {
    this.mouseOverIndex = index;
  }

  performdetailPage(index, performData) {
    this.perfornDetaildata = { perfornData: performData, index };
  }

}
