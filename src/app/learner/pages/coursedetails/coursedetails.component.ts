import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {

  course: any;
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

  constructor(private router: ActivatedRoute, public service: CommonServicesService, private gs: GlobalServiceService,
    public route: Router) { }

  ngOnInit() {
    var userdetail = this.gs.checkLogout();
    var id = this.router.snapshot.paramMap.get('id');
    this.service.viewCurseByID(id).subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
        this.course = viewCourse.data.viewcourse.message
        console.log(this.course)
      }
    });

    this.service.viewWishlist(userdetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
        // console.log(this.wishlist)
      }
    });
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
    console.log(el)
    el.scrollIntoView();
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
}
