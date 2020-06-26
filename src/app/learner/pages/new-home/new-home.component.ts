import { Component, OnInit, HostListener } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  loading: boolean;
  screenHeight: number;
  screenWidth: number;

  constructor(public learnerService: LearnerServicesService, private gs: GlobalServiceService, private router: Router, ) {
    this.userDetailes = this.gs.checkLogout();
    this.getEnrolledCourses();
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  ngOnInit() {
  }

  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
}
  getEnrolledCourses() {
    this.loading = true;
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id, this.userDetailes._id).subscribe((enrolledList: any) => {
      if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
        // enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.forEach(element => {
        //   this.learnerService.getModuleData(element.course_id, this.userDetailes.user_id).subscribe((data: any) => {
        //     if (data.data.getmoduleData.data) {
        //       element.duration = data.data.getmoduleData.data[0]?.coursetime;
        //     }
        //   });
        //   //  element.duration = this.diff_hours(element.course_start_datetime, element.course_start_datetime);
        // });
        this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
        const arr = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(function(item) {
          return item.coursePlayerStatus?.status === 'incomplete' ||
            item.coursePlayerStatus?.status === 'suspend';
        });
        const arr1 = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(function(item) {
          return item.coursePlayerStatus?.status === 'completed';
        });
        this.completed = arr1;
        this.incomplete = arr;
      }
      this.loading = false;
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
    if (this.screenWidth < 800) {
      Swal.fire({
        title: 'Please login in laptop',
      }).then((result) => {

      });
  } else {
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    localStorage.setItem('Courseid', c.course_id);
  }
  }
}
