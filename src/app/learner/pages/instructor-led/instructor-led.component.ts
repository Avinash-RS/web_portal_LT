import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'underscore';
import { LearnerServicesService } from '../../services/learner-services.service';
import { VideoPreviewModalComponent } from '../video-preview-modal/video-preview-modal.component';

// const courseid = 'tbiwys0m';
// const userid = 'aj1yej';

@Component({
  selector: 'app-instructor-led',
  templateUrl: './instructor-led.component.html',
  styleUrls: ['./instructor-led.component.scss', '../coursedetails/coursedetails.component.scss']
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
              private learnerService: LearnerServicesService,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute) {
              // this.course = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
              //   this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.detail);
                this.activeRoute.queryParams.subscribe(res => {
                  this.course = res;
                });
  }

  ngOnInit() {
    this.getAttendance();
    // this.getSessionsList();
  }

  getBack() {
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getAttendance() { // Http Call
    const userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));
    this.learnerService.getAttendanceByUsername(this.course.id, userDetails.full_name, userDetails.user_id).subscribe(async res => {
      // tslint:disable-next-line:no-string-literal
      const data = res.data['getTopicAttendanceDetailsByUsername']['data'];
      this.listOfSessions = data.Activity;
      this.sessionAttendance = data.Attendance;
      for (const los of this.listOfSessions) {
        los.duration = this.getTimes(los.activity_details.enddate, los.activity_details.startdate);
      }
      if (this.listOfSessions.length) {
        this.onGoingSession();
      }
      this.attendedSessions = _.countBy(this.sessionAttendance, x => x.activity.attendencedetails.Attendence === 'yes');
      this.useSession(this.listOfSessions[0]);
    });
  }

  // getSessionsList() { // Http Call
  //   const date = '2020-10-27'; // new Date();
  //   this.learnerService.getReadLeanerActivity(userid, date, courseid).subscribe(async res => {
  //   const date = new Date();
  //   this.learnerService.getReadLeanerActivity(userDetails.user_id, date, this.course.course_id).subscribe(async res => {
  //     this.listOfSessions = res.data['get_read_learner_activity']['message'];
  //     this.totalSessions = this.listOfSessions.length;
  //     this.recordedSessions = this.listOfSessions.length;s
  //     for (const los of this.listOfSessions) {
  //       los.duration = await this.getTimes(los.activity_details.enddate, los.activity_details.startdate);
  //     }
  //     if (this.listOfSessions.length) {
  //       this.onGoingSession();
  //     }
  //   });
  // }

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
        this.activityShow.button = '';
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

  getTimes(endDate, startDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const ms = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(moment(start, 'DD/MM/YYYY HH:mm:ss'));
    const d = moment.duration(ms);
    let time;
    if (d.hours() === 0 && d.minutes() !== 0) {
      time = d.minutes() + ' minutes';
    } else if (d.hours() !== 0 && d.minutes() === 0) {
      time = d.hours() + ' hour ';
    } else {
      time = d.hours() + ' hour ' + d.minutes() + ' minutes';
    }
    return time;
  }

  showModal(attendanceDialog: TemplateRef<any>){
    this.dialog.open(attendanceDialog, {
      width: '90%',
      height: '50%',
      panelClass: 'popupContainer',
      closeOnNavigation: true,
      disableClose: false,
    });
  }
  closeModal(){
    this.dialog.closeAll();
  }

  preview(row) {
    const dialogRefVideo = this.dialog.open(VideoPreviewModalComponent, {
      data: { url: row },
      height: '100%',
      width: '100%',
      closeOnNavigation: true,
      disableClose: true,
    });
    dialogRefVideo.afterClosed().subscribe(res => {
    });
  }
}
