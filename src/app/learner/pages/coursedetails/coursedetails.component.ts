import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
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
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';
import { SocketioService } from '@learner/services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import * as _ from 'lodash';
import { LegendPosition } from 'ag-grid-community';
// import { debugger } from 'fusioncharts';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {

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
  isNextEnable = false;
  isprevEnable = false;
  selectedTabIndex: any;
  detailData: any;
  batchDetails: any;
  disableThreads: boolean;
  drawersOpen: boolean;
  screenHeight: number;
  screenWidth: number;
  performOverLay = false;
  treeCourse = false;
  // initials: any;
  selectedModuleData: any;

  @ViewChild('demo3Tab') demo3Tab: MatTabGroup;
  getModuleandtopicInfo: any;
  moduleSatusCheck: any;
  tabInd: any;
  playerMenuEnable = false;
  viewScrollBar = false;
  fileRef: any[];
  nextPrevHolder: number;
  moduleHolder: number;
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
              public route: Router, private alert: AlertServiceService, private formBuilder: FormBuilder,
              public sanitizer: DomSanitizer, private toastr: ToastrService, public wcaservice: WcaService) {
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
      // this.refreshData();
      // this.autoHide();
      this.getPlayerNextPrve();
      this.service.viewCurseByID(detail && detail.id || this.localStoCourseid, this.userDetail.user_id)
        .subscribe((viewCourse: any) => {
          if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
            this.course = viewCourse.data.viewcourse.message;
            // console.log('this.course 1', this.course);
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
      this.getModuleandtopicInfo = this.content.coursedetails[0];
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
      this.content.noresource = noresource;
      this.getuserid = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
        (environment.scormUrl + '/scormPlayer.html?contentID=' +
          this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
          this.getuserid._id + '&path=' + this.content.url +
          '&module_status=' + 'process'
          + '&module=' + this.getModuleandtopicInfo.modulename + '&topic=' + this.getModuleandtopicInfo.moduledetails[0].topicname + '&location=' + this.content.page);
      this.modulength = this.content.coursedetails.length;
      this.courseTime = this.content.coursetime;
    });
    this.getAssignmentmoduleData();
  }

  ngOnInit(): void {
    this.translate.use(localStorage.getItem('language'));
    // this.add_topic_reference(res);
    this.service.menuSelectedPerform.subscribe((emitedData: any) => {
      this.selectedName = emitedData.selectedName;
      this.selectedTabIndex = emitedData.selectedTabIndex;
      this.performOverLay = false;
    });
    let resumeInit = true;
    this.socketService.change.subscribe(result => {
      if (result && result.eventId && result.eventId.length > 0) {
        if (result.data.course_id === this.courseid) {
          if (this.topiccurrentPage !== result.data.resumeSubContent) {
          this.scromModuleData = result.data.childData;
          this.currentPage = result.data.resumeContent;
          this.topiccurrentPage = result.data.resumeSubContent;
          this.moduleInfo = this.scromModuleData[this.currentPage];
          if (resumeInit) {
            this.nextPrevHolder = this.topiccurrentPage;
            this.moduleHolder = this.currentPage;
            resumeInit = false;
            this.isprevEnable = true;
            this.isNextEnable = true;
          }
          }
          if ((this.moduleHolder  !== 0 ) || (this.nextPrevHolder  !== 0)) {
            this.isprevEnable = false;
          }
          if (((this.moduleHolder) !== this.scromModuleData.length - 1)
            || ((this.nextPrevHolder) !== this.scromModuleData[this.scromModuleData.length - 1].children.length - 1)) {
            this.isNextEnable = false;
          }
          // console.log(jsonData[0].childData, 'this.scromModuleData');
          console.log(result.data.resumeSubContent, 'module=', result.data.resumeContent);
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
        // this.playerModuleAndTopic();
      }
    });
  }

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

  getAssignmentmoduleData() {
    this.Lservice.getAssignmentmoduleData(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      this.assignmentContent = data.data.getAssignmentmoduleData.data[0];

      if (this.assignmentContent.courseStartDate && this.assignmentContent.courseEndDate) {
        const batchStartDate = new Date(this.assignmentContent.courseStartDate);
        const batchEndDate = new Date(this.assignmentContent.courseEndDate);
        this.courseStartDate = moment(batchStartDate).format('DD-MM-YYYY');
        this.courseEndDate = moment(batchEndDate).format('DD-MM-YYYY');
        this.assignmentContent.coursedetails.forEach(element => {
          element.moduledetails.forEach(moduleData => {
            moduleData.resourse.files.forEach(fileData => {
              if (fileData.startDate && fileData.endDate) {
                const date1 = JSON.parse(JSON.stringify(fileData.startDate));
                const date2 = JSON.parse(JSON.stringify(fileData.endDate));
                const startDate = new Date(date1);
                const endDate = new Date(date2);
                fileData.assignmentStartDate = moment(startDate).format('DD-MM-YYYY HH:MM');
                fileData.assignmentEndDate = moment(endDate).format('DD-MM-YYYY HH:MM');
                if (moment().format('DD-MM-YYYY HH:MM') >= fileData.assignmentStartDate) {
                  fileData.enableView = true;
                } else {
                  fileData.enableView = false;
                }
                if (moment().format('DD-MM-YYYY HH:MM') >= fileData.assignmentStartDate &&
                  moment().format('DD-MM-YYYY HH:MM') <= this.courseEndDate) {
                  fileData.enableUpload = true;
                } else if (moment().format('DD-MM-YYYY HH:MM') < fileData.assignmentStartDate ||
                  moment().format('DD-MM-YYYY HH:MM') > this.courseEndDate) {
                  fileData.enableUpload = false;
                }
              }
            });
          });
        });
        // const tabGroup = this.demo3Tab;
        // if (!tabGroup || !(tabGroup instanceof MatTabGroup)) { return; }

        // const tabCount = tabGroup._tabs.length;
        // if (this.detailData && this.detailData.assignmentVal) {
        //   this.selectedTabIndex = tabCount - 2;
        // } else
        // if (this.detailData && this.detailData.forumVal) {
        //   this.selectedTabIndex = tabCount - 1;
        // }
      }
    });
  }
  uploadAssignmentsFile(event, fileId, modulename, topicname, assName, score, endDate, path) {
    this.assFile = event.target.files[0] as File;
    this.postAssignmentsFile(fileId, modulename, topicname, assName, score, endDate, path);

  }

  postAssignmentsFile(fileId, modulename, topicname, assName, score, endDate, path) {
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
    payload.append('user_id', this.getuserid.user_id);
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

  getPlayerNextPrve() {
    this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      this.scromApiData = data.data?.playerModuleAndTopic?.message[0];
      /* this.scromModuleData = this.scromApiData?.childData;*/
      this.moduleLenth = this.scromApiData?.childData.length;
      this.playerTopicLen = this.scromApiData.total_topic_len;

    });
  }



  topicNext() {
    this.isNextEnable = true;
    this.moduleInfo = this.scromModuleData[this.currentPage];
    if (this.currentPage < (this.moduleLenth)) {
      this.getTopicLengthofModule = this.scromModuleData[this.currentPage].topic_len;
      // topic to module change on previous
      if (this.topiccurrentPage === this.getTopicLengthofModule - 1 ) {
        this.currentPage = this.currentPage + 1;
        this.moduleHolder = this.currentPage;
        this.topiccurrentPage = 0;
        this.nextPrevHolder = 0;
        this.getTopicLengthofModule = this.scromModuleData[this.currentPage].topic_len;
      } else {
        this.topiccurrentPage = this.topiccurrentPage + 1;
        this.nextPrevHolder = this.topiccurrentPage;
      }
      // topic
      if (this.topiccurrentPage <= this.getTopicLengthofModule) {
        this.gettopicLink = this.scromModuleData[this.currentPage].children[this.topiccurrentPage];
        this.moduleSatusCheck = this.moduleInfo.status ? this.moduleInfo.status : 'process';
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
          (environment.scormUrl + '/scormPlayer.html?contentID=' +
            this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
            this.getuserid._id + '&path=' + this.gettopicLink.link +
            '&module_status=' + this.moduleSatusCheck
            + '&module=' + this.moduleInfo.title + '&topic=' + this.gettopicLink.title);
      }
    }
  }

  topicPrve() {
    this.isprevEnable = true;
    this.moduleInfo = this.scromModuleData[this.currentPage];
    if (this.currentPage < (this.moduleLenth)) {
      this.getTopicLengthofModule = this.scromModuleData[this.currentPage].topic_len;
      // topic to module change on previous
      if (this.currentPage - 1 >= 0 && this.topiccurrentPage === 0) {
        this.currentPage = this.currentPage - 1;
        this.moduleHolder = this.currentPage;
        this.topiccurrentPage = this.scromModuleData[this.currentPage].children.length - 1;
        this.nextPrevHolder = this.topiccurrentPage;
        this.getTopicLengthofModule = this.scromModuleData[this.currentPage].topic_len;
      } else {
        this.topiccurrentPage = this.topiccurrentPage - 1;
        this.nextPrevHolder = this.topiccurrentPage;
      }
      // topic
      if (this.topiccurrentPage <= this.getTopicLengthofModule) {
        this.gettopicLink = this.scromModuleData[this.currentPage].children[this.topiccurrentPage];
        this.moduleSatusCheck = this.moduleInfo.status ? this.moduleInfo.status : 'process';
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
          (environment.scormUrl + '/scormPlayer.html?contentID=' +
            this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
            this.getuserid._id + '&path=' + this.gettopicLink.link +
            '&module_status=' + this.moduleSatusCheck
            + '&module=' + this.moduleInfo.title + '&topic=' + this.gettopicLink.title);
      }
    }
  }

  // get Scrom module and topic
  playerModuleAndTopic() {
    this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      this.scromApiData = data.data?.playerModuleAndTopic?.message[0];
      this.scromModuleData = this.scromApiData?.childData;
      // tree level
      this.scromModuleData.forEach(childData => {
        // console.log(childData.children);
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
    });
  }
  playTopic(url, topicName, topicStatus, moduleName, moduleStatus, moduleLegth, topicLenght, topindex, moduleIdx) {
    this.moduleSatusCheck = moduleStatus ? moduleStatus : 'process';
    const encodedModuleName = encodeURIComponent(moduleName);
    const encodedTopicName = encodeURIComponent(topicName);
    this.nextPrevHolder = topindex - 1;
    this.moduleHolder = moduleIdx;
    this.isprevEnable = true;
    this.isNextEnable = true;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      (environment.scormUrl + '/scormPlayer.html?contentID=' +
        this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' + this.getuserid._id + '&path=' + url
        + '&module_status=' + this.moduleSatusCheck
        + '&module=' + encodedModuleName + '&topic=' + encodedTopicName);
    console.log('before encodeing', this.urlSafe);
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
  // refreshData() {
  //   this.dataRefresher =
  //     setInterval(() => {
  //       this.playerModuleAndTopic(false);

  //     }, 20000);
  // }
  // autoHide() {
  //   this.dataRefresher =
  //     setInterval(() => {
  //       // this.playerModuleAndTopic(false);
  //       this.sider = false;
  //       this.playerMenuEnable = true;
  //     }, 10000);
  // }

  makeFullScreen() {
    const element = document.querySelector('#myPlayer');
    element.requestFullscreen()
      .then(() => {
      })
      .catch((error) => {
        console.log(error.message);
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


  previewDoc(templateRef: TemplateRef<any>, path) {
    this.dialog.open(templateRef, {
      // scrollStrategy: new NoopScrollStrategy(),
      width: '100%',
      height: '100%',
      scrollStrategy: new NoopScrollStrategy(),
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

  scroll(el: HTMLElement) {
    el.scrollTop = 0;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // playCourse(i) {
  //   this.route.navigate(['/Learner/scorm', { id: i }]);
  //   this.service.syllabus_of_particular_scorm('FSL ').subscribe((viewCourse: any) => {
  //   });
  // }

  // selectWishlist(course) {
  //   if (this.gs.checkLogout()) {
  //     if (this.course.wishlisted === false) {
  //       this.service.addWishlist(course.course_id, this.userDetail._id).subscribe((addWishlist: any) => {
  //         if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
  //           this.course.wishlisted = !this.course.wishlisted;
  //           this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
  //           this.gs.canCallWishlist(true);       // this.loader.hide();
  //         }
  //       });
  //     } else {
  //       this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
  //         if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
  //           this.course.wishlisted = !this.course.wishlisted;
  //           course.wishlist_id = null;
  //           this.gs.canCallWishlist(true);
  //           // this.loader.hide();
  //         }
  //       });
  //     }
  //   }
  // }

  // enrollCourse() {
  //   this.service.enrollcourse(this.userDetail.user_id, this.userDetail.group_id[0], this.course.course_id)
  //     .subscribe((enrollCourse: any) => {
  //       if (enrollCourse.data) {
  //         if (enrollCourse.data.enrollcourse.success) {
  //           Swal.fire('User enrolled successfully for the course');
  //         } else {
  //           Swal.fire(enrollCourse.data.enrollcourse.message);
  //         }
  //       } else {
  //         Swal.fire('Please try again later');
  //       }
  //     });
  // }

  // }


  // getModuleData(){
  //     this.service.getModuleData(this.course_id).subscribe((data: any) => {
  //       if (data.data.getmoduleData.success === 'true') {
  //         this.content = data.data.getmoduleData.data[0];
  //         this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
  //         this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
  //         (environment.scormUrl + '/scormPlayer.html?contentID=' +
  //         this.course_id + '&user_id=' + this.user_id + '&user_obj_id=' + this.getuserid._id);
  //         // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
  //         this.modulength = this.content.coursedetails.length;
  //         this.content.coursedetails.forEach(moduledetails => {
  //           moduledetails.moduledetails.forEach(element => {
  //             this.countofdoc = element.resourse.count;
  //             return true;
  //           });
  //         });
  //       }
  //     });

  onScrollDown() {
    this.pagenumber = this.pagenumber + 1;
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
          // console.log(result);
        });
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
    this.dialog.closeAll();
  }
}


