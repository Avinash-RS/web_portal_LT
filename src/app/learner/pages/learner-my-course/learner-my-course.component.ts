import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';

@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss']
})
export class LearnerMyCourseComponent implements OnInit {
  myCoursesList: any = [];
  userDetailes: any;
  constructor(public service: LearnerServicesService) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.service.getMyCourse(this.userDetailes._id).subscribe((getMyCourse: any) => {
      if (getMyCourse.data.get_course_by_user) {
        if (getMyCourse.data.get_course_by_user.success) {
          console.log(getMyCourse.data.get_course_by_user)
          this.myCoursesList = getMyCourse.data.get_course_by_user.message
        }
      }
    });
    // this.myCoursesList = [
    //   {
    //     text: 'Start', cols: 65671, rows: 1565, rating: 2, img: "../../../../assets/learner/1.jpg",
    //     title: 'Lorem ipsum dolor sit amet,  reprehenderi in voluptate Lorem',
    //     description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate Lorem ipsum dolor sit amet reprehenderit in voluptate Lorem ipsum dolor sit amet,  reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Resume', cols: 15765, rows: 1565, rating: 5, img: "../../../../assets/learner/2.jpg", statusValue: 70,
    //     title: 'Lorem ipsum dolor sit amet, in voluptate Lorem',
    //     description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Completed', cols: 65671, rows: 1567, rating: 3, img: "../../../../assets/learner/3.jpg",
    //     title: 'Lorem ipsum,  reprehenderi in voluptate Lorem',
    //     description: 'Lorem ipsum dolor sit amet, reprehenderit in voluptate Lorem  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Completed', cols: 65671, rows: 1567, rating: 1, img: "../../../../assets/learner/4.jpg",
    //     title: 'Lorem ipsum dolor sit amet',
    //     description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate Lorem ipsum dolor sit amet reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    // ];
  }
  myCourses() {

  }

}
