import { Component, OnInit ,TemplateRef} from '@angular/core';
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
  isshow : boolean = false;
  constructor( public service: CommonServicesService,private dialog: MatDialog, public route: Router, public learnerservice: LearnerServicesService,private loader: NgxSpinnerService,) {
    //  this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras && 
    // this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.loader.show();
    // console.log(this.detail)
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
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.getModuleData()
  }

  closedialogbox(){
    this.dialog.closeAll();
  }

  editResource(){
    this.route.navigateByUrl('/Wca/rf');
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

  previewcourse(templateRef: TemplateRef<any>) {
    console.log(templateRef)
    this.dialog.open(templateRef);
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  
  }
}
