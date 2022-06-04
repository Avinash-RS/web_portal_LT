import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-microcourse',
  templateUrl: './microcourse.component.html',
  styleUrls: ['./microcourse.component.scss']
})
export class MicrocourseComponent implements OnInit {
  bufferValue = 100;
  mode = 'determinate';
  blobKey = environment.blobKey;
  // tslint:disable-next-line:no-input-rename
  @Input('courseItems') course: any = {};
  userDetail: any;
  courseWeekCircle: string;
  role: string;

  constructor(
    public translate: TranslateService,
    public service: CommonServicesService,
    private alert: AlertServiceService,
    private gs: GlobalServiceService,
    private router: Router) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
  }

  ngOnInit(): void {
    this.courseWeekCircle = (this.course.week_completed_count !== null ?
    this.course.week_completed_count : 0) + '/' + (this.course.week_total_count !== null ? this.course.week_total_count : 0);
    this.course.batch_end_date_Timer = new Date(this.course.batch_end_date).getTime();
  }
  gotoDesc(c) {
    c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name,
      course_status: c.course_status,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date_Timer,
      isTesting: c?.isTesting ? true : false,
      link: c.link,
      toc: c.toc,
      lastLogIndex: c.lastLogIndex,
      lastModule: c.lastModule,
      lastTopic: c.lastTopic,
      checklevel: c.checklevel,
      module_id: c.module_id,
      topic_id: c.topic_id,
      course_type: c.course_type
    };
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer);
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('CourseType', c.course_type);
    localStorage.setItem('persentage', c && c.coursePlayerStatus &&
    c.coursePlayerStatus.course_percentage ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    localStorage.setItem('isTesting', c?.isTesting ? 'true' : 'false');
    localStorage.setItem('resumeData', JSON.stringify({link: c.link, lastModule: c.lastModule,
    lastTopic: c.lastTopic, module_id: c.module_id, topic_id: c.topic_id, checklevel: c.checklevel,
    course_status: c.course_status, toc: c.toc}));
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
  }
  gotoProgression(course) {
    const data = {
      courseId : course.course_id,
      courseName: course.course_name,
    };
    this.router.navigate(['/Learner/progressionReport'], {
      queryParams:
      {
        CourseId: btoa(course.course_id),
        CourseName: btoa(course.course_name),
        fromPage: 'microCourse',
      }
    });
  }
}
