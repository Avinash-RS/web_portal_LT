import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '../../../../environments/environment';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { setInterval, clearInterval} from 'timers';
// import Swal from 'sweetalert2';
import * as myGlobals from '@core/globals';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { WcaService } from '@wca/services/wca.service';
import * as moment from 'moment';


@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  course: any = null;
  loading: boolean;
  pagenumber: any;
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
  showCommentThread = false;
  showCourseDetails = true;
  showCommentEditor = [];
  addThreadForm: any;
  showSearch = false;
  addCommentForm: any;
  discussionData: any;
  selected = '1';
  discussionData1: any = [];
  dataRefresher: any;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    // uploadUrl: 'environment.apiUrlImg + `upload/image`',
    toolbarPosition: 'top',
  };

  commentConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    // uploadUrl: 'environment.apiUrlImg + `upload/image`',
    toolbarPosition: 'top',
  };

  selectedModuleData: any = null;
  showThreadComment = false;

  lastpersentage: any;
  modIndex: any;
  topLength: number;
  finalper: any;
  finalper2: number;
  localper: string;
  selectedIndex = 0;
  topicDiscussionData: any;
  addThreadComment: any;
  addPostComment = [];
  selectedThreadData: any = null;
  filterValue: any = null;
  loadingForum: boolean;
  a2iFlag = false;
  topicDiscussionData1: any;
  assignmentVal = false;
  docpath: any = null;
  assFile: File;
  courseStartDate: any;
  courseEndDate: any;

  sortBox = false;
  searchthreadname = false;
  assignmentStartDate: any;
  // initials: any;

  constructor(private router: ActivatedRoute, public Lservice: LearnerServicesService, private cdr: ChangeDetectorRef,
    public service: CommonServicesService, private gs: GlobalServiceService, private dialog: MatDialog,
    public route: Router, private alert: AlertServiceService, private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer, private toastr: ToastrService, public wcaservice: WcaService) {

    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if (this.gs.checkLogout()) {
      this.courseid = detail && detail.id || this.localStoCourseid;
      this.userDetail = this.gs.checkLogout();
      this.localStoCourseid = localStorage.getItem('Courseid');
      this.lastpersentage = localStorage.getItem('persentage');
      // this.lastpersentage = detail  && detail.persentage || this.localper ;
      this.loading = true;
      this.playerModuleAndTopic(true);
      this.refreshData();
      this.service.viewCurseByID(detail && detail.id || this.localStoCourseid, this.userDetail.user_id)
        .subscribe((viewCourse: any) => {
          if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
            this.course = viewCourse.data.viewcourse.message;
            this.selectedModuleData = this.scromApiData?.childData[0];
            this.selectedModuleData.indexValue = 1;
            if (this.selectedModuleData) {
              this.viewAllThreads();
            }
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
      this.content.coursedetails.forEach(element => {
        let resourceFile = false;
        element.moduledetails.forEach(value => {
          if (value.resourse) {
            resourceFile = true;
            noresource = true;
          }
        });
        element.resValue = resourceFile;
      });
      this.content.noresource = noresource;
      this.getuserid = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
        (environment.scormUrl + '/scormPlayer.html?contentID=' +
          this.localStoCourseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
          this.getuserid._id + '&path=' + this.content.url);
      this.modulength = this.content.coursedetails.length;
      this.courseTime = this.content.coursetime;
    });
    this.getAssignmentmoduleData();
  }

  ngOnInit(): void {
  }

  getAssignmentmoduleData() {
    this.Lservice.getAssignmentmoduleData(this.localStoCourseid, this.userDetail.user_id).subscribe((data: any) => {
      this.assignmentContent = data.data.getAssignmentmoduleData.data[0];
      if (this.assignmentContent.courseStartDate && this.assignmentContent.courseEndDate) {
        const batchStartDate = new Date(this.assignmentContent.courseStartDate);
        const batchEndDate = new Date(this.assignmentContent.courseEndDate);
        this.courseStartDate = moment(batchStartDate).format('DD-MM-YYYY');
        this.courseEndDate = moment(batchEndDate).format('DD-MM-YYYY');

        this.assignmentContent.coursedetails.forEach(element => {
          element.moduledetails.forEach(moduleData => {
            moduleData.resourse.files.forEach(fileData => {
              const startDate = new Date(fileData.startDate);
              this.assignmentStartDate = moment(startDate).format('DD-MM-YYYY HH:MM');
              if (moment().format('DD-MM-YYYY HH:MM') >= this.assignmentStartDate) {
                fileData.enableView = true;
              } else {
                fileData.enableView = false;
              }

              if (moment().format('DD-MM-YYYY') >= this.assignmentStartDate && moment().format('DD-MM-YYYY') <= this.courseEndDate) {
                this.assignmentContent.enableUpload = true;
              } else if (moment().format('DD-MM-YYYY') < this.assignmentStartDate || moment().format('DD-MM-YYYY') > this.courseEndDate) {
                this.assignmentContent.enableUpload = false;
              }
            });
          });
        });
      }

    });
  }
  uploadAssignmentsFile(event, fileId, modulename, topicname, assName, score, endDate) {
    this.assFile = event.target.files[0] as File;
    this.postAssignmentsFile(fileId, modulename, topicname, assName, score, endDate);

  }

  postAssignmentsFile(fileId, modulename, topicname, assName, score, endDate) {
    if (!score) {
      score = 50;
    }
    let submitStatus = 'ontime';
    const enddate = new Date(endDate);
    if (moment().format('DD-MM-YYYY HH:MM') > moment(enddate).format('DD-MM-YYYY HH:MM')) {
      submitStatus = 'late';
    } else {
      submitStatus = 'ontime';
    }
    const payload = new FormData();
    payload.append('learnerdoc', this.assFile, this.assFile.name);
    payload.append('user_id', this.getuserid.user_id);
    payload.append('course_id', this.localStoCourseid);
    payload.append('topic_id', topicname);
    payload.append('module_id', modulename);
    payload.append('file_id', fileId);
    payload.append('type_name', assName);
    payload.append('submit_status', submitStatus);
    payload.append('total_mark', score);
    this.wcaservice.uploadAssignments(payload).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message, null);
        this.getAssignmentmoduleData();
      } else {
        this.toastr.warning(data.message, null);
      }
    });
  }


  // get Scrom module and topic
  playerModuleAndTopic(setPageFlag) {
    this.Lservice.playerModuleAndTopic(this.localStoCourseid, this.userDetail.user_id).subscribe((data: any) => {
      this.scromApiData = data.data?.playerModuleAndTopic?.message[0];
      this.scromModuleData = this.scromApiData?.childData;
    });
  }
  playTopic(url, topicName, topicStatus, moduleName, moduleStatus, moduleLegth, topicLenght, topindex) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      (environment.scormUrl + '/scormPlayer.html?contentID=' +
        this.localStoCourseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' + this.getuserid._id + '&path=' + url);
    this.playerstatusrealtime(topicName, topicStatus, moduleName, moduleStatus, moduleLegth, topicLenght, topindex);
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
    this.Lservice.playerstatusrealtime(this.userDetail.user_id, this.localStoCourseid, jsonData.module, this.finalper)
      .subscribe((data: any) => {
        if (data.data.playerstatusrealtime.success === true) {
          this.playerModuleAndTopic(true);
        } else {
        }
      });
  }

  getSelectedIndex(i) {
    this.selectedIndex = i;
  }

  refreshData() {
    this.dataRefresher =
      setInterval(() => {
        this.playerModuleAndTopic(false);
      }, 20000);
    // this.cancelPageRefresh();
  }

  cancelPageRefresh() {
    if (this.dataRefresher) {
      clearInterval(this.dataRefresher);
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.cancelPageRefresh();
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

  gotoNewThread(templateRef: TemplateRef<any>) {
    if (this.userDetail.nodebb_response != null) {
      this.addThreadForm?.reset();
      this.addThreadForm = this.formBuilder.group({
        thread_name: new FormControl('', [Validators.minLength(8), Validators.required]),
        thread_description: new FormControl('', [Validators.minLength(8), Validators.required]),
        // module: new FormControl('', myGlobals.req),
      });
      // this.addThreadForm.patchValue(this.catalog);
      this.dialog.open(templateRef);
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }

  get f() {
    return this.addThreadForm.controls;
  }

  closedialogbox() {
    this.dialog.closeAll();
    // this.addThreadForm?.reset();
  }

  showDetail(data) {
    this.showCourseDetails = false;
    this.showCommentThread = true;
    this.selectedThreadData = data;
    this.viewsingletopicdiscussion(data.tid);
  }

  gotoDisplayAllThreads() {
    this.showCourseDetails = true;
    this.showCommentThread = false;
    this.a2iFlag = false;
    this.showCommentEditor = [];
    this.showThreadComment = false;
  }

  // addComment(i) {
  //   this.showCommentEditor[i] = !this.showCommentEditor[i];
  //   this.addCommentForm?.reset();
  //   // this.addCommentForm = this.formBuilder.group({
  //   //   add_comment: new FormControl('', myGlobals.textVal),
  //   // });
  // }


  sendComment(type, data, array?, pidData?) {
    let d = data;
    d = d.replace(/&#160;/g, '').trim() || d.replace(/&#160;/g, '').trimLeft();
    console.log(d.length);
    if (d.length > 8) {
      if (d.length > 55500) {
        this.toastr.warning('Comment should be less than 60000 characters');
      } else {
        this.loadingForum = true;
        const UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
        const data1 = {
          content: data,
          tid: this.selectedThreadData.tid,
          uid: UserDetails.nodebb_response.uid,
          toPid: pidData?.pid ? pidData.pid : 0,
          course_id: this.course?.course_id,
          course_name: this.course?.course_name,
          module_name: this.selectedModuleData.title,
          thread_id: (this.selectedThreadData.tid).toString(),
          thread_name: this.selectedThreadData.title,
          created_by: this.userDetail.username,
          a2i: this.a2iFlag || false,
        };
        console.log(data1);
        this.Lservice.postcomment(data1).subscribe((result: any) => {
          this.a2iFlag = false;
          if (result.success) {
            this.addThreadComment = null;
            this.showThreadComment = false;
            this.showCommentEditor = [];
            this.viewsingletopicdiscussion(this.selectedThreadData.tid);
            this.toastr.success('Comment added successfully');
          } else {
            this.toastr.warning(result.message);
            this.loadingForum = false;
          }
        });
      }
    } else {
      this.toastr.warning('Comment should be minimum of 8 characters');
    }

  }
  clickToComment() {
    if (this.userDetail.nodebb_response != null) {
      this.showThreadComment = !this.showThreadComment;
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }
  clickToCommentPost(pin) {
    if (this.userDetail.nodebb_response != null) {
      this.showCommentEditor[pin] = !this.showCommentEditor[pin];
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }



  changedSort(e) {
    // this.loadingForum = true;
    // const data = {
    //   // userid: this.userDetail.user_id,
    //   moduleid: '1/announcements/',
    //   threadsearch: 'null',
    //   threadsort: e
    // };
    // this.Lservice.searchandsortthread(data).subscribe((result: any) => {
    //   if (result.success) {
    //     this.discussionData.topics = result.message;
    //     this.loadingForum = false;
    //   }
    // });
    if (this.showCommentThread) {
      if (e === '1') {
        const arr = this.topicDiscussionData.posts.slice(1);
        const thread = this.topicDiscussionData.posts[0];
        arr.sort((a, b) => new Date(b.timestampISO).getTime() -
          new Date(a.timestampISO).getTime());
        this.topicDiscussionData.posts = [thread, ...arr];
      } else {
        const arr = this.topicDiscussionData.posts.slice(1);
        const thread = this.topicDiscussionData.posts[0];
        arr.sort((a, b) => new Date(a.timestampISO).getTime() -
          new Date(b.timestampISO).getTime());
        this.topicDiscussionData.posts = [thread, ...arr];
      }
    } else {
      if (e === '1') {
        this.discussionData.topics.sort((a, b) => new Date(b.lastposttimeISO).getTime() -
          new Date(a.lastposttimeISO).getTime());
      } else {
        this.discussionData.topics.sort((a, b) => new Date(a.lastposttimeISO).getTime() -
          new Date(b.lastposttimeISO).getTime());
      }
      // this.viewAllThreads();
    }
  }

  onSearchChange(e) {
    this.filterValue = e;
    this.searchThread(e);
  }

  closeSearch() {
    this.searchthreadname = false;
    if (this.showCommentThread) {
      this.topicDiscussionData = this.topicDiscussionData1;
      this.topicDiscussionData.posts = this.topicDiscussionData1.posts1;
    } else {
      this.discussionData = this.discussionData1;
      this.discussionData.topics = this.discussionData1.topics1;
    }
    this.filterValue = null;
    this.cdr.detectChanges();

  }

  searchThread(filterValue: string) {
    // setTimeout(() => {
    if (filterValue.trim().toLowerCase().length > 3) {
      // const data = {
      //   moduleid: '1/announcements/',
      //   threadsearch: filterValue,
      //   threadsort: 'null'
      // };
      // this.Lservice.searchandsortthread(data).subscribe((result: any) => {
      //   if (result.success) {
      //     this.discussionData.topics = result.message;
      //   }
      // });data.user.username, data?.lastposttimeISO, data?.postcount
      if (this.showCommentThread) {
        let arr = this.topicDiscussionData.posts.slice(1);
        const thread = this.topicDiscussionData.posts[0];
        arr = this.topicDiscussionData.posts.filter((item) => {
          return (item.content?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.user?.timestampISO?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item?.user?.username?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            // || item.postcount?.indexOf(filterValue) > -1
          );
        });
        this.topicDiscussionData.posts = [thread, ...arr];
        if (this.topicDiscussionData.posts.length === 1) {
          // setTimeout(() => {
          this.toastr.warning('No search results found');
          // }, 3000);
        }
      } else {
        this.discussionData.topics = this.discussionData?.topics?.filter((item) => {
          return (item.title?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.user?.username?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.lastposttimeISO?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            // || item.postcount?.indexOf(filterValue) > -1
          );
        });
      }
    } else {
      this.filterValue = null;
      if (this.showCommentThread) {
        this.topicDiscussionData = this.topicDiscussionData1;
        this.topicDiscussionData.posts = this.topicDiscussionData1.posts1;
      } else {
        this.discussionData = this.discussionData1;
        this.discussionData.topics = this.discussionData1.topics1;
      }
      this.cdr.detectChanges();
    }
    // }, 3000);

  }

  viewsingletopicdiscussion(slug) {
    // const topicSlug = '2/pradeep-check-1';
    if (this.selectedThreadData.postcount > 1) {
      // this.loadingForum = true;
    }
    this.topicDiscussionData = [];
    const topicSlug = slug;
    if (this.userDetail?.nodebb_response?.uid) {
      this.loadingForum = true;
      this.Lservice.viewsingletopicdiscussion(topicSlug.toString(), this.userDetail?.nodebb_response?.uid).subscribe((result: any) => {
        this.topicDiscussionData = result.data.ViewSingleTopicDiscussionData.data;
        this.topicDiscussionData1 = Object.assign({}, result.data.ViewSingleTopicDiscussionData.data);
        this.topicDiscussionData1.posts1 = (this.topicDiscussionData1.posts);
        const data = this.topicDiscussionData?.posts?.map(item => item.content = this.alterstring(item?.content));
        const data1 = this.topicDiscussionData1?.posts1?.map(item => item.content = this.alterstring(item?.content));
        this.loadingForum = false;
      });
    }

    // this.Lservice.getSingleThread(topicSlug, this.userDetail?.nodebb_response.uid).subscribe((result: any) => {
    //   this.topicDiscussionData = result.data;
    //   this.topicDiscussionData1 = Object.assign({}, result.data);
    //   this.topicDiscussionData1.posts1 = (this.topicDiscussionData1.posts);
    //   const data = this.topicDiscussionData?.posts?.map(item => item.content = this.alterstring(item.content));
    //   const data1 = this.topicDiscussionData1?.posts1?.map(item => item.content = this.alterstring(item.content));
    //   this.loadingForum = false;
    //   this.cdr.detectChanges();
    // });

  }

  getModuleDataForForum(length, ind, modData) {
    this.showCourseDetails = true;
    this.showCommentThread = false;
    this.selectedModuleData = null;
    this.selectedModuleData = modData;
    this.selectedThreadData = null;
    this.topicDiscussionData = [];
    this.selectedModuleData.indexValue = ind;
    this.viewAllThreads();
  }

  viewAllThreads() {
    this.Lservice.ViewAllThreadData(this.selectedModuleData?.title, this.course?.course_id).subscribe((result: any) => {
      const temp = result.data.ViewAllThreadData.data;
      if (result?.data?.ViewAllThreadData?.data !== '') {
        result?.data?.ViewAllThreadData?.data?.topics.sort((a, b) => new Date(b.lastposttimeISO || b.timestampISO).getTime() -
          new Date(a.lastposttimeISO || a.lastposttimeISO).getTime());
        this.discussionData = result.data.ViewAllThreadData.data;
        this.discussionData1 = Object.assign({}, result.data.ViewAllThreadData.data);
        if (this.discussionData?.topics && this.discussionData?.topics?.length > 0) {
          this.discussionData.topics = this.discussionData?.topics?.filter(i => i.deleted === false);
          this.discussionData1.topics1 = this.discussionData.topics;
        }
        this.loadingForum = false;
      } else {
        this.loadingForum = false;
        this.discussionData = null;
      }
    });
  }

  createNewThread() {
    console.log(this.addThreadForm.value);
    this.addThreadForm.value.thread_name = this.addThreadForm.value.thread_name.trim()
      || this.addThreadForm.value.thread_name?.trimLeft() || this.addThreadForm.value.thread_name?.trimEnd();
    const desc: any = {};
    desc.d = this.addThreadForm.value.thread_description;
    desc.d = desc.d.replace(/&#160;/g, '')?.trim() || desc.d.replace(/&#160;/g, '')?.trimLeft() ||
      desc.d.replace(/&#160;/g, '')?.trimEnd();
    if (this.addThreadForm.value.thread_name.length > 8 && desc.d.length > 8) {
      if (desc.d.length > 55500) {
        this.toastr.warning('Content should be less than 60000 characters');
      } else {
        this.closedialogbox();
        this.loadingForum = true;
        this.Lservice.createNewThread(this.userDetail.nodebb_response.uid, this.course.course_id, this.selectedModuleData?.title,
          this.addThreadForm.value.thread_name, this.addThreadForm.value.thread_description, this.course.course_name)
          .subscribe((result: any) => {
            this.loadingForum = true;
            this.addThreadForm?.reset();
            if (result.data.CreateNewThread?.success === 'true') {
              this.discussionData = this.discussionData1.topics1 = null;
              this.toastr.success('New thread created successfully');
              this.viewAllThreads();
              this.loadingForum = false;
            } else {
              this.loadingForum = false;
              this.toastr.warning(result.data.CreateNewThread?.message);
            }
          });
      }
    } else {
      this.toastr.warning('Please fill mandatory details');
    }
  }

  likeandunlikepost(d ?) {
    console.log('abc', this.userDetail.nodebb_response);
    if (this.userDetail.nodebb_response != null || d !== undefined) {
      const data = { uid: this.userDetail?.nodebb_response?.uid, pid: d.pid };
      if (d.bookmarked) {
        d.bookmarked = !d.bookmarked;
        d.bookmarks = d.bookmarks - 1;
        this.Lservice.unlikepost(data).subscribe((result: any) => {
          if (!result.success) {
            d.bookmarked = !d.bookmarked;
            d.bookmarks = d.bookmarks + 1;
            this.toastr.warning('Something went wrong. Try like/dislike later');
          } else {
            // this.toastr.success('Unliked successfully');
            // this.viewsingletopicdiscussion(this.selectedThreadData.tid);
          }
          this.loadingForum = false;
        });
      } else {
        d.bookmarked = !d.bookmarked;
        d.bookmarks = d.bookmarks + 1;
        this.Lservice.likepost(data).subscribe((result: any) => {
          if (!result.success) {
            d.bookmarked = !d.bookmarked;
            d.bookmarks = d.bookmarks - 1;
            this.toastr.warning('Something went wrong. Try like/dislike later');
          } else {
            // this.toastr.success('Liked successfully');
            // this.viewsingletopicdiscussion(this.selectedThreadData.tid);
          }
          this.loadingForum = false;
        });
      }
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }

  alterstring(text) {
    // return text.replace('↵', '').replace('</p>', '').replace(/<p>/g, '').replace(/&amp;/g, '&').
    // replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
    if (text?.indexOf('rel="nofollow"') === -1) {
      return text?.replace('↵', '').replace('</p>', '').replace(/<p>/g, '').replace(/&amp;/g, '&').
        replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
    } else {
      text = text?.replace('↵', '').replace('</p>', '').replace(/<p>/g, '').replace(/&amp;/g, '&').
        replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
      // const startIndex = text.indexOf('rel="nofollow"');
      // const endIndex = text.indexOf('</a>" ');
      // const replacement = '';
      // const toBeReplaced = text.substring(startIndex + 1, endIndex);
      // return text.replace(toBeReplaced, replacement).replace(' r</a>"', '').replace('<a href="', '');
      return text?.replace(text?.substring(text?.indexOf('rel="nofollow"') + 1, text?.indexOf('</a>" ')), '').
        replace(' r</a>"', '').replace('<a href="', '');

    }
  }

  goToSearchThread() {
    this.searchthreadname = true;
  }
}


