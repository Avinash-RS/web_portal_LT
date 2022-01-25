import { Component, OnInit, TemplateRef,ViewChild, ElementRef } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import * as moment from 'moment';
import * as _ from 'underscore';
import { LearnerServicesService } from '../../services/learner-services.service';
import { VideoPreviewModalComponent } from '../video-preview-modal/video-preview-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-instructor-led',
  templateUrl: './instructor-led.component.html',
  styleUrls: ['./instructor-led.component.scss', '../coursedetails/coursedetails.component.scss']
})
export class InstructorLedComponent implements OnInit {
  blobKey = environment.blobKey;
  sessionAttendance: any;
  listOfSessions: any;
  course: any;
  activityShow: any;
  totalSessions: any;
  recordedSessions: any;
  attendedSessions: any;
  attendedCount;
  recordedCount;
  videoSource;
  showSkeleton;
  showContent;
  userDetails;
  @ViewChild('attended') attended: ElementRef;

  constructor(private router: Router,
              private learnerService: LearnerServicesService,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              public translate: TranslateService) {
              let lang = localStorage.getItem('language')
              this.translate.use(lang?lang:'en') 
              // this.course = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
              //   this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.detail);
                this.activeRoute.queryParams.subscribe(res => {
                  this.course = res;
                });
  }

  ngOnInit() {
     this.userDetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.getAttendance();
    // this.getSessionsList();
  }

  getBack() {
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getAttendance() { // Http Call
    this.showSkeleton = true;
    this.learnerService.getAttendanceByUsername(atob(this.course.id), this.userDetails.full_name, this.userDetails.user_id).subscribe(async res => {
      // tslint:disable-next-line:no-string-literal
      this.showSkeleton = false;
      const data = res.data['getTopicAttendanceDetailsByUsername']['data'];
      this.listOfSessions = data.Activity;
      if(this.listOfSessions.length > 0){
        this.showContent = true;
      } else {
        this.showContent = false;
      }
      this.listOfSessions.sort((a,b)=>{
        return +new Date(b.activity_details.startdate) - +new Date(a.activity_details.startdate);
      })
      this.listOfSessions.forEach((item,i)=>{
        if(item.status === "On going" && item.activity_details.activitytype === "Live Classroom"){
          this.listOfSessions.splice(i, 1);
          this.listOfSessions.unshift(item);
        }
      })
      this.recordedCount = this.listOfSessions.filter(element => {
        return element.activity_details.activitytype.toLowerCase() == "recorded"
      });
      this.sessionAttendance = data.Attendance;
      this.attendedCount = this.sessionAttendance.filter(element => {
        return element.activity.attendencedetails.Attendence.toLowerCase() == "yes"
      });
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
    this.listOfSessions.forEach(los => {
      los.isactive = false;
    });
    
    if(los.activity_details.activitytype == "Recorded"){
      this.videoSource = los.activity_details.link + this.blobKey;
    }
    this.activityShow = los;
    los.isactive = true;
    if (los.status === 'On going') {
      this.activityShow.button = 'Join Now';
    } else if (los.status !== 'Up Coming') {
      this.activityShow.button = 'Play';
    }
  }

  onGoingSession() {
    const ongoing = this.listOfSessions.find(x => x.status === 'Ongoing');
    if (ongoing === undefined) {
      const upcoming = this.listOfSessions.find(x => x.status === 'UpComing');
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
    if (d.hours() === 0 && d.minutes() !== 0 && d.seconds() !== 0) {
      time = d.minutes() + ' mins ' + d.seconds() + ' Sec ';
    } else if (d.hours() !== 0 && d.minutes() === 0) {
      time = d.hours() + ' hour ';
    } else {
      time = d.hours() + 'hr ' + d.minutes() + ' min';
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

  // videoPreview(templateRef: TemplateRef<any>, e) {
  //   this.videoSource = e + this.blobKey
  //   // this.dialog.open(templateRef, {
  //   //   width: '90%',
  //   //   height: '95%',
  //   //   // panelClass: 'videoPopupContainer',
  //   //   closeOnNavigation: true,
  //   //   disableClose: true,
  //   // });
  // }
}
