import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';

@Component({
  selector: 'app-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {
  course;
  userDetail;
  courseReportData;
  courseReport = false;
  refresh = false;
  constructor(
    private activeRoute: ActivatedRoute, 
    private router:Router, 
    private learnerService: LearnerServicesService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails'))
    this.activeRoute.queryParams.subscribe(res => {
      this.course = res;
    });
   this.getCourseReport();
  }
  refreshReport(){
    this.refresh = true;
    this.courseReport = false;
    this.getCourseReport();
  }
  getBack(){
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getScoreProgress(c, t) {
    let progressScore = Number(c)/Number(t) *100;
    return progressScore;
  }
  getCourseReport(){
    this.learnerService.getLearnerNewCourseReport(atob(this.course.batchId),atob(this.course.id),this.userDetail.user_id,this.refresh, 14, 16).subscribe((data)=>{
    if (data.data['getLearnerNewCourseReport'].data[0]) {
      this.courseReport = true;
      this.courseReportData = data.data['getLearnerNewCourseReport'].data[0];
      console.log(this.courseReport, 'asdasdfasf');
      this.courseReportData.selflearning.isMore = false
      this.courseReportData.queryQuestion.isMore = false
      // this.courseReportData.VILT.isMore = false
      // this.courseReportData.collaboration.isMore = false
      console.log(this.courseReportData)
      }
    })
  }
}
