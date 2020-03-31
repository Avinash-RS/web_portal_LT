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
  @Input('from') from: any;
  userDetail: any;
  user_id_dtl:any;
  user_id_data:any;
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
    console.log(course)
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
   
    this.getcourserStatus()
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout()
      this.viewWishList(this.course);
    }
  }

  gotoDescription(course) {
    let detail = {
      id :  this.course.course_id,
      wishlist: this.course.wishlisted,
      wishlist_id:this.course.wishlist_id 
    }
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail: detail } });
    // this.router.navigate(['/Learner/courseDetail',{ state: { id: id, wishlist: this.course.wishlisted, wishlist_id: this.course.wishlist_id }}])
  }

  goTocourse(status) {
    this.user_id_dtl=JSON.parse( localStorage.getItem('UserDetails'))
    
    
    this.router.navigate(["/Learner/scorm", { id: 'SequencingRandomTest_SCORM20043rdEdition',user:this.user_id_dtl.user_id }]);
  }
  getcourserStatus(){
    var user_id='1'
    this.service.getPlayerStatus(user_id).subscribe((data: any) => {
    console.log(data,'rajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    });
  }
}
