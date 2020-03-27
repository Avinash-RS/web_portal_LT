import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.scss']
})
export class TopCoursesComponent implements OnInit {
  tiles: any = [];
  constructor() { }

  ngOnInit() {
    this.tiles = [
      { text: 'Start', cols: 65671, rows: 1565 ,rating : 2, img : "../../../../assets/learner/1.jpg"},
      { text: 'Resume', cols: 15765, rows: 1565, rating : 5, img : "../../../../assets/learner/2.jpg", statusValue : 70},
      { text: 'Completed', cols: 65671, rows: 1567, rating : 3, img : "../../../../assets/learner/3.jpg"},
      { text: 'Completed', cols: 65671, rows: 1567, rating : 1, img : "../../../../assets/learner/4.jpg"},
    ];
  }

}
