import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from "@angular/material";
import { Router } from '@angular/router';

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
  breakpoint: number;
  detail: any;
  isshowPublish: boolean = false;
  courseType: string;
  constructor(public service: CommonServicesService, private dialog: MatDialog, public route: Router, public learnerservice: LearnerServicesService, private loader: NgxSpinnerService, ) {
    this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.loader.show();
    this.courseType = localStorage.getItem('courseType')
    if (this.courseType === "create") {
      this.isshowPublish = true
    } else {
      this.isshowPublish = false
    }

    this.service.viewCurseByID(1).subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
        this.course = viewCourse.data.viewcourse.message[0];
        console.log(this.course, 'course')
        this.loader.hide();
      } else
        this.loader.hide();
    });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.getModuleData()
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  published() {
    let detail = {
      id: this.course.course_id,
      name: this.course.course_name
    }

    this.route.navigateByUrl('/Admin/auth/publishCourse', { state: { detail: detail } });
  }

  editResource() {
    this.route.navigateByUrl('/Admin/auth/Wca/rf');
  }
  clickedT(i) {
    this.clicked = i
  }
  getModuleData() {
    this.loader.show();
    this.learnerservice.getModuleData(1).subscribe(data => {
      console.log(data)
      // if(data.data['getmoduleData']['success'] == true){

      this.content = data.data['getmoduleData']['data'][0]
      console.log(this.content, "contenyt")
      // }

      // if(this.content&&this.content.getModuleData&&this.content.getModuleData.success){
      //    this.content = this.content.getModuleData.data[0]
      // }   
      this.loader.hide();
    }, err => {
      this.loader.hide();
    })
  }

  editModules(){
    this.route.navigate(['/Admin/auth/Wca/addmodule',{courseId: this.course.course_id, 
      courseImage: this.course.course_img_url,courseName: this.course.course_name
    }]); 
  }
  previewcourse(templateRef: TemplateRef<any>) {
    console.log(templateRef)
    this.dialog.open(templateRef);
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

  }
}
