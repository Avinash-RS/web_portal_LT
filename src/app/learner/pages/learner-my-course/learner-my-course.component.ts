import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { GlobalServiceService } from 'src/app/common/services/handlers/global-service.service';

@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss']
})
export class LearnerMyCourseComponent implements OnInit {
  myCoursesList: any = [];
  userDetailes: any;
  open: boolean = true;

  constructor(public service: LearnerServicesService, private gs: GlobalServiceService) { }

  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.userDetailes = this.gs.checkLogout()
      // this.service.getMyCourse(this.userDetailes._id).subscribe((getMyCourse: any) => {
      //   if (getMyCourse.data.get_course_by_user) {
      //     if (getMyCourse.data.get_course_by_user.success) {
      //       console.log(getMyCourse.data.get_course_by_user)
      //       this.myCoursesList = getMyCourse.data.get_course_by_user.message
      //     }
      //   }
      // });
    }

    this.myCoursesList = [
      {
        text: 'Start', price: 65671, max_student_enrollments_allowed: 1565, rating: 2, course_img_url: "../../../../assets/learner/1.jpg",
        course_name: 'Lorem ipsum dolor sit amet,  reprehenderi in voluptate Lorem',
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate Lorem ipsum dolor sit amet reprehenderit in voluptate Lorem ipsum dolor sit amet,  reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Resume', price: 15765, max_student_enrollments_allowed: 1565, rating: 5, course_img_url: "../../../../assets/learner/2.jpg", statusValue: 70,
        course_name: 'Lorem ipsum dolor sit amet, in voluptate Lorem',
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Completed', price: 65671, max_student_enrollments_allowed: 1567, rating: 3, course_img_url: "../../../../assets/learner/3.jpg",
        course_name: 'Lorem ipsum,  reprehenderi in voluptate Lorem',
        description: 'Lorem ipsum dolor sit amet, reprehenderit in voluptate Lorem  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
      {
        text: 'Completed', price: 65671, max_student_enrollments_allowed: 1567, rating: 1, course_img_url: "../../../../assets/learner/4.jpg",
        course_name: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet,  reprehenderit in voluptate Lorem ipsum dolor sit amet reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      },
    ];
  }
  myCourses() {

  }


}
