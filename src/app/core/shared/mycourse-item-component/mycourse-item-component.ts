import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-mycourse-item-component',
  templateUrl: './mycourse-item-component.html',
  styleUrls: ['./mycourse-item-component.scss']
})

export class MycourseItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('courseItems') course: any = {};
  @Input() completedCourse: number;
  @Input() globalData: any = {};
  // @Input('canNavigate') canNavigate: boolean;
  // @Input('showCartBtn') showCartBtn: boolean;
  // @Input('showWishlist') showWishlist: boolean;
  // @Input('showStatus') showStatus: boolean;
  // @Input('showPrice') showPrice: boolean;
  // @Input('showCount') showCount: boolean;
  // @Input('showRating') showRating: boolean;
  // @Input('showDate') showDate: boolean;
  // @Input('goto') goto: string;
  // @Input('isDraft') isDraft: boolean;
  // @Input('showEnroll') showEnroll: boolean ;
  // @Input('btnType') btnType: string;

  userDetail: any;
  recordedData: any;
  finalFullData: any;
  finalStatus: any = null;
  role: any;
  courseWeekCircle: any;
  instDefault: any = '../../../../assets/learner/mycourseicons/Instructor_default.svg';
  activityDefault: any = '../../../../assets/learner/mycourseicons/Activities_defult.svg';
  discussDefault: any = '../../../../assets/learner/mycourseicons/Discussion_default.svg';
  tabselector: any = 0;
  // tabTitleVal: string = 'Self-Paced Learning';
  constructor(
    public translate: TranslateService,
    public service: CommonServicesService,
    private alert: AlertServiceService,
    private gs: GlobalServiceService,
    private router: Router,
    private loader: Ng4LoadingSpinnerService, ) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role') || null;
  }


  ngOnInit() {

    this.courseWeekCircle = (this.course.week_completed_count !== null ?
       this.course.week_completed_count : 0) + '/' + (this.course.week_total_count !== null ? this.course.week_total_count : 0);
  }
  Go(course) {
    localStorage.removeItem('userTabLocation');
    const data1 = {
      courseId: course.course_id,
      courseName: course.course_name
    };
    localStorage.setItem('Courseid', data1.courseId);
    localStorage.setItem('CourseName', data1.courseName);
    this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
  }
  goToSelflearning(course) {
    const data1 = {
      courseId: course.course_id,
      courseName: course.course_name
    };
    localStorage.setItem('Courseid', data1.courseId);
    localStorage.setItem('CourseName', data1.courseName);
    this.router.navigateByUrl('/Learner/selfLearning', { state: { data: data1 } });
  }
  gotoDesc(c) {
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    //   this.show = true;
    // } else {
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c.coursePlayerStatus.course_percentage);
    localStorage.setItem('CourseName', c.course_name);
    // this.show = false;
    // }
  }

  goToForum(c) {
    localStorage.setItem('Courseid', c.course_id);
    const bt = c.activity_info?.batchid ? {
      batchid: c.activity_info?.batchid,
      batchenddate: c.batch_end_date,
      batch_start_date: c.batch_start_date,
      batchname: c.batch_name
    } : null;
    const detail = {
      id: c.course_id,
      name: c.course_name,
      batchdetails: bt
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/discussionForum', { state: { detail } });
  }


  gotoSubmissionDetails(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      name: c.course_name,
      tableType: 'submission',
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/activitycenter', { state: { detail } });
  }

  goInstructorLed(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      name: c.course_name
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    // this.router.navigateByUrl('/Learner/instructorLed', { state: { detail } });
    this.router.navigate(['/Learner/instructorLed'], { queryParams: detail }); // ['/booking'],{queryParams: {Id :id}}
  }

  // tabclicker(indexVal){
  //   this.tabTitleVal = ""
  //   let titlevalues = ['Self-Paced Learning', 'Instructor Led', 'Discussion Forum', 'Activities']
  //   setTimeout(() => {
  //     this.tabTitleVal = titlevalues[indexVal]
  //   }, 400);
  // }
}
