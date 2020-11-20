import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';

@Component({
  selector: 'app-activitycenterhomescreen',
  templateUrl: './activitycenterhomescreen.component.html',
  styleUrls: ['./activitycenterhomescreen.component.scss']
})
export class ActivitycenterhomescreenComponent implements OnInit {

  userDetails: any;
  details: any;
  constructor(public router: Router, private service: LearnerServicesService,
              private gs: GlobalServiceService) { this.userDetails = this.gs.checkLogout(); }

  ngOnInit() {
    this.get_active_course_count();
  }
  gototable1() {
    // should be added by team A - if anything
  }
  gototable(e) {
    localStorage.setItem('course', e);
    const detail = {
      tableType: e,
    };
    // localStorage.setItem('key', e);
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/activitycenter', { state: { detail } });
  }
  get_active_course_count() {
    const userId = this.userDetails.user_id;
    // this.service.get_active_course_count("egs8fv").subscribe((result: any) => {
    this.service.get_active_course_count(userId).subscribe((result: any) => {
      this.details = result.data.get_active_course_count.message;
    });
  }
}
