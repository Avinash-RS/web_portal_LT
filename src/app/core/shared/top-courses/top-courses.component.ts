import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.scss']
})
export class TopCoursesComponent implements OnInit {
  // CourseList: any = [];
  breakpoint: number;
  @Input('from') from: any;
  @Input('showCartBtn') showCartBtn: boolean;
  @Input('showWishlist') showWishlist: boolean; 
  @Input('canNavigate') canNavigate: boolean;
  @Input('showStatus') showStatus: boolean
  @Input('CourseList') CourseList: any = [];

  constructor() { }

  ngOnInit() {
    // this.CourseList = [
    //   { text: 'Start', cols: 65671, rows: 1565 ,rating : 2, img : "../../../../assets/learner/1.jpg"},
    //   { text: 'Resume', cols: 15765, rows: 1565, rating : 5, img : "../../../../assets/learner/2.jpg", statusValue : 70},
    //   { text: 'Completed', cols: 65671, rows: 1567, rating : 3, img : "../../../../assets/learner/3.jpg"},
    //   { text: 'Completed', cols: 65671, rows: 1567, rating : 1, img : "../../../../assets/learner/4.jpg"},
    // ];



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
}
