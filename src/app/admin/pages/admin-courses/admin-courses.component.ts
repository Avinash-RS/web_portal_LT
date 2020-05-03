import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {
  adminDetails: any;
  courseList: any = [];
  breakpoint: number;
  type: any;
  // type: any = 'published';
  goto: any;
  showPublishedDate: boolean;
  loader: boolean;
  btnType: any;
  viewType: string = 'grid';
  showCount: boolean;
  showRating: boolean;
  showPrice: boolean;
  pagenumber: any;
  constructor(public route: Router, private service: AdminServicesService) {
    this.type = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.type) || 'published';
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    
    this.pagenumber = 0;
    if (this.type == 'created') {
      this.loader = true;
      this.service.getAllCourseCreated(this.adminDetails.user_id, this.pagenumber).subscribe((res: any) => {
        if (res.data && res.data.get_course_createdby_admin) {
          this.courseList = res.data.get_course_createdby_admin.message;
          this.goto = 'create';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = 'Publish';
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
        } else
          this.loader = false;
      })
    }
    else if (this.type == 'published') {
      this.loader = true;
      this.service.getAllCoursePublished("undefined", this.pagenumber).subscribe((res: any) => {
        if (res.data && res.data.get_course_published) {
          this.courseList = res.data.get_course_published.message;
          this.goto = 'publish';
          this.showPublishedDate = true;
          this.loader = false;
          this.btnType = null;
          this.showCount = true;
          this.showRating = true;
          this.showPrice = true;
        } else
          this.loader = false;
      })
    }
    else if (this.type == 'draft') {
      this.loader = true;
      this.service.getAllDrafted("undefined", this.pagenumber).subscribe((res: any) => {
        if (res.data && res.data.get_draft_course) {
          this.courseList = res.data.get_draft_course.message;
          this.goto = 'draft';
          this.showPublishedDate = false;
          this.loader = false;
          this.btnType = 'Publish';
          this.showCount = false;
          this.showRating = false;
          this.showPrice = false;
        } else
          this.loader = false;
      })
    }
  }

  ngOnInit() {
    if (window.innerWidth <= 600)
      this.breakpoint = 1;
    else if (window.innerWidth >= 600 && window.innerWidth <= 768)
      this.breakpoint = 2;
    else if (window.innerWidth >= 768 && window.innerWidth <= 1024) 
    this.breakpoint = 3;
    // else if (window.innerWidth >= 992 && window.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else
      this.breakpoint = 4;

  }

  onResize(event) {
    if (event.target.innerWidth <= 600)
      this.breakpoint = 1;
    else if (event.target.innerWidth >= 600 && event.target.innerWidth <= 768)
      this.breakpoint = 2;
    else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 1024)
      this.breakpoint = 3;
    // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else
      this.breakpoint = 4;
  }

onpagination(event) {
  this.pagenumber = this.pagenumber + 1;
  console.log("called");
  if (this.type == 'created') {
    this.loader = true;
    this.service.getAllCourseCreated(this.adminDetails.user_id, this.pagenumber).subscribe((res: any) => {
      if (res.data && res.data.get_course_createdby_admin) {
        this.courseList.push(...res.data.get_course_createdby_admin.message);
        // this.courseList = res.data.get_course_createdby_admin.message;
        this.goto = 'create';
        this.showPublishedDate = false;
        this.loader = false;
        this.btnType = 'Publish';
        this.showCount = false;
        this.showRating = false;
        this.showPrice = false;
      } else
        this.loader = false;
    })
  }
  else if (this.type == 'published') {
    this.loader = true;
    this.service.getAllCoursePublished("undefined", this.pagenumber).subscribe((res: any) => {
      if (res.data && res.data.get_course_published) {
        this.courseList.push(...res.data.get_course_published.message);
        // this.courseList = res.data.get_course_published.message;
        this.goto = 'publish';
        this.showPublishedDate = true;
        this.loader = false;
        this.btnType = null;
        this.showCount = true;
        this.showRating = true;
        this.showPrice = true;
      } else
        this.loader = false;
    })
  }
  else if (this.type == 'draft') {
    this.loader = true;
    this.service.getAllDrafted("undefined", this.pagenumber).subscribe((res: any) => {
      if (res.data && res.data.get_draft_course) {
        this.courseList.push(...res.data.get_draft_course.message);
        // this.courseList = res.data.get_draft_course.message;
        this.goto = 'draft';
        this.showPublishedDate = false;
        this.loader = false;
        this.btnType = 'Publish';
        this.showCount = false;
        this.showRating = false;
        this.showPrice = false;
      } else
        this.loader = false;
    })
  }
}

}
