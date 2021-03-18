import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {
  course;
  constructor(private activeRoute: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      this.course = res;
    });
  }
  
  getBack(){
    this.router.navigateByUrl('/Learner/MyCourse');
  }
}
