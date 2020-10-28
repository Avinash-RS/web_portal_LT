import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonServicesService } from '@core/services/common-services.service';

@Component({
  selector: 'app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.scss', '../coursedetails/coursedetails.component.scss']
  // '../coursedetails/coursedetails.component.scss'
})
export class DiscussionForumComponent implements OnInit {

  scromModuleData = [];
  course: any;
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

  constructor(public Lservice: LearnerServicesService, public route: Router, private formBuilder: FormBuilder,
              private gs: GlobalServiceService, private toastr: ToastrService, private dialog: MatDialog,
              public cS: CommonServicesService) {
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.course = detail || JSON.parse(atob(localStorage.getItem('course')));
    this.userDetail = this.gs.checkLogout();
    this.playerModuleAndTopic(this.course.id);
  }

  ngOnInit() {
  }

  goBack() {
    this.route.navigateByUrl('/Learner/MyCourse');
  }

  getSelectedIndex(i) {
    this.selectedIndex = i || 0;
  }

  playerModuleAndTopic(cid) {
    // this.cS.loader$.next(true);
    this.loading = true;
    this.Lservice.playerModuleAndTopic(cid, this.userDetail.user_id).subscribe((data: any) => {
      this.scromModuleData = data.data?.playerModuleAndTopic?.message && data.data?.playerModuleAndTopic?.message[0]?.childData || [];
      this.selectedModuleData = this.scromModuleData[0] || null;
      this.loading = false;
      if (this.selectedModuleData) {
        this.loading = true;
        this.selectedModuleData.indexValue = 1;
        this.Lservice.getSingleBatchInfo(this.userDetail.user_id, cid).subscribe((resdata: any) => {
          if (resdata?.data?.getbatchdetails?.message?.batchid !== null) {
            this.batchDetails = resdata?.data?.getbatchdetails?.message;
            const batchEndDate = new Date(resdata?.data?.getbatchdetails?.message.batchenddate);
            this.disableThreads = batchEndDate.toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10) ? true : false;
            this.viewAllThreads();
          } else {
            this.batchDetails = null;
            this.viewAllThreads();
          }
        });
      }
    });
  }

  viewAllThreads() {
    // this.cS.loader$.next(true);
    this.loading = true;
    this.Lservice.ViewAllThreadData(this.selectedModuleData?.title, this.course.id, this.batchDetails?.batchid)
      .subscribe((result: any) => {
        const temp = result.data.ViewAllThreadData.data;
        if (result?.data?.ViewAllThreadData?.data !== '') {
          result?.data?.ViewAllThreadData?.data?.topics.sort((a, b) => new Date(b.lastposttimeISO || b.timestampISO).getTime() -
            new Date(a.lastposttimeISO || a.lastposttimeISO).getTime());
          this.discussionData = result.data.ViewAllThreadData.data;
          this.discussionData1 = Object.assign({}, result.data.ViewAllThreadData.data);
          // this.cS.loader$.next(false);
          this.loading = false;
          if (this.discussionData?.topics && this.discussionData?.topics?.length > 0) {
            this.discussionData.topics = this.discussionData?.topics?.filter(i => i.deleted === false);
            this.discussionData1.topics1 = this.discussionData.topics;
          }
        } else {
          // this.cS.loader$.next(false);
          this.loading = false;
          this.discussionData = null;
        }
      });
  }

  gotoNewThread(templateRef: TemplateRef<any>) {
    if (this.userDetail.nodebb_response != null) {
      this.addThreadForm?.reset();
      this.addThreadForm = this.formBuilder.group({
        thread_name: new FormControl('', [Validators.minLength(8), Validators.required]),
        thread_description: new FormControl('', [Validators.minLength(8), Validators.required]),
      });
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

  sendComment(type, data, array?, pidData?) {
    let d = data;
    this.addPostComment = [];
    this.addThreadComment = null;
    d = d.replace(/&#160;/g, '').trim() || d.replace(/&#160;/g, '').trimLeft();
    if (d.length > 8) {
      if (d.length > 599500) {
        this.toastr.warning('Comment should be less than 6,00,000 characters');
      } else {
        // this.cS.loader$.next(true);
        this.loading = true;
        const UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
        const data1 = {
          content: data,
          tid: this.selectedThreadData.tid,
          uid: UserDetails.nodebb_response.uid,
          toPid: pidData?.pid ? pidData.pid : 0,
          course_id: this.course.id,
          course_name: this.course.name, // course name should come
          module_name: this.selectedModuleData.title,
          thread_id: (this.selectedThreadData.tid).toString(),
          thread_name: this.selectedThreadData.title,
          created_by: this.userDetail.username,
          a2i: this.a2iFlag || false,
        };
        this.Lservice.postcomment(data1).subscribe((result: any) => {
          // this.cS.loader$.next(true);
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
            // this.cS.loader$.next(false);
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
        this.topicDiscussionData.posts = this.topicDiscussionData1.posts1;
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
    }
    // }, 3000);

  }

  viewsingletopicdiscussion(slug) {
    // this.cS.loader$.next(true);
    this.loading = true;
    this.topicDiscussionData = [];
    const topicSlug = slug;
    if (this.userDetail?.nodebb_response?.uid) {
      this.Lservice.viewsingletopicdiscussion(topicSlug.toString(), this.userDetail?.nodebb_response?.uid).subscribe((result: any) => {
        this.topicDiscussionData = result.data.ViewSingleTopicDiscussionData.data;
        this.topicDiscussionData1 = Object.assign({}, result.data.ViewSingleTopicDiscussionData.data);
        this.topicDiscussionData1.posts1 = (this.topicDiscussionData1.posts);
        const data = this.topicDiscussionData?.posts?.map(item => item.content = this.alterstring(item?.content));
        const data1 = this.topicDiscussionData1?.posts1?.map(item => item.content = this.alterstring(item?.content));
        // this.cS.loader$.next(false);
        this.loading = false;
      });
    }
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

  createNewThread() {
    let bid;
    if (this.batchDetails?.batchid) {
      bid = { batch_id: this.batchDetails?.batchid, batch_name: this.batchDetails?.batchname };
    } else {
      bid = null;
    }
    this.addThreadForm.value.thread_name = this.addThreadForm.value.thread_name.trim()
      || this.addThreadForm.value.thread_name?.trimLeft() || this.addThreadForm.value.thread_name?.trimEnd();
    const desc: any = {};
    desc.d = this.addThreadForm.value.thread_description;
    desc.d = desc.d.replace(/&#160;/g, '')?.trim() || desc.d.replace(/&#160;/g, '')?.trimLeft() ||
      desc.d.replace(/&#160;/g, '')?.trimEnd();
    if (this.addThreadForm.value.thread_name.length > 8 && desc.d.length > 8) {
      if (desc.d.length > 599500) {
        this.toastr.warning('Content should be less than 6,00,000 characters');
      } else {
        // this.cS.loader$.next(true);
        this.loading = true;
        this.closedialogbox();
        this.Lservice.createNewThread(this.userDetail.nodebb_response.uid, this.course.id, this.selectedModuleData?.title,
          this.addThreadForm.value.thread_name, this.addThreadForm.value.thread_description, this.course.name,
          bid)
          .subscribe((result: any) => {
            this.addThreadForm?.reset();
            // this.cS.loader$.next(true);
            if (result.data.CreateNewThread?.success === 'true') {
              this.discussionData = this.discussionData1.topics1 = null;
              this.toastr.success('New thread created successfully');
              this.viewAllThreads();
            } else {
              // this.cS.loader$.next(false);
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
      const data = { uid: this.userDetail?.nodebb_response?.uid, pid: d.pid };
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
