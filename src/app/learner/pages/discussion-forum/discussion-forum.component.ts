import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.scss', '../coursedetails/coursedetails.component.scss']
  // '../coursedetails/coursedetails.component.scss'
})
export class DiscussionForumComponent implements OnInit {

  scromModuleData = [];
  course: any;
  threadData;
  userDetail: any;
  showCourseDetails = true;
  disableThreads = false;
  discussionData1: any = {
  };
  discussionData: any = {
  };
  batchDetails: any;
  selectedModuleData: any;
  searchthreadname: boolean;
  addThreadForm: any;
  selectedThreadData: any;
  showCommentThread: boolean;
  a2iFlag: boolean;
  showCommentEditor: any = [];
  showThreadComment: boolean;
  addThreadComment: any;
  addPostComment = [];
  filterValue: any = null;
  topicDiscussionData: any;
  topicDiscussionData1: any;
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
  selectedIndex: any = 0;
  loading = false;
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  isHideAccord: boolean = false;
  isMobile: boolean = false;
  secretKey = '(!@#Passcode!@#)';
  oldIdx: any;
  sortBox = false;
  selected;
  checkLevel: any;
  constructor(public Lservice: LearnerServicesService, public route: Router, private formBuilder: FormBuilder,
              private gs: GlobalServiceService, private toastr: ToastrService, private dialog: MatDialog,
              public cS: CommonServicesService, public translate: TranslateService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en');
                const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
                this.course = detail || JSON.parse(atob(localStorage.getItem('course')));
                this.userDetail = this.gs.checkLogout();
                this.playerModuleAndTopic(this.course.id);
  }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    if (!this.runnablePlatforms.includes(navigator.platform)) {
        this.isMobile = true;
      }
  }

  goBack() {
    if (this.isMobile) {
      if (this.isHideAccord) {
        this.isHideAccord = false;
      } else {
        this.route.navigateByUrl('/Landing/MyCourse');
      }
    } else {
      this.route.navigateByUrl('/Landing/MyCourse');
    }
  }

  getSelectedIndex(i) {
    this.selectedIndex = i || 0;
  }

  playerModuleAndTopic(cid) {
    this.loading = true;
    let param: any = {};
    param.parent = '';
    param.contentID = cid;
    let id = CryptoJS.AES.decrypt(this.userDetail.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    param.user_id = id;
    param.batchid = this.course.batchdetails?.batchid;
    console.log(param);
    this.cS.getTOC(param).subscribe((data: any) => {
      this.checkLevel = data.message && data.checkLevel;
      this.scromModuleData = data?.message && data?.message || [];
      this.selectedModuleData = this.scromModuleData[0]?.childData[0] || null;
      this.loading = false;
      console.log(this.scromModuleData);
      if (this.selectedModuleData) {
        this.loading = true;
        this.selectedModuleData.indexValue = 1;
        this.batchDetails = this.course.batchdetails || null;
        if (this.batchDetails?.batchenddate) {
          const batchEndDate = new Date(this.batchDetails.batchenddate);
          const todayDate = moment().startOf('day').toDate();
          const enddateTemp = moment(batchEndDate, 'YYYY-MM-DD').endOf('day').toDate();
          if (todayDate === enddateTemp || todayDate < enddateTemp) {
            this.disableThreads = false;
          } else {
            this.disableThreads = true;
          }
        }
        this.viewAllThreads();
      }
    });
  }
  viewAllThreads(c?) {
    this.loading = true;
    this.Lservice.ViewAllThreadData(this.selectedModuleData?.module_name, this.course.id, this.batchDetails?.batchid)
      .subscribe((result: any) => {
        const temp = result.data.ViewAllThreadData.data;
        if (result?.data?.ViewAllThreadData?.data !== '' && result?.data?.ViewAllThreadData !== null) {
          result?.data?.ViewAllThreadData?.data?.topics?.sort((a, b) => new Date(b.lastposttimeISO || b.timestampISO).getTime() -
            new Date(a.lastposttimeISO || a.lastposttimeISO).getTime());
          this.discussionData = result.data.ViewAllThreadData.data;
          this.discussionData1 = Object.assign({}, result.data.ViewAllThreadData.data);
          this.threadData = result.data.ViewAllThreadData?.data?.topics;
          if (c === 'NewThread') {
            if (this.threadData.length > 0) {
              this.selectedThreadData = this.threadData[0];
              this.selectedThreadData.thread_id = this.selectedThreadData.tid;
              this.showDetail(this.selectedThreadData, this.threadData.length - 1);
            }

          }
          this.loading = false;
          if (this.discussionData?.topics && this.discussionData?.topics?.length > 0) {
            this.discussionData.topics = this.discussionData?.topics?.filter(i => i.deleted === false);
            this.discussionData1.topics1 = this.discussionData.topics;
          }
        } else {
          this.loading = false;
          this.discussionData = null;
        }
      });
  }

  gotoNewThread(templateRef: TemplateRef<any>) {
    if (this.userDetail.nodebb_response != null) {
      this.addThreadForm?.reset();
      this.addThreadForm = this.formBuilder.group({
        thread_name: new FormControl('', [Validators.minLength(9), Validators.required]),
        thread_description: new FormControl('', [Validators.minLength(9), Validators.required]),
      });
      this.dialog.open(templateRef, { 
        disableClose: true,
        panelClass: 'newThreadPopup'}
      );
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }

  get f() {
    return this.addThreadForm.controls;
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  showDetail(data, i?) {
    this.filterValue = '';
    this.selected = '';
    this.searchthreadname = false;
    this.sortBox = false;
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

  sendComment(type, data, array?, pidData?) {
    let d = data;
    this.addPostComment = [];
    this.addThreadComment = null;
    d = d.replace(/&#160;/g, '').trim() || d.replace(/&#160;/g, '').trimLeft();
    if (d.length > 8) {
      if (d.length > 59950) {
        this.toastr.warning('Comment should be less than 60,000 characters');
        return false;
      } else {
        this.loading = true;
        const UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
        const data1 = {
          content: data,
          tid: CryptoJS.AES.encrypt(this.selectedThreadData.tid.toString(), this.secretKey.trim()).toString(),
          uid: CryptoJS.AES.encrypt(UserDetails.nodebb_response.uid.toString(), this.secretKey.trim()).toString(),
          toPid: CryptoJS.AES.encrypt((pidData?.pid ? pidData.pid : 0).toString(), this.secretKey.trim()).toString(),
          course_id: this.course.id,
          course_name: this.course.name, // course name should come
          module_name: this.selectedModuleData.module_name,
          thread_id: (this.selectedThreadData.tid).toString(),
          thread_name: this.selectedThreadData.title,
          created_by: this.userDetail.username,
          a2i: this.a2iFlag || false,
          thread_user_id : this.selectedThreadData.user.userslug
        };
        this.Lservice.postcomment(data1).subscribe((result: any) => {
          this.loading = true;
          this.a2iFlag = false;
          if (result.success) {
            this.addThreadComment = null;
            this.showThreadComment = false;
            this.addPostComment = [];
            this.showCommentEditor = [];
            this.viewsingletopicdiscussion(this.selectedThreadData.tid);
            this.toastr.success('Comment added successfully');
          } else {
            this.loading = false;
            this.toastr.warning(result.message);
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
  }

  searchThread(filterValue: string) {
    if (filterValue.trim().toLowerCase().length > 3) {
      if (this.showCommentThread) {
        this.topicDiscussionData.posts = this.topicDiscussionData1.posts1;
        let arr = JSON.parse(JSON.stringify(this.topicDiscussionData1.posts1.slice(1)));
        const thread = this.topicDiscussionData.posts[0];
        arr = arr.filter((item) => {
          return (item.content?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.user?.timestampISO?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item?.user?.username?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
          );
        });
        this.topicDiscussionData.posts = [thread, ...arr];
        if (this.topicDiscussionData.posts.length === 1) {
          this.toastr.warning('No search results found');
        }
      } else {
        const arr = JSON.parse(JSON.stringify(this.discussionData.topics1));
        this.discussionData.topics = arr.filter((item) => {
          return (item.title?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.user?.username?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
            item.lastposttimeISO?.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
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
    }
  }

  viewsingletopicdiscussion(slug) {
    this.loading = true;
    this.topicDiscussionData = [];
    const topicSlug = slug;
    if (this.userDetail?.nodebb_response?.uid) {
      const mask = CryptoJS.AES.encrypt(this.userDetail?.nodebb_response?.uid.toString(), this.secretKey.trim()).toString();
      this.Lservice.viewsingletopicdiscussion(topicSlug.toString(), mask).subscribe((result: any) => {
        this.topicDiscussionData = result?.data?.ViewSingleTopicDiscussionData?.data;
        this.topicDiscussionData1 = Object.assign({}, result?.data?.ViewSingleTopicDiscussionData?.data);
        this.topicDiscussionData1.posts1 = (this.topicDiscussionData1?.posts);
        this.loading = false;
      });
    }
  }

  getModuleDataForForum(length, ind, modData) {
    this.filterValue = '';
    this.selected = '';
    this.searchthreadname = false;
    this.sortBox = false;
    this.showCourseDetails = true;
    this.showCommentThread = false;
    this.selectedModuleData = null;
    this.selectedModuleData = modData;
    this.selectedThreadData = null;
    this.topicDiscussionData = [];
    this.selectedModuleData.indexValue = ind;
    this.viewAllThreads();
  }

  createNewThread() {
    let bid;
    if (this.batchDetails?.batchid) {
      bid = { batch_id: this.batchDetails?.batchid, batch_name: this.batchDetails?.batchname };
    } else {
      bid = null;
    }
    const desc: any = {};
    desc.d = this.addThreadForm.value.thread_description;
    desc.d = desc.d.replace(/&#160;/g, '')?.trim() || desc.d.replace(/&#160;/g, '')?.trimLeft() ||
      desc.d.replace(/&#160;/g, '')?.trimEnd();
    if ((this.addThreadForm.value.thread_name.replace(/\s/g, '').length) &&
    (this.addThreadForm.value.thread_name.length > 8) && desc.d.length > 8) {
      if (desc.d.length > 59950) {
        this.toastr.warning('Your post content is too large. Please reduce content and try again.');
        return false;
      } else {
        this.loading = true;
        this.closedialogbox();
        const mask = CryptoJS.AES.encrypt(this.userDetail?.nodebb_response?.uid.toString(), this.secretKey.trim()).toString();
        this.Lservice.createNewThread(mask, this.course.id, this.selectedModuleData?.module_name,
          this.addThreadForm.value.thread_name, this.addThreadForm.value.thread_description, this.course.name,
          bid)
          .subscribe((result: any) => {
            this.addThreadForm?.reset();
            if (result.data.CreateNewThread?.success === 'true') {
              this.discussionData = this.discussionData1.topics1 = null;
              this.toastr.success('New thread created successfully');
              this.viewAllThreads('NewThread');
            } else {
              this.loading = false;
              this.toastr.warning(result.data.CreateNewThread?.message);
            }
          });
      }
    } else {
      this.toastr.warning('Please fill mandatory details');
    }
  }

  likeandunlikepost(d?) {
    if (this.userDetail.nodebb_response != null || d !== undefined) {
      const data = { uid: CryptoJS.AES.encrypt(this.userDetail?.nodebb_response?.uid.toString(),
        this.secretKey.trim()).toString(), pid: CryptoJS.AES.encrypt(d?.pid.toString(), this.secretKey.trim()).toString() };
      if (d.apiCalled) {
        return false;
      } else {
        if (d.bookmarked) {
          d.bookmarked = false;
          d.bookmarks = d.bookmarks > 1 ? d.bookmarks - 1 : 0;
          d.apiCalled = true;
          this.Lservice.unlikepost(data).subscribe((result: any) => {
            if (!result.success) {
              d.bookmarked = true;
              d.bookmarks = d.bookmarks + 1;
              d.apiCalled = false;
              this.toastr.warning('Something went wrong. Try like/dislike later');
            } else {
              d.apiCalled = false;
              d.bookmarked = false;
            }
          });
        } else {
          d.bookmarked = true;
          d.bookmarks = d.bookmarks + 1;
          d.apiCalled = true;
          this.Lservice.likepost(data).subscribe((result: any) => {
            if (!result.success) {
              d.apiCalled = false;
              d.bookmarked = false;
              d.bookmarks = d.bookmarks - 1;
              this.toastr.warning('Something went wrong. Try like/dislike later');
            } else {
              d.apiCalled = false;
              d.bookmarked = true;
            }
          });
        }
      }
    } else {
      this.toastr.warning('You are not a registered user for forum');
    }
  }

  alterstring(text) {
    if (text?.indexOf('rel="nofollow"') === -1) {
      return text?.replace('↵', '').replace('</p>', '').replace(/<p>/g, '').replace(/&amp;/g, '&').
        replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
    } else {
      text = text?.replace('↵', '').replace('</p>', '').replace(/<p>/g, '').replace(/&amp;/g, '&').
        replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
      return text?.replace(text?.substring(text?.indexOf('rel="nofollow"') + 1, text?.indexOf('</a>" ')), '').
        replace(' r</a>"', '').replace('<a href="', '');

    }
  }

  goToSearchThread() {
    this.searchthreadname = true;
  }

  removeChar(evt) {
    const code = (evt.which) ? evt.which : evt.keyCode;
    if (code === 40 || code === 41 || code === 45) {
      return true;
    }
    if (!(code === 32) && !(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123)) {
      evt.preventDefault();
    }
  }

  moduleExpand(res, index) {
    if (index !== this.oldIdx) {
    for (const element of this.scromModuleData) {
      element.expanded = false;
    }
    this.scromModuleData[index].expanded = true;
    } else {
      this.scromModuleData[index].expanded = this.scromModuleData[index].expanded ? false : true;
    }
    this.oldIdx = index;
  }
}
