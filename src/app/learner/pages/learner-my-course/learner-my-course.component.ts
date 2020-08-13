import { Component, OnInit, HostListener } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
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
  showViewButton: boolean;
  results: any = [];
  currentStartTime: string;
  currentEndTime: string;
  showCompleted: string;
  showOngoing: string;
  showUpcoming: string;



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
      // const dateValue = new Date().toISOString()
    // const static =
    const message = [{message: [{activity_details: { activityname: 'Test case 12',
    activitytype: 'Live Classroom',
    courseid: 'c23ft3yr',
    coursename: 'Foreman S3',
    created_on: '2020-08-05T07:12:13.931Z',
    createdby_id: 'admin',
    createdby_name: 'lxpadmin',
    createdby_role: '1234ab',
    enddate: '2020-08-05T08:35:58.000Z',
    link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTk3OGY3MjgtYmI5Zi00MzE5LThjNDUtOGExYmQ4MDU2OGY4%40thread.v2/0?context=%7b%22Tid%22%3a%22b24d70a0-4ca9-4744-b060-812c8f92be7f%22%2c%22Oid%22%3a%224483fef5-e95c-46ce-8890-6c39bc7cd8c7%22%7d',
    modulename: 'Course 1',
    resourcefile: null,
    score: null,
    startdate: '2020-08-05T06:35:58.000Z',
    status: 'true',
    topicname: 'Codes for Foundations1',
    _id: '5f2a50055e15d300116e4613'}}]}];

    const currentDate = new Date();
    const formatDate = moment(currentDate).format();
    console.log(formatDate, 'currentDate');

    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
  //   console.log(dateValue);
    this.learnerService.getData(this.userDetailes.user_id, dateValue).subscribe((data: any) => {
      this.results = data.data.get_read_learner_activity;

      this.results['message'].forEach((el: any) => {
        // console.log(el.activity_details.startdate);
        this.currentStartTime = moment(el.activity_details.startdate).format('LT');
      //  console.log(this.currentStartTime)
        this.currentEndTime = moment(el.activity_details.enddate).format('LT');
        // console.log(this.currentEndTime);

        const StartDate = new Date(el.activity_details.startdate);
        // console.log(StartDate,"StartDate");

        const EndDate = new Date(el.activity_details.enddate);
        // console.log(EndDate,"EndDate");

        if (currentDate > StartDate) {
          this.showCompleted = 'completed';
        } else if (currentDate === StartDate && currentDate < EndDate ) {
          this.showOngoing = 'ongoing';
        } else {
          this.showUpcoming = 'upcoming';
        }

      });

      // console.log("length",this.results['message'].length);

      // tslint:disable-next-line:no-string-literal
      // debugger;
      if (this.results['message'].length < 5) {
        this.showViewButton = false;
        // console.log(this.showViewButton);
      } else {
        this.showViewButton = true;
      }
      // console.log('after playlist order UPDATED', data.data);
    }, (error) => {
      // console.log('there was an error sending the query', error);
    });
    // console.log('data retreived', data);


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
    console.log('in');
    this.showShortDesciption = !this.showShortDesciption;
  }

  close() {
    this.show = false;
  }

  launchAssignment(value) {
    if (this.screenWidth < 800) {
      this.show = true;
    } else {
      if (value.activity_details.activitytype === 'Assignment') {
        const detail = {
          id: value.activity_details.courseid,
          wishlist: false,
          wishlist_id: false,
          enrollment_status: false
        };
        this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    }
   }
  }
  launchActivity(value) {
      window.open(value.activity_details.link);
  }
}

