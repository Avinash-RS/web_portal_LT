import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  tiles: any = [];
  userDetailes: any;
  constructor() { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.tiles = [
      {
        text: 'Start', cols: 65671, rows: 1565, rating: 2, img: "../../../../assets/learner/1.jpg",
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Resume', cols: 15765, rows: 1565, rating: 5, img: "../../../../assets/learner/2.jpg", statusValue: 70,
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Completed', cols: 65671, rows: 1567, rating: 3, img: "../../../../assets/learner/3.jpg",
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Completed', cols: 65671, rows: 1567, rating: 1, img: "../../../../assets/learner/4.jpg",
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
    ];
  }
  myCourses() {

  }

}
