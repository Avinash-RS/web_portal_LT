import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { WcaService } from '../../services/wca.service'
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  popularCourses: { img: string; name: string; }[];

  publishedCourses: any;
  createdCourses: any;
  draftCourses: any;

  wishlist: any = [];
  // @Input('from') from: any;
  // @Input('showCartBtn') showCartBtn: boolean;
  // @Input('showWishlist') showWishlist: boolean;
  // @Input('canNavigate') canNavigate: boolean;
  // @Input('showStatus') showStatus: boolean;
  // @Input('showPrice') showPrice: boolean;
  // @Input('showCount') showCount: boolean;
  // @Input('showRating') showRating: boolean;
  // @Input('showDate') showDate: boolean;

  breakpoint: number;

  popularCategorires: any = {
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
      }
    },
    nav: true
  }

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
      300: {
        items: 2
      },
      540: {
        items: 3
      },
      740: {
        items: 4
      }
    },
    nav: true
  }
  adminDetails: any;



  constructor(public service: WcaService,  private adminService: AdminServicesService,public spinner: NgxSpinnerService, private router: Router, ) { }

  ngOnInit() {

    this.spinner.show();

    this.getPublishedCourses();
    this.getCreatedCourses();
    this.getDraftCourses();
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.getWindowSize();


  }
  getWindowSize() {
    if (window.innerWidth <= 480)
      this.breakpoint = 1;
    else if (window.innerWidth >= 480 && window.innerWidth <= 768)
      this.breakpoint = 2;
    else if (window.innerWidth >= 768 && window.innerWidth <= 992) this.breakpoint = 3;
    // else if (window.innerWidth >= 992 && window.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else
      this.breakpoint = 4;
  }

  onResize(event) {
    if (event.target.innerWidth <= 480)
      this.breakpoint = 1;
    else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768)
      this.breakpoint = 2;
    else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992)
      this.breakpoint = 3;
    // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else
      this.breakpoint = 4;
  }

  getPublishedCourses() {

    this.adminService.getAllCoursePublished("undefined",0).subscribe((data: any) => {

      this.publishedCourses = data.data.get_course_published.message;
    }, err => {
      this.spinner.hide();
    });
  }

  getCreatedCourses() {

    this.adminService.getAllCourseCreated(this.adminDetails.user_id, 0).subscribe((data: any) => {
      this.createdCourses = data.data.get_course_createdby_admin.message;

    }, err => {
      this.spinner.hide();
    });
  }

  getDraftCourses() {

    this.adminService.getAllDrafted("undefined", 0).subscribe((data: any) => {

      this.draftCourses = data.data.get_draft_course.message;
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
    });
  }

  goToViewCourse(type) {
    this.router.navigateByUrl('/Admin/auth/listCourses', { state: { type: type } });
  }
}
