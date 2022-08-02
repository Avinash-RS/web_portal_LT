import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { LearnerServicesService } from '../../services/learner-services.service';
declare const Chart;
@Component({
  selector: 'app-assessment-report-b2c',
  templateUrl: './assessment-report-b2c.component.html',
  styleUrls: ['./assessment-report-b2c.component.scss']
})
export class AssessmentReportB2cComponent implements OnInit {
  topicinfo: any;
  noDataCard:boolean = false;
  viewInfo:any;
  reportData:any;
  routerDetails: any;
  showreport:boolean = false;
  userDetail: any;
  doughnutChartData;
  public chartPlugins = [pluginDataLabels];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label = [];
  chartData: ChartDataSets[] = [
    {
      data: [60,0],
      backgroundColor: [
        "#5CB646","#848484"
      ],
      borderColor: [
        'rgba(255, 255, 255 ,1)',
        'rgba(255, 255, 255 ,1)',
        'rgba(255, 255, 255 ,1)'
      ],
     
      borderWidth: 0,
    }
  ]

  public ChartOptions : ChartOptions ={
    plugins: {

      datalabels: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    title: {
      display: false
  },
    legend:{
      display:false,
    },
    hover:{mode:null},
    // rotation: 1 * Math.PI,
    // circumference: 1 * Math.PI,
    circumference: Math.PI,
    rotation : Math.PI,
    cutoutPercentage: 90
    }
  
  constructor(public route: Router, private activeRoute: ActivatedRoute, private learnerService  : LearnerServicesService) { }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.activeRoute.queryParams.subscribe(res => {
      this.routerDetails = res
    });
    this.getCourseReport(this.routerDetails);
  };

  getCourseReport(data){
    let queryParams = {
      user_id : this.userDetail.user_id,
      course_id : atob(data.id),
      batchid : atob(data.batchId),
      batch_start_date : data.batchStartDate,
      batch_end_date : data.batchEndDate
    }
    this.learnerService.getGTULearnerCourseReport(this.userDetail.user_id,atob(data.id),atob(data.batchId),data.batchStartDate,data.batchEndDate).subscribe((result:any) => {
      if(result.data && result.data.get_GTU_assess_report && result.data.get_GTU_assess_report.success && result.data.get_GTU_assess_report.data.length){
     this.reportData = result.data['get_GTU_assess_report'].data[0];
     this.reportData.gradepoint = (this.reportData.gradepoint.toString()).padStart(2,0)
     this.topicinfo = this.reportData.module[0];
     let chartManipulation = 100 - this.reportData?.rawscore;
    //  if(chartManipulation === 0){
    //   this.chartData[0].data = [60, 0]
    //  }                               //100- 0 = 100--> 0%
     this.chartData[0].data = [60, chartManipulation] //100-100 = 0 is 100%
     this.showreport = true;
     this.noDataCard = false;
    }else{
      this.showreport = false;
      this.noDataCard = true;
    }
    })
    // this.reportData?.rawscore
    
  }


  viewTopicDetails(item) {
    this.topicinfo = item;
  }

  viewInfoIcon(item, type){
    if(type === 'weekly' && item != null){
      this.viewInfo = item;
     let totalMinutes= this.getMinuted(this.viewInfo?.selflearning?.actual_moduleduration);
     this.viewInfo.selflearning.totalDuration = totalMinutes;
     let completedMinutes= this.getMinuted(this.viewInfo?.selflearning?.completed_moduleduration);
     this.viewInfo.selflearning.completedDuration = completedMinutes;
    }
  }
  getMinuted(value:any){
    let hms = value || '00:00:00';
    let a = hms.split(':'); 
    let minutes = (+a[0]) * 60 + (+a[1]);
    return minutes
  }
  backButton() {
    this.route.navigate(['/Landing/MyCourse']);
  }
}
