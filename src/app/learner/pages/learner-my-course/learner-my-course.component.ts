import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonServicesService } from '@core/services/common-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-my-course',
  templateUrl: './learner-my-course.component.html',
  styleUrls: ['./learner-my-course.component.scss']
})
export class LearnerMyCourseComponent implements OnInit {
  myCoursesList: any = [];
  userDetails: any;
  breakpoint: number;
  wishlist: any = [];
  @Input('from') from: any;
  @Input('showCartBtn') showCartBtn: boolean;
  @Input('showWishlist') showWishlist: boolean;
  @Input('canNavigate') canNavigate: boolean;
  @Input('showStatus') showStatus: boolean;
  @ViewChild('wishlist') inputMessageRef: ElementRef;
  @ViewChild('mycourse') mycourseRef: ElementRef;

<<<<<<< HEAD
  constructor(private router: Router, public service: LearnerServicesService, public commonService: CommonServicesService,
    // tslint:disable-next-line:align
    private gs: GlobalServiceService, private loader: Ng4LoadingSpinnerService ) {
  }
=======
  constructor(public service: LearnerServicesService, public commonService: CommonServicesService, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService,) { }
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7

  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.userDetails = this.gs.checkLogout();
      this.viewMycourse();
      this.viewWishlist();
      this.gs.callWishlist.subscribe(message => {
        this.viewMycourse();
        this.viewWishlist();
      });
    }
    // for responsive
    if (window.innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 480 && window.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 992) { this.breakpoint = 3; } else {
      this.breakpoint = 4;
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  viewMycourse() {
    this.loader.show();
    this.service.getMyCourse(this.userDetails._id).subscribe((getMyCourse: any) => {
      if (getMyCourse.data.get_course_by_user) {
        if (getMyCourse.data.get_course_by_user.success) {
          this.myCoursesList = getMyCourse.data.get_course_by_user.message;
          this.loader.hide();
          this.checkscroll();
        }
      }
    });
  }
   viewWishlist() {
    // document.querySelector('#target').scrollIntoView({ behavior: 'smooth', block: 'center' });
    const userdetail = this.gs.checkLogout();
    this.commonService.viewWishlist(userdetail._id, 0).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
        this.checkscroll();
      }
    });
  }

  checkscroll() {
    this.gs.navigation.subscribe(message => {
      if (message === 'wishlist') {
        this.inputMessageRef.nativeElement.scrollIntoView();
      } else if (message === 'mycourse') {
        this.mycourseRef.nativeElement.scrollIntoView();
      }
    });
  }
}
