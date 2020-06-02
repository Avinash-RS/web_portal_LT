import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  course: any = null;
  customOptions1: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      400: {
        items: 1
      }
    },
    nav: true
  }

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      20: {
        items: 2
      },
      40: {
        items: 3
      },
      60: {
        items: 4
      }
    },
    nav: true
  };
  wishlist: any = [];
  syllabus: {}[];
  open: boolean = false;
  userDetail: any;
  showShortDesciption = true;
  clicked: any = 'media';
  content: any;
  modulength: any;
  urlSafe: any;
  isCollapsed: any;
  constructor(private router: ActivatedRoute, public Lservice: LearnerServicesService, public service: CommonServicesService, private gs: GlobalServiceService,
    public route: Router, private loader: Ng4LoadingSpinnerService, private alert: AlertServiceService,
    public sanitizer: DomSanitizer) {
    this.loader.show();
    var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.service.viewCurseByID(detail && detail.id || '1').subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
        this.course = viewCourse.data.viewcourse.message;
        this.course.wishlisted = detail.wishlist || false;
        this.course.wishlist_id = detail.wishlist_id || null;
        this.course.enrollment_status = detail.enrollment_status;
        this.loader.hide();
        console.log(this.course)
      } else
        this.loader.hide();
    });
    console.log(detail, detail.id, 'course id')
    this.Lservice.getModuleData(detail.id).subscribe(data => {
      this.content = data.data['getmoduleData']['data'][0];
      this.modulength = this.content['coursedetails'].length;
      console.log(this.content, 'course details')
    })
  }

  clickedT(i) {
    this.clicked = i
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
  }
  ngOnInit() {
    // this.service.list_content().subscribe((list_content: any) => {
    //   if (list_content.data.list_content.success) {
    //     this.syllabus = list_content.data.list_content.data
    //   }
    // });

    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout()
    }
  }

  scroll(el: HTMLElement) {
    el.scrollTop = 0;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  playCourse(i) {
    this.route.navigate(["/Learner/scorm", { id: i }]);
    this.service.syllabus_of_particular_scorm('FSL ').subscribe((viewCourse: any) => {
    });
  }

  selectWishlist(course) {
    this.loader.show()
    if (this.gs.checkLogout()) {
      if (this.course.wishlisted == false) {
        this.service.addWishlist(course.course_id, this.userDetail._id).subscribe((addWishlist: any) => {
          if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
            this.gs.canCallWishlist(true)
            this.loader.hide()
          }
        });
      } else {
        this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
          if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            course.wishlist_id = null;
            this.gs.canCallWishlist(true)
            this.loader.hide()
          }
        });
      }
    }
  }

  enrollCourse() {
    this.service.enrollcourse(this.userDetail.user_id, this.userDetail.group_id[0], this.course.course_id).subscribe((enrollCourse: any) => {
      if (enrollCourse.data) {
        if (enrollCourse.data.enrollcourse.success) {
          Swal.fire("User enrolled successfully for the course")
        } else {
          Swal.fire(enrollCourse.data.enrollcourse.message)
        }
      }
      else {
        Swal.fire("Please try again later")
      }
    });
  }

}
