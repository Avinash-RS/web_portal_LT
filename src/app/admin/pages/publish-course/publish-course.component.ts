import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';

@Component({
  selector: 'app-publish-course',
  templateUrl: './publish-course.component.html',
  styleUrls: ['./publish-course.component.css']
})
export class PublishCourseComponent implements OnInit {
  course: any;
  show: boolean = false;

  constructor(public route: Router, private service: AdminServicesService, private gs: GlobalServiceService, private alert: AlertServiceService, ) {
    this.course = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(this.course)
  }

  ngOnInit() {
  }

  publishCourse() {
    this.alert.openConfirmAlert('Confirmation', 'Are you sure you want to publish the course ?').then((data: Boolean) => {
      if (data) {
        this.service.publishCourse(this.course.id, true).subscribe((res: any) => {
          console.log(res)
          if(res.data.publishcourse.success) 
          this.alert.openAlert("Success !", "Published course successfully")
          else
          this.alert.openAlert(res.data.publishcourse.message == ""? res.data.publishcourse.error_msg : 
          res.data.publishcourse.message ,null)
        })
      }
    })
  }

  draftCourse() {
    this.route.navigate(['/Wca']);
  }
}
