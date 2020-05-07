import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from "@angular/material";
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-coursepreview',
  templateUrl: './coursepreview.component.html',
  styleUrls: ['./coursepreview.component.scss']
})
export class CoursepreviewComponent implements OnInit {
  public isCollapsed = false;
  clicked: any = 'media';
  urlSafe: SafeResourceUrl;
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
  modulength: any;
  courseid: string;
  countofdoc: any;
  authorinfo: any;
  url:any;
  constructor(public service: CommonServicesService, public sanitizer: DomSanitizer, private gs: GlobalServiceService,
    private dialog: MatDialog, public route: Router, public learnerservice: LearnerServicesService,
    private loader: NgxSpinnerService, ) {
      localStorage.setItem('role', 'admin');
      this.gs.checkLogout();
      
    this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    this.loader.show();

    console.log(this.detail, 'course_id')
    this.courseType = localStorage.getItem('courseType');
    this.courseid = localStorage.getItem('courseid');
    if (this.courseType === "create") {
      this.isshowPublish = true
    } else {
      this.isshowPublish = false
    }

    this.loader.show();
    this.service.viewCurseByID(this.detail ? this.detail.id : this.courseid).subscribe((viewCourse: any) => {
      console.log(viewCourse.data.viewcourse, 'viewCourse')
      if (viewCourse.data.viewcourse.success == true) {
        this.course = viewCourse.data.viewcourse.message;
        // this.authorinfo = this.course.author_details
        console.log(this.course, 'course')
        this.loader.hide();
      } else
        this.loader.hide();
    });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.passCourseId();
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
    this.learnerservice.getModuleData(this.detail ? this.detail.id : this.courseid).subscribe(data => {
      this.content = data.data['getmoduleData']['data'][0];
      this.modulength = this.content['coursedetails'].length;
      this.content.coursedetails.forEach(moduledetails => {
        moduledetails.moduledetails.forEach(element => {
          this.countofdoc = element.resourse.count;
           return true
         });
      });
    }, err => {

    })
  }

     passCourseId(){
      this.service.geturl(this.detail ? this.detail.id : this.courseid).subscribe(data => {
        console.log(data)
      })
     }

  crsDetails() {
    this.route.navigate(['/Admin/auth/Wca/addcourse'], { queryParams: { edit: true, viewingModule: this.course.course_id } });
  }

  editModules() {
    this.route.navigate(['/Admin/auth/Wca/addmodule'],
    { queryParams: {courseId:this.course.course_id, 
      courseImage: this.course.course_img_url, 
      courseName: this.course.course_name
    }});
  }
  
  previewcourse(templateRef: TemplateRef<any>) {
    console.log(this.content.url,'lllllllllllllllllllllllllllllllllllllllllllll')
    // this.url='../../../../assets/scormContent'+this.content.url
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.url);
    //console.log(this.content.url)
    this.dialog.open(templateRef);
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

  }

  moresection(vale, modelenght) {
    this.modulength = modelenght - 5;

    if (vale == true) {
      this.isCollapsed = false
    } else {
      this.isCollapsed = true
    }
  }

  downloadAll(urls) {
    var arr: any = [];
    urls.forEach(element => {
      arr.push(element.path);
    });
    var link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    for (var i = 0; i < arr.length; i++) {
      link.href = arr[i];
      link.click();
    }
    document.body.removeChild(link);
  }
}
