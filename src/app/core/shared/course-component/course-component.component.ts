import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {
  @Input('course') course: any;
  @Input('canNavigate') canNavigate: boolean;
  @Input('showCartBtn') showCartBtn: boolean;
  @Input('showWishlist') showWishlist: boolean;
  @Input('showStatus') showStatus: boolean;
  @Input('showPrice') showPrice: boolean;
  @Input('showCount') showCount: boolean;
  @Input('showRating') showRating: boolean;
  @Input('showDate') showDate: boolean;
  @Input('goto') goto: string;
  //here type will come now we need to navigate to your page
  @Input('isDraft') isDraft: boolean;
  @Input('showEnroll') showEnroll: boolean = false;


  currentRate;

  userDetail: any;
  recorded_data: any;
  final_full_data: any;
  final_status: any = null;

  constructor(public service: CommonServicesService, private alert: AlertServiceService, private gs: GlobalServiceService,
    private router: Router, private loader: Ng4LoadingSpinnerService, ) {

  }

  viewWishList(course) {
    this.course.wishlisted = false;
    this.course.wishlist_id = null;
    this.service.viewWishlist(this.userDetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        _.filter(viewWishlist.data.view_wishlist.message, function (o) {
          if (o.course_id == course.course_id) {
            course.wishlisted = true;
            course.wishlist_id = o._id
          }
        });
      }
    });
  }

  selectWishlist(course) {
    this.loader.show();
    if (this.gs.checkLogout()) {
      if (this.course.wishlisted == false) {
        this.service.addWishlist(course.course_id, this.userDetail._id).subscribe((addWishlist: any) => {
          if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
            // this.alert.openAlert("Success !", "Added to wishlist")
            this.gs.canCallWishlist(true);
            this.loader.hide();
          }
        });
      } else {
        this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
          if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            course.wishlist_id = null;
            // this.alert.openAlert("Success !", "Removed from wishlist")
            this.gs.canCallWishlist(true);
            this.loader.hide();
          }
        });
      }
    }
  }

  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout()
      this.viewWishList(this.course);
      this.getcourserStatus()
    }
    if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'incomplete') this.course.coursePlayerStatus.status = 'Resume'
    else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'complete') this.course.coursePlayerStatus.status = 'Completed'
    else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'suspend') this.course.coursePlayerStatus.status = 'Pause'
  }

  gotoDescription(course) {
    if (!this.goto) {
      if (this.isDraft) {
        this.router.navigate(['/Admin/auth/Wca/addmodule'], { queryParams:  { courseId: this.course.course_id, courseImage: this.course.course_img_url, courseName: this.course.course_name }});

      }
      else {
        let detail = {
          id: this.course.course_id,
          wishlist: this.course.wishlisted,
          wishlist_id: this.course.wishlist_id
        }
        this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: detail } });
      }
    } else if (this.goto == 'publish') {
      let detail = {
        type: 'publish', id: this.course.course_id
      }
      localStorage.setItem('courseType', detail.type)
      localStorage.setItem('courseid', detail.id)
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });

    }
    else if (this.goto == 'create') {
      let detail =
        { type: 'create', id: this.course.course_id }
      localStorage.setItem('courseType', detail.type)
      localStorage.setItem('courseid', detail.id)
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });

    }
    else if (this.goto == 'draft') {
      let detail = { type: 'draft', id: this.course._id || this.course.course_id }
      localStorage.setItem('courseType', detail.type)
      localStorage.setItem('courseid', detail.id)
      //addmodule?courseId=3nqyd01b&courseImage=https:%2F%2Fedutechstorage.blob.core.windows.net%2Fcontainer1%2Fimages%2F7304826460633593-raj-1.png&courseName=HTMLCSS
      //this.router.navigateByUrl('/Admin/auth/Wca/addmodule?courseId={{query.viewingModule}}&courseImage={{query.image}}&courseName={{query.courseName}}', { state: { detail: detail } });
      this.router.navigate(['/Admin/auth/Wca/addmodule'], { queryParams:  { courseId: this.course.course_id, courseImage: this.course.course_img_url, courseName: this.course.course_name }});
    }
    // this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: detail } });
    // this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });
  }

  goTocourse(status) {

    if (this.final_status != 'Completed') {
      let detail1 = {
        id: 'Scaffolding',
        user: this.userDetail.user_id,
        course_id: this.course.course_id,
        user_obj_id: this.userDetail._id
      }
      this.router.navigateByUrl('/Learner/scorm', { state: { detail: detail1 } });
    }

  }

  getcourserStatus() {
    //check with user id 2,3 ,ramu
    this.service.getPlayerStatus(this.userDetail.user_id).subscribe((data: any) => {
      if (data.data['getPlayerStatus']) {
        this.recorded_data = data
        this.final_full_data = this.recorded_data.data.getPlayerStatus.message
        if (this.final_full_data && this.final_full_data.status) {
          if (this.final_full_data.status == 'completed') {
            this.final_status = 'Completed'
          } else if (this.final_full_data.status == 'incomplete') {
            this.final_status = 'Resume'
          }
        }
      }
    });
  }
}
