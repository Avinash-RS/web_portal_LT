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
  public doughnutChartLabels: Label = ['InProgress'];
  chartData: ChartDataSets[] = [
    {
      data: [43 ,43,43],
      backgroundColor: [
        'rgba(231, 76, 60, 1)',
        'rgba(255, 164, 46, 1)',
        'rgba(46, 204, 113, 1)'
      ],
      borderColor: [
        'rgba(255, 255, 255 ,1)',
        'rgba(255, 255, 255 ,1)',
        'rgba(255, 255, 255 ,1)'
      ],
     
      borderWidth: 5,
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
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 80,
    }
  SelfDuration = [
    {
      Week : '1',
      Percentage : '64',
      WeeklyScore: '15',
      isActive:true,
      duration : {
        estimated:"00:60:00",
        spent:"00:50:00"
      },
      topics :{
          total:"75",
          completed:"50"
      }
    },
    {
      Week : '2',
      Percentage : '51',
      WeeklyScore: '09',
      isActive:false,
      duration : {
        estimated:"00:50:00",
        spent:"00:40:00"
      },
      topics :{
          total:"65",
          completed:"40"
      }
    },
    {
      Week : '3',
      Percentage : '61',
      WeeklyScore: '16',
      isActive:false,
      duration : {
        estimated:"00:40:00",
        spent:"00:30:00"
      },
      topics :{
          total:"55",
          completed:"30"
      }
    },
    {
      Week : '4',
      Percentage : '48',
      WeeklyScore: '12',
      isActive:false,
      duration : {
        estimated:"00:30:00",
        spent:"00:20:00"
      },
      topics :{
          total:"44",
          completed:"20"
      }
    }
  ]  
  
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
     this.showreport = true;
    }else{
      this.showreport = false;
      this.noDataCard = true;
    }
    })
    
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
