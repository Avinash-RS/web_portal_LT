import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import {MatMenuTrigger} from '@angular/material';
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
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  [x: string]: any;
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
  categoryDetails: any;
  dropDownCategoryDetails = [];
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
  selectedIndex = 0;
  viewCourseClass = true;
  jobRole: any = [];
  categoryyName: any;
  subchildData: any;
  selectedJobRole = 'Select';
  jobroleEnrollCount: any;
  subCatId: any;
  superCatId: any;
  claimedStatuts: any;


  constructor(
    public translate: TranslateService,
    public learnerService: LearnerServicesService, private gs: GlobalServiceService,
    private router: Router, private dialog: MatDialog) {
    this.userDetailes = this.gs.checkLogout();
    this.getEnrolledCourses('', '', '');
    this.getScreenSize();
    this.getCountForCategories();
    this.getCountForJobRole();
    // console.log(this.triggerBtn ,'triggerBtntriggerBtntriggerBtn')
  }
  @HostListener('window:resize', ['$event'])
  // ngOnInit() {
  // this.translate.use(localStorage.getItem('language'));
  // }
  ngOnInit() {
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

  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  menuSelect(subchild, superchild) {
    // this.categoryPopupData.categoryName1 = superchild.superSubCategoryName;
    this.categoryyName = superchild;
    this.subchildData = subchild;
  }

  claimAll() {
    this.loading = true;
    this.learnerService.bulkclaimcourse(this.userDetailes._id, this.userDetailes.user_id,
    this.categoryyName.superSubCategoryId).subscribe((bulkclaimcourse: any) => {
      if (bulkclaimcourse.data.bulkclaimcourse.success === true) {
        this.learnerService.getCoureBasedOnCatalog(this.catalogueDetails.catalogueId, this.categoryData.categoryId,
          this.userDetailes._id, this.subchildData.subCategoryId, this.categoryyName.superSubCategoryId).subscribe((course: any) => {
            if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
              this.loading = false;
              this.allcourses = course.data.getCoureBasedOnCatalog.data;
              this.getCountForCategories();
              this.getEnrolledCourses('', '', '');
              this.getCountForJobRole();
            }
          });
      }
      });
  }
  getEnrolledCourses(catalougeId, catagoryId, jobRoleCategoryId) {
    this.loading = true;
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id, this.userDetailes._id,
      catalougeId, catagoryId, jobRoleCategoryId ).subscribe((enrolledList: any) => {
        if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
          this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
          if(this.enrolledCourses.length> 0) {
          this.enrolledCourses.forEach(element => {
            if (element.course_duration) {
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
          if ((!catalougeId && !catagoryId) || jobRoleCategoryId) {
            this.onGoingCourseCount = arr.length;
            this.completedCourseCount = arr1.length;
            this.allCourseCount = this.enrolledCourses.length;
          }
        }
        this.loading = false;
      });
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

  gotoDesc(c) {
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
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
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      forumVal: true
    };
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
  }

  getCountForCategories() {
    this.learnerService.getCountForCategories(this.userDetailes._id).subscribe((data: any) => {
      if (data && data.data && data.data.getCountForCategories && data.data.getCountForCategories.data) {
      this.catalogueDetails = data.data.getCountForCategories.data;
      this.categoryDetails = data.data.getCountForCategories.data.categories;
      this.dropDownCategoryDetails = [data.data.getCountForCategories.data];
    }
    });
  }
  getCoureBasedOnCatalog(catalogue, category, subchild, superChild) {
    this.categoryData = category;
    this.subCatId = subchild;
    this.superCatId = superChild;
    // console.log(this.categoryData, 'this.categoryDatathis.categoryData');
    this.catagoryName = category.categoryName;
    this.learnerService.getCoureBasedOnCatalog(catalogue.catalogueId, category.categoryId,
      this.userDetailes._id, subchild, superChild).subscribe((course: any) => {
        if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
          this.allcourses = course.data.getCoureBasedOnCatalog.data;
          const toSearch = 'false';
          this.claimedStatuts = this.allcourses.filter(o => o.clamaiedStatus.includes(toSearch));
          console.log(this.claimedStatuts,'this.claimedStatuts');
          this.loading = false;
        }
      });
  }
  viewCourse(category, templateRef: TemplateRef<any>) {
    this.loading = true;
    this.viewCourseClass = false;
    this.categoryPopupData = category;

    this.dialog.open(templateRef, {
      panelClass: 'dialogContainer',
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  closedialogbox() {
    this.dialog.closeAll();
    this.availableCourses = '';
    this.viewCourseClass = true;
  }
  claimCourse(courseId) {
    let subCat = '';
    let superSubCat = '';
    if (this.subCatId) {
      subCat = this.subchildData.subCategoryId;
    }
    if (this.superCatId) {
      superSubCat = this.categoryyName.superSubCategoryId;
    }
    this.learnerService.claimcourse(this.userDetailes._id, this.userDetailes.user_id,
      courseId).subscribe((data: any) => {
        if (data && data.data && data.data.claimcourse && data.data.claimcourse.success) {
          this.learnerService.getCoureBasedOnCatalog(this.catalogueDetails.catalogueId, this.categoryData.categoryId,
            this.userDetailes._id, subCat, superSubCat).subscribe((course: any) => {
              if (course && course.data && course.data.getCoureBasedOnCatalog && course.data.getCoureBasedOnCatalog.data) {
                this.allcourses = course.data.getCoureBasedOnCatalog.data;
                this.getCountForCategories();
                this.getEnrolledCourses('', '', '');
                this.getCountForJobRole();
              }
            });
        }
      });
  }

  navToCal() {
    this.router.navigateByUrl('/Learner/calendar');
  }
  openMyMenu() {
    this.trigger.toggleMenu();
  }


  getCountForJobRole() {
    this.learnerService.getCountForJobroleCategories(this.userDetailes._id).subscribe((data: any) => {
      this.jobRole = data.data.getCountForJobroleCategories.data;
    });
  }

  dropdownValueChange(selectedValue, count) {
    this.selectedJobRole = selectedValue;
    this.jobroleEnrollCount = count;
  }
}

