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
  allcourses: any = [];
  enrolledCourses: any =[];
  wishList:any = [];
  yetToStart:any;
  incomplete:any;
  popularsCourse: any;

  constructor(public learnerService: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute,
    private globalservice: GlobalServiceService,public commonServices: CommonServicesService) {
  }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    // if (!this.userDetailes.group_id) {
    //   this.userDetailes.group_id = '1';
    // }
    this.getallcourses();
    this.getEnrolledCourses();
    this.viewWishlist();
    this.commonServices.globalAllCategory.subscribe((data: any) => {
      this.allcourses = data;
    });
    this.commonServices.globalCourses.subscribe((data: any) => {
      this.allcourses = data;
    });
  }
  getallcourses() {
    if (this.userDetailes.group_id)
      this.commonServices.getallcourses(this.userDetailes.group_id[0], this.pagenumber, this.sort_type).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
        console.log('all courses', this.allcourses)
      });
  }
  // function to fetch all the enrolled courses of the user
  getEnrolledCourses() {
   
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id).subscribe((enrolledList: any) => {
      if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
        console.log('enrolled response', enrolledList)
        this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
        this.incomplete = enrolledList.data.getLearnerenrolledCourses.data.suspend[0];
        this.yetToStart = enrolledList.data.getLearnerenrolledCourses.data.incomplete[0];
      }
    });
  }
  // function to fetch the wishlist of the user
 
  viewWishlist() {
    console.log(this.userDetailes.user_id)
    this.commonServices.viewWishlist(this.userDetailes.user_id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishList = viewWishlist.data.view_wishlist.message;
        console.log('wishlist response',viewWishlist);
      }
    });
  }

  // getting popular course
  getAllPopularcourse(){
    this.learnerService.getPopularcourse().subscribe((popularCourse: any) => {
      if (popularCourse.data.getPopularcourse && popularCourse.data.getPopularcourse.success) {
        this.allcourses = popularCourse.data.getPopularcourse.data;
      }
    });
  }

  onChange(value){
    if(value == 'popularCourse'){
      this.getAllPopularcourse();
    }else{
      this.getallcourses();
    }
  }
}
