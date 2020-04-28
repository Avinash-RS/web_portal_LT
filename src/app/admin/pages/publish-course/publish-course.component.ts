import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';

@Component({
  selector: 'app-publish-course',
  templateUrl: './publish-course.component.html',
  styleUrls: ['./publish-course.component.css']
})
export class PublishCourseComponent implements OnInit {
  course: any;
  constructor(private service: AdminServicesService) {
    // var type = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
    // this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.type);
  }

  ngOnInit() {
  }

  publishCourse() {

    this.service.publishCourse(this.course._id, true).subscribe((res: any) => {
      
    })
  }
}
