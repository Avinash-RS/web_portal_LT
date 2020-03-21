import { Component, OnInit, Input } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {
  @Input('course') course: any;
  @Input('from') from: any;
  userDetail: any;

  constructor(public service: CommonServicesService, private alert: AlertServiceService) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
  }

  viewWishList(course) {
    this.course.wishlisted = false;
    this.service.viewWishlist(this.userDetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        _.filter(viewWishlist.data.view_wishlist.message, function (o) {
          console.log(o.course_id,course.course_id)
          if (o.course_id == course.course_id) {
            course.wishlisted = true;
            course.wishlist_id = o._id 
          }
        });
      }
    });
  }

  selectWishlist(course) {
    console.log(this.course.wishlisted, this.course.wishlist_id)
    if (this.course.wishlisted == false) {
      this.service.addWishlist(course.course_id , this.userDetail._id).subscribe((addWishlist: any) => {
        if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
          console.log(addWishlist.data.add_to_wishlist)
          this.course.wishlisted = !this.course.wishlisted;
          console.log(course, this.course.wishlisted)
          this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
          this.alert.openAlert("Success !", "Added to wishlist")
        }
      });
    } else {
      this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
        console.log(addWishlist.data.delete_wishlist)
        if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
          // this.wishlisted = !this.wishlisted;
          this.course.wishlisted = !this.course.wishlisted;
          course.wishlist_id = null
          console.log(addWishlist.data.delete_wishlist)
          this.alert.openAlert("Success !", "Removed from wishlist")
        }
      });
    }
  }

  ngOnInit() {
    this.viewWishList(this.course)
  }

}
