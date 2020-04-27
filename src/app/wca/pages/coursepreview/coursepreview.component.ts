import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-coursepreview',
  templateUrl: './coursepreview.component.html',
  styleUrls: ['./coursepreview.component.scss']
})
export class CoursepreviewComponent implements OnInit {
  clicked: any = 'media';
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
  course: any;
  constructor( public service: CommonServicesService,private loader: Ng4LoadingSpinnerService,) {

    this.service.viewCurseByID(1).subscribe((viewCourse: any) => {
          console.log(viewCourse,"detail")
      if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
        this.course = viewCourse.data.viewcourse.message[0];
        console.log(this.course)
        this.loader.hide();
      } else
        this.loader.hide();
    });
   }

  ngOnInit() {
  }
  clickedT(i) {
    this.clicked = i
  }

}
