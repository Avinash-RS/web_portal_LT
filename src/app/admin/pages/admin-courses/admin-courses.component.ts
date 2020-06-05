import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  adminDetails: any;
  courseList: any = [];
  breakpoint: number;
  type: any;
  // type: any = 'published';
  goto: any = null;
  showPublishedDate: boolean = null;
  loader: boolean;
  btnType: any = null;
  viewType = 'grid';
  showCount: boolean = null;
  showRating: boolean = null;
  showPrice: boolean = null;
  pagenumber: any;
  paginationpgno: any;
  courseCount: number;
  rowHeight: any;
  showEnroll: boolean = null;

  constructor(public route: Router, private service: AdminServicesService, private gs: GlobalServiceService, ) {
    this.btnType = null;
    this.goto = null;
    this.type = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.type) || 'published';
    // this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    localStorage.setItem('role', 'admin');
    this.adminDetails = this.gs.checkLogout();
    this.pagenumber = 0;
    this.paginationpgno = 0;
    this.getCourses();
  }

  getCourses() {
    if (this.type === 'created') {
      this.loader = true;
      this.service.getAllCourseCreated(this.adminDetails.user_id, this.pagenumber).subscribe((res: any) => {
        // this.service.getAllDrafted(this.adminDetails.user_id, 0).subscribe((res: any) => {
        if (res.data && res.data.get_course_createdby_admin) {
          // if (res.data && res.data.get_draft_course) {
          this.courseList = res.data.get_course_createdby_admin.message;
          // this.courseList = res.data.get_draft_course.message
          this.goto = 'create';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = 'Publish';
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
          this.showEnroll = true;
          this.courseCount = res.data.get_course_createdby_admin.course_count;
        } else {
          this.loader = false;
        }
      });
    } else if (this.type === 'published') {
      this.loader = true;
      this.service.getAllCoursePublished('undefined', this.pagenumber).subscribe((admincourse: any) => {
        if (admincourse.data && admincourse.data.get_course_published) {
          this.courseList = admincourse.data.get_course_published.message;
          this.goto = 'publish';
          this.rowHeight = '2.3:2.5';
          this.showPublishedDate = true;
          this.loader = false;
          this.btnType = null;
          this.showCount = true;
          this.showRating = true;
          this.showPrice = true;
          this.showEnroll = false;
          this.courseCount = admincourse.data.get_course_published.course_count;
        } else {
          this.loader = false;
        }
      });
    } else if (this.type === 'draft') {
      this.loader = true;
      this.service.getAllDrafted('undefined', this.pagenumber).subscribe((res: any) => {
        if (res.data && res.data.get_draft_course) {
          this.courseList = res.data.get_draft_course.message;
          this.goto = 'draft';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = null;
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
          this.showEnroll = false;
          this.courseCount = res.data.get_draft_course.course_count;
        } else {
          this.loader = false;
        }
      });
    }
  }

  ngOnInit() {
    if (window.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 600 && window.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }

  }

  onResize(event) {
    if (event.target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth >= 600 && event.target.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 1024) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  onpagination(event) {
    // this.pagenumber = this.pagenumber + 1;
    this.paginationpgno = event;
    if (this.type === 'created') {
      this.loader = true;
      this.service.getAllDrafted(this.adminDetails.user_id, event - 1).subscribe((res: any) => {
        if (res.data && res.data.get_course_createdby_admin) {
          // this.courseList.push(...res.data.get_draft_course.message);
          this.courseList = res.data.get_course_createdby_admin.message;
          this.goto = 'create';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = 'Publish';
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
          this.showEnroll = true;
        } else {
          this.loader = false;
        }
      });
    } else if (this.type === 'published') {
      this.loader = true;
      this.service.getAllCoursePublished('undefined', event - 1).subscribe((res: any) => {
        if (res.data && res.data.get_course_published) {
          // this.courseList.push(...res.data.get_course_published.message);
          this.courseList = res.data.get_course_published.message;
          this.goto = 'publish';
          this.showPublishedDate = true;
          this.loader = false;
          this.btnType = null;
          this.showCount = true;
          this.showRating = true;
          this.showPrice = true;
          this.showEnroll = false;
        } else {
          this.loader = false;
        }
      });
    } else if (this.type === 'draft') {
      this.loader = true;
      this.service.getAllDrafted('undefined', event - 1).subscribe((res: any) => {
        if (res.data && res.data.get_draft_course) {
          // this.courseList.push(...res.data.get_draft_course.message);
          this.courseList = res.data.get_draft_course.message;
          this.goto = 'draft';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = null;
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
          this.showEnroll = false;
        } else {
          this.loader = false;
        }
      });
    }
  }

}
