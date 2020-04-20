import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

import{WcaService} from '../../services/wca.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  popularCourses: { img: string; name: string; }[];

  publishedCourses:any;
  createdCourses:any;
  draftCourses:any;

  wishlist: any = [];
  @Input('from') from: any;
  @Input('showCartBtn') showCartBtn: boolean;
  @Input('showWishlist') showWishlist: boolean; 
  @Input('canNavigate') canNavigate: boolean;
  @Input('showStatus') showStatus: boolean;
  @Input('showPrice') showPrice: boolean;
  @Input('showCount') showCount: boolean;
  @Input('showRating') showRating: boolean;
  @Input('showDate') showDate: boolean;

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
 
  

  constructor(public service: WcaService) { }

  ngOnInit() {

    this.getPublishedCourses();
    this.getCreatedCourses();
    this.getDraftCourses();
    
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

    this.service.getPublishedCourse().subscribe((data: any) => {

     this.publishedCourses=data.Result;

     console.log(this.publishedCourses[0])
       
    });
  }

  getCreatedCourses() {

    this.service.getCreatedCourse().subscribe((data: any) => {

     this.createdCourses=data.Result;

    });
  }

  getDraftCourses() {

    this.service.getDraftCourse().subscribe((data: any) => {

     this.draftCourses=data.Result;

    });
  }
}
