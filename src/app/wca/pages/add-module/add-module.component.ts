import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  noOfModules: number = 0;

  constructor(public toast: ToastrService, private router: Router, public route: ActivatedRoute, public apiService: WcaService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        // this.queryData = params;
        // this.getCourseDetails();
      }
    });
    this.queryData = 1;
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.apiService.getCourseDetails(this.queryData).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      this.courseDetails.coursedetails.forEach((data) => {
        if (data.modulestatus == 'true') {
          ++this.noOfModules;
        }
      });
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
