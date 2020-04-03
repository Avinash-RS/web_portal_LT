import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss']
})
export class LearnerMyCourseComponent implements OnInit {
  myCoursesList: any = [];
  userDetailes: any;
  open: boolean = true;
  breakpoint: number;
  height_row : number;

  constructor(public service: LearnerServicesService, private gs: GlobalServiceService, private loader: Ng4LoadingSpinnerService, ) { }

  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.userDetailes = this.gs.checkLogout()
      this.viewMycourse()
      this.gs.callWishlist.subscribe(message =>
        this.viewMycourse()
      )
    }
    //for responsive
    if (window.innerWidth <= 480) { 
      this.breakpoint = 1; 
      this.height_row = 5;
    }

    else if (window.innerWidth >= 480 && window.innerWidth <= 768) { 
      this.breakpoint = 2; 
      this.height_row = 1.5;
    }

    else if (window.innerWidth >= 768 && window.innerWidth <= 992) { this.breakpoint = 3; 
      this.height_row = 1;}

    // else if (window.innerWidth >= 992 && window.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else {
      this.breakpoint = 4;
    }


  }

  onResize(event) {
    if (event.target.innerWidth <= 480) {
      this.breakpoint = 1;
      this.height_row = 2;
    }
    else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768) {
      this.breakpoint = 2;
      this.height_row = 1.5;
    }
    else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992) {
      this.breakpoint = 3;
      this.height_row = 1;
    }
    // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
    //   this.breakpoint = 4;
    else {
      this.breakpoint = 4;
    }


  }

  viewMycourse() {
    this.loader.show()
    this.service.getMyCourse(this.userDetailes._id).subscribe((getMyCourse: any) => {
      if (getMyCourse.data.get_course_by_user) {
        if (getMyCourse.data.get_course_by_user.success) {
          this.myCoursesList = getMyCourse.data.get_course_by_user.message;
          this.loader.hide
        }
      }
    });
    // this.myCoursesList = [
    //   {
    //     text: 'Start', price: 65671, max_student_enrollments_allowed: 1565, rating: 2, course_img_url: "../../../../assets/learner/3.jpg",
    //     course_name: 'Lorem ipsum dolor sit amet,  reprehenderi in voluptate Lorem',
    //     short_description: 'L reprehenderit in voluptate Lorem ipsum dolor sit amet,  reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Resume', price: 15765, max_student_enrollments_allowed: 1565, rating: 5, course_img_url: "../../../../assets/learner/3.jpg", statusValue: 70,
    //     course_name: 'Lorem ipsum dolor sit amet, in voluptate Lorem',
    //     short_description: ' cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Completed', price: 65671, max_student_enrollments_allowed: 1567, rating: 3, course_img_url: "../../../../assets/learner/3.jpg",
    //     course_name: 'Lorem ipsum,  reprehenderi in voluptate Lorem',
    //     short_description: ' cillum dolore eu fugiat nulla pariatur.'
    //   },
    //   {
    //     text: 'Completed', price: 65671, max_student_enrollments_allowed: 1567, rating: 1, course_img_url: "../../../../assets/learner/3.jpg",
    //     course_name: 'Lorem ipsum dolor sit amet',
    //     short_description: 'psum dolor sit amet reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    //   },
    // ];
  }
}
