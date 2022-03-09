import { Component, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { formatDate } from '@angular/common';
import { CalendarEvent, CalendarView,CalendarMonthViewDay, DateFormatterParams, CalendarDateFormatter,CalendarEventTitleFormatter } from 'angular-calendar'; 
import { getmoduleData } from '@learner/services/operations/learner_query';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getWeekYearWithOptions } from 'date-fns/fp';
import { TranslateService } from '@ngx-translate/core';
import {CalendarFilterComponent} from '../calendar-filter/calendar-filter.component'
@Component({
  selector: 'app-upskill-calendar',
  templateUrl: './upskill-calendar.component.html',
  styleUrls: ['./upskill-calendar.component.scss']
  })

export class UpskillCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;
  refresh: Subject<any> = new Subject();
  daySelected = false;
  selectedDays: any = [];
  activeDayIsOpen = false;
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
    'key': 'Live Interactions',
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
  status = '';
  activityData;
  dataAvailable
  monthView;
  showSkeleton = true;
  skeletonPart = [1,2]
  userDetailes:any;
  customTooltipCondition = false
  CourseName: string;
  calendarSkele: boolean =false;
  countMonth;
  constructor(public learnerService: LearnerServicesService,private gs: GlobalServiceService,private router: Router, public dialog: MatDialog, ) {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
                if(!this.userDetailes?.is_password_updated){
                  this.router.navigate(['/Learner/profile']);
                  return
                }
   }

   ngOnInit() {
    this.getCourseData();
    const topicStart = new Date();
    this.getCalendarCount(topicStart);
    this.getLearnerActivity('month',topicStart);
    if(this.userDetailes.org_type == 'collegeconnect'){
      this.filterBy[2].key = "Industry Talk";
    }
    if(this.userDetailes.org_type !== 'collegeconnect'){
      this.filterBy[2].key = "Live Interactions";
    }
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
  
  monthChange(value){
    this.activeDayIsOpen = false;
    const topicStart = new Date(value);
    this.monthView = topicStart;
    this.getLearnerActivity('month',topicStart)
  }


  setView(view: CalendarView) {
    this.activeDayIsOpen = false;
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    var description = [];
    if(events.length > 0){
      events.forEach((value:any)=>{
        if(value.description.length > 0){
          description.push(value.description)
        }
      })
    }
    if(description.length == 0){
      return;
    }
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

  getCalendarCount(value?) {
    this.countMonth = value;
    const monthValue = moment(value).format('YYYY-MM');
    this.calendarSkele=true
    this.learnerService.getAllActivity(this.userDetails.user_id, monthValue).subscribe((result: any) => {
      const activityDetailsList = result.data.getcalenderactivity.message;
      activityDetailsList.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date (element.end);
        element.color = {primary : element.color};
        element.title = element.description;
      //  element.allDay = true;
      });
      this.events = activityDetailsList;​
      if(activityDetailsList.length > 0){
        var descriptionAvailable = [];
        var today = new Date();
        activityDetailsList.forEach((value)=>{
          var dateAvailable = moment(today).isBetween(value.start, value.end);
          if(dateAvailable && value.description){
            this.activeDayIsOpen = true;
          }
        })
      }
      setTimeout(()=>{
        var eventsParent = document.querySelectorAll('.cal-events');
        eventsParent.forEach((element:any) => {
          var children = Array.from(element.children)
          var duplicateColor = []
            children = children.filter((dayEvent,index,self)=>{
            var style = window.getComputedStyle(dayEvent as HTMLElement);
            var color = style.getPropertyValue('background-color');
            var found = duplicateColor.find((element)=>{
              return element == color
            })
            if(found){
              dayEvent['style'].display = 'none'
            } else {
              duplicateColor.push(color);
            }            
          })
        })
        this.calendarSkele=false
      },100)
    });
  }
  getLearnerActivity(view,selectedDate, day?: CalendarMonthViewDay){
    this.showSkeleton = true;
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
   this.activityData = [];
  this.learnerService.getLearnerActivity(courseValue,this.status,view,dateValue,activityValue,this.userDetails.user_id).subscribe((result:any)=>{
    if(result?.data?.getActivityCalendar?.success){
      this.activityData = result?.data?.getActivityCalendar?.data;
      this.showSkeleton = false;
      if(this.activityData?.activities.length > 0){
        this.dataAvailable = true;
      } else {
        this.dataAvailable = false;
      }
    } else {
      this.showSkeleton = false;
      this.dataAvailable = false;
    }
  },
  err =>{
    this.showSkeleton = false;
    this.dataAvailable = false;
  })
   if (day) {
      this.monthView = undefined;
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
    this.activeDayIsOpen = false;
    if(this.courseDetailsList?.length > 0){
      this.courseDetailsList.forEach((course)=>{
        if(course.course_id == value.value){
          this.CourseName = course.course_name;
        }
      })
    }
    if (this.daySelected) {
      var view = 'day'
    } else {
      view = 'month'
    }
    if(!value) {
      this.courseValue = 'All'
      this.activityValue = 'All'
      this.status = '';
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
    if(this.monthView){
      this.daySelection = this.monthView
    }
    this.getLearnerActivity(view,this.daySelection);
    this.getCalendarCount(this.countMonth)
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
      if(value.activitytype === 'Live Classroom'){
        return false;
      } else if (value.activitytype == "Self Learning") {

        value.batch_end_date_Timer = new Date(value.batch_end_date).getTime();//need

        const detail = {
          id: value.courseid,
          wishlist: false,
          wishlist_id: null,
          enrollment_status: null,
          course_name: value.coursename,
          course_status: value.status,
          batch_id: value.batch_id,
          batchEndTime: value.batch_end_date_Timer,
          fromCalendar : true
        };

        localStorage.setItem('currentBatchEndDate', value.batch_end_date_Timer)
        localStorage.setItem('Courseid', value.courseid);
        localStorage.setItem('persentage', null);
        localStorage.setItem('currentBatchId', value.batch_id);
        this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });

        // this.router.navigate(['Learner/MyCourse']);
      }else{
        const data1 = {
          courseId: value.courseid,
          courseName: value.coursename,
          activityType : value.activitytype,
        };
        localStorage.setItem('Courseid', data1.courseId);
        localStorage.setItem('CourseName', data1.courseName);
        //this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
        this.router.navigate(['/Learner/activities'], {
          queryParams:
          {
            courseId: btoa(value.courseid),
            courseName: btoa(value.coursename),
            activityType : value.activitytype,
            batchId :btoa(value.batch_id)
          }
        });
      }
    }
    openClassroom(value) {
      window.open(value);
    }

    openFilterDialog( ) {
     
     this.dialog.open(CalendarFilterComponent, {
        width:"430px",
        height:"520px",
        position: {right: "0px", bottom: "10px"},
        panelClass: "filter-modal-box",
      });
    }
  
    closedialogbox() {
      this.dialog.closeAll();
    }
}
