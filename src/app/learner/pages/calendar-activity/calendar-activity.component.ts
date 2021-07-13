import { Component, OnInit, Injectable, Input } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { formatDate } from '@angular/common';
import { CalendarEvent, CalendarView,CalendarMonthViewDay, DateFormatterParams, CalendarDateFormatter } from 'angular-calendar'; 
import { getmoduleData } from '@learner/services/operations/learner_query';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  }
 
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  } 
}
const colors: any = {
  activity: {
    primary: '#D9E021',
    secondary: '#eaeadc',
  },
  selfpaced: {
    primary: '#00A99D',
    secondary: '#c5eae8',
  },
  instructor: {
    primary: '#22ACDD',
    secondary: '#abd1de',
  },
};

@Component({
  selector: 'app-calendar-activity',
  templateUrl: './calendar-activity.component.html',
  styleUrls: ['./calendar-activity.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarActivityComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;
  refresh: Subject<any> = new Subject();
  daySelected = false;
  selectedDays: any = [];
  activeDayIsOpen;
  daySelection;
  courseDetailsList = [{
    'course_name': 'All Courses',
    'course_id': 'All'
  }]
  enrolledCourses;
  userDetails;  
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
    'key': 'Assignment',
    'value': 'assignment'
  },
  {
    'key': 'Perform',
    'value': 'perform'
  },
  {
    'key': 'Project',
    'value': 'project'
  }
  ];
  courseValue = 'All'
  activityValue = 'All';
  events: CalendarEvent[];
  selectedDate;
  status = '';
  activitData;
  dataAvailable;
  constructor(public learnerService: LearnerServicesService,private gs: GlobalServiceService,private router: Router) { }

  ngOnInit() {
    this.getCourseData();
    const topicStart = new Date();
    this.getCalendarCount(topicStart);
    this.getLearnerActivity('month',topicStart);
  }
  
  getCourseData(){
    this.userDetails = this.gs.checkLogout();
    this.learnerService.get_batchwise_learner_dashboard_data(this.userDetails.user_id, 'all', null).subscribe((BcourseData: any) => {
      const tmpBcourseDetail = BcourseData.data.get_batchwise_learner_dashboard_data.message;
      this.courseDetailsList = tmpBcourseDetail && tmpBcourseDetail !== null ? tmpBcourseDetail : [];
      this.learnerService.getLearnerDashboard(this.userDetails.user_id, this.userDetails._id, 'undefined', 'all', 'enrolment').subscribe((EcourseData: any) => {
        const EcourseDetail = EcourseData.data.get_learner_dashboard.message.enrolled_course_details;
        this.enrolledCourses = EcourseDetail && EcourseDetail !== null ? EcourseDetail : [];
        this.courseDetailsList.push({
          'course_name': 'All Courses',
          'course_id': 'All'
        })
        this.courseDetailsList.push(...this.enrolledCourses);
        this.courseDetailsList.some((item, idx) => 
        item.course_name == 'All Courses' && 
        this.courseDetailsList.unshift( 
          this.courseDetailsList.splice(idx,1)[0]))
      });
    });
  }
  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.activity, 
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.instructor, 
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.selfpaced,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.instructor, 
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ]; 
  monthChange(value){
    const topicStart = new Date(value);
    this.getLearnerActivity('month',topicStart)
  }

  getCalendarCount(value?) {
    const monthValue = moment(value).format('YYYY-MM');
    this.learnerService.getAllActivity(this.userDetails.user_id, monthValue).subscribe((result: any) => {
      const activityDetailsList = result.data.getcalenderactivity.message;

      activityDetailsList.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date (element.end);
        element.color = {primary : element.color};
        element.allDay = true;
      });
      this.events = activityDetailsList;
    });
  }
  getLearnerActivity(view,selectedDate, day?: CalendarMonthViewDay){
    if(this.courseValue == 'All') {
      var courseValue = ''
   } else {
    courseValue = this.courseValue
   }
   if(this.activityValue == 'All') {
     var activityValue = ''
  } else {
    activityValue = this.activityValue
  }
  if(selectedDate.date){
   this.daySelected = true;
   this.daySelection = selectedDate.date
    selectedDate = selectedDate.date
  }
   const dateValue = moment(selectedDate).format('YYYY-MM-DD');
  this.learnerService.getLearnerActivity(courseValue,this.status,view,dateValue,activityValue,this.userDetails.user_id).subscribe((result:any)=>{
    if(result?.data?.getActivityCalendar?.success){
      this.activitData = result?.data?.getActivityCalendar?.data;
      this.dataAvailable = true;
    } else {
      this.dataAvailable = false;
    }
  })
   if (day) {
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
  }
  setStatus(value){
    this.status = value;
    this.onSortChange('value')
  }
  onSortChange(value){
    if (this.daySelected) {
      var view = 'day'
    } else {
      view = 'month'
    }
    if(!value) {
      this.courseValue = 'All'
      this.activityValue = 'All'
      this.daySelected = false;
      view = 'month'
      if (this.selectedDays.length > 0) {
        delete this.selectedDays[this.selectedDays.length - 1].cssClass;
      }
    }
    if(!this.daySelection){
      const topicStart = new Date();
      this.daySelection = moment(topicStart).format('YYYY-MM-DD');
    }
    this.getLearnerActivity(view,this.daySelection);
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
}
