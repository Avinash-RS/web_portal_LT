import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as _ from 'lodash';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('course') course: any = {};
  // tslint:disable-next-line:no-input-rename
  @Input('canNavigate') canNavigate: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showCartBtn') showCartBtn: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showWishlist') showWishlist: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showStatus') showStatus: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showPrice') showPrice: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showCount') showCount: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showRating') showRating: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showDate') showDate: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('goto') goto: string;
  // tslint:disable-next-line:no-input-rename
  @Input('isDraft') isDraft: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('showEnroll') showEnroll: boolean ;
  // tslint:disable-next-line:no-input-rename
  @Input('btnType') btnType: string;

  userDetail: any;
  recordedData: any;
  finalFullData: any;
  finalStatus: any = null;
  role: any;

  constructor(public service: CommonServicesService, private alert: AlertServiceService, private gs: GlobalServiceService,
    // tslint:disable-next-line:align
    private router: Router, private loader: Ng4LoadingSpinnerService, ) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('adminDetails')) || null;
    this.role = localStorage.getItem('role') || null;
  }

  viewWishList(course) {
    this.course.wishlisted = false;
    this.course.wishlist_id = null;
    this.service.viewWishlist(this.userDetail._id, 0).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        // tslint:disable-next-line:only-arrow-functions
        _.filter(viewWishlist.data.view_wishlist.message, function(o) {
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
    if (this.userDetail) {
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
    if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'incomplete') {
      this.course.coursePlayerStatus.status = 'Resume';
    } else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'complete') {
      this.course.coursePlayerStatus.status = 'Completed';
    } else if (this.course.coursePlayerStatus && this.course.coursePlayerStatus.status === 'suspend') {
      this.course.coursePlayerStatus.status = 'Pause';
    }
    if (this.course && this.userDetail && this.role === 'learner') {
      this.viewWishList(this.course);
      this.getcourserStatus();
    }
  }

  gotoDescription(course) {
    if (!this.goto) {
      if (this.isDraft) {
        this.router.navigate(['/Admin/auth/Wca/addmodule'],
          {
            queryParams:
              { courseId: this.course.course_id, courseImage: this.course.course_img_url, courseName: this.course.course_name }
          });
      } else {
        const detail = {
          id: this.course.course_id,
          wishlist: this.course.wishlisted,
          wishlist_id: this.course.wishlist_id,
          enrollment_status: this.course.enrollment_status
        };
        this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
      }
    } else if (this.goto === 'publish') {
      const detail = {
        type: 'publish', id: this.course.course_id
      };
      localStorage.setItem('courseType', detail.type);
      localStorage.setItem('courseid', detail.id);
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail } });
    } else if (this.goto === 'create') {
      const detail = { type: 'create', id: this.course.course_id };
      localStorage.setItem('courseType', detail.type);
      localStorage.setItem('courseid', detail.id);
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail } });
    } else if (this.goto === 'draft') {
      const detail = { type: 'draft', id: this.course._id || this.course.course_id };
      localStorage.setItem('courseType', detail.type);
      localStorage.setItem('courseid', detail.id);
      this.router.navigate(['/Admin/auth/Wca/addmodule'],
        {
          queryParams:
            { courseId: this.course.course_id, courseImage: this.course.course_img_url, courseName: this.course.course_name }
        });
    }
  }

  publish() {
    const detail = {
      id: this.course.course_id,
      name: this.course.course_name
    };

    this.router.navigateByUrl('/Admin/auth/publishCourse', { state: { detail } });
  }
  goTocourse(status) {
    if (this.finalStatus !== 'Completed') {
      const detail1 = {
        id: this.course.course_id,
        user: this.userDetail.user_id,
        course_id: this.course.course_id,
        // user_obj_id: this.userDetail._id,
        // feed_back: this.course.feed_back
      };

      // id: c.course_id,
      // wishlist: c.wishlisted || false,
      // wishlist_id: c.wishlist_id || null,
      // enrollment_status: null,
      // this.router.navigateByUrl('/Learner/scorm', { state: { detail: detail1 } });
      this.router.navigateByUrl('/Learner/courseDetail', { state: { detail1 } });
      localStorage.setItem('Courseid', this.course.course_id);
      // localStorage.setItem('persentage', c.coursePlayerStatus.course_percentage);
    }

  }

  getcourserStatus() {
    this.service.getPlayerStatus(this.userDetail.user_id).subscribe((data: any) => {
      if (data.data.getPlayerStatus) {
        this.recordedData = data;
        this.finalFullData = this.recordedData.data.getPlayerStatus.message;
        if (this.finalFullData && this.finalFullData.status) {
          if (this.finalFullData.status === 'completed') {
            this.finalStatus = 'Completed';
          } else if (this.finalFullData.status === 'incomplete') {
            this.finalStatus = 'Resume';
          }
        }
      }
    });
  }

  enrollCourse() {
    if (this.userDetail?.user_id) {
      this.service.enrollcourse(this.userDetail.user_id, this.userDetail.group_id[0], this.course.course_id)
        .subscribe((enrollCourse: any) => {
          if (enrollCourse.data) {
            if (enrollCourse.data.enrollcourse.success) {
              this.course.enrollment_status = 'pending';
              Swal.fire('Your request for enrolment is successfully submitted');
            } else {
              Swal.fire(enrollCourse.data.enrollcourse.message);
            }
          } else {
            Swal.fire('Please try again later');
          }
        });
    } else {
      Swal.fire('Please login to continue');
    }
  }
  clickRejected() {
    this.alert.openConfirmAlert('Enrollment Confirmation', 'Do you wish to re-enroll for this course?', 'Enroll', 'Cancel').then((data) => {
      if (data) {
        this.enrollCourse();
      }
    });
  }
}
