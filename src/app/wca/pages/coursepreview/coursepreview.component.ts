import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LearnerServicesService } from '@learner/services/learner-services.service';

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
  content: any;
  constructor( public service: CommonServicesService, public learnerservice: LearnerServicesService,private loader: Ng4LoadingSpinnerService,) {
   
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
    this.getModuleData()
  }
  clickedT(i) {
    this.clicked = i
  }
  getModuleData() {
    this.learnerservice.getModuleData(1).subscribe(data => {
      console.log(data)
      // if(data.data['getmoduleData']['success'] == true){
      
        this.content = data.data['getmoduleData']['data'][0]
        console.log( this.content,"contenyt")
      // }
     
      // if(this.content&&this.content.getModuleData&&this.content.getModuleData.success){
      //    this.content = this.content.getModuleData.data[0]
      // }   
    })
  }
}
