import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service'
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  publishedCourses: any;
  createdCourses: any;
  draftCourses: any;
  wishlist: any = [];
  breakpoint: number;

   trendingCategorires: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
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
      },
      1200 :{
        items : 4
      }
    },
    nav: true
  }
  adminDetails: any;
  spinner: boolean = false;
  publishedCourseLength: number;
  createdCourseLength: number;
  draftCourseLength : number;
  
  constructor(public service: WcaService,
    private adminService: AdminServicesService,
    //  public spinner: NgxSpinnerService, 
    private router: Router, ) { }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.spinner = true;
    this.getPublishedCourses();
    this.getCreatedCourses();
    this.getDraftCourses();
    this.getWindowSize();
  }

  getWindowSize() {
    if (window.innerWidth <= 480)
      this.breakpoint = 1;
    else if (window.innerWidth >= 480 && window.innerWidth <= 768)
      this.breakpoint = 2;
    // else if (window.innerWidth >= 768 && window.innerWidth <= 992) this.breakpoint = 3;
    else
      this.breakpoint = 4;
  }

  onResize(event) {
    if (event.target.innerWidth <= 480)
      this.breakpoint = 1;
    else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768)
      this.breakpoint = 2;
    // else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992)
    //   this.breakpoint = 3;
    else
      this.breakpoint = 4;
  }

  getPublishedCourses() {
    this.adminService.getAllCoursePublished("undefined", 0).subscribe((data: any) => {
      this.publishedCourses = data.data && data.data.get_course_published && data.data.get_course_published.message;
      this.publishedCourseLength = data.data.get_course_published.course_count;
    }, err => {
      this.spinner = false;
    });
  }

  getCreatedCourses() {
    var adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
    var role = localStorage.getItem('role') || null;
    console.log(adminDetails.user_id+'----'+role)

    this.adminService.getAllCourseCreated(adminDetails.user_id, 0).subscribe((data: any) => {
      this.createdCourses = data.data.get_course_createdby_admin.message;
      this.createdCourseLength = data.data.get_course_createdby_admin.course_count;
    // }, err => {
    //   this.spinner.hide();
    // });
    // this.adminService.getAllDrafted(adminDetails.user_id, 0).subscribe((data: any) => {

    //   this.createdCourses = data.data.get_draft_course.message;
      this.spinner = false;

    }, err => {
      this.spinner = false;
    });
  }

  getDraftCourses() {
    this.adminService.getAllDrafted("undefined", 0).subscribe((data: any) => {
      this.draftCourses = data.data.get_draft_course.message;
      this.spinner = false;
      this.draftCourseLength = data.data.get_draft_course.course_count;
    }, err => {
      this.spinner = false;
    });
  }

  goToViewCourse(type) {
    this.router.navigateByUrl('/Admin/auth/listCourses', { state: { type: type } });
  }
}