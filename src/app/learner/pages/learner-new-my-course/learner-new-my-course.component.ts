import { Component, OnInit, HostListener, Injectable, TemplateRef, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { CalendarEvent, CalendarDateFormatter, DateFormatterParams, } from 'angular-calendar';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
declare const Chart;
const DEFAULT_DURATION = 300;
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // TODO: add explicit constructor

  weekViewColumnSubHeader({ date, locale, }: DateFormatterParams): string {
    return formatDate(date, 'dd', locale);
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  }
}
@Component({
  selector: 'app-learner-new-my-course',
  templateUrl: './learner-new-my-course.component.html',
  styleUrls: ['./learner-new-my-course.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ]),
    trigger(
      'collapseprogress', [
        transition(':enter', [
          style({opacity: 0}),
          animate('900ms ease-in', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('100ms ease-out', style({opacity: 0}))
        ])
      ]
    )
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ],
})

export class LearnerNewMyCourseComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router,
              public learnerService: LearnerServicesService,
              private gs: GlobalServiceService, public CommonServices: CommonServicesService,
              public translate: TranslateService, public urlRoute: ActivatedRoute,
              private toast: ToastrService) {
              var urlLink = this.urlRoute.routeConfig.path;
              // console.log(this.urlRoute.url);
              if (urlLink == 'Microcourses'){
                this.freeCourses = true;
              } else {
                this.freeCourses = false;
              }
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    this.userDetailes = this.gs.checkLogout();
    if (!this.userDetailes?.is_password_updated) {
      this.dialog.closeAll();
      this.router.navigate(['/Learner/profile']);
      return;
    }
    this.learnerService.insertSkeleton(this.userDetailes.user_id).subscribe((result:any)=>{
      this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
  },
  err =>{
    this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
  })
  }
  @ViewChild('completedTopics', { read: DragScrollComponent }) ds: DragScrollComponent;
  @ViewChild('inProgress', { read: DragScrollComponent }) dsInProgress: DragScrollComponent;
  showJobRole = false;
  isReadMore = true;
  show = true;
  freeCourses;
  innerWidth: number;
  expandcollapse = true;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  jobroleCategoryId = 'All';
  showSkeleton = false;
  leftNavDisabled = false;
  rightNavDisabled = false;
  leftNavDisabledInProgress = false;
  rightNavDisabledInProgress = false;
  // Carousel
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
  };
  weekDaysdat: any;
  userDetailes: any;
  @ViewChild('infoPopup', { static: true }) infoPopWindow: TemplateRef<any>;
  availableCource: any;
  screenWidth: number;
  keyboardUp: boolean = true;
  chatbotShow: boolean = false;
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
  // externalWeb = environment.teachercommunity;
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
  inProgress: boolean = false;
  recentlyCompleted: boolean = false;
  mode = 'determinate';
  bufferValue = 100;
  selectedJobRoleData = {
    jobroleCategoryName : 'All'
  };
  dynamicTextChange: string = 'ongoing';
  dateSelected: string;
  vocationalselectjobRole = [];
  testvals: any;
  shotDotSearch: boolean = true;
  inProgressModule: any;
  completedTopic: any;
  displaySlides = false;
  tooltipJobRole: any;
  // Week wise chart
  weekWiseChartDatalabel: any = [];
  weekWiseChartData: any = [];
  totalhoursSpend: string = '0 mins';
  public chartPlugins = [pluginDataLabels];
  public WeekbarChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      displayColors: false,
      callbacks: {
        label(tooltipItem, data) {
          return  data['datasets'][0]['data'][tooltipItem['index']]['hourString'];
        }
      }
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0
    }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        gridLines: {
          borderDash: [1, 3],
          color: '#2280C1'
        },
        ticks: {
          min: 0,
          max: 8,
          stepSize: 1,
          callback(value) {
            return value + '  ';
          }
        }
      }],
    },
    elements:
    {
      point:
      {
        radius: 1,
        hitRadius: 5,
        hoverRadius: 10,
        hoverBorderWidth: 2
      }
    }
  };
  public WeekbarChartLabels: Label[] = [];
  public WeekbarChartType: ChartType = 'bar';
  public WeekbarChartLegend = false;
  public WeekbarChartPlugins = [];
  public WeekbarChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: '#2280C1',
      hoverBackgroundColor: '#2280C1',
      barThickness: 12,
    }
   ];
  // Course Wise Chart
  courseWiseChartDatalabel: any = [];
  courseChartData: any = [];
  courseChartBackGround: any = [];
  public courseChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled : true,
      displayColors: false,
      backgroundColor: 'white',
      mode: 'index',
      titleFontColor: '#c02222',
      bodyFontColor: '#49ae31',
      borderColor: '#999',
      borderWidth: 1,
      // xPadding: 15,
      // yPadding: 15,
      footerFontColor: '#333333',
      footerMarginTop: 8,
      footerSpacing: 8,
      callbacks: {
        label(tooltipItem, data) {
          const text  = [];
          text.push('Self Learning :    ' + data['datasets'][0]['data'][tooltipItem['index']]['y'] + '%');
          return  text;
        },
        footer(tooltipItem, data) {
        const subtext = [];
        subtext.push('Modules                        ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['module']['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['module']['totalCount']);
        subtext.push('Topics                           ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['topic']['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['topic']['totalCount']);
        // subtext.push('Other Activities:   ');
        //  subtext.push('Live Interactions         ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['liveclassroom']
        // ['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['liveclassroom']['totalCount']);
        //  subtext.push('Assignment                 ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['assignment']
        // ['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['assignment']['totalCount']);
        //  subtext.push('Perform                        ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['perform']
        // ['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['perform']['totalCount']);
        // subtext.push('Project                         ' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['project']
        // ['completedCount'] + '/' + data['datasets'][0]['data'][tooltipItem[0].index]['myprop']['project']['totalCount']);
        return subtext;
        }
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        },
        formatter: (value, ctx) => {
          const percentage = value.y + '%';
          return percentage;
      },
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0
    }
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false,
      },
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        gridLines: {
          borderDash: [1, 3],
          color: '#2280C1'
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize: 25,
          callback(value) {
            return value + '  ';
          }
        }
      }],
    },
    elements:
    {
      point:
      {
        radius: 1,
        hitRadius: 5,
        hoverRadius: 10,
        hoverBorderWidth: 2
      }
    }
  };
  public coursebarChartLabels: Label[] = [];
  public coursebarChartType: ChartType = 'bar';
  public coursebarChartLegend = false;
  public courseChartPlugins = [];
  public coursebarChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: '#2280C1',
      barThickness: 12,
    }
  ];
  showProgressChart: boolean = false;
  today = new Date();
  weekWiseDate;
  courseStartDate;
  courseEndDate;
  minCourseDate;
  nochartdata: boolean = true;
  currentYear: number;
  stepUrl;
  portalUser: any;
  contentHide;

  info = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).';

  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    // console.log('json', link );
    var verifyportal = JSON.parse(localStorage.getItem('UserDetails'));
    this.portalUser = verifyportal.userOrigin;
    if (this.portalUser == 'microLearn' || this.portalUser == 'learner') {
      this.contentHide = true;
    } else {
      this.contentHide = false;
    }
    this.innerWidth = window.innerWidth;
    const showAppBanner = localStorage.getItem('appBanner');
    if (!showAppBanner && !this.contentHide) {
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
    this.getMyJobRole();
    if (this.userDetailes.org_type !== 'collegeconnect') {
      this.shotDotSearch = false;
    }
    this.getModuleStatus();
    this.currentYear = new Date().getFullYear();
    this.getStepUrl();
  }

  getStepUrl() {
    this.learnerService.getStepDetails(this.userId).subscribe((result: any) => {
      if (result?.data?.getStepCourseByLearner?.success) {
      this.stepUrl   = result?.data?.getStepCourseByLearner?.stepRedirectUrl;
      localStorage.setItem('step', 'true');
      } else {
        localStorage.setItem('step', 'false');
      }
    });
  }

  // Recently completed topics
  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  // InProgress Module
  moveLeftInProgress() {
    this.dsInProgress.moveLeft();
  }
  moveRightInProgress() {
    this.dsInProgress.moveRight();
  }
  leftBoundStatInProgress(reachesLeftBound: boolean) {
    this.leftNavDisabledInProgress = reachesLeftBound;
  }
  rightBoundStatInProgress(reachesRightBound: boolean) {
    this.rightNavDisabledInProgress = reachesRightBound;
  }
  //

  redirect() {
    window.open(this.stepUrl , 'stepURL');
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
    this.dialog.closeAll();
    localStorage.setItem('appBanner', 'false');
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  expandtoggle() {
    this.expandcollapse = !this.expandcollapse;
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  // NEW API T0 GET DASHBOARD DATA

  getDashboardMyCourse(userId, userObjId) {
    this.courseSkel = false;
    this.courseDetailsList = [];
    let requestType = 'ongoing';
    if (this.selectedIndex === 0) {
      this.dynamicTextChange = 'ongoing';
      requestType = 'ongoing';
    } else if (this.selectedIndex === 1) {
      this.dynamicTextChange = 'completed';
      requestType = 'completed';
    } else if (this.selectedIndex === 2) {
      this.dynamicTextChange = '';
      requestType = 'all';
    }
    let jobRoleId = this.jobroleCategoryId;
    let jobRoleIdSEQ = this.jobroleCategoryId;
    // condition for vocational & course Sequence
    if (this.jobroleCategoryId === 'All') {
      jobRoleIdSEQ = 'all';
    } else {
      jobRoleIdSEQ = this.jobroleCategoryId;
    }
    if (this.jobroleCategoryId === 'All') { jobRoleId = null; }
    this.learnerService.get_batchwise_learner_dashboard_data_v2(userId, requestType, jobRoleIdSEQ).subscribe((BcourseData: any) => {
        if(BcourseData?.data?.get_batchwise_learner_dashboard_data_v2){
          this.courseDetailsList = BcourseData?.data.get_batchwise_learner_dashboard_data_v2?.message.length > 0 ? BcourseData.data.get_batchwise_learner_dashboard_data_v2.message :[];
          this.learnerService.getLearnerDashboard(userId, userObjId, 'undefined', requestType, 'enrolment').subscribe((EcourseData: any) => {
            const EcourseDetail = EcourseData.data.get_learner_dashboard.message.enrolled_course_details;
            this.enrolledCourses = EcourseDetail && EcourseDetail !== null ? EcourseDetail : [];
            this.courseDetailsList.push(...this.enrolledCourses);
              this.courseDetailsList.forEach((value) => {
                var startDate = moment(value.batch_start_date).startOf("day");
                var endDate = moment(value.batch_end_date).endOf("day");
                if(moment() > startDate){
                  value['batchStarted'] = true;
                } else {
                  value['batchStarted'] = false;
                }
                if( moment() > endDate){
                  value['batchClosed'] = true;
                } else {
                  value['batchClosed'] = false;
                }
              });            
            this.onGoingCourseCount = (BcourseData.data.get_batchwise_learner_dashboard_data_v2.ongoing ?BcourseData.data.get_batchwise_learner_dashboard_data_v2.ongoing:0) + EcourseData.data.get_learner_dashboard.message.ongoing_count;
            this.completedCourseCount = (BcourseData.data.get_batchwise_learner_dashboard_data_v2.completed ? BcourseData.data.get_batchwise_learner_dashboard_data_v2.completed:0 )+ EcourseData.data.get_learner_dashboard.message.completed_count;
            this.allCourseCount = (BcourseData.data.get_batchwise_learner_dashboard_data_v2.all ? BcourseData.data.get_batchwise_learner_dashboard_data_v2.all:0) + EcourseData.data.get_learner_dashboard.message.all_count;
          });
        }
        else {
          this.courseDetailsList = [];
          this.onGoingCourseCount = 0;
          this.completedCourseCount = 0;
          this.allCourseCount = 0;
        }
        this.courseSkel = true;
    });


  }

  courseTabChange(event, userId, userObjId) {
    this.getDashboardMyCourse(userId, userObjId);
  }

  openClassroom(value) {
    window.open(value);
  }

  // PLAYER PAGE NAVIGATION
  gotoDesc(c) {
    c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();

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
    // } else {
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer);
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c && c.coursePlayerStatus && c.coursePlayerStatus.course_percentage
    ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });

    // }
  }
  // INSTRUCTOR LED PAGE NAVIGATION
  goInstructorLed(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: btoa(c.course_id),
      name: c.course_name
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    // this.router.navigateByUrl('/Learner/instructorLed', { state: { detail } });
    this.router.navigate(['/Learner/instructorLed'], { queryParams: detail }); // ['/booking'],{queryParams: {Id :id}}
  }
  // ASK A QUESTION
  gotoAskQuestions(c) {
    c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();
    const detail = {
        course_name: c.course_name,
        course_id: c.course_id,
        batch_id: c.batchid,
        batchEndTime: c.batch_end_date_Timer,
      };
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('currentBatchId', c.batchid);
    localStorage.setItem('CourseName', c.course_name);
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer);
    if (c.course_status !== 'start') {
      this.router.navigateByUrl('/Learner/askQuestions', { state: { detail } });
    }
  }
// ACTIVITY NAVIGATION
  gotoSubmissionDetails(course) {
    localStorage.removeItem('userTabLocation');
    const data1 = {
      courseId: course.course_id,
      courseName: course.course_name,
    };
    localStorage.setItem('Courseid', data1.courseId);
    localStorage.setItem('CourseName', data1.courseName);
    // this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
    this.router.navigate(['/Learner/activities'], {
      queryParams:
      {
        courseId: btoa(course.course_id),
        courseName: btoa(course.course_name),
        batchId: btoa(course.batchid)
      }
    });
  }

  gotoProgression(course) {
    // tslint:disable-next-line: prefer-const
    let data = {
      courseId : course.course_id,
      courseName: course.course_name
    };
    this.router.navigate(['/Learner/progressionReport'], {
      queryParams:
      {
        CourseId: btoa(course.course_id),
        CourseName: btoa(course.course_name)
      }
    });
  }

  gotoquestionanswer(course) {
    this.router.navigate(['/Learner/questionanswer']);
    localStorage.setItem('Courseid', course.course_id);
    localStorage.setItem('CourseName', course.course_name);
    localStorage.setItem('currentBatchId', course.batchid);
  }

  getTodaydate() {
      this.dateSelected = moment(this.viewDate).format('YYYY-MM-DD');
      this.getLearnerActivity(this.viewDate);
      // tslint:disable-next-line: no-var-keyword
      const??parentcal??=??document.getElementsByClassName('cal-day-headers');
      parentcal[0].childNodes.forEach((element: any)??=>??{
      ????????????????????????if (element?.style) {
                     // tslint:disable-next-line: no-var-keyword
                     const currdate =  moment(this.viewDate).format('DD');
                     // tslint:disable-next-line: no-var-keyword
                     const ele = element.children[2].innerHTML;
                     element.classList.remove('cal-today');

                     if (currdate === ele) {
                      element.classList.add('cal-today');
                     }
      ????????????????????????}
      ????????????});
  }


  highlightSelectday(data) {
    // tslint:disable-next-line: no-var-keyword
    // tslint:disable-next-line: prefer-const
    const??parentcal??=??document.getElementsByClassName('cal-day-headers');
    parentcal[0].childNodes.forEach((element: any)??=>??{
    ????????????????????????if (element?.style) {
      ??????????????????????????element.classList.remove('cal-today');
    ????????????????????????}
    ????????????});
    data.sourceEvent.currentTarget.classList.add('cal-today');
  }

  getLearnerActivity(selectedDate) {
    this.viewDate = new Date(selectedDate);
    const dateValue = moment(selectedDate).format('YYYY-MM-DD');
    this.dayMonth = selectedDate;
    const empty = undefined;
    this.learnerActivityList = [];
    this.showSkeleton = true;
    this.learnerService.getLearnerActivity('', '', 'day', dateValue, '', this.userId).subscribe((result: any) => {
      if (result?.data?.getActivityCalendar?.data?.activities?.length > 0) {
        this.noActivity = false;
        this.showSkeleton = false;
        this.showErrorCard = false;
        this.learnerActivityList =  result?.data?.getActivityCalendar?.data?.activities;
      } else {
        this.noActivity = true;
        this.showSkeleton = false;
        this.errorMessage =  result?.data?.getActivityCalendar?.error_msg;
        this.showErrorCard = true;
        this.learnerActivityList = [];
      }
    },
    err => {
    });
  }

  getMyJobRole() {
    this.learnerService.getCountForJobroleCategories(this.userDetailes._id, this.userDetailes.user_id).subscribe((data: any) => {
      this.vocationalselectjobRole = data.data.getCountForJobroleCategories.data;
      if (this.vocationalselectjobRole?.length > 0) {
        this.showJobRole = true;
      } else {
        this.showJobRole = false;
      }
    });
  }

  onSelectionChange(event) {
    this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
    // console.log(event, 'fadsfasdfasdf')
    if (this.vocationalselectjobRole?.length > 0) {
      this.vocationalselectjobRole.forEach((jobRole) => {
        // console.log(jobRole, '349258324098520');
        if (jobRole.jobroleCategoryId === event.value) {
          this.tooltipJobRole = jobRole.jobroleCategoryName;
        }
      });
    }
  }

  jobRoleSelectedFunction(event, value) {
    if (event.source.selected) {
      this.selectedJobRoleData = value;
    }
  }

  openReport(c) {
    this.router.navigate(['/Learner/coursereport'], {
      queryParams:
      {
        id: btoa(c.course_id),
        name: c.course_name,
        batchId: btoa(c.batchid),
        QA_totalweeks : c.QA_totalweeks,
        selflearning_totalweeks : c.selflearning_totalweeks
      }
    });

  }

  goToForum(c) {
    localStorage.setItem('Courseid', c.course_id);
    const bt = c.batchid ? {
      batchid: c.batchid,
      batchenddate: c.batch_end_date,
      batch_start_date: c.batch_start_date,
      batchname: c.batch_name
    } : null;
    const detail = {
      id: c.course_id,
      name: c.course_name,
      batchdetails: bt
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/discussionForum', { state: { detail } });
  }


  updateColor(progress) {
    // tslint:disable-next-line: radix
    if (parseInt(progress) < 21) {
       return 'primary';
    // tslint:disable-next-line: radix
    } else if (parseInt(progress) > 80) {
       return 'accent';
    } else {
      return 'warn';
    }
 }

 getModuleStatus() {
  // this.inProgressRecently = true;
   this.learnerService.recentlycourse(this.userDetailes.user_id).subscribe((data: any) => {
     this.inProgressModule = data?.data?.recentlycourse?.data?.inProgressModule;
    //  this.inProgressModule = null
     this.completedTopic = data?.data?.recentlycourse?.data?.completedTopic;
     ///
     if (this.inProgressModule?.length > 0) {
      this.inProgress = true;
     } else {
       this.inProgress = false;
     }
    ///
     if (this.completedTopic?.length > 0) {
      this.recentlyCompleted = true;
     } else {
       this.recentlyCompleted = false;
     }
     setTimeout(() => {
      this.displaySlides = true;
    }, 1000);
   });
 }

 getCourseProgress() {
  this.setdateForprogress();
  this.getoverAllCourseProgressData();
  this.getWeekCourseData();
  this.showProgressChart = true;
}

getVideoLink(course) {
    window.open(environment.resourcelinkurl + '?course=' + course, 'blank').focus();
}

// Date initialize
setdateForprogress() {
  // week wise date
 const curr = new Date();
 const first = curr.getDate() - curr.getDay();
 const firstday = new Date(curr.setDate(first)).toUTCString();
 this.weekWiseDate = new Date(firstday, );
 // Course Start & End date
 this.courseStartDate  = this.UserDetails.created_on;
 this.minCourseDate = this.courseStartDate;
 this.courseEndDate = new Date();
}

// Overll course chart data
getoverAllCourseProgressData() {
  this.courseWiseChartDatalabel = [];
  this.courseChartData = [];
  this.courseChartBackGround = [];
  this.learnerService.getoverAllCourseProgressByUserId(this.userId, moment(this.courseStartDate).startOf('day').toISOString(),
  moment(this.courseEndDate).endOf('day').toISOString()).subscribe((result: any) => {
    if (result.data.overAllCourseProgressByUserId.success) {
      result.data.overAllCourseProgressByUserId.data.forEach((data: any) => {
        this.courseWiseChartDatalabel.push(data.courseName);
        this.courseChartData.push({y: data.coursePercentage, myprop: data});
        this.courseChartBackGround.push(data.colourCode);
      });
    } else {
      this.courseWiseChartDatalabel = [];
      this.courseChartData = [];
      this.courseChartBackGround = [];
    }
    this.generateCourseChart();
  });
}
generateCourseChart() {
  this.coursebarChartLabels = this.courseWiseChartDatalabel;
  this.coursebarChartData = [
    {
      data: this.courseChartData,
      backgroundColor: this.courseChartBackGround,
      hoverBackgroundColor: this.courseChartBackGround,
      barThickness: 12,
    }
  ];
}

changeCourseDate() {
  this.minCourseDate = this.courseStartDate;
  this.getoverAllCourseProgressData();
}

getWeekCourseData() {
  this.weekWiseChartDatalabel = [];
  this.weekWiseChartData = [];
  // tslint:disable-next-line: no-var-keyword
  const myFormattedDate = moment(this.weekWiseDate).format('yyyy-MM-DD');
  this.learnerService.getweekWiseCourseChart('', this.userId, myFormattedDate, 'allcourse').subscribe((result: any) => {

    if (result.data.weekWiseCourseChart.success) {
      this.totalhoursSpend = result.data.weekWiseCourseChart.data.totalhoursSpend;
      result.data.weekWiseCourseChart.data.chartdata.forEach((data: any) => {
        this.weekWiseChartDatalabel.push(data.day);
        this.weekWiseChartData.push({y: data.hours, hourString: data.hourString});
      });
    } else {
      this.weekWiseChartDatalabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.weekWiseChartData = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    this.generateWeekwiseChart();
  });
}
generateWeekwiseChart() {
  this.WeekbarChartLabels = this.weekWiseChartDatalabel;
  this.WeekbarChartData = [
    {
      data: this.weekWiseChartData,
      backgroundColor: '#2280C1',
      hoverBackgroundColor: '#2280C1',
      barThickness: 12,
    }
  ];
}
changeWeekDate() {
  this.getWeekCourseData();
}

goToCourse(c){
  if( moment() > moment(c.batchenddate).endOf("day")){
    this.toast.warning('Your subscription for this course has expired');
    return false;
  }
  const detail = {
    id: c.course_id,
    wishlist: c.wishlisted || false,
    wishlist_id: c.wishlist_id || null,
    enrollment_status: null,
    course_name: c.course_name,
    course_status: 'incomplete', // c.course_status,
    batch_id: c.batchid,
    batchEndTime: c.batch_end_date,
    link: c.link,
    toc: c.toc,
    lastLogIndex: c.lastLogIndex,
    lastModule: c.lastModule,
    lastTopic: c.lastTopic,
    checklevel: c.checklevel,
    module_id: c.module_id,
    topic_id: c.topic_id
    // persentage : c.coursePlayerStatus.course_percentage || 0
  };
  // if (this.screenWidth < 800) {
  // } else {
  localStorage.setItem('currentBatchEndDate', c.batch_end_date);
  localStorage.setItem('Courseid', c.course_id);
  localStorage.setItem('persentage', c && c.coursePlayerStatus && c.coursePlayerStatus.course_percentage
  ? c.coursePlayerStatus.course_percentage : '');
  localStorage.setItem('currentBatchId', c.batchid);

  localStorage.setItem('resumeData', JSON.stringify({link: c.link, lastModule: c.lastModule, lastTopic: c.lastTopic,
    module_id: c.module_id, topic_id: c.topic_id, checklevel: c.checklevel, course_status: c.course_status, toc: c.toc}));

  this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
}
programReport(){
  this.router.navigate(['/Learner/programreport']);
}

goToCalendar() {
  if (this.userDetailes.org_type === 'Corporate') {
    this.router.navigate(['/Learner/upskillcalendar']);
  } else {
    this.router.navigate(['/Learner/calendaractivity']);
  }
}
}
