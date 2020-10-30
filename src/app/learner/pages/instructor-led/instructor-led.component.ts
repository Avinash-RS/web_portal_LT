import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
import * as _ from 'underscore';

const courseid = 'tbiwys0m';
const userid = 'aj1yej';

@Component({
  selector: 'app-instructor-led',
  templateUrl: './instructor-led.component.html',
  styleUrls: ['./instructor-led.component.css', '../coursedetails/coursedetails.component.scss']
})
export class InstructorLedComponent implements OnInit {

  sessionAttendance: any;
  listOfSessions: any;
  course: any;
  activityShow: any;
  totalSessions: any;
  recordedSessions: any;
  attendedSessions: any;

  constructor(private router: Router,
              private learnerService: LearnerServicesService) {
              this.course = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
                this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.detail);
              // console.log(this.course);
  }

  ngOnInit() {
    this.getAttendance();
    this.getSessionsList();
  }

  getBack() {
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getAttendance() { // Http Call
    // const obj = {
    //   "courseid": this.course.id,
    //   "full_name": "Student002",
    //   'user_id': 'o5jnyx'
    // };
    // console.log(obj);
    const userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));
    this.learnerService.getAttendanceByUsername(this.course.id, userDetails.full_name, userDetails.user_id).subscribe(res => {
      this.sessionAttendance = res.data['getTopicAttendanceDetailsByUsername']['data'];
      this.attendedSessions = _.countBy(this.sessionAttendance, x => x.activity.moduledetails.topicdetails.attendencedetails.Attendence === 'yes');
    });
  }

  getTimes(endDate, startDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const s: any = start;
    const e: any = end;
    let diff: any = (e - s) / 60000;
    diff = parseInt(diff, 10);
    let context = '';
    let hh = 0;
    let mm = 0;
    if (diff > 59) {
      hh = (diff / 60);
      mm = (diff % 60);
      if (mm) {
        context = hh + ' hour' + mm + ' minutes';
      } else {
        context = hh + ' hour';
      }
    } else {
      hh = 0;
      mm = diff;
      context = mm + ' minutes';
    }
    return context;
  }

  getSessionsList() { // Http Call
    // const date = '2020-10-27'; // new Date();
    // this.learnerService.getReadLeanerActivity(userid, date, courseid).subscribe(async res => {
    const date = new Date();
    const userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));
    this.learnerService.getReadLeanerActivity(userDetails.user_id, date, this.course.id).subscribe(async res => {
      this.listOfSessions = res.data['get_read_learner_activity']['message'];
      this.totalSessions = this.listOfSessions.length;
      this.recordedSessions = this.listOfSessions.length;
      for (const los of this.listOfSessions) {
        los.duration = await this.getTimes(los.activity_details.enddate, los.activity_details.startdate);
      }
      this.onGoingSession();
    });
  }

  useSession(los) {
    this.activityShow = los;
    if (los.status === 'On going') {
      this.activityShow.button = 'Join Now';
    } else if (los.status !== 'Up Coming') {
      this.activityShow.button = 'Play Now';
    }
  }

  onGoingSession() {
    const ongoing = this.listOfSessions.find(x => x.status === 'On going');
    if (ongoing === undefined) {
      const upcoming = this.listOfSessions.find(x => x.status === 'Up Coming');
      if (upcoming === undefined) {
        this.activityShow = this.listOfSessions[0];
        this.activityShow.button = 'Play Now';
      } else {
        this.activityShow = upcoming;
        // this.activityShow.button = '';
      }
    } else {
      this.activityShow = ongoing;
      this.activityShow.button = 'Join Now';
    }
  }

  getAction(link) {
    window.open(link, '_blank');
  }
}
