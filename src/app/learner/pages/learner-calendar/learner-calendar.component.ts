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
  daySelected = false;
  selectedDays: any = [];
  sortBy = [{
    'key': 'All',
    'value': 'All'
  },
  {
    'key': 'Completed',
    'value': 'completed'
  },
  {
    'key': 'Ongoing',
    'value': 'ongoing'
  },
  {
    'key': 'Upcoming',
    'value': 'upcoming'
  }
  ]
  filterBy = [{
    'key': 'All Activities',
    'value': 'All'
  },
  {
    'key': 'Self Learning',
    'value': 'selfpacedlearning'
  },
  {
    'key': 'Live Classroom',
    'value': 'liveclassroom'
  },
  {
    'key': 'Assignments',
    'value': 'assignment'
  },
  {
    'key': 'Performs',
    'value': 'perform'
  },
  {
    'key': 'Projects',
    'value': 'project'
  }
  ]
  sortValue = 'All'
  filterValue = 'selfpacedlearning'
  learnerActivitycontiner;
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
      JSON.parse(localStorage.getItem('UserDetails')) || null;

    this.tokenDetails = localStorage.getItem('token')||sessionStorage.getItem('token');;

    this.userId = this.UserDetails.user_id;
    // this.tokenid = this.tokenDetails.token;
    this.selectedDate = moment().format();
    this.getLearnerActivity('month',this.selectedDate);
    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
    this.getAllActivity(topicStart);
  }

  todayActivity() {
    const topicStart = new Date();
    const dateValue = moment(topicStart).format('YYYY-MM-DD');
    this.getLearnerActivity('day',dateValue);
  }

  getAllActivity(value?) {
    this.activeDayIsOpen = false;
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

  monthChange(value){
    const topicStart = new Date(value);
    this.getLearnerActivity('month',topicStart)
  }
  getLearnerActivity(view,selectedDate, day?: CalendarMonthViewDay) {
    if(this.sortValue == 'All') {
       var sortValue = ''
    } else {
        sortValue = this.sortValue
    }
    if(this.filterValue == 'All') {
      var filterValue = ''
   } else {
      filterValue = this.filterValue
   }
   if(selectedDate.date){
     selectedDate = selectedDate.date
   }
    const dateValue = moment(selectedDate).format('YYYY-MM-DD');
    const empty = undefined;
    this.service.getReadLeanerActivity(this.userId, dateValue, empty,sortValue,filterValue,view).subscribe(
      (res: any) => {
        if (res.data?.get_read_learner_activity?.message.length > 0) {
          this.showErrorCard = false;
          this.learnerActivityList = res.data?.get_read_learner_activity?.message;
          this.learnerActivitycontiner = res.data?.get_read_learner_activity?.message;
          this.learnerActivityList.sort((a, b) => {
            return new Date(a.activity_details.startdate).getTime() - new Date(b.activity_details.startdate).getTime();
    
        });
        } else {
          this.errorMessage = res.data?.get_read_learner_activity?.error_msg;
          this.showErrorCard = true;
          this.learnerActivityList = [];
        }
      },
      err => {}
    );
    if (day) {
      this.selectedMonthViewDay = day;
      this.daySelected = true;
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
    } else {
      this.daySelected = false;
    }

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
  goToActivities(value){
    if(value.activity_details.activitytype === 'Live Classroom'){
      return false;
    } else if (value.activity_details.activitytype == "Self Learning") {
      this.router.navigate(['Learner/MyCourse']);
    }else{
      const data1 = {
        courseId: value.activity_details.courseid,
        courseName: value.activity_details.coursename,
        activityType : value.activity_details.activitytype
      };
      localStorage.setItem('Courseid', data1.courseId);
      localStorage.setItem('CourseName', data1.courseName);
      this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
    }
   
  }
  launchActivity(value, i) {
      window.open(value.activity_details.link);
     // this.saveAttendees();
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

  onSortChange(value) {
  if (this.daySelected) {
    var view = 'day'
  } else {
    view = 'month'
  }
  if(!value) {
    this.sortValue = 'All'
    this.filterValue = 'All'
  }

  this.getLearnerActivity(view,this.selectedDate);
  }
}
