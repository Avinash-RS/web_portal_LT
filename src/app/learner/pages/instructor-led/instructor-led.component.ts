import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
import { VideoPreviewModalComponent } from '../video-preview-modal/video-preview-modal.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';

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
              private learnerService: LearnerServicesService,private dialog: MatDialog) {
              this.course = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
                this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.detail);
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
      console.log(res);
      const data = res.data['getTopicAttendanceDetailsByUsername']['data'];
      this.listOfSessions = data.Activity;
      console.log(this.listOfSessions)
      this.sessionAttendance = data.Attendance;
      console.log(this.listOfSessions);
      for (const los of this.listOfSessions) {
        los.duration = this.getTimes(los.activity_details.enddate, los.activity_details.startdate);
      }
      if (this.listOfSessions.length) {
        this.onGoingSession();
      } 
      this.attendedSessions = _.countBy(this.sessionAttendance, x => x.activity.attendencedetails.Attendence === 'yes');
      console.log(this.attendedSessions);
      this.useSession(this.listOfSessions[0])
    });
    
  }  

  // getSessionsList() { // Http Call
  //   const date = '2020-10-27'; // new Date();
  //   this.learnerService.getReadLeanerActivity(userid, date, courseid).subscribe(async res => {
  //   const date = new Date();
  //   this.learnerService.getReadLeanerActivity(userDetails.user_id, date, this.course.id).subscribe(async res => {
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
      mm = 34.999999;
      if (mm) {
        context = hh + ' hour' + mm.toFixed(0) + ' minutes';
      } else {
        context = hh + ' hour';
      }
    } else {
      hh = 0;
      mm = diff.toFixed(0);
      context = mm + ' minutes';
    }
    return context;
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
