// import { Component, OnInit } from '@angular/core';
import { Component, OnInit,ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { LearnerServicesService } from '../../services/learner-services.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {CalendarEvent, CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';


@Component({
  selector: 'app-learner-calendar',
  templateUrl: './learner-calendar.component.html',
  styleUrls: ['./learner-calendar.component.scss']
})
export class LearnerCalendarComponent implements OnInit {
  start1 = new Date("2020-08-07T11:24:14.761Z")
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();


  events: CalendarEvent[];

  public UserDetails: any;
  public tokenDetails: any;
  public tokenid: any;
  public user_id: any;
  public selectedDate: any;
  public learnerActivityList = [];
  public setColor: any;
  public setDottedColor: any;
  public setDuration: any;
  public activitystarttime: any;
  public activityendtime: any;
  public errorMessage: any;
  public showErrorCard: any;
  public selectedMoment = new Date();
  selectedToday;
  bsInlineValue = new Date();
  currentDate = new Date();
  showOngoing: any;
  showCompleted: any;
  showUpcoming: any;
  currentStartTime: any;
  currentEndTime: any;
  activeDayIsOpen: boolean = false;
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

    this.user_id = this.UserDetails.user_id;
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

  todayActivity(){
    console.log('hello today Activity');
    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
    this.getLearnerActivity(dateValue);
  }
  

  getAllActivity(value?){

    if(!value){
      value=new Date();
    }
    const monthValue = moment(value).format('YYYY-MM');
    this.service.getAllActivity(this.UserDetails.user_id, monthValue).subscribe((result : any)=>{
      var activity_details_list = result.data.getcalenderactivity.message

      activity_details_list.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date (element.end)
      });
    this.events = activity_details_list;
    })
  }

  getLearnerActivity(selectedDate) {
    console.log(selectedDate);
    const dateValue = moment(selectedDate.date).format("YYYY-MM-DD");
    this.service.getReadLeanerActivity(this.user_id, dateValue).subscribe(
      (res: any) => {
        if (res.data?.get_read_learner_activity?.message.length > 0) {
          this.showErrorCard = false;
          this.learnerActivityList = res.data?.get_read_learner_activity?.message;
          console.log(this.learnerActivityList);
        } else {
          this.errorMessage = res.data?.get_read_learner_activity?.error_msg;
          this.showErrorCard = true;
          this.learnerActivityList = [];
        }
      },
      err => {}
    );
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
  launchActivity(value) {
      window.open(value.activity_details.link);
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log("dayClicked");
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

  setView(view: CalendarView,data) {
    console.log("setView",data);
    this.getAllActivity(data);
    this.view = view;
    console.log(this.view);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
