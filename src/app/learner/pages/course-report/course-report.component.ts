import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
  weekCard = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  ]
  public barChartOptions: ChartOptions = {
    responsive: true, 
    scales:{
      xAxes:[{
        gridLines:{
          display:false
        }
      }],
      yAxes:[{
        gridLines:{
          borderDash: [1, 3],
          color: "#00A99D"
        }
      }]
    }
  };

  public barChartLabels: Label[] = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7','week 8'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 59, 80, 81, 56, 55, 40,100], 
      label: 'Series A' ,
      backgroundColor: '#00A99D',
      barThickness: 18,
      barPercentage: 0.5,
    },
  ];

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
