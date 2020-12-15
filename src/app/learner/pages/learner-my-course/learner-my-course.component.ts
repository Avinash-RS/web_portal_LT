import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatMenuTrigger, MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class LearnerMyCourseComponent implements OnInit {
  viewScrollBar = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Output() focusChange: EventEmitter<MatTabChangeEvent>;
  [x: string]: any;
  courseDetailsList: any = [];
  globalData: any;
  showSkeleton = false;
  jobRoleId: any = '';
  strDate: Date = new Date();
  userDetailes: any;
  enrolledCourses: any = [];
  incomplete: any = [];
  completed: any = [];
  loading: boolean;
  screenHeight: number;
  screenWidth: number;
  showShortDesciption = true;
  show = false;
  showViewButton: boolean;
  results: any = [];
  currentStartTime: string;
  currentEndTime: string;
  showCompleted: string;
  showOngoing: string;
  showUpcoming: string;
  categoryDetails: any[] = [];
  dropDownCategoryDetails = [];
  dropdownCatDetails = [];
  catalogueName: any;
  activity: any;
  catalogueDetails: any;
  pagenumber = 0;
  allcourses: any;
  categoryPopupData: any = [];
  courseMapping: any;
  courseSearch: any;
  categoryData: any;
  availableCourses: any;
  onGoingCourseCount = 0;
  completedCourseCount = 0;
  allCourseCount = 0;
  selectedIndex: number;
  viewCourseClass = true;
  jobRole: any = [];
  categoryyName: any;
  subchildData: any;
  selectedJobRole = 'Job Role';
  jobroleEnrollCount: any;
  subCatId: any;
  superCatId: any;
  claimedStatuts: any;
  categoryNamePrint: any;
  color = false;
  categoryCount: number;
  availableCource = false;
  jobRoleSelected = false;
  jobOnGoingCourseCount = 0;
  jobCompletedCourseCount = 0;
  jobAllCourseCount = 0;
  searchcourse: any;
  panelOpenState = false;
  expandActivityNameTemp: any;
  isExpandCourseTemp: any;
  expandActivityNameChildTemp: any;
  isExpChild: any;
  categories: any;
  searchName: any;
  course: any;
  catagoryName: any;
  searchExpand = false;
  expandSearch = false;
  dropdownMenu = false;
  keyboardUp = true;
  showAvailableCourse = false;
  showDrpdwnBtn = false;
  disableDropdown: boolean;
  opencourceId: any;
  nextPageLabel = '';
  previousPageLabel = '';
  triggerAvailablecourse: any;
  batchCourse: any;
  isMobile = false;
  runnablePlatforms = ['MacIntel', 'Win32', 'Linux x86_64'];
  constructor(
    public elm: ElementRef,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public learnerService: LearnerServicesService, private gs: GlobalServiceService,
    private router: Router, private dialog: MatDialog,
    public CommonServices: CommonServicesService) {
    this.route.queryParams.subscribe(params => {
      // for portal integration
      if (params.email_id === undefined) {
        this.userDetailes = this.gs.checkLogout();
        this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
        this.getScreenSize();
        this.getCountForCategories();
        // this.getTab();
        // this.getCountForJobRole();
        // this.insidengOnInit();
      } else {
        this.learnerService.getLoginUserDetail(params.email_id).subscribe((isValidEmailResult: any) => {
          if (isValidEmailResult.data.get_login_details.success === true) {
            this.userDetailes = (isValidEmailResult.data.get_login_details.message);
            localStorage.setItem('remember_me', 'true');
            localStorage.setItem('user_img', isValidEmailResult.data.get_login_details.message.profile_img);
            localStorage.setItem('Fullname', isValidEmailResult.data.get_login_details.message.full_name);
            localStorage.setItem('role', 'learner');
            localStorage.setItem('token', isValidEmailResult.data.get_login_details.message.token);
            localStorage.setItem('UserDetails', JSON.stringify(isValidEmailResult.data.get_login_details.message));
            sessionStorage.setItem('UserDetails', JSON.stringify(isValidEmailResult.data.get_login_details.message));
            this.router.navigateByUrl('/Learner/MyCourse');
            this.getCountForCategories();
            // this.getEnrolledCourses('', '', '', '', '', '', true);
            this.getDashboardMyCourse(this.userDetailes.user_id, this.userDetailes._id);
            this.getScreenSize();
            // this.getTab();
            // this.getCountForJobRole();
            // this.insidengOnInit();
          } else {
            localStorage.clear();
            sessionStorage.clear();
            this.CommonServices.getIpAddressByUrl();
            this.router.navigateByUrl('/Learner/login');
          }
        });
      }
    });
  }
  // @HostListener('window:resize', ['$event'])
  // ngOnInit() {
  // this.translate.use(localStorage.getItem('language'));
  // }
  ngOnInit() {
    if (this.userDetailes) {
      this.insidengOnInit();
    }
    this.getCountForCategories();
    if (!this.runnablePlatforms.includes(navigator.platform)) {
      this.isMobile = true;
    }

    // this.triggerAvailablecourse = setInterval(() => {
    //   this.getCountForCategories();
    //   console.log('triggering data');
    // }, 500);
  }

  insidengOnInit() {
    this.CommonServices.openAvailCourcePopup.subscribe((data: any) => {
      this.availableCource = data;
      console.log(data);
    });
    if (this.screenWidth < 800) {
      this.keyboardUp = false;
    }
    this.CommonServices.openNotification.subscribe((data: any) => {
      this.disableDropdown = data;
    });
    this.selectedIndex = 1;
    this.gs.theme.subscribe(value =>
      this.componentCssClass = value
    );
    this.translate.use(localStorage.getItem('language'));
    // const dateValue = new Date().toISOString()
    // const static =
    const message = [{
      message: [{
        activity_details: {
          activityname: 'Test case 12',
          activitytype: 'Live Classroom',
          courseid: 'c23ft3yr',
          coursename: 'Foreman S3',
          created_on: '2020-08-05T07:12:13.931Z',
          createdby_id: 'admin',
          createdby_name: 'lxpadmin',
          createdby_role: '1234ab',
          enddate: '2020-08-05T08:35:58.000Z',
          link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTk3OGY3MjgtYmI5Zi00MzE5LThjNDUtOGExYmQ4MDU2OGY4%40thread.v2/0?context=%7b%22Tid%22%3a%22b24d70a0-4ca9-4744-b060-812c8f92be7f%22%2c%22Oid%22%3a%224483fef5-e95c-46ce-8890-6c39bc7cd8c7%22%7d',
          modulename: 'Course 1',
          resourcefile: null,
          score: null,
          startdate: '2020-08-05T06:35:58.000Z',
          status: 'true',
          topicname: 'Codes for Foundations1',
          _id: '5f2a50055e15d300116e4613'
        }
      }]
    }];

  }

  clostAvailContainer(availableCource) {
    this.CommonServices.closeAvailPopup$.next(availableCource);
  }

  downArrow(event) {
    this.opencourceId = event.course_id;
  }

  upArrow(event) {
    this.opencourceId = event.course_id;
  }

  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  openAvailableCource() {
    this.availableCource = true;
    this.isExpandCourseTemp = this.availableCource;
  }

  menuSelect(subchild, superchild) {
    // this.categoryPopupData.categoryName1 = superchild.superSubCategoryName;
    this.categoryyName = superchild;
    this.subchildData = subchild;
  }

  claimAll() {
    this.loading = true;
    let categoryPopupName = '';
    if (this.categoryPopupData !== 'college connect' && this.categoryPopupData !== 'pro certification') {
      categoryPopupName = 'vocational';
    } else {
      categoryPopupName = this.categoryPopupData;
    }
    this.learnerService.bulkclaimcourse(this.userDetailes._id, this.userDetailes.user_id,
      this.categoryyName.superSubCategoryId, categoryPopupName).subscribe((bulkclaimcourse: any) => {
        if (bulkclaimcourse.data.bulkclaimcourse.success === true) {
          this.learnerService.getCoureBasedOnCatalog(this.catalogueDetails.catalogueId, this.categoryData.categoryId,
            this.userDetailes._id, this.subchildData.subCategoryId, this.categoryyName.superSubCategoryId).subscribe((course: any) => {
              if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
                this.loading = false;
                this.allcourses = course.data.getCoureBasedOnCatalog.data;
                this.getCountForCategories();
                this.getEnrolledCourses('', '', '', '', '', '', false);
                // this.getCountForJobRole();
              }
            });
        }
      });
  }
  dropdownSelect() {
    this.viewCourseClass = true;
  }
  getCatName(data) {
    // console.log('data', data);
  }
  // getEnroementCourseName(catagoryId) {
  //   if (this.catalogueDetails && catagoryId && !jobRoleCategoryId && !searchName) {
  //     this.selectedIndex = 0;
  //     categoryName = this.categoryDetails.filter(function(data: any) {
  //       return data.categoryId === catagoryId;
  //     });
  //     this.categoryNamePrint = categoryName[0].categoryName;
  // }
  // }
  getEnrolledCourses(event, catagoryId, catalougeId, jobRoleCategoryId, searchName, jobroleCheck, showSkelton) {
    if (this.screenWidth < 800 && this.keyboardUp) {
      this.keyboardUp = false;
      this.opencourceId = '';
    }
    if (jobroleCheck && this.jobRoleId) {
      catalougeId = this.catalogueDetails.catalogueId;
      jobRoleCategoryId = this.jobRoleId;
    }

    this.categoryNamePrint = '';
    let categoryName: any;
    if (this.catalogueDetails && catagoryId && !jobRoleCategoryId && !searchName) {
      this.selectedIndex = 0;
      // tslint:disable-next-line:only-arrow-functions
      categoryName = this.categoryDetails.filter(function (data: any) {
        return data.categoryId === catagoryId;
      });
      this.categoryNamePrint = categoryName[0].categoryName;
    }
    // console.log('this.categoryNamePrint', this.categoryNamePrint);
    if (event) {
      if (event.index === 8 && this.categoryDetails[0].enrollCount > 0) {
        catalougeId = this.catalogueDetails.catalogueId;
        catagoryId = this.catalogueDetails.categories[0].categoryId;
      } else if (event.index === 8 && this.categoryDetails[1].enrollCount > 0 ||
        event.index === 9 && this.categoryDetails[1].enrollCount > 0) {
        catalougeId = this.catalogueDetails.catalogueId;
        catagoryId = this.catalogueDetails.categories[1].categoryId;
      } else if (event.index === 8 && this.categoryDetails[2].enrollCount > 0 ||
        event.index === 9 && this.categoryDetails[2].enrollCount > 0 ||
        event.index === 10 && this.categoryDetails[2].enrollCount > 0) {
        catalougeId = this.catalogueDetails.catalogueId;
        catagoryId = this.catalogueDetails.categories[2].categoryId;
      }
    }

    // this.showSkeleton = showSkelton;
    // this.loading = !showSkelton;
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id, this.userDetailes._id,
      catalougeId, catagoryId, jobRoleCategoryId, searchName).subscribe((enrolledList: any) => {
        if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
          this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
          this.globalData = enrolledList.data.getLearnerenrolledCourses.global_data;
          if (this.enrolledCourses.length > 0) {
            this.enrolledCourses.forEach(element => {
              if (element.course_duration && typeof element.course_duration === 'string') {
                // console.log(typeof element.course_duration, element.course_duration);
                if (Number(element.course_duration.slice(3, 5)) >= 30) {
                  element.course_duration = Number(element.course_duration.slice(0, 2)) + 1;
                } else {
                  element.course_duration = Number(element.course_duration.slice(0, 2));
                }
              }
            });
          }
          // this.enrolledCourses.forEach(element => {
          //   if (element.coursePlayerStatus.course_percentage) {
          //     element.coursePlayerStatus.course_percentage = Math.round(element.coursePlayerStatus.course_percentage);
          //   }
          // });
          const arr = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(item => {
            return item.coursePlayerStatus?.status === 'incomplete' ||
              item.coursePlayerStatus?.status === 'suspend' ||
              item.coursePlayerStatus?.status === 'start';
          });
          const arr1 = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled.filter(item => {
            return item.coursePlayerStatus?.status === 'completed';
          });
          this.completed = arr1;
          this.incomplete = arr;
          if (!catalougeId && !catagoryId) {
            this.onGoingCourseCount = arr.length;
            this.completedCourseCount = arr1.length;
            this.allCourseCount = this.enrolledCourses.length;
          }
          this.jobRoleSelected = false;
          if (jobRoleCategoryId) {
            this.jobRoleSelected = true;
            this.jobOnGoingCourseCount = arr.length;
            this.jobCompletedCourseCount = arr1.length;
            this.jobAllCourseCount = this.enrolledCourses.length;
          }
        }
        // this.showSkeleton = false;
        this.loading = false;
        this.viewCourseClass = true;
      });
  }

  // NEW API T0 GET DASHBOARD DATA

  getDashboardMyCourse(userId, userObjId) {
    this.courseDetailsList = [];
    this.showSkeleton = true;
    let requestType = 'ongoing';
    if (this.selectedIndex === 1) {
      requestType = 'ongoing';
    } else if (this.selectedIndex === 2) {
      requestType = 'completed';
    } else if (this.selectedIndex === 3) {
      requestType = 'all';
    }
    this.learnerService.get_batchwise_learner_dashboard_data(userId, requestType).subscribe((BcourseData: any) => {
      console.log(BcourseData, 'BcourseData');
      BcourseData.data.get_batchwise_learner_dashboard_data.message.forEach(elem => {
        elem.isBatchCourse = true;
        if (this.isMobile) {
          elem.progresslistExp = true;
          elem.courseInfoExp = true;
        }
      });
      const tmpBcourseDetail = BcourseData.data.get_batchwise_learner_dashboard_data.message;
      this.courseDetailsList = tmpBcourseDetail && tmpBcourseDetail !== null ? tmpBcourseDetail : [];

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

        // Course overall count
        // this.onGoingCourseCount = Number(BcourseData.data.get_learner_dashboard.message.ongoing_count) +
        //  Number(EcourseData.data.get_learner_dashboard.message.ongoing_count);
        // this.completedCourseCount = Number(BcourseData.data.get_learner_dashboard.message.completed_count) +
        //  Number(EcourseData.data.get_learner_dashboard.message.completed_count);
        // this.allCourseCount = Number(BcourseData.data.get_learner_dashboard.message.all_count) +
        //  Number(EcourseData.data.get_learner_dashboard.message.all_count);
        this.showSkeleton = false;
      });
    });
    // Course batch count reset
    this.onGoingCourseCount = 0;
    this.completedCourseCount = 0;
    this.allCourseCount = 0;
    this.learnerService.get_learner_dashboard_count(userId, userObjId).subscribe((result: any) => {
      console.log(result, 'result');
      this.onGoingCourseCount = result.data.get_learner_dashboard_count.message.ongoing_count;
      this.completedCourseCount = result.data.get_learner_dashboard_count.message.completed_count;
      this.allCourseCount = result.data.get_learner_dashboard_count.message.all_count;
    });
  }

  courseTabChange(event, userId, userObjId) {
    console.log(event); // event index not worked
    this.getDashboardMyCourse(userId, userObjId);
  }
  diff_hours(dt2, dt1) {
    let diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  gotoScorm(c) {
    const detail1 = {
      id: 'Scaffolding',
      user: this.userDetailes.user_id,
      course_id: c.course_id,
      user_obj_id: this.userDetailes._id,
      feed_back: c.coursePlayerStatus.feed_back
    };
    this.router.navigateByUrl('/Learner/scorm', { state: { detail: detail1 } });
  }
  Go(course) {
    const data1 = {
      courseId: course.course_id
    };
    this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
  }

  gotoDesc(c) {
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    //   this.show = true;
    // } else {
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c.coursePlayerStatus.course_percentage);
    // this.show = false;
    // }
  }
  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  close() {
    this.show = false;
  }

  launchAssignment(value) {
    // if (this.screenWidth < 800) {
    // this.show = true;
    // } else {
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
  goToAssignment(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      // assignmentVal: true
    };
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
  }
  goToForum(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      name: c.course_name,
      // isBatch : c.batchCourse
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    // this.router.navigateByUrl('/Learner/MyCourse', { state: { detail } });
    this.router.navigateByUrl('/Learner/discussionForum', { state: { detail } });
  }
  gotoSubmissionDetails(c) {
    localStorage.setItem('Courseid', c.course_id);
    const detail = {
      id: c.course_id,
      name: c.course_name,
      tableType: 'submission',
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/activitycenterhomescreen/activitycenter', { state: { detail } });
  }

  /* ---------------------------------------api for available courses------------------------------------ */
  getCountForCategories() {
    let dropDownData = [];
    this.learnerService.getCountForCategories(this.userDetailes._id).subscribe((data: any) => {
      if (data && data.data && data.data.getCountForCategories && data.data.getCountForCategories.data) {
        this.showDrpdwnBtn = true;
        this.catalogueDetails = data.data.getCountForCategories.data;
        this.categoryDetails = data.data.getCountForCategories.data.categories;
        dropDownData = [data.data.getCountForCategories.data];
        this.dropDownCategoryDetails = dropDownData[0];
        this.categories = dropDownData[0].categories;
        this.dropdownCatDetails = dropDownData[0];
      }
    });
    // clearInterval(this.triggerAvailablecourse);
  }
  getTab() {
    let dropDownData = [];
    this.route.data.subscribe((result: any) => {
      if (result.data && result.data.data && result.data.data.getCountForCategories && result.data.data.getCountForCategories.data) {
        this.catalogueDetails = result.data.data.getCountForCategories.data;
        this.categoryDetails = result.data.data.getCountForCategories.data.categories;
        dropDownData = [result.data.data.getCountForCategories.data];
        this.dropDownCategoryDetails = dropDownData[0];
        this.categories = dropDownData[0].categories;
        this.dropdownCatDetails = dropDownData[0];
      }
    });
  }

  getCoureBasedOnCatalog(catalogue, category, subchild, superChild) {
    this.categoryData = category;
    this.subCatId = subchild;
    this.superCatId = superChild;
    this.catagoryName = category.categoryName;
    this.learnerService.getCoureBasedOnCatalog(catalogue.catalogueId, category.categoryId,
      this.userDetailes._id, subchild, superChild).subscribe((course: any) => {
        if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
          this.allcourses = course.data.getCoureBasedOnCatalog.data;
          const toSearch = 'false';
          this.claimedStatuts = this.allcourses.filter(o => o.clamaiedStatus.includes(toSearch));
          this.loading = false;
        }
      });
  }
  viewCourse(category, templateRef: TemplateRef<any>, categoryname, categorycount) {
    return false;
    this.color = false;
    // this.loading = true;
    this.viewCourseClass = false;
    this.categoryPopupData = categoryname;
    this.categoryCount = categorycount;
    if (categorycount > 0) {
      this.dialog.open(templateRef, {
        panelClass: 'dialogContainer',
        closeOnNavigation: true,
        disableClose: true,
      });
    }
  }
  closedialogbox() {
    this.dialog.closeAll();
    this.allcourses = [];
    this.availableCourses = '';
    this.viewCourseClass = true;
    this.courseSearch = '';
    this.CommonServices.closeAvailPopup$.next(false);
  }
  claimCourse(course) {
    let categoryPopupName = '';
    if (this.categoryPopupData !== 'college connect' && this.categoryPopupData !== 'pro certification') {
      categoryPopupName = 'vocational';
    } else {
      categoryPopupName = this.categoryPopupData;
    }
    let subCat = '';
    let superSubCat = '';
    if (this.subCatId) {
      subCat = this.subchildData.subCategoryId;
    }
    if (this.superCatId) {
      superSubCat = this.categoryyName.superSubCategoryId;
    }
    this.learnerService.claimcourse(this.userDetailes._id, this.userDetailes.user_id,
      course.course_id, course.course_name, categoryPopupName).subscribe((data: any) => {
        if (data && data.data && data.data.claimcourse && data.data.claimcourse.success) {
          this.learnerService.getCoureBasedOnCatalog(this.catalogueDetails.catalogueId,
            this.categoryData.categoryId,
            // tslint:disable-next-line:no-shadowed-variable
            this.userDetailes._id, subCat, superSubCat).subscribe((course: any) => {
              if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
                this.allcourses = course.data.getCoureBasedOnCatalog.data;
                this.getCountForCategories();
                this.getEnrolledCourses('', '', '', '', '', '', false);
                // this.getCountForJobRole();
              }
            });
        }
      });
  }

  navToCal() {
    this.router.navigateByUrl('/Learner/calendar');
  }
  // openMyMenu() {
  //   this.color = true;
  //   this.trigger.toggleMenu();
  // }
  // closeMyMenu() {
  //   this.color = false;
  //   this.trigger.closeMenu();
  // }

  // NOT USING ANY WHERE WHEN REQURED UNCOMMENT
  // getCountForJobRole() {
  //   this.learnerService.getCountForJobroleCategories(this.userDetailes._id).subscribe((data: any) => {
  //     this.jobRole = data.data.getCountForJobroleCategories.data;
  //   });
  // }

  dropdownValueChange(selectedValue, count, jobroleId) {
    this.viewCourseClass = false;
    this.selectedJobRole = selectedValue;
    this.jobRoleId = jobroleId;
    this.jobroleEnrollCount = count;
  }

  // searchTrigger() {
  //   this.searchExpand = true;
  //   console.log('this.searchExpand', this.searchExpand);
  // }

  // -------------mobile responsive function-----------------------------
  onexpTemp(category, id, isexps) {
    this.expandActivityNameTemp = isexps ? id : null;
    this.isExpandCourseTemp = false;
    if (category.subCategory) {
      this.isExpandCourseTemp = true;
    }
  }

  onCloseTab() {
    if (this.isExpandCourseTemp === true) {
      this.isExpChild = false;
    }
  }

  onexpchildTemp(id, isexp) {
    this.expandActivityNameChildTemp = isexp ? id : null;
    this.isExpChild = isexp ? true : false;
  }

  triggerPopup() {
    document.getElementById('dropMenu').style.display = 'block';
  }

  triggerPopups() {
    this.dropdownMenu = !this.dropdownMenu;
    if (this.dropdownMenu) {
      document.getElementById('dropMenu').style.display = 'block';
    } else {
      document.getElementById('dropMenu').style.display = 'none';
    }
  }

  closePopup() {
    document.getElementById('dropMenu').style.display = 'none';
  }

  resettingJobRole() {
    this.selectedJobRole = 'Job Role';
    this.jobRoleId = null;
    this.getEnrolledCourses('', '', '', '', '', false, false);
  }
  resettingJobRoledata() {
    this.selectedJobRole = 'Job Role';
    this.jobRoleId = null;
  }
}

