import { Component, OnInit, Injectable, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, DateFormatterParams, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
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
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  // you can override any of the methods defined in the parent class

  monthTooltip(event: CalendarEvent): string {
    return;
  }

  weekTooltip(event: CalendarEvent): string {
    return;
  }

  dayTooltip(event: CalendarEvent): string {
    return;
  }
}
@Component({
  selector: 'app-calendar-activity',
  templateUrl: './calendar-activity.component.html',
  styleUrls: ['./calendar-activity.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
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
    course_name: 'All Courses',
    course_id: 'All'
  }];
  enrolledCourses;
  userDetails;
  filterBy = [{
    key: 'All Activities',
    value: 'All'
  },
  {
    key: 'Self Learning',
    value: 'selfpacedlearning'
  },
  {
    key: 'Live Interactions',
    value: 'liveclassroom'
  },
  {
    key: 'Assignment',
    value: 'assignment'
  },
  {
    key: 'Perform',
    value: 'perform'
  },
  {
    key: 'Project',
    value: 'project'
  }
  ];
  courseValue = 'All';
  activityValue = 'All';
  events: CalendarEvent[];
  selectedDate;
  status = '';
  activityData;
  dataAvailable;
  monthView;
  showSkeleton = true;
  skeletonPart = [1, 2];
  userDetailes: any;
  customTooltipCondition = false;
  CourseName: string;
  calendarSkele: boolean = false;
  constructor(public learnerService: LearnerServicesService, private gs: GlobalServiceService, private router: Router) {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (!this.userDetailes?.is_password_updated) {
      this.router.navigate(['/Learner/profile']);
      return;
    }
   }

  ngOnInit() {
    this.getCourseData();
    const topicStart = new Date();
    this.getCalendarCount(topicStart);
    this.getLearnerActivity('month', topicStart);
    if (this.userDetailes.org_type === 'collegeconnect') {
      this.filterBy[2].key = 'Industry Talk';
    }
    if (this.userDetailes.org_type !== 'collegeconnect') {
      this.filterBy[2].key = 'Live Interactions';
    }
  }
  getCourseData() {
    this.userDetails = this.gs.checkLogout();
    this.learnerService.get_batchwise_learner_dashboard_data(this.userDetails.user_id, 'all', null).subscribe((BcourseData: any) => {
      const tmpBcourseDetail = BcourseData.data.get_batchwise_learner_dashboard_data.message;
      this.courseDetailsList = tmpBcourseDetail && tmpBcourseDetail !== null ? tmpBcourseDetail : [];
      this.learnerService.getLearnerDashboard(this.userDetails.user_id, this.userDetails._id,
        'undefined', 'all', 'enrolment').subscribe((EcourseData: any) => {
        const EcourseDetail = EcourseData.data.get_learner_dashboard.message.enrolled_course_details;
        this.enrolledCourses = EcourseDetail && EcourseDetail !== null ? EcourseDetail : [];
        this.courseDetailsList.push({
          course_name: 'All Courses',
          course_id: 'All'
        });
        this.courseDetailsList.push(...this.enrolledCourses);
        this.courseDetailsList.some((item, idx) =>
        item.course_name === 'All Courses' &&
        this.courseDetailsList.unshift(
          this.courseDetailsList.splice(idx, 1)[0]));
      });
    });
  }
  monthChange(value) {
    const topicStart = new Date(value);
    this.monthView = topicStart;
    this.getLearnerActivity('month', topicStart);
  }

  getCalendarCount(value?) {
    const monthValue = moment(value).format('YYYY-MM');
    this.calendarSkele = true;
    this.learnerService.getAllActivity(this.userDetails.user_id, monthValue).subscribe((result: any) => {
      const activityDetailsList = result.data.getcalenderactivity.message;
      activityDetailsList.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date (element.end);
        element.color = {primary : element.color};
      //  element.allDay = true;
      });
      this.events = activityDetailsList;
      setTimeout(() => {
        const eventsParent = document.querySelectorAll('.cal-events');
        eventsParent.forEach((element: any) => {
          let children = Array.from(element.children);
          const duplicateColor = [];
          children = children.filter((dayEvent, index, self) => {
            const style = window.getComputedStyle(dayEvent as HTMLElement);
            const color = style.getPropertyValue('background-color');
            const found = duplicateColor.find((element) => {
              return element === color;
            });
            if (found) {
              dayEvent['style'].display = 'none';
            } else {
              duplicateColor.push(color);
            }
          });
        });
        this.calendarSkele = false;
      }, 100);
    });
  }
  getLearnerActivity(view, selectedDate, day?: CalendarMonthViewDay) {
    this.showSkeleton = true;
    let courseValueDetail;
    let activityValueDetail;
    if (this.courseValue === 'All') {
      courseValueDetail = '';
   } else {
    courseValueDetail = this.courseValue;
   }
    if (this.activityValue === 'All') {
      activityValueDetail = '';
    } else {
      activityValueDetail = this.activityValue;
    }
    if (selectedDate.date) {
      this.daySelected = true;
      this.daySelection = selectedDate.date;
      selectedDate = selectedDate.date;
    }
    const dateValue = moment(selectedDate).format('YYYY-MM-DD');
    this.activityData = [];
    this.learnerService.getLearnerActivity(courseValueDetail, this.status, view, dateValue, activityValueDetail,
       this.userDetails.user_id).subscribe((result: any) => {
      if (result?.data?.getActivityCalendar?.success) {
        this.activityData = result?.data?.getActivityCalendar?.data;
        this.showSkeleton = false;
        if (this.activityData?.activities.length > 0) {
          this.dataAvailable = true;
        } else {
          this.dataAvailable = false;
        }
      } else {
        this.showSkeleton = false;
        this.dataAvailable = false;
      }
    },
      err => {
        this.showSkeleton = false;
        this.dataAvailable = false;
      });
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
  setStatus(value) {
    this.status = value;
    this.onSortChange('value');
  }
  onSortChange(value) {
    if (this.courseDetailsList?.length > 0) {
      this.courseDetailsList.forEach((course) => {
        if (course.course_id === value.value) {
          this.CourseName = course.course_name;
        }
      });
    }
    let view;
    if (this.daySelected) {
      view = 'day';
    } else {
      view = 'month';
    }
    if (!value) {
      this.courseValue = 'All';
      this.activityValue = 'All';
      this.status = '';
      this.daySelected = false;
      view = 'month';
      if (this.selectedDays.length > 0) {
        delete this.selectedDays[this.selectedDays.length - 1].cssClass;
      }
    }
    if (!this.daySelection) {
      const topicStart = new Date();
      this.daySelection = moment(topicStart).format('YYYY-MM-DD');
    }
    if (this.monthView) {
      this.daySelection = this.monthView;
    }
    this.getLearnerActivity(this.view, this.daySelection);
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
    goToActivities(value) {
      if (value.activitytype === 'Live Classroom') {
        return false;
      } else if (value.activitytype === 'Self Learning') {

        value.batch_end_date_Timer = new Date(value.batch_end_date).getTime(); // need

        const detail = {
          id: value.courseid,
          wishlist: false,
          wishlist_id: null,
          enrollment_status: null,
          course_name: value.coursename,
          course_status: value.status,
          batch_id: value.batch_id,
          batchEndTime: value.batch_end_date_Timer,
          fromCalendar : true,
          link: value.link,
          toc: value.toc,
          lastModule: value.modulename,
          lastTopic: value.topicname,
          checklevel: value.checklevel,
          module_id: value.module_id,
          topic_id: value.topic_id,
          course_type: value?.course_type,
          extracted: value.extracted
        };
        if (value.extracted) {
          this.router.navigateByUrl('/Learner/MyCourse');
          return false;
        }
        localStorage.setItem('currentBatchEndDate', value.batch_end_date_Timer);
        localStorage.setItem('Courseid', value.courseid);
        localStorage.setItem('persentage', null);
        localStorage.setItem('currentBatchId', value.batch_id);
        localStorage.setItem('resumeData', JSON.stringify({link: value.link, lastModule: value.modulename,
           lastTopic: value.topicname, module_id: value.module_id, topic_id: value.topic_id,
           checklevel: value.checklevel, course_status: value.status, extracted: value.extracted}));
        this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });

        // this.router.navigate(['Learner/MyCourse']);
      } else {
        const data1 = {
          courseId: value.courseid,
          courseName: value.coursename,
          activityType : value.activitytype,
        };
        localStorage.setItem('Courseid', data1.courseId);
        localStorage.setItem('CourseName', data1.courseName);
        // this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
        this.router.navigate(['/Learner/activities'], {
          queryParams:
          {
            courseId: btoa(value.courseid),
            courseName: btoa(value.coursename),
            activityType : value.activitytype,
            batchId : btoa(value.batch_id)
          }
        });
      }
    }
    openClassroom(value) {
      window.open(value);
    }
}
