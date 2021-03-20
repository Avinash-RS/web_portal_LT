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
  constructor(private activeRoute: ActivatedRoute,private router:Router,private learnerService: LearnerServicesService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails'))
    this.activeRoute.queryParams.subscribe(res => {
      this.course = res;
    });
   this.getCourseReport();
  }

  getBack(){
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getCourseReport(){
this.learnerService.getReport(this.course.batchId,this.course.id,this.userDetail.user_id).subscribe((data)=>{
  if (data.data['getLearnerNewCourseReport'].data[0]) {
    this.courseReportData = data.data['getLearnerNewCourseReport'].data[0];
    this.courseReportData.selflearning.isMore = false
    this.courseReportData.VILT.isMore = false
    this.courseReportData.collaboration.isMore = false

    console.log(this.courseReportData)
  }
  
})
  }
}
