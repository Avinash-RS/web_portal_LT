import { Component, OnInit, HostListener, Injectable, TemplateRef, ViewChild } from "@angular/core";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from "rxjs";
import * as moment from 'moment';
import { CalendarEvent, CalendarDateFormatter, DateFormatterParams, } from 'angular-calendar';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { formatDate } from "@angular/common";
import { MatDialog } from "@angular/material";
import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { DragScrollComponent } from 'ngx-drag-scroll';

const DEFAULT_DURATION = 300;

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  weekViewColumnSubHeader({ date, locale, }: DateFormatterParams): string {
    return formatDate(date, 'dd', locale);
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  }
}
@Component({
  selector: "app-learner-new-my-course",
  templateUrl: "./learner-new-my-course.component.html",
  styleUrls: ["./learner-new-my-course.component.scss"],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})

export class LearnerNewMyCourseComponent implements OnInit {
  isReadMore = true;
  show = true;
  innerWidth: number;
  expandcollapse = true;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  jobroleCategoryId = 'All';
  showSkeleton = false;
  //Carousel
  missedTopicsKnowledgeCheck: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  weekDaysdat: any;
  userDetailes: any;
  @ViewChild('infoPopup') infoPopWindow: TemplateRef<any>;
  availableCource: any;
  screenWidth: number;
  keyboardUp: boolean = true;
  disableDropdown: any;
  selectedIndex: number = 0;
  componentCssClass: string;
  isMobile: boolean = false;
  onGoingCourseCount: number;
  completedCourseCount: number;
  allCourseCount: number;
  courseDetailsList: any[];
  enrolledCourses: any;
  blobKey = environment.blobKey;
  public UserDetails: any;
  public selectedDate: any;
  userId: any;
  sortValue = 'All';
  filterValue = 'All';
  showErrorCard: boolean;
  learnerActivityList: any;
  learnerActivitycontiner: any;
  errorMessage: any;
  dayMonth: any;
  noActivity: boolean;
  courseSkel: boolean = false;
  mode = 'determinate';
  bufferValue = 100;
  constructor(private dialog: MatDialog, private router: Router,
    public learnerService: LearnerServicesService,
    private gs: GlobalServiceService, public CommonServices: CommonServicesService) {

    this.userDetailes = this.gs.checkLogout();
    if (this.userDetailes) {
      this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
    }
  }

  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    let showAppBanner = localStorage.getItem('appBanner');
    if (!showAppBanner) {
      this.openInfoPopup();
    }
    if (this.userDetailes) {
      this.insidengOnInit();
    }
    // this.getCountForCategories(); sigin performance fix by maha
    if (!this.runnablePlatforms.includes(navigator.platform)) {
      this.isMobile = true;
    }
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userId = this.UserDetails.user_id;
    this.selectedDate = moment().format();
    this.getLearnerActivity(this.selectedDate);
    // this.triggerAvailablecourse = setInterval(() => {
    //   this.getCountForCategories();
    // }, 500);
    // this.getMyJobRole();
  }
  insidengOnInit() {
    this.CommonServices.openAvailCourcePopup.subscribe((data: any) => {
      this.availableCource = data;
    });
    if (this.screenWidth < 800) {
      this.keyboardUp = false;
    }
    this.CommonServices.openNotification.subscribe((data: any) => {
      this.disableDropdown = data;
    });
    this.selectedIndex = 0;
    this.gs.theme.subscribe(value =>
      this.componentCssClass = value
    );

  }

  openInfoPopup() {
    this.dialog.open(this.infoPopWindow, {
      width: '55%,',
      panelClass: 'dialogContainer',
      closeOnNavigation: true,
      disableClose: true,

    });
  }
  closeBannerPopup() {
    this.dialog.closeAll()
    localStorage.setItem('appBanner', 'false')
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  expandtoggle() {
    this.expandcollapse = !this.expandcollapse;
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }

  info = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."



  // NEW API T0 GET DASHBOARD DATA

  getDashboardMyCourse(userId, userObjId) {
    this.courseSkel = false
    this.courseDetailsList = [];
    let requestType = 'ongoing';
    if (this.selectedIndex === 0) {
      requestType = 'ongoing';
    } else if (this.selectedIndex === 1) {
      requestType = 'completed';
    } else if (this.selectedIndex === 2) {
      requestType = 'all';
    }
    let jobRoleId = this.jobroleCategoryId;
    let jobRoleIdSEQ = this.jobroleCategoryId;
    //condition for vocational & course Sequence
    if (this.userDetailes.org_type === 'vocational' && this.jobroleCategoryId === 'All') {
      jobRoleIdSEQ = 'all';
    } else if (this.userDetailes.org_type !== 'vocational') {
      jobRoleIdSEQ = null;
    } else {
      jobRoleIdSEQ = this.jobroleCategoryId;
    }
    if (this.jobroleCategoryId === 'All') { jobRoleId = null; }
    this.learnerService.get_batchwise_learner_dashboard_data(userId, requestType, jobRoleIdSEQ).subscribe((BcourseData: any) => {
      BcourseData.data.get_batchwise_learner_dashboard_data.message.forEach(elem => {
        elem.isBatchCourse = true;
        if (this.isMobile) {
          elem.progresslistExp = true;
          elem.courseInfoExp = true;
        }
      });
      const tmpBcourseDetail = BcourseData.data.get_batchwise_learner_dashboard_data.message;
      this.courseDetailsList = tmpBcourseDetail && tmpBcourseDetail !== null ? tmpBcourseDetail : [];
      // this.courseDetailsList = [];
      this.learnerService.getLearnerDashboard(userId, userObjId, 'undefined', requestType, 'enrolment').subscribe((EcourseData: any) => {
        const EcourseDetail = EcourseData.data.get_learner_dashboard.message.enrolled_course_details;
        this.enrolledCourses = EcourseDetail && EcourseDetail !== null ? EcourseDetail : [];
        this.enrolledCourses.forEach(elem => {
          elem.isBatchCourse = false;
          if (this.isMobile) {
            elem.progresslistExp = true;
            elem.courseInfoExp = true;
          }
        });
        this.courseDetailsList.push(...this.enrolledCourses);
        this.courseDetailsList.forEach((value)=>{
          if(value.self_paced_learning_progression){
            value.self_paced_learning_progression = parseInt(value.self_paced_learning_progression)
            if(value.self_paced_learning_progression <= 40) {
              value.progressClass="start"
            } else if(value.self_paced_learning_progression <= 70){
              value.progressClass="midway"
            } else {
              value.progressClass="end"
            }
          }
        })
        this.courseSkel = true

      });
    });
    // Course batch count reset
    // this.onGoingCourseCount = 0;
    // this.completedCourseCount = 0;
    // this.allCourseCount = 0;
    this.learnerService.get_learner_dashboard_count(userId, userObjId, jobRoleId).subscribe((result: any) => {
      this.onGoingCourseCount = result.data.get_learner_dashboard_count.message.ongoing_count;
      this.completedCourseCount = result.data.get_learner_dashboard_count.message.completed_count;
      this.allCourseCount = result.data.get_learner_dashboard_count.message.all_count;
    });
  }

  courseTabChange(event, userId, userObjId) {
    this.getDashboardMyCourse(userId, userObjId);
  }

  //PLAYER PAGE NAVIGATION
  gotoDesc(c) {
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name,
      course_status: c.course_status,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date_Timer,
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    //   this.show = true;
    // } else {
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer)
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c && c.coursePlayerStatus && c.coursePlayerStatus.course_percentage ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });

    // this.show = false;
    // }
  }
  //INSTRUCTOR LED PAGE NAVIGATION
  goInstructorLed(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      name: c.course_name
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    // this.router.navigateByUrl('/Learner/instructorLed', { state: { detail } });
    this.router.navigate(['/Learner/instructorLed'], { queryParams: detail }); // ['/booking'],{queryParams: {Id :id}}
  }
  //ASK A QUESTION
  gotoAskQuestions(c) {
    const detail = {
      course_name: c.course_name,
      course_id: c.course_id,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date_Timer,
    }
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('currentBatchId', c.batchid);
    localStorage.setItem('CourseName', c.course_name);
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer)

    this.router.navigateByUrl('/Learner/askQuestions', { state: { detail } });
  }
// ACTIVITY NAVIGATION 
  gotoSubmissionDetails(course) {
    localStorage.removeItem('userTabLocation');
    const data1 = {
      courseId: course.course_id,
      courseName: course.course_name
    };
    localStorage.setItem('Courseid', data1.courseId);
    localStorage.setItem('CourseName', data1.courseName);
    this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
  }

  gotoProgression(course) {
    // debugger
    let data = {
      courseId : course.course_id,
    }
    localStorage.setItem('Courseid', course.course_id);
    this.router.navigateByUrl('/Learner/progressionReport', { queryParams: { data } });
  }

  getLearnerActivity(selectedDate) {
    const dateValue = moment(selectedDate).format('YYYY-MM-DD');
    const empty = undefined;
    this.learnerActivityList = [];
    this.showSkeleton = true;
    this.learnerService.getReadLeanerActivity(this.userId, dateValue, empty, "", "", 'day').subscribe((res: any) => {
      this.dayMonth = selectedDate;
      if (res.data?.get_read_learner_activity?.message.length > 0) {
        this.noActivity = false;
        this.showSkeleton = false;
        this.showErrorCard = false;
        this.learnerActivityList = res.data?.get_read_learner_activity?.message;
        this.learnerActivityList.sort((a, b) => {
          return new Date(a.activity_details.startdate).getTime() - new Date(b.activity_details.startdate).getTime();

        });
      } else {
        this.noActivity = true;
        this.showSkeleton = false;
        this.errorMessage = res.data?.get_read_learner_activity?.error_msg;
        this.showErrorCard = true;
        this.learnerActivityList = [];
      }
    },
      err => { }
    );
  }

  openGallery(c){
    this.router.navigate(['/Learner/coursegallery'], {
      queryParams:
      {
        id: c.course_id,
        name: c.course_name
      }
    });
  }

  openReport(c){
    this.router.navigate(['/Learner/coursereport'], {
      queryParams:
      {
        id: btoa(c.course_id),
        name: c.course_name,
        batchId: btoa(c.batchid)
      }
    });
  
  }

  updateColor(progress) {
    if (parseInt(progress)<21){
       return 'primary';
    } else if (parseInt(progress)>80){
       return 'accent';
    } else {
      return 'warn';
    }
 }
}
