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
  goto: any;
  showPublishedDate: boolean;

  constructor(public route: Router, private service: AdminServicesService) {
    this.type = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.type);
    console.log(this.type)
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    if (this.type == 'created') {
      this.service.getAllCourseCreated(this.adminDetails.user_id, 0).subscribe((res: any) => {
        console.log(res);
        this.courseList = res.data.get_course_createdby_admin.message;
        this.goto = 'create';
        this.showPublishedDate = false
      })
    }
    else if (this.type == 'published')
      this.service.getAllCoursePublished(this.adminDetails.user_id, 0).subscribe((res: any) => {
        this.courseList = res.data.get_course_published.message;
        this.goto = 'publish';
        this.showPublishedDate = true
      })
      else if (this.type == 'draft')
      this.service.getAllDrafted(this.adminDetails.user_id, 0).subscribe((res: any) => {
        this.courseList = res.data.get_course_published.message;
        this.goto = 'draft';
        this.showPublishedDate = true
      })
  }

  ngOnInit() {
    if (window.innerWidth <= 600)
      this.breakpoint = 1;
    else if (window.innerWidth >= 600 && window.innerWidth <= 768)
      this.breakpoint = 2;
    else if (window.innerWidth >= 768 && window.innerWidth <= 992) this.breakpoint = 3;
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
    else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992)
      this.breakpoint = 3;
    // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else
      this.breakpoint = 4;
  }

}
