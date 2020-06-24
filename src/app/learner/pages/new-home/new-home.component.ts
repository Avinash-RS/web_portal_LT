import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  userDetailes: any;
  enrolledCourses: any = [];
  incomplete: any = [];
  completed: any = [];

  constructor(public learnerService: LearnerServicesService, private gs: GlobalServiceService, private router: Router,) {
    this.userDetailes = this.gs.checkLogout();
    this.getEnrolledCourses();
  }

  ngOnInit() {
  }
  getEnrolledCourses() {
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id).subscribe((enrolledList: any) => {
      if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
        enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.forEach(element => {
         element.duration = this.diff_hours(element.course_start_datetime, element.course_start_datetime);
        });
        this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
        const arr = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(function (item) {
          return item.coursePlayerStatus?.status === 'incomplete' ||
            item.coursePlayerStatus?.status === 'suspend';
        });
        const arr1 = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(function (item) {
          return item.coursePlayerStatus?.status === 'completed';
        });
        this.completed = arr1;
        this.incomplete = arr;
      }
    });
  }

  diff_hours(dt2, dt1) {
    let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  gotoScorm(c) {
    const detail1 = {
      id: 'Scaffolding',
      user: this.userDetailes.user_id,
      course_id: c.course_id,
      user_obj_id: this.userDetailes._id,
      feed_back: c.coursePlayerStatus.feed_back
    };
    this.router.navigateByUrl('/Learner/scorm', { state: { detail: detail1 } });
  }

  gotoDesc(c) {
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null
    };
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
  }
}
