// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent, CalendarView,CalendarMonthViewDay } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { LearnerServicesService } from '../../services/learner-services.service';


@Component({
  selector: 'app-learner-calendar',
  templateUrl: './learner-calendar.component.html',
  styleUrls: ['./learner-calendar.component.scss']
})
export class LearnerCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDays: any = [];


  events: CalendarEvent[];

  public UserDetails: any;
  public tokenDetails: any;
  public tokenid: any;
  public userId: any;
  public selectedDate: any;
  public learnerActivityList = [];
  public setColor: any;
  public setDottedColor: any;
  public setDuration: any;
  public activitystarttime: any;
  public activityendtime: any;
  public errorMessage: any;
  public showErrorCard: any;
  public activityName: any;
  public activityId: any;
  public selectedMoment = new Date();
  selectedToday;
  bsInlineValue = new Date();
  currentDate = new Date();
  showOngoing: any;
  showCompleted: any;
  showUpcoming: any;
  currentStartTime: any;
  currentEndTime: any;
  activeDayIsOpen = false;
  constructor(public translate: TranslateService, private service: LearnerServicesService, private router: Router) {}

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.showUpcoming = '';
    this.showOngoing = '';
    this.showCompleted = '';
    this.UserDetails =
      JSON.parse(localStorage.getItem('UserDetails')) ||
      JSON.parse(sessionStorage.getItem('UserDetails')) ||
      null;

    this.tokenDetails = localStorage.getItem('token');

    this.userId = this.UserDetails.user_id;
    // this.tokenid = this.tokenDetails.token;
    this.selectedDate = moment().format();
    this.getLearnerActivity(this.selectedDate);
    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
    this.getAllActivity(topicStart);
  }

  getDateChangedValue(event) {
    // var formattedDate = moment(event).format();
    // this.selectedDate = new Date(event).toUTCString();
    // this.selectedDate = moment.utc(event).format();
    this.showUpcoming = '';
    this.showOngoing = '';
    this.showCompleted = '';
    this.selectedDate = new Date(
      Date.UTC(
        event.getUTCFullYear(),
        event.getUTCMonth(),
        event.getUTCDate(),
        event.getUTCHours(),
        event.getUTCMinutes(),
        event.getUTCSeconds()
      )
    ).toISOString();
    this.getLearnerActivity(this.selectedDate);
  }

  todayActivity() {
    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
    this.getLearnerActivity(dateValue);
  }

  getAllActivity(value?) {

    if (!value) {
      value = new Date();
    }
    const monthValue = moment(value).format('YYYY-MM');
    this.service.getAllActivity(this.UserDetails.user_id, monthValue).subscribe((result: any) => {
      const activityDetailsList = result.data.getcalenderactivity.message;

      activityDetailsList.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date (element.end);
      });
      this.events = activityDetailsList;
    });
  }

  getLearnerActivity(selectedDate,day?: CalendarMonthViewDay) {
    const dateValue = moment(selectedDate.date).format('YYYY-MM-DD');
    const empty = undefined;
    this.service.getReadLeanerActivity(this.userId, dateValue, empty).subscribe(
      (res: any) => {
        if (res.data?.get_read_learner_activity?.message.length > 0) {
          this.showErrorCard = false;
          this.learnerActivityList = res.data?.get_read_learner_activity?.message;
        } else {
          this.errorMessage = res.data?.get_read_learner_activity?.error_msg;
          this.showErrorCard = true;
          this.learnerActivityList = [];
        }
      },
      err => {}
    );
    this.selectedMonthViewDay = day;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      (selectedDay) => selectedDay.date.getTime() === selectedDateTime
    );
    if (this.selectedDays.length > 0) {
      delete this.selectedDays[this.selectedDays.length - 1].cssClass;
    }
    this.selectedDays.push(this.selectedMonthViewDay);
    day.cssClass = 'cal-day-selected';
    this.selectedMonthViewDay = day;
  }
  launchAssignment(value) {
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
  launchActivity(value, i) {
      window.open(value.activity_details.link);
      this.saveAttendees();
      // this.activityName = this.learnerActivityList[i].activityname;
      // this.activityId =
  }

  saveAttendees() {
    // let attendeesData = {
    //   userid: this.UserDetails.user_id,
    //   activityid:"432142314",
    //   activitynamne:"test",
    //   username:this.UserDetails.username,
    //   mobile:"9876543234",
    //   email:this.UserDetails.email,
    //   status:"true"
    // }
    this.service.saveAttendees().subscribe((res: any) => {
      console.log('saveAttendees', res);
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView, data) {
    this.getAllActivity(data);
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
