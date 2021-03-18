import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mycourse-item-component',
  templateUrl: './mycourse-item-component.html',
  styleUrls: ['./mycourse-item-component.scss']
})

export class MycourseItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('courseItems') course: any = {};
  // NOT USING ANY WHERE
  // @Input() completedCourse: number;
  // @Input() globalData: any = {};

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
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplaySpeed: 700,
    dotsSpeed: 700,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 1
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
      1200: {
        items: 1,
      }
    },
    nav: true
  };
  // tabTitleVal: string = 'Self-Paced Learning';
  constructor(
    public translate: TranslateService,
    public service: CommonServicesService,
    private alert: AlertServiceService,
    private gs: GlobalServiceService,
    private router: Router,
    private loader: Ng4LoadingSpinnerService, ) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role') ||sessionStorage.getItem('role') || null;
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
      course_name: c.course_name,
      course_status: c.course_status,
      batch_id:c.batchid
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    //   this.show = true;
    // } else {
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c && c.coursePlayerStatus && c.coursePlayerStatus.course_percentage ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    // this.show = false;
    // }
  }

  goToForum(c) {
    localStorage.setItem('Courseid', c.course_id);
    const bt = c.batchid ? {
      batchid: c.batchid,
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
    this.router.navigateByUrl('/Learner/activitycenterhomescreen/activitycenter', { state: { detail } });
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

  openGallery(c){
    this.router.navigate(['/Learner/coursegallery'],{
      queryParams:
      {
        id: c.course_id,
        name: c.course_name
      }
    });
  }
  openReport(c){
    this.router.navigate(['/Learner/coursereport'],{
      queryParams:
      {
        id: c.course_id,
        name: c.course_name
      }
    });
  
  }
  // tabclicker(indexVal){
  //   this.tabTitleVal = ""
  //   let titlevalues = ['Self-Paced Learning', 'Instructor Led', 'Discussion Forum', 'Activities']
  //   setTimeout(() => {
  //     this.tabTitleVal = titlevalues[indexVal]
  //   }, 400);
  // }
}
