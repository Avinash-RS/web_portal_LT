import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '../../../../environments/environment';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSidenav, MatTabGroup } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import * as _ from 'lodash';
import { filter } from 'underscore';
// import { debugger } from 'fusioncharts';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CoursedetailsComponent implements OnInit {
  blobKey = environment.blobKey;
  course: any = null;
  loading: boolean;
  pagenumber: any;
  selectedName: any;
  open = false;
  userDetail: any;
  showShortDesciption = true;
  // clicked: any = 'media';
  content: any;
  assignmentContent: any;
  modulength: any;
  isCollapsed: any;
  panelOpenState = false;
  showFiller = false;
  courseTime: any;
  url: string;
  urlSafe: SafeResourceUrl;
  userid: any;
  courseid: any;
  contentid: string;
  getuserid: any;
  topicData: any[];
  localStoCourseid: string;
  isLeaner = true;
  scromModuleData: any;
  scromApiData: any;
  persentage: any;
  per: any;
  dataRefresher: any;
  lastpersentage: any;
  topLength: number;
  finalper: any;
  finalper2: number;
  localper: string;
  selectedIndex = 0;
  selectedIndex1 = 0;
  selectedIndex2 = 0;
  selectedIndex3 = 0;
  assignmentVal = false;
  docpath: any = null;
  assFile: File;
  courseStartDate: any;
  courseEndDate: any;
  assignmentStartDate: any;
  assignmentEndDate: any;
  sider = true;
  moduleLenth: number;
  topicLenght = 0;
  // urlpath = [];
  currentPage: number;
  topiccurrentPage: number;
  getTopicLengthofModule: any;
  gettopicLink: any;
  topiccurrentlink = 0;
  moduleInfo: any;
  totTopicLenght = 0;
  playerTopicLen: any;
  isNextEnable = true;
  isprevEnable = true;
  selectedTabIndex: any = 0;
  selectedQATabIndex: any = 0;
  detailData: any;
  batchDetails: any;
  disableThreads: boolean;
  drawersOpen: boolean;
  screenHeight: number;
  screenWidth: number;
  performOverLay = false;
  treeCourse = false;
  filterkey: any = 'All';
  questionText: any = "";
  // initials: any;
  selectedModuleData: any;
  titleBar: boolean = false;
  user_token;
  qaFilterKey: any = "-1"
  batchId: any;
  isShowDiv = false;
  pagination = false;
  page = 0;
  noofItems = 0;
  @ViewChild('demo3Tab') demo3Tab: MatTabGroup;
  @ViewChild('rationPopup') rationPopup: TemplateRef<any>;
  @ViewChild('focuser') inputEl: ElementRef;
  getModuleandtopicInfo: any;
  moduleSatusCheck: any;
  tabInd: any;
  playerMenuEnable = false;
  viewScrollBar = false;
  fileRef: any[];
  playerStatus: any;
  checkDetails: any;
  allFeedbackQue: any;
  restdata: any;

  nextPrevHolder: number;
  moduleHolder: number;
  topicPageStatus: any;
  socketEmitReciver: any;
  socketConnector: any;
  oldIdx: any;
  isCancelLoad: boolean;
  fileType: any;
  URIData: any = null;
  resourceName: any;
  topicStatusCheck: any;
  currentTopicTitle: any;
  currentModuleTitle: any;
  topicInfo: any;
  bkup_Toc: any;
  filterData: any;
  myQuestionList: any = [];
  allQuestionList: any = [];
  isQALoading: boolean;
  batchEndTime: any;
  dateObj = new Date()
  currentDate = new Date(this.dateObj.getFullYear() + '-' + (this.dateObj.getMonth() + 1) + '-' + this.dateObj.getDate()).getTime();
  userType: any;
  weekHolder: number;
  weekLength: any;
  weekHolderUI: number;
  fromCalendar :boolean = false;
  // FOR DRM(Restriction for right click)
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.key === '67' && event.ctrlKey && event.shiftKey) || (event.key === '123')) {
      event.returnValue = false;
      event.preventDefault();
    }
  }
  // initials: any;
  constructor(public translate: TranslateService, private router: ActivatedRoute, public socketService: SocketioService,
    public Lservice: LearnerServicesService, private cdr: ChangeDetectorRef,
    public service: CommonServicesService, private gs: GlobalServiceService, private dialog: MatDialog,
    public route: Router, private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer, private toastr: ToastrService) {
    this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
    // if (this.socketService.socketStatus()||this.socketService.socketStatus() == undefined){
    this.socketConnector = this.socketService.Connectsocket({ type: 'connect' }).subscribe(quote => {
    });
    // }
    // debugger
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    const loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.userType = loginDetails.org_type;
    const token = loginDetails.token

    // const cryptoInfo = CryptoJS.AES.encrypt(JSON.stringify( {token} ), '(!@#graphql%^&facade!@#)').toString();
    this.user_token = CryptoJS.AES.decrypt(token, '(!@#graphql%^&facade!@#)').toString(CryptoJS.enc.Utf8);

    //  const info3 = JSON.parse(info2);


    //
    const Feedbackdetail: any = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.checkDetails = Feedbackdetail;
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.drawersOpen = false;
      this.performOverLay = true;
    } else {
      this.drawersOpen = true;
      this.performOverLay = false;
    }
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if (detail === undefined) {
      this.batchId = localStorage.getItem('currentBatchId')
      this.batchEndTime = localStorage.getItem('currentBatchEndDate')
    } else {
      if(detail.fromCalendar){
        this.fromCalendar = true;
      }
      this.batchId = detail.batch_id
      this.batchEndTime = detail.batchEndTime
    }

    if (this.gs.checkLogout()) {
      this.detailData = detail;
      // this.courseid = detail && detail.id || this.localStoCourseid;
      this.userDetail = this.gs.checkLogout();
      this.localStoCourseid = localStorage.getItem('Courseid');
      this.courseid = detail && detail.id || this.localStoCourseid;
      this.lastpersentage = localStorage.getItem('persentage');
      // this.lastpersentage = detail  && detail.persentage || this.localper ;
      this.loading = true;
      this.playerModuleAndTopic();
      this.getFeedbackQue();
      // this.refreshData();
      // this.autoHide();
      // this.getPlayerNextPrve();

      this.service.viewCurseByIDForLearner(detail && detail.id || this.localStoCourseid)
        .subscribe((viewCourse: any) => {
          if (viewCourse.data.view_course_for_learner && viewCourse.data.view_course_for_learner.success) {
            this.course = viewCourse.data.view_course_for_learner.message;
            if (this.detailData !== undefined) {
              this.selectedName = this.detailData?.course_name;
            } else if (this.course !== undefined && this.course !== null) {
              this.selectedName = this.course?.course_name;
            }
            this.Lservice.getSingleBatchInfo(this.userDetail.user_id, this.courseid).subscribe((resdata: any) => {
              if (resdata?.data?.getbatchdetails?.message?.batchid !== null) {
                this.batchDetails = resdata?.data?.getbatchdetails?.message;
              } else {
                this.batchDetails = null;
              }
            });

            // all post in one thread
            this.loading = false;
            // if (this.course.topicData && this.course.topicData.length) {
            //   this.topicData = [];
            //   this.course.topicData.forEach(element => {
            //     const subArr = [];
            //     element.moduleData.forEach(element1 => {
            //       subArr.push(element1.moduledetails);
            //     });
            //     const obj = {
            //       modulename: element.moduleData[0].modulename,
            //       moduledetails: subArr
            //     };
            //     this.topicData.push(obj);
            //   });
            // }
            // this.course.topicData = this.topicData;
            // this.course.wishlisted = detail.wishlist || false;
            // this.course.wishlist_id = detail.wishlist_id || null;
            // this.course.enrollment_status = detail.enrollment_status;
          }
        });
    }
    this.Lservice.getModuleData(detail && detail.id || this.localStoCourseid, this.userDetail.user_id).subscribe((data: any) => {
      this.content = data.data.getmoduleData.data[0];
      this.assignmentVal = false;
      let noresource = false;
      //this.getModuleandtopicInfo = this.content.coursedetails[0];
      this.content.coursedetails.forEach(element => {
        let resourceFile = false;
        element.moduledetails.forEach(value => {
          if (value.resourse && value.resourse.files && value.resourse.files.length) {
            this.fileRef = value.resourse.files.filter(type =>
              type.fileType === 'Reference'
            );
            if (this.fileRef && this.fileRef.length) {
              resourceFile = true;
              noresource = true;
            }
          }
        });
        element.resValue = resourceFile;
      });
      // this.nextPrevHolder = this.topiccurrentPage = this.content.topicIndex == null ? 0 : this.content.topicIndex;
      // this.moduleHolder = this.currentPage = this.content.moduleIndex == null ? 0 : this.content.moduleIndex;

      this.content.noresource = noresource;

      this.modulength = this.content.coursedetails.length;
      this.courseTime = this.content.coursetime;
    });
    // this.getAssignmentmoduleData();
  }

  ngOnInit(): void {
    this.translate.use(localStorage.getItem('language'));
    // this.add_topic_reference(res);
    // if (this.detailData.course_status === 'completed') {
    //   this.ratingPopup();
    // }
    this.service.menuSelectedPerform.subscribe((emitedData: any) => {
      this.selectedName = emitedData.selectedName;
      this.selectedTabIndex = emitedData.selectedTabIndex;
      this.performOverLay = false;
    });
    let resumeInit = true;
    this.socketService.socketReceiver()
    this.socketEmitReciver = this.socketService.change.subscribe((result:any) => {
      if (result && result.eventId && result.eventId.length > 0 && result.data.childData.length > 0) {
        if (result.data.course_id === this.courseid) {
          console.log(result.data)
         
          if (this.topiccurrentPage !== result.data.resumeSubContent ||
            result.data.childData[result.data.week-1].childData[result.data.resumeContent].children[result.data.resumeSubContent]?.status !== this.topicPageStatus) {
              this.scromModuleData = result.data.childData;
              this.moduleExpand(this.weekHolder, this.moduleHolder);
            this.currentPage = Number(result.data.resumeContent);
            this.topiccurrentPage = Number(result.data.resumeSubContent);
            this.weekHolder = result.data.week - 1;
            this.topicPageStatus = result.data.childData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage]?.status
            this.topicPageStatus = this.topicPageStatus?this.topicPageStatus:"process";
            this.moduleInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage];
            this.topicInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage]
            if (resumeInit) {
              
              this.nextPrevHolder = this.topiccurrentPage;
              this.moduleHolder = this.currentPage;
              this.weekHolderUI = this.weekHolder;
              resumeInit = false;
              this.isprevEnable = true;
              this.isNextEnable = true;
            }
            
          }
          this.moduleExpand(this.weekHolderUI, Number(this.moduleHolder));
          // if ((this.weekHolder !==0 && this.moduleHolder !== 0) || (this.nextPrevHolder !== 0)) {
          //   this.isprevEnable = false;
          // }
          // if ((((this.weekHolder) !== this.scromModuleData.length - 1)||(this.moduleHolder) !== this.scromModuleData[this.weekHolder-1].childData.length - 1)
          //   || ((this.nextPrevHolder) !== this.scromModuleData[this.weekHolder-1].childData[this.scromModuleData[this.weekHolder-1].length - 1].children.length - 1)) {
          //   this.isNextEnable = false;
          // }

          this.checkLastFirstIndexReached()
           
          this.scromModuleData.forEach(childData => {
            if (childData && childData.children) {
              childData.children.forEach(subChild => {
                if (subChild && subChild.children && subChild.children.length > 0) {
                  this.treeCourse = true;
                } else {
                  this.treeCourse = false;
                }
              });
            }
          });
        }
      } else {
        //INDEX ON COURSE START
        this.nextPrevHolder = this.topiccurrentPage = 0;
        this.moduleHolder = this.currentPage = 0;

        this.isprevEnable = true;
        this.isNextEnable = false;
      }
    });
    this.getCoursePlayerStatus();
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  checkLastFirstIndexReached(){
    //check 1stweek 1stmodule 1stopic
    if(this.weekHolder == 0 && this.moduleHolder==0 && this.nextPrevHolder==0){
      this.isprevEnable = true;
    }else{
      this.isprevEnable = false;
    }
    let lastweekIndex  = this.scromModuleData.length - 1
    let lastweekmoduleIndex = this.scromModuleData[lastweekIndex].childData.length -1
    let lastweekmoduletopicIndex = this.scromModuleData[lastweekIndex].childData[lastweekmoduleIndex].children.length - 1;
    //check last week,module,topic
    if(
      (this.weekHolder == lastweekIndex) && (this.moduleHolder == lastweekmoduleIndex) && (this.nextPrevHolder == lastweekmoduletopicIndex)
    ){
      this.isNextEnable = true;
    }else{
      this.isNextEnable = false;
    }
  }

  ngOnDestroy() {
    const loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
    if (loginDetails) {
      this.socketConnector = this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
      });
    }
    if (this.socketEmitReciver) {
      this.socketEmitReciver.unsubscribe();
    }

    this.socketService.closeSocket();

    if (this.socketConnector) {
      this.socketConnector.unsubscribe();
    }
  }
  // mouseoutFn() {
  //   this.titleBar = true;
  //   setTimeout(()=>{                           //<<<---using ()=> syntax
  //     this.titleBar = false;
  //   }, 3000);
  // }

  renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      let newKey = null;
      const newKey1 = null;
      if (key === 'topic_name') {
        newKey = newKeys.displayName;
      } else if (key === 'topic') {
        newKey = newKeys.moduledetails;
      } else if (key === 'module') {
        newKey = newKeys.coursedetails;
      } else if (key === 'module_name') {
        newKey = newKeys.displayName;
      } else {
        newKey = key;
      }
      if (key === 'topic') {
        obj[key] = obj[key].map(obj1 => this.renameKeys(obj1, newKeys));
      }
      return {
        [newKey]: obj[key]
      };
    });
    return Object.assign({}, ...keyValues);
  }

  performPage() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.performOverLay = true;
    } else {
      this.performOverLay = false;
    }
  }


  topicNext() {
    console.log(this.scromModuleData)
    this.isNextEnable = true;
    this.isprevEnable = true
    this.moduleInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage];
    //WEEK NAVIGATION
    if (this.weekHolder < this.weekLength) {
      this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
      // this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;


      if (this.currentPage < (this.moduleLenth)) {
        this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;
        // topic to module change on previous
        if (this.topiccurrentPage === this.getTopicLengthofModule - 1) {
          if ((this.currentPage === this.moduleLenth - 1) && (this.topiccurrentPage === this.getTopicLengthofModule - 1)) {
            this.weekHolder = this.weekHolderUI = Number(this.weekHolder) + 1;
            this.currentPage = 0;
            this.moduleHolder = this.currentPage;

          } else {
            this.currentPage = Number(this.currentPage) + 1;
            this.moduleHolder = this.currentPage;
          }
          this.topiccurrentPage = 0;
          this.nextPrevHolder = 0;
          this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;
        } else {
          this.topiccurrentPage = Number(this.topiccurrentPage) + 1;
          this.nextPrevHolder = this.topiccurrentPage;
        }
        // topic
        if (this.topiccurrentPage <= this.getTopicLengthofModule) {

          this.moduleInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage];
          this.gettopicLink = this.scromModuleData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage];
          this.moduleSatusCheck = this.moduleInfo.status ? this.moduleInfo.status : 'process';
          this.currentTopicTitle = this.gettopicLink.title;
          this.currentModuleTitle = this.moduleInfo.title;
          this.topicPageStatus = this.gettopicLink.status;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
            (environment.scormUrl + '/scormPlayer.html?contentID=' +
              this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
              this.getuserid._id + '&path=' + this.gettopicLink.link +
              '&module_status=' + this.moduleSatusCheck
              + '&module=' + this.moduleInfo.title + '&topic=' + this.gettopicLink.title + '&action=Next&week=' + (this.weekHolder + 1) + '&token=' + this.user_token);
        }
      }

    }
    // this.gettopicLink = this.scromModuleData[this.currentPage - 1]?.children[this.topiccurrentPage];
    // const childData = this.scromModuleData[this.moduleLenth - 1]?.children;
    // const childlength = this.scromModuleData[this.moduleLenth - 1]?.children.length;
    // if (this.gettopicLink.id === childData[childlength - 1].id) {
    //   this.ratingPopup();
    // }


  }

  topicPrve() {
    this.isNextEnable = true;
    this.isprevEnable = true
    this.moduleInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage];
    this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
    if (this.currentPage < (this.moduleLenth)) {
      this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;
      // topic to module change on previous

      
      if (this.currentPage - 1 >= 0 && this.topiccurrentPage === 0) {
        this.currentPage = this.currentPage - 1;
        this.moduleHolder = this.currentPage;
        this.topiccurrentPage = this.scromModuleData[this.weekHolder].childData[this.currentPage].children.length - 1;
        this.nextPrevHolder = this.topiccurrentPage;
        this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;
      } else {
        if (this.currentPage==0 && this.topiccurrentPage == 0) {
          this.weekHolder = this.weekHolderUI = this.weekHolder - 1;
          this.moduleHolder = this.scromModuleData[this.weekHolder].childData.length - 1;
          this.currentPage = Number(this.moduleHolder);
          this.topiccurrentPage = this.scromModuleData[this.weekHolder].childData[this.currentPage].children.length - 1;
          this.nextPrevHolder = this.topiccurrentPage;
        }else{
        this.topiccurrentPage = this.topiccurrentPage - 1;
        this.nextPrevHolder = this.topiccurrentPage;
        }
      }
      if (this.topiccurrentPage >= 0) {
        this.moduleInfo = this.scromModuleData[this.weekHolder].childData[this.currentPage];
        this.gettopicLink = this.scromModuleData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage];
        this.moduleSatusCheck = this.moduleInfo.status ? this.moduleInfo.status : 'process';
        this.currentTopicTitle = this.gettopicLink.title;
        this.currentModuleTitle = this.moduleInfo.title;
        this.topicPageStatus = this.gettopicLink.status
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
          (environment.scormUrl + '/scormPlayer.html?contentID=' +
            this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
            this.getuserid._id + '&path=' + this.gettopicLink.link +
            '&module_status=' + this.moduleSatusCheck
            + '&module=' + this.moduleInfo.title + '&topic=' + this.gettopicLink.title + '&action=Prev&week=' +(this.weekHolder+1)+ '&token=' + this.user_token);

      }

    }
  }
  downloadResource(){
    const a = document.createElement('a')
    a.target= '_blank';
    a.href = this.scromApiData.resourceUrl;
    a.download = this.scromApiData.resourceUrl.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  // get Scrom module and topic
  playerModuleAndTopic() {
    this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      this.scromApiData = data.data?.playerModuleAndTopic?.message[0];
      if (this.scromApiData?.toc != '0') {
        
        if (this.screenWidth < 800) {
          this.drawersOpen = false;
        }
        else{
          this.drawersOpen = true;
        }
      } else {
        this.drawersOpen = false;
      }
      this.scromModuleData = this.scromApiData?.childData;
      this.weekLength = this.scromApiData.childData.length;
      // this.moduleLenth = this.scromApiData?.childData.length;
      this.nextPrevHolder = this.topiccurrentPage = this.scromApiData.topicIndex == null ? 0 : Number(this.scromApiData.topicIndex);
      this.moduleHolder = this.currentPage = this.scromApiData.moduleIndex == null ? 0 : Number(this.scromApiData.moduleIndex);
      this.weekHolder  = this.weekHolderUI = this.scromApiData.week - 1;
      // this.scromModuleData[this.moduleHolder].expanded = true;
      this.oldIdx = this.moduleHolder;
      this.topicInfo = this.scromApiData.childData[this.weekHolder].childData[this.moduleHolder].children[this.nextPrevHolder]
      this.topicPageStatus = this.topicInfo.status
      this.moduleExpand(this.weekHolder, this.moduleHolder);
      setTimeout(() => { this.inputEl ? this.inputEl.nativeElement.scrollIntoView({ behavior: "smooth" }) : '' }, 4000);
      const moduleTitle = encodeURIComponent(this.scromApiData.childData[this.weekHolder].childData[this.currentPage].title);
      const topicTitle = encodeURIComponent(this.scromApiData.childData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage].title);
      this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
      this.currentModuleTitle = this.scromApiData.childData[this.weekHolder].childData[this.currentPage].title;
      this.currentTopicTitle = this.scromApiData.childData[this.weekHolder].childData[this.currentPage].children[this.topiccurrentPage].title;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
        (environment.scormUrl + '/scormPlayer.html?contentID=' +
          this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
          this.getuserid._id + '&path=' + this.scromApiData.url +
          '&module_status=' + 'process&week='+ (this.weekHolder + 1)
          + '&module=' + moduleTitle + '&topic=' + topicTitle + '&token=' + this.user_token);

      this.playerTopicLen = this.scromApiData.total_topic_len;
      // tree level
      this.scromModuleData.forEach(childData => {
        if (childData && childData.children) {
          childData.children.forEach(subChild => {
            if (subChild && subChild.children && subChild.children.length > 0) {
              // Check TOC Weekwise or module topic wise
              this.treeCourse = true;
            } else {
              this.treeCourse = false;
            }
          });
        }
      });

      this.checkLastFirstIndexReached()

    });
  }
  playTopic(url, topicName, topicStatus, moduleName, moduleStatus, moduleLegth, weekIndex, topindex, moduleIdx) {
    this.weekHolder = weekIndex;
    this.weekHolderUI = weekIndex;
    this.currentTopicTitle = topicName;
    this.currentModuleTitle = moduleName
    this.topicPageStatus = topicStatus;
    this.moduleSatusCheck = moduleStatus ? moduleStatus : 'process';
    const encodedModuleName = encodeURIComponent(moduleName);
    const encodedTopicName = encodeURIComponent(topicName);
    this.nextPrevHolder = topindex;
    this.topiccurrentPage = this.nextPrevHolder
    this.moduleHolder = Number(moduleIdx);
    this.currentPage = Number(moduleIdx);
    this.isprevEnable = true;
    this.isNextEnable = true;
    this.topicInfo = this.scromApiData.childData[weekIndex].childData[moduleIdx].children[topindex]
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      (environment.scormUrl + '/scormPlayer.html?contentID=' +
        this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' + this.getuserid._id + '&path=' + url
        + '&module_status=' + this.moduleSatusCheck
        + '&module=' + encodedModuleName + '&topic=' + encodedTopicName + '&action=Click&week=' + (this.weekHolder + 1) + '&token=' + this.user_token);

    this.checkLastFirstIndexReached()
  }

  playerstatusrealtime(topicName, topicStatus, moduleName, moduleStatus, moduleLegth, topicLenght, topindex) {
    // tslint:disable-next-line:radix
    const len = parseInt(topicLenght);
    if (topindex === len) {
      moduleStatus = 'Passed';
    } else {
      moduleStatus = 'Process';
    }
    const jsonData = {
      module: [{
        module_name: moduleName,
        status: moduleStatus,
        topic: [{
          topic_name: topicName,
          status: 'Passed'
        }]
      }]
    };
    this.Lservice.playerstatusrealtime(this.userDetail.user_id, this.courseid, jsonData.module, this.finalper)
      .subscribe((data: any) => {
        if (data.data.playerstatusrealtime.success === true) {
          this.playerModuleAndTopic();
        }
      });
  }

  getSelectedIndex(i) {
    this.selectedIndex = i;
  }
  getsubSelectedIndex(j) {
    this.selectedIndex1 = j;
  }
  getsupersubSelectedIndex(k) {
    this.selectedIndex2 = k;
  }
  getfourSelectedIndex(l) {
    this.selectedIndex2 = l;
  }

  makeFullScreen() {
    const element = document.querySelector('#myPlayer');
    element.requestFullscreen()
      .then(() => {
      })
      .catch((error) => {
      });
  }

  // showHeader() {
  //   this.sider = true;
  // }
  // cancelPageRefresh() {
  //   if (this.dataRefresher) {
  //     clearInterval(this.dataRefresher);
  //   }
  // }

  // tslint:disable-next-line:use-life-cycle-interface
  // ngOnDestroy() {
  //   this.cancelPageRefresh();
  // }


  // previewDoc(templateRef: TemplateRef<any>, path) {
  //   this.dialog.open(templateRef, {
  //     // scrollStrategy: new NoopScrollStrategy(),
  //     width: '100%',
  //     height: '100%',
  //     scrollStrategy: new NoopScrollStrategy(),
  //     closeOnNavigation: true,
  //     disableClose: true,
  //   });
  //   this.docpath = path;
  // }
  // downloadPdf(doc) {
  //   const link = document.createElement('a');
  //   link.target = '_blank';
  //   link.style.display = 'none';
  //   link.href = doc.path;
  //   link.click();
  // }

  scroll(el: HTMLElement) {
    el.scrollTop = 0;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  urlBinder(file) {
    this.disableRightClick()
    this.resourceName = file.type_name;
    this.fileType = file.doc_type;
    if (file.doc_type.includes("image")) {
      this.fileType = 'image'
    }
    if (file.doc_type.includes("video")) {
      this.fileType = 'video';
    }
    if (file.doc_type.includes("pdf") || file.doc_type.includes("vnd.openxmlformats") || file.doc_type.includes("vnd.ms-excel") || file.doc_type.includes("msword")) {
      this.fileType = 'pdf';
    }
    if (file.doc_type.includes("audio")) {
      this.fileType = 'audio';
    }
    if (file.doc_type.includes("link")) {
      this.fileType = 'link';
      this.URIData = this.sanitizer.bypassSecurityTrustResourceUrl(file.path + this.blobKey);
    }

    if (this.fileType === 'pdf') {
      // file.gdocs = '';
      // file.gdocs = 'https://docs.google.com/gview?url=' + file.path + this.blobKey + '&embedded=true';
      // this.URIData = file;
      var url = file.path + this.blobKey
      this.URIData = url
    } else {
      this.URIData = this.sanitizer.bypassSecurityTrustResourceUrl(file.path + this.blobKey);
    }
  }

  tabSelection(tab) {
    this.tabInd = tab.index;
    if (tab.index === 0) {
      this.sider = true;
      // this.autoHide();
    } else {
      clearInterval(this.dataRefresher);
      this.sider = false;
    }
  }
  closedialogbox() {
    // this.tabInd = 0;
    this.selectedTabIndex = 0;
    this.dialog.closeAll();
  }


  moduleExpand(Windex, mindex, spotval?) {
    // console.log(spotval)
    if(spotval){
    spotval.expanded = spotval.expanded ? false : true;
    }else{
      this.scromModuleData[Windex].childData[mindex].expanded = true;
    }
    // if(this.filterkey === "All"){ 
    //   if (mindex !== this.oldIdx) {
    //     for (const element of this.scromModuleData) {
    //       element.expanded = false
    //     }
    //     this.scromModuleData[mindex].expanded = true;
    //   } else {
    //     this.scromModuleData[mindex].expanded = this.scromModuleData[mindex].expanded ? false : true;
    //   }
    //   this.oldIdx = mindex
    // }else{
    //   if (mindex !== this.oldIdx) {
    //     for (const element of this.filterData) {
    //       element.expanded = false
    //     }
    //     this.filterData[mindex].expanded = true;
    //   } else {
    //     this.filterData[mindex].expanded = this.filterData[mindex].expanded ? false : true;
    //   }
    //   this.oldIdx = mindex
    // }

  }

  goBack() {
    if (!this.drawersOpen && this.scromApiData?.toc != '0') {
      this.drawersOpen = this.drawersOpen ? false : true
    } else {
      if(this.fromCalendar){
        this.route.navigateByUrl('/Learner/calendaractivity');
      }
      else{
        this.route.navigateByUrl('/Learner/MyCourse');
      }  
    }

  }

  openResourse(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: 'resourseContainer',
      width: "99%",
      height: "90%",
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0];
    const containerarea = document.getElementsByClassName('mat-dialog-container')[0];
    rclickctrl(backdrop)
    rclickctrl(containerarea)
    function rclickctrl(element){
      element.addEventListener("contextmenu", ( e )=> {
        e.preventDefault();
        return false;
      } );
    }
  }
  resourseAccord(courseResource, index) { 
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

  understoodClick(ux) {
    this.topicInfo.user_experience = ux
    this.Lservice.userexperience(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle, ux, this.topicInfo.status).subscribe((data: any) => {
      if (data?.data?.userexperience?.success) {
        this.topicInfo.user_experience = ux
      } else {
        this.toastr.warning(data?.data?.userexperience?.message)
      }
    })

  }

  bookmarkClick(isbokmarked) {
    this.topicInfo.bookmark = isbokmarked
    this.Lservice.bookmark(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle, isbokmarked).subscribe((data: any) => {
      if (data?.data?.bookmark?.success) {
        this.topicInfo.bookmark = isbokmarked
        if (this.filterkey === 'Bookmarked') {
          this.filterToc()
        }// NOT WORKING SHOULD WAIT FOR SOCKET RESPONSE FOR REALTIME FILTER
        //this.toastr.success(data?.data?.bookmark?.message)
      } else {
        // this.toastr.warning(data?.data?.bookmark?.message)
      }
    })
  }
  contextmenu() {
    event.preventDefault();
  }
  submitMyQuestion() {
    if (this.currentModuleTitle || this.currentTopicTitle) {
      if (this.questionText.trim().length) {
        this.Lservice.askaquestion(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle, this.questionText).subscribe((data: any) => {
          console.log(data)
          this.questionText = "";
          if (data?.data?.askaquestion?.success) {
            this.selectedQATabIndex = 1;
            this.toastr.success(data?.data?.askaquestion?.message)
          } else {
            // this.toastr.warning(data?.data?.bookmark?.message)
          }
        })
      } else {
        this.toastr.warning("Please enter some text")
      }
    } else {
      this.toastr.warning("Please select a module")
    }

  }

  questionTabSelection(tab) {
    if (tab.index === 1) {
      this.isQALoading = true;
      this.myQuestionList = [];
      this.allQuestionList = []
      this.Lservice.getMyQuestion(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle).subscribe((data: any) => {
        this.isQALoading = false;
        if (data?.data.getmyque.success) {
          this.myQuestionList = data.data.getmyque.message
        } else {
          this.myQuestionList = [];
        }
      })
    } else if (tab.index === 2) {
      this.isQALoading = true
      this.allQuestionList = []
      this.myQuestionList = [];
      this.Lservice.getallquestion(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle, -1, this.batchId).subscribe((data: any) => {
        this.isQALoading = false
        if (data?.data.getallquestion?.success) {
          this.allQuestionList = data.data.getallquestion?.message
        } else {
          this.allQuestionList = [];
        }
      })
    } else {
      this.myQuestionList = [];
      this.allQuestionList = [];
    }
  }
  filterToc() {
    this.bkup_Toc = JSON.parse(JSON.stringify(this.scromModuleData));
    this.filterData = []
    if (this.filterkey === 'Bookmarked') {
      this.bkup_Toc.forEach((week,wi) => {
        let modulefilter = [];
        week.childData.forEach((module,mi) => {
        if (module.children.length > 0) {
          let markedTopcs;
          markedTopcs = module.children.filter((topic) => {
            return topic?.bookmark === true;
          });
          if (markedTopcs.length > 0) {
            module.children = []
            module.children = markedTopcs;
            modulefilter.push(module);
          }
        }
      });
      if(modulefilter.length){
        week.childData = modulefilter
      this.filterData.push(week);}

      });
    } else {
      this.filterData = []

    }
  }

  filterQAList() {
    this.isQALoading = true
    this.Lservice.getallquestion(this.getuserid.user_id, this.courseid, this.currentModuleTitle, this.currentTopicTitle, this.qaFilterKey, this.batchId).subscribe((data: any) => {
      this.isQALoading = false
      if (data?.data.getallquestion?.success) {
        this.allQuestionList = data.data.getallquestion?.message
      }
    })
  }
  closeAskQuestion() {
    this.dialog.closeAll();
    this.myQuestionList = [];
    this.allQuestionList = [];
    this.selectedQATabIndex = 0;
  }
  openAskQuestions(templateRef: TemplateRef<any>) {
    this.questionText = "";
    this.allQuestionList = []
    if (this.screenWidth > 560) {
      this.dialog.open(templateRef, {
        // scrollStrategy: new NoopScrollStrategy(),
        width: '60%',
        height: '80%',
        scrollStrategy: new NoopScrollStrategy(),
        closeOnNavigation: true,
        disableClose: true,
      });
    } else {
      this.dialog.open(templateRef, {
        // scrollStrategy: new NoopScrollStrategy(),
        width: '98%',
        height: '80%',
        scrollStrategy: new NoopScrollStrategy(),
        closeOnNavigation: true,
        disableClose: true,
      });
    }
  }
  disableRightClick() {
    const dialoqContainer = document.getElementsByClassName('cdk-overlay-container');
    dialoqContainer[0].addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  // -------------------- rating function ------------------
  getFeedbackQue() {
    this.Lservice.getFeedbackQuestion().subscribe((data: any) => {
      if (data.data.getFeedbackQuestion.success === true) {
        this.allFeedbackQue = data.data.getFeedbackQuestion.data;
      }
    });
  }

  getCoursePlayerStatus() {
    this.Lservice.getCoursePlayerStatusForCourse(this.userDetail.user_id, this.courseid).subscribe((data: any) => {
      this.playerStatus = data.data.getCoursePlayerStatusForCourse.message;
      // if (this.checkDetails?.feed_back === 1 && this.playerStatus.feedback_status === false && this.playerStatus.status === 'completed') {
      //   this.ratingPopup();
      // }
      // if (this.playerStatus.feedback_status === false && this.playerStatus.course_percentage === 100 && this.playerStatus.status === 'completed') {
      //   this.ratingPopup();
      //   }
    });
  }

  ratingPopup() {
    this.dialog.open(this.rationPopup, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  add_topic_reference(res) {
    if (this.batchDetails?.batchid) {
      const userid = this.userDetail.user_id;
      const batchid = this.batchDetails?.batchid;
      const courseid = this.courseid;
      const moduleid = res.modulename;
      const topicid = res.moduledetails[0].topicname;
      const referenceid = res.moduledetails[0].resourse.files[0]._id;
      const referencestatus = true;
      const createdby = this.course.created_by;
      this.Lservice.add_topic_reference(userid, batchid, courseid, moduleid, topicid, referenceid, referencestatus, createdby)
        .subscribe((result: any) => {
        });
    }
  }
  //------------------------------------------------------------------//
}




