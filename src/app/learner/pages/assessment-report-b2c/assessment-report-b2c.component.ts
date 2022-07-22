import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-report-b2c',
  templateUrl: './assessment-report-b2c.component.html',
  styleUrls: ['./assessment-report-b2c.component.scss']
})
export class AssessmentReportB2cComponent implements OnInit {
  fromPage: any;
  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  backButton() {
    if (this.fromPage === 'mycourse') {
      this.route.navigate(['/Landing/MyCourse']);
    } 
  }

}
