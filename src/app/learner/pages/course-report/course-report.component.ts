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
            return value + '%'
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

  week:any = [1,2,3,4,5,6,7,8,9]

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
      this.courseReportData.selflearning.isMore = false
      this.courseReportData.queryQuestion.isMore = false
      this.courseReportData.selflearning.forEach(element => {
        // this.weeklabelData.push([element.week,'90']);
        // this.weekpercent.push(element.selflearningscore);
      });
      this.weeklabelData =[['Week 1','10'],['Week 2','20'],['Week 3','30'],['Week 4','40'],['Week 5','50'],['Week 6','60'],
      ['Week 7','70'],['Week 8','80'],['Week 9','90'],['Week 10','99.2'],['Week 11','11.2'],['Week 12','12.4'],
      ['Week 13','88'],['Week 14','66'],['Week 15','55'],['Week 16','66']];
      this.weekpercent =['10','20','30','40','50','60','70','80',
      '90','10','11','22','33','44','55','66'];

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
