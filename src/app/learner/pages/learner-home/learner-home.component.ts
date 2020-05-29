import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonServicesService } from '@core/services/common-services.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  userDetailes: any;
  pagenumber = 0;
  sort_type: any = "A-Z";
  allcourses: any;

  constructor(public learnerservice: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute,
    private globalservice: GlobalServiceService,public CommonServices: CommonServicesService) {
  }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    if (!this.userDetailes.group_id) {
      this.userDetailes.group_id = '1';
    }
    this.getallcourses();
    this.getEnrolledCourses();
  }
  getallcourses() {
    if (this.userDetailes.group_id)
      this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber, this.sort_type).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
        console.log('all courses', this.allcourses)
      });
  }
  // function to fetch all the enrolled courses of the user
  getEnrolledCourses() {
    console.log(this.userDetailes.user_id)
    this.learnerservice.get_enrolled_courses('4kujob').subscribe((enrolledList: any) => {
      if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
        console.log('enrolled response', enrolledList.data.getLearnerenrolledCourses.data)
      }
    });
  }
}
