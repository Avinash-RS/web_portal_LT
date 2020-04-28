import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { id } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  routedCourseDetails: any;
  noOfModules: number = 0;

  constructor(public toast: ToastrService, private router: Router, public route: ActivatedRoute, public apiService: WcaService) { }

  ngOnInit() {
    this.routedCourseDetails = {
      courseId: this.route.snapshot.paramMap.get('courseId'),
      courseImage: this.route.snapshot.paramMap.get('courseImage'),
      courseName: this.route.snapshot.paramMap.get('courseName'),
    }
    this.route.snapshot.paramMap.get('courseDetails');
    // this.queryData = 1
    if (this.routedCourseDetails.courseId) {
      this.getCourseDetails();
    }
  }

  getCourseDetails() {
    this.apiService.getCourseDetails(this.routedCourseDetails.courseId).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      if (this.courseDetails && this.courseDetails.coursedetails.length) {
        this.courseDetails.coursedetails.forEach((data) => {
          if (data.modulestatus !== 'false') {
            ++this.noOfModules;
          }
        });
      }
    })
  }

  deleteModule(moduleName) {
    this.courseDetails.flag = "false";
    this.courseDetails.coursedetails.forEach((data) => {
      if (data.modulename == moduleName) {
        data.modulestatus = "false";
      }
    });

    this.apiService.createDraft(this.courseDetails).subscribe((res: any) => {
      if (res.Code == 200) {
        this.getCourseDetails();
        this.toast.success('Module deleted successfully');
      }
    })
  }

}
