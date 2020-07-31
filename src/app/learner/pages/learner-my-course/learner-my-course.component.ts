import { Component, OnInit, HostListener } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { data } from 'jquery';
// import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss'],
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
export class LearnerMyCourseComponent implements OnInit {
  strDate: Date = new Date();
  userDetailes: any;
  enrolledCourses: any = [];
  incomplete: any = [];
  completed: any = [];
  loading: boolean;
  screenHeight: number;
  screenWidth: number;
  showShortDesciption = true;
  show = false;
  results = [];



  constructor(
    // public translate: TranslateService,
    public learnerService: LearnerServicesService, private gs: GlobalServiceService,
    private router: Router) {
    this.userDetailes = this.gs.checkLogout();
    this.getEnrolledCourses();
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  // ngOnInit() {
  // this.translate.use(localStorage.getItem('language'));
  // }
  ngOnInit() {

    // tslint:disable-next-line:no-shadowed-variable
    this.learnerService.getData(this.userDetailes.user_id, '2020-07-31T08:01:00.000Z').subscribe((data: any) => {
      this.results = data.data.get_read_learner_activity;
      // tslint:disable-next-line:no-string-literal
      this.results['message'].forEach((element, index) => {
        if (index === 0) {
          element.activity_details.ongoing = 'true';
        } else {
          element.activity_details.ongoing = 'false';
        }
      });
      console.log('after playlist order UPDATED', data.data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
    console.log('data retreived', data);

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
        this.enrolledCourses.forEach(element => {
          if (element.course_duration) {
            if (Number(element.course_duration.slice(3, 5)) >= 30) {
              element.course_duration = Number(element.course_duration.slice(0, 2)) + 1;
            } else {
              element.course_duration = Number(element.course_duration.slice(0, 2));
            }
          }
        });
        // this.enrolledCourses.forEach(element => {
        //   if (element.coursePlayerStatus.course_percentage) {
        //     element.coursePlayerStatus.course_percentage = Math.round(element.coursePlayerStatus.course_percentage);
        //   }
        // });
        const arr = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(function(item) {
          return item.coursePlayerStatus?.status === 'incomplete' ||
            item.coursePlayerStatus?.status === 'suspend' ||
            item.coursePlayerStatus?.status === 'start';
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
      enrollment_status: null,
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    if (this.screenWidth < 800) {
      this.show = true;
      // Swal.fire({
      //   title: 'Please login in laptop',
      // }).then((result) => {

      // });
    } else {
      this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
      localStorage.setItem('Courseid', c.course_id);
      localStorage.setItem('persentage', c.coursePlayerStatus.course_percentage);
      this.show = false;
    }
  }
  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  close() {
    this.show = false;
  }
}

