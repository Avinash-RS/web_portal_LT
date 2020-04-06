import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {

  course: any = {};
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
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: true
  }

  wishlist: any = [];
  syllabus: {}[];
  open: boolean = false;
  ins: {}[];
  userDetail: any;
  showShortDesciption = true;
  clicked: any = 'media';

  constructor(private router: ActivatedRoute, public service: CommonServicesService, private gs: GlobalServiceService,
    public route: Router, private loader: Ng4LoadingSpinnerService, private alert: AlertServiceService) {
    this.loader.show();
    var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras && 
    this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    console.log('course',detail, detail.id)
    this.service.viewCurseByID(detail.id).subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
        this.course = viewCourse.data.viewcourse.message[0];
        this.course.wishlisted = detail.wishlist || false;
        this.course.wishlist_id = detail.wishlist_id || null;
        console.log(this.course)
        this.loader.hide();
      } else
        this.loader.hide();
    });
    // this.service.viewCurseByID('1').subscribe((viewCourse: any) => {
    //   if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
    //     this.course = viewCourse.data.viewcourse.message[0];
    //     this.course.wishlisted = false;
    //     this.course.wishlist_id =  null;
    //     console.log(this.course)
    //     this.loader.hide();
    //   } else
    //     this.loader.hide();
    // });

  }

  clickedT(i) {
    this.clicked = i
  }

  alterDescriptionText() {
     this.showShortDesciption = !this.showShortDesciption
  }
  ngOnInit() {
    this.service.list_content().subscribe((list_content: any) => {
      console.log(list_content)
      if (list_content.data.list_content.success) {
        this.syllabus = list_content.data.list_content.data
      }
    });

    // this.syllabus = [{
    //   "title": "Lorem ipsum dolor sit ame,",
    //   "subtitle": [{
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   }
    //   ],
    // },
    // {
    //   "title": "Lorem ipsum dolor sit ame,",
    //   "subtitle": [{
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   }
    //   ],
    // },
    // {
    //   "title": "Lorem ipsum dolor sit ame,",
    //   "subtitle": [{
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   },
    //   {
    //     "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" },
    //       { "name": "Lorem ipsum dolor sit ame" }
    //     ]
    //   }
    //   ],
    // },
    // ]
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout()
    }
    this.ins = [{
      "name": "Loe",
      "img": "../../../../assets/learner/lens.jpg",
      "content": " mport RoutingModule and Routes into AppModule unless they are imported       Import BrowserAnimationsModule into AppModule unless it is imported.    Import BrowserAnimationsModule into AppModule unless it is imported.     Import CarouselModule into a module which declares a component intended to have a carousel."
    }, {
      "name": "Lowwww",
      "img": "../../../../assets/learner/lens.jpg",
      "content": " mport RoutingModule and Routes into AppModule unless they are imported       Import BrowserAnimationsModule into AppModule unless it is imported.    Import BrowserAnimationsModule into AppModule unless it is imported.     Import CarouselModule into a module which declares a component intended to have a carousel."
    }, {
      "name": "Lsdfsdoe",
      "img": "../../../../assets/learner/lens.jpg",
      "content": " mport RoutingModule and Routes into AppModule unless they are imported       Import BrowserAnimationsModule into AppModule unless it is imported.    Import BrowserAnimationsModule into AppModule unless it is imported.     Import CarouselModule into a module which declares a component intended to have a carousel."
    }, {
      "name": "asfs",
      "img": "../../../../assets/learner/lens.jpg",
      "content": "lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }, {
      "name": "masf",
      "img": "../../../../assets/learner/lens.jpg",
      "content": "lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    ]
  }

  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollTop = 0;       
    el.scrollIntoView({behavior: 'smooth'});
  }

  playCourse(i) {
    console.log(i);
    this.route.navigate(["/Learner/scorm", { id: i }]);
    this.service.syllabus_of_particular_scorm('FSL ').subscribe((viewCourse: any) => {
      console.log(viewCourse)
    });
  }

  openb() {
    console.log(this.open)
    this.open = !this.open
    console.log(this.open)
  }

  selectWishlist(course) {
    this.loader.show()
    if (this.gs.checkLogout()) {
      console.log(this.course.wishlisted)
      if (this.course.wishlisted == false) {
        this.service.addWishlist(course.course_id, this.userDetail._id).subscribe((addWishlist: any) => {
          if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            console.log(this.course.wishlisted)
            this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
            // this.alert.openAlert("Success !", "Added to wishlist")
            this.gs.canCallWishlist(true)
            this.loader.hide()
          }
        });
      } else {
        this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
          if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            course.wishlist_id = null;
            console.log(this.course.wishlisted)
            // this.alert.openAlert("Success !", "Removed from wishlist")
            this.gs.canCallWishlist(true)
            this.loader.hide()
          }
        });
      }
    }
  }

}
