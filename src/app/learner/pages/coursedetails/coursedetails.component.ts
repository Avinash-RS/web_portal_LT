import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServicesService } from 'src/app/common/services/common-services.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  imageObject: {}[];
  course: any;

  constructor(private router: ActivatedRoute, public service: CommonServicesService) { }

  ngOnInit() {
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
    }, {
      image: '../../../../assets/learner/1.jpg',
      thumbImage: '../../../../assets/learner/1.jpg'
    }, {
      image: '../../../../assets/learner/lens.jpg',
      thumbImage: '../../../../assets/learner/lens.jpg'
    }]
  }

  scroll(el: HTMLElement) {
    console.log(el)
    el.scrollIntoView();
  }

  coursePlay() {

  }
}
