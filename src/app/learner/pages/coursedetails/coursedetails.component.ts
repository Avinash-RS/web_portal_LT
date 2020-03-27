import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  imageObject: {}[];
  course: any;
  wishlist: any = [];
  syllabus: {}[];
  open : boolean = false;

  constructor(private router: ActivatedRoute, public service: CommonServicesService, private gs: GlobalServiceService, ) { }

  ngOnInit() {
    var userdetail = this.gs.checkLogout()
    this.service.viewWishlist(userdetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
        console.log(this.wishlist)
      }
    });
    this.router.params.subscribe(params => {
      // this.service.viewCurseByID(params.id).subscribe((viewCourse: any) => {
      //   if (viewCourse.data.view_wishlist && viewCourse.data.view_wishlist.success) {
      //     this.course = viewCourse.data.view_wishlist.message
      //   }
      // });
    });
    this.imageObject = [{
      image: '../../../../assets/learner/lens.jpg',
      thumbImage: '../../../../assets/learner/lens.jpg'
    // }, {
    //   image: '../../../../assets/learner/1.jpg',
    //   thumbImage: '../../../../assets/learner/1.jpg'
    // }, {
    //   image: '../../../../assets/learner/lens.jpg',
    //   thumbImage: '../../../../assets/learner/lens.jpg'
    }]
      this.syllabus = [{
      "title": "Lorem ipsum dolor sit ame,",
      "subtitle": [{
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      }
      ],
    },
    {
      "title": "Lorem ipsum dolor sit ame,",
      "subtitle": [{
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      }
      ],
    },
    {
      "title": "Lorem ipsum dolor sit ame,",
      "subtitle": [{
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      },
      {
        "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "content": [
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" },
          { "name": "Lorem ipsum dolor sit ame" }
        ]
      }
      ],
    },
    ]
  }

  scroll(el: HTMLElement) {
    console.log(el)
    el.scrollIntoView();
  }

  coursePlay() {

  }
  openb() {
    console.log(this.open)
    this.open = !this.open
    console.log(this.open)
  }
}
