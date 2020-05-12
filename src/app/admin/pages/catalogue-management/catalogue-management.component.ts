import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit {
  adminDetails: any;
  // userDetailes: any;
  // allcourses: any;


  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService, public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router) {
    this.adminDetails = this.gs.checkLogout();
    console.log(this.adminDetails)
  }

  ngOnInit() {

  }


  // gotoedit() {
  //   console.log(this.userDetailes.group_id[0])
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 
}
