import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  listOfSessions: any = [];
  course: any;
  activityShow: any;
  totalSessions: any;
  recordedSessions: any;
  attendedSessions: any;
  attendedCount: any;
  recordedCount: any;
  videoSource;
  showSkeleton;
  showContent;
  userDetails;
  @ViewChild('attended') attended: ElementRef;
  liveSessions: any = [];
  recordedSVideoession: any;
  tabIndex: any = 0;

  constructor(private router: Router,
              private learnerService: LearnerServicesService,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              public translate: TranslateService) {
              const lang = localStorage.getItem('language');
              this.translate.use(lang ? lang : 'en');
              this.activeRoute.queryParams.subscribe(res => {
                  this.course = res;
                });
  }

  ngOnInit() {
     this.userDetails = JSON.parse(localStorage.getItem('UserDetails'));
     this.getAttendance();
  }

  getBack() {
    this.router.navigateByUrl('/Landing/MyCourse');
  }

  getAttendance() { // Http Call
    this.showSkeleton = true;
    this.learnerService.getAttendanceByUsername(atob(this.course.id), this.userDetails.full_name,
    this.userDetails.user_id).subscribe(async res => {
      this.showSkeleton = false;
      const data = res.data['getTopicAttendanceDetailsByUsername']['data'];
      this.listOfSessions = data?.Activity;
      // if (this.listOfSessions.length > 0) {
      //   this.showContent = true;
      // } else {
      //   this.showContent = false;
      // }
      this.listOfSessions.sort((a, b) => {
        return +new Date(b.activity_details.startdate) - +new Date(a.activity_details.startdate);
      });
      this.listOfSessions.forEach((item, i) => {
        if (item.status === 'On going' && item.activity_details.activitytype === 'Live Classroom') {
          this.listOfSessions.splice(i, 1);
          this.listOfSessions.unshift(item);
        }
      });
      this.recordedCount = this.listOfSessions.filter( element => {
        return element.activity_details.activitytype.toLowerCase() === 'recorded';
      });
      this.sessionAttendance = data.Attendance;
      this.attendedCount = this.sessionAttendance.filter(element => {
        return element.activity.attendencedetails.Attendence.toLowerCase() === 'yes';
      });
      for (const los of this.listOfSessions) {
        los.duration = this.getTimes(los.activity_details.enddate, los.activity_details.startdate);
      }
      if (this.listOfSessions.length) {
        this.onGoingSession();
      }
      this.attendedSessions = _.countBy(this.sessionAttendance, x => x.activity.attendencedetails.Attendence === 'yes');
      this.useSession(this.listOfSessions[0]);
      this.getliveSessionRecorded({index:0});
    });
  }

  getliveSessionRecorded(event) {
    this.tabIndex = event.index;
    if (event.index == 0) {
      this.liveSessions = this.listOfSessions.filter(ele => {
        return ele.activity_details.activitytype !== "Recorded";
      });
    }
    else {
      this.liveSessions = this.listOfSessions.filter(ele => {
        return ele.activity_details.activitytype == "Recorded";
      });
    }
    if(this.liveSessions.length > 0){
      this.useSession(this.liveSessions[0]);
    }
  }

  useSession(los) {
    this.listOfSessions.forEach( los => {
      los.isactive = false;
    });
    if (los.activity_details.activitytype === 'Recorded') {
      this.videoSource = los.activity_details.link + this.blobKey;
    }
    this.activityShow = los;
    los.isactive = true;
    if (los.status === 'On going') {
      this.activityShow.button = 'Join Now';
    }
  }
  getScrollTop() {
    document.getElementById('scrollTop').scrollIntoView({
      behavior: 'smooth'
    });
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
      }
    } else {
      this.activityShow = ongoing;
      this.activityShow.button = 'Join Now';
    }
  }

  playVideo() {
    var ctrl = document.getElementById('singleVideo') as HTMLVideoElement;
    ctrl.play();
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

  showModal(attendanceDialog: TemplateRef<any>) {
    this.dialog.open(attendanceDialog, {
      width: '90%',
      height: '50%',
      panelClass: 'popupContainer',
      closeOnNavigation: true,
      disableClose: false,
    });
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
