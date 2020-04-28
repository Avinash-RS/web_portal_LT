import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;

  constructor(private router: Router, public route: ActivatedRoute, public apiService: WcaService) { }

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

  getCourseDetails(){
    this.apiService.getCourseDetails(this.queryData).subscribe((data: any) => {
      this.courseDetails = data.result[0].coursedetails;
    })
  }

}
