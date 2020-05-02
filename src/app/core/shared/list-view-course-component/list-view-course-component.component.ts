import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-view-course-component',
  templateUrl: './list-view-course-component.component.html',
  styleUrls: ['./list-view-course-component.component.scss']
})
export class ListViewCourseComponentComponent implements OnInit {
  @Input('course') course: any;
  @Input('canNavigate') canNavigate: boolean;
  @Input('showWishlist') showWishlist: boolean;
  @Input('showStatus') showStatus: boolean;
  @Input('showPrice') showPrice: boolean;
  @Input('showCount') showCount: boolean;
  @Input('showRating') showRating: boolean;
  @Input('showDate') showDate: boolean;
  @Input('goto') goto: string;
  @Input('btnType') btnType: any;


  constructor(public service: CommonServicesService, private alert: AlertServiceService, private gs: GlobalServiceService,
    private router: Router, private loader: Ng4LoadingSpinnerService, ) { }

  ngOnInit() {
    console.log("It works", this.course);
  }

  login(v) {
    console.log(v)
    if (this.btnType == 'Publish') {
      let detail = {
        id: this.course.course_id,
        name: this.course.course_name
      }
      console.log(detail)
      this.router.navigateByUrl('/Admin/auth/publishCourse', { state: { detail: detail } });
    }
  }

  gotoDescription(course) {
    if (this.goto == 'publish') {
      let detail = {
        type: 'publish', id: this.course._id || this.course.course_id
      }
      localStorage.setItem('courseType', detail.type)
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });

    }
    else if (this.goto == 'create') {
      let detail =
        { type: 'create', id: this.course._id || this.course.course_id }
      localStorage.setItem('courseType', detail.type)
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });

    }
    else if (this.goto == 'draft') {
      let detail = { type: 'draft', id: this.course._id || this.course.course_id }
      localStorage.setItem('courseType', detail.type)
      this.router.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail: detail } });

    }
  }
}



