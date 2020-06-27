import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '../../../../environments/environment';

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
  };
  course: any = null;
  content: any;
  breakpoint: number;
  detail: any;
  isshowPublish = false;
  courseType: string;
  modulength: any;
  courseid: string;
  countofdoc: any;
  authorinfo: any;
<<<<<<< HEAD
  url:any;
  
=======
  url: any;
  userDetails: any;

>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
  constructor(public service: CommonServicesService, public sanitizer: DomSanitizer, private gs: GlobalServiceService,
              private dialog: MatDialog, public route: Router, public learnerservice: LearnerServicesService,
              private loader: NgxSpinnerService, ) {
      localStorage.setItem('role', 'admin');
      this.gs.checkLogout();
      this.detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      this.loader.show();
      this.courseType = localStorage.getItem('courseType');
      this.courseid = localStorage.getItem('courseid');
      this.userDetails = JSON.parse(localStorage.getItem('adminDetails'));
      if (this.courseType === 'create') {
      this.isshowPublish = true;
    } else {
      this.isshowPublish = false;
    }

<<<<<<< HEAD
    this.loader.show();
    this.service.viewCurseByID(this.detail ? this.detail.id : this.courseid,"admin").subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse.success == true) {
=======
      this.loader.show();
      this.service.viewCurseByID(this.detail ? this.detail.id : this.courseid, 'admin').subscribe((viewCourse: any) => {
      if (viewCourse.data.viewcourse.success === true) {
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
        this.course = viewCourse.data.viewcourse.message;
        this.loader.hide();
      } else {
        this.loader.hide();
      }
    });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.passCourseId();
    this.getModuleData();
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  published() {
    const detail = {
      id: this.course.course_id,
      name: this.course.course_name
    };

    this.route.navigateByUrl('/Admin/auth/publishCourse', { state: { detail } });
  }

  editResource() {
<<<<<<< HEAD
    this.route.navigate(['/Admin/auth/Wca/rf'],{queryParams:{id:this.course.course_id,editModulesback: false}});
=======
    this.route.navigate(['/Admin/auth/Wca/rf'], {queryParams: {id: this.course.course_id, editModulesback: false}});
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
  }
  clickedT(i) {
    this.clicked = i;
  }
  getModuleData() {
    this.learnerservice.getModuleData(this.detail ? this.detail.id : this.courseid, this.userDetails.user_id).subscribe((data: any) => {
      if (data.data.getmoduleData.success === 'true') {
        this.content = data.data.getmoduleData.data[0];
        this.modulength = this.content.coursedetails.length;
        this.content.coursedetails.forEach(moduledetails => {
          // moduledetails.moduledetails.forEach(element => {
            this.countofdoc = moduledetails.Modulecount;
<<<<<<< HEAD
             return true
=======
            return true;
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
          //  });
        });
      }
    });
  }

     passCourseId() {
      this.service.geturl(this.detail ? this.detail.id : this.courseid).subscribe((data: any) => {
      });
     }

  crsDetails() {
    this.route.navigate(['/Admin/auth/Wca/addcourse'], { queryParams: { edit: true, viewingModule: this.course.course_id } });
  }

  editModules() {
    this.route.navigate(['/Admin/auth/Wca/addmodule'],
    { queryParams: {courseId: this.course.course_id,
      courseImage: this.course.course_img_url,
      courseName: this.course.course_name
    }});
  }

  previewcourse(templateRef: TemplateRef<any>) {
<<<<<<< HEAD
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl( environment.scormUrl+'/scormPlayer.html?contentID='+this.course.course_id,);
    //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
=======
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.scormUrl + '/scormPlayer.html?contentID=' + this.course.course_id + '&path=' + this.content.url, );
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
    // this.dialog.open(templateRef);
    this.dialog.open(templateRef, {
      width: '100%',
      height: '100%',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

  }

  moresection(vale, modelenght) {
    this.modulength = modelenght - 5;

    if (vale === true) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }

  downloadAll(urls) {
    const arr: any = [];
    urls.forEach(element => {
      arr.push(element.path);
    });
    const link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    for (let i = 0; i < arr.length; i++) {
      link.href = arr[i];
      link.click();
    }
    document.body.removeChild(link);
  }


  previewideo() {
    document.getElementById('myNav').style.height = '100%';
  }


  closeNav() {
<<<<<<< HEAD
    this.service.pauseVideo$.next("off");
    document.getElementById("myNav").style.height = "0%";
=======
    this.service.pauseVideo$.next('off');
    document.getElementById('myNav').style.height = '0%';
>>>>>>> 73f6ce0d281a1e33db9170fe3cae7f193d9f43e7
  }
}
