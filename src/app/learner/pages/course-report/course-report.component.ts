import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


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
  public chartPlugins = [pluginDataLabels];
  public barChartOptions: ChartOptions = {
    responsive: true, 
    tooltips:{
      enabled: false,
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 13,
        },
        formatter: (value, ctx) => {
          let percentage = value + "%";
          return percentage;
      },
      }
    },
    layout:{
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0
    }
    },
    legend: {
      display: false
    },
    scales:{
      xAxes:[{
        gridLines:{
          display:false
        },
      }],
      yAxes:[{
        gridLines:{
          borderDash: [1, 3],
          color: "#00A99D"
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize:10,
          callback: function(value) {
            return value + '%  '
          }
        }
      }],
    },
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  weeklabelData:any =[];
  weekpercent:any =[];
  weekwisedata :any = [];
  showArrow:boolean = false;
  disableArrow:boolean = true;
  selfscore:string ="0";
  QAscore:string ="0";

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
    this.disableArrow = !this.disableArrow;
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
    this.weeklabelData =[];
    this.weekpercent = [];
    var QA_totalweeks = this.course.QA_totalweeks ? parseInt(this.course.QA_totalweeks):16;
    var selflearning_totalweeks= this.course.selflearning_totalweeks ? parseInt(this.course.selflearning_totalweeks):14;
    this.learnerService.getLearnerNewCourseReport(atob(this.course.batchId),atob(this.course.id),this.userDetail.user_id,this.refresh, selflearning_totalweeks, QA_totalweeks).subscribe((data)=>{
    if (data.data['getLearnerNewCourseReport'].data[0]) {
      this.courseReport = true;
      this.courseReportData = data.data['getLearnerNewCourseReport'].data[0];
      this.selfscore = String(this.courseReportData.selfLearning_Card.selflearning_points_score)+'/'+String(this.courseReportData.selfLearning_Card.selflearning_out_of_points);
      this.QAscore= String(this.courseReportData.QA_Card.QA_points_score)+'/'+String(this.courseReportData.QA_Card.QA_out_of_points);
      
      this.courseReportData.selflearning.forEach(element => {
        this.weeklabelData.push([element.week,element.selflearningscore]);
        this.weekpercent.push(element.selflearningpercentage);
      });

      if(this.weeklabelData.length > 7){
        this.showArrow = true;
        this.barChartLabels = this.weeklabelData.slice();
        this.weekwisedata = this.weekpercent.slice();
        this.barChartLabels.splice(8,8);
        this.weekwisedata.splice(8,8);
        this.generateBarChart();
      }
      else{
        this.showArrow = false;
        this.barChartLabels = this.weeklabelData;
        this.weekwisedata = this.weekpercent;
        this.generateBarChart();
      }
      }
    });
  }
  generateBarChart(){
      this.barChartData = [
        { 
          data: this.weekwisedata, 
          backgroundColor: '#00A99D',
          barThickness: 18,
          barPercentage: 0.5,
          hoverBackgroundColor:'#00A99D',
        },
      ]
  }
  graphleft(){
    this.disableArrow = !this.disableArrow;
    this.barChartLabels = this.weeklabelData.slice();
    this.weekwisedata = this.weekpercent.slice();
    this.barChartLabels.splice(8,8);
    this.weekwisedata.splice(8,8);
    this.generateBarChart();
  }
  graphright(){
    this.disableArrow = !this.disableArrow;
    this.barChartLabels = this.weeklabelData.slice();
    this.weekwisedata = this.weekpercent.slice();
    this.barChartLabels.splice(0,8);
    this.weekwisedata.splice(0,8);
    this.generateBarChart();
  }
}
