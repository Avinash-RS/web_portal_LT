import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-view-course-component',
  templateUrl: './list-view-course-component.component.html',
  styleUrls: ['./list-view-course-component.component.scss']
})
export class ListViewCourseComponentComponent implements OnInit {
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
  @Input('btnType') btnType: any;
  @Input('isDraft') isDraft: boolean;
  @Input('showEnroll') showEnroll = false;
  currentRate;
  userDetail: any;
   
 
  constructor(public service: CommonServicesService, private alert: AlertServiceService, private gs: GlobalServiceService,
    // tslint:disable-next-line:align
    private router: Router, private loader: Ng4LoadingSpinnerService, ) { }

  viewWishList(course) {
    this.course.wishlisted = false;
    this.course.wishlist_id = null;
    this.service.viewWishlist(this.userDetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        _.filter(viewWishlist.data.view_wishlist.message, function (o) {
          if (o.course_id === course.course_id) {
            course.wishlisted = true;
            course.wishlist_id = o._id;
          }
        });
      }
    });
  }

  selectWishlist(course) {
    this.loader.show();
    if (this.gs.checkLogout()) {
      if (this.course.wishlisted === false) {
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
      this.userDetail = this.gs.checkLogout();
      this.viewWishList(this.course);
    }
    if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'incomplete') {
      this.course.coursePlayerStatus.status = 'Resume';
    } else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'complete') {
      this.course.coursePlayerStatus.status = 'Completed';
    } else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'suspend') {
      this.course.coursePlayerStatus.status = 'Pause';
    }
  }

  gotopublishcourse(course) {
    if (this.btnType === 'Publish') {
      const detail = {
        id: this.course.course_id,
        name: this.course.course_name
      };
      this.router.navigateByUrl('/Admin/auth/publishCourse', { state: { detail } });
    }
  }

  gotoDescription(course?) {
    if (this.goto === 'publish') {
      const detail = {
        type: 'publish', id: this.course._id || this.course.course_id
      };
      localStorage.setItem('courseType', detail.type);
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail } });

    } else if (this.goto === 'create') {
      const detail = { type: 'create', id: this.course._id || this.course.course_id };
      localStorage.setItem('courseType', detail.type);
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail } });

    } else if (this.goto === 'draft') {
      const detail = { type: 'draft', id: this.course._id || this.course.course_id };
      localStorage.setItem('courseType', detail.type);
      // this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });
      this.router.navigate(['/Admin/auth/Wca/addmodule'], {
        queryParams: {
          courseId: this.course.course_id, courseImage: this.course.course_img_url, courseName: this.course.course_name
        }
      });

    } else {
      const detail1 = {
        id: this.course.course_id,
        wishlist: this.course.wishlisted || false,
        wishlist_id: this.course.wishlist_id || null,
        enrollment_status: this.course.enrollment_status
      };
      this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: detail1 } });
    }
  }

  enrollCourse() {
    if (this.btnType === 'Enroll Now') {
      this.service.enrollcourse(this.userDetail.user_id, this.userDetail.group_id[0], this.course.course_id)
        .subscribe((enrollCourse: any) => {
          if (enrollCourse.data) {
            if (enrollCourse.data.enrollcourse.success) {
              this.course.enrollment_status = 'pending';
              Swal.fire('User enrolled successfully for the course');
            } else {
              Swal.fire(enrollCourse.data.enrollcourse.message);
              // this.alert.openAlert(enrollCourse.data.enrollcourse.message, null);
            }
          } else {
            Swal.fire('Please try again later');
            // this.alert.openAlert('Please try again later', null);
          }
        });
    }
  }

  // publish() {
  //   const detail = {
  //     id: this.course.course_id,
  //     name: this.course.course_name
  //   };

  //   this.router.navigateByUrl('/Admin/auth/publishCourse', { state: { detail } });
  // }

}




