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

    console.log(this.detail,'course_id')
    this.courseType = localStorage.getItem('courseType')
    if (this.courseType === "create") {
      this.isshowPublish = true
    } else {
      this.isshowPublish = false
    }
    
    this.loader.show();
    this.service.viewCurseByID(this.detail.id).subscribe((viewCourse: any) => {
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
    this.learnerservice.getModuleData(this.detail.id).subscribe(data => {
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

  downloadAll(urls) {
    //  console.log(urls)
    //  var arr: any = [];
    //  debugger
    //  urls.forEach(element => {
    //    console.log(element.path)
    //    arr.push(element.path);
 
    //   });
    //    var link = document.createElement('a');
    //    link.setAttribute('download', null);
    //    link.style.display = 'none';
    //    document.body.appendChild(link);
     
    //    for (var i = 0; i < arr.path.lenth; i++) {
         
    //      link.setAttribute('href', arr[i]);
    //      console.log(arr[i],'arr[i]')
    //      link.click();
    //    }
    //    document.body.removeChild(link); 
    

}
}
