import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.scss']
})
export class TopCoursesComponent implements OnInit {
  // CourseList: any = [];
  breakpoint: number;
  // tslint:disable-next-line:no-input-rename
  @Input('from') from: any;
  // tslint:disable-next-line:no-input-rename
  @Input('showCartBtn') showCartBtn: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showWishlist') showWishlist: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('canNavigate') canNavigate: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showStatus') showStatus: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('CourseList') CourseList: any = [];

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
  };


  constructor() { }

  ngOnInit() {
    // this.CourseList = [
    //   { text: 'Start', cols: 65671, rows: 1565 ,rating : 2, img : "../../../../assets/learner/1.jpg"},
    //   { text: 'Resume', cols: 15765, rows: 1565, rating : 5, img : "../../../../assets/learner/2.jpg", statusValue : 70},
    //   { text: 'Completed', cols: 65671, rows: 1567, rating : 3, img : "../../../../assets/learner/3.jpg"},
    //   { text: 'Completed', cols: 65671, rows: 1567, rating : 1, img : "../../../../assets/learner/4.jpg"},
    // ];


    if (window.innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 480 && window.innerWidth <= 768) {
      this.breakpoint = 2;
 } else if (window.innerWidth >= 768 && window.innerWidth <= 992) { this.breakpoint = 3; } else {
      this.breakpoint = 4;
 }
  }

  onResize(event) {
    if (event.target.innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768) {
      this.breakpoint = 2;
 } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992) {
      this.breakpoint = 3;
 } else {
      this.breakpoint = 4;
 }
  }
}
