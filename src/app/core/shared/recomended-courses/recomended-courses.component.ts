import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recomended-courses',
  templateUrl: './recomended-courses.component.html',
  styleUrls: ['./recomended-courses.component.scss']
})
export class RecomendedCoursesComponent implements OnInit {
  breakpoint: number;

  constructor() { }

  ngOnInit() {
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
