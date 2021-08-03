import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs';

declare const Chart;

@Component({
  selector: 'app-progression-report',
  templateUrl: './progression-report.component.html',
  styleUrls: ['./progression-report.component.scss']
})
export class ProgressionReportComponent implements OnInit {
  @ViewChild('firstPaginator') firstPaginator: MatPaginator;
  @ViewChild('secondPaginator') secondPaginator: MatPaginator;
  @ViewChild('thirdPaginator') thirdPaginator: MatPaginator;
  assignmentPage: Observable<any>;
  performPage: Observable<any>;
  projectPage: Observable<any>;
  mode = 'determinate';
  bufferValue = 100;

  apidata: any = [];

  selectedIndex: number = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    elements:
    {
      point:
      {
        radius: 1,
        hitRadius: 5,
        hoverRadius: 10,
        hoverBorderWidth: 2
      }
    }
  };
  public barChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public pieChartOption: any = {
    legend: {
      // position: 'right',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    }
  }

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#2280C1',
      barThickness: 16,
    }
  ];
  currentTab: any;
  UserDetails: any;
  userId: any;
  courseId: any;
  courseName: any;
  pagination = false;
  emptyAssignment = false;
  emptyProject = false;
  emptyPerform = false;
  page = 0;
  noofItems = 0;
  assignmentContent: any;
  showSkeleton = false;
  showProgReport: boolean = false;
  projectContent: any;
  performContent: any;
  performContentData: any;
  pieData: any;
  doughnutChartData;
  isTableData: boolean;
  constructor(
    public learnerService: LearnerServicesService,
    private gs: GlobalServiceService,
    public CommonServices: CommonServicesService,
    public route: Router,private activeRoute: ActivatedRoute) {
    // const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().query &&
    //   this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.activeRoute.queryParams.subscribe(res => {
      if(res){
        this.courseId = atob(res.CourseId)
        this.courseName = atob(res.CourseName)        
      }
    });
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userId = this.UserDetails.user_id;
  }

  ngOnInit() {
    this.getprogression();
    this.getAssignmentmoduleData();
    this.getPieChartData()
    this.getDoughnutChartData();
  }

  getPieChartData(){

    //activity chart data
    let defaultData = {
              "assignment_total": 0,
              "assignment_completed": 0,
              "project_total": 0,
              "project_completed": 0,
              "perform_total": 0,
              "perform_completed": 0,
              "liveclassroom_total": 0,
              "liveclassroom_completed": 0
            };
    this.pieData = defaultData;
    this.learnerService.getProgressionActivitydata(this.userId, this.courseId).subscribe((data:any)=>{
      if(data?.data?.getProgressionActivitydata?.success){
     this.pieData = data.data.getProgressionActivitydata.data[0]
      }
    })
  }

  tabChanged(event) {
    this.currentTab = event.index;
    if (this.currentTab == 0) {
      this.getAssignmentmoduleData();
    }
    else if (this.currentTab == 1) {
      this.getprojectActivityData();
    }
    else if (this.currentTab == 2) {
      this.getperformActivityData();
    }
  }
  //Assignment Module
  getAssignmentmoduleData() {
    this.showSkeleton = true;
    this.learnerService.getAssignmentmoduleData(this.userId, this.courseId, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getAssignmentmoduleData.success) {
        this.assignmentContent = new MatTableDataSource(data?.data?.getAssignmentmoduleData?.data);
        setTimeout(()=>{
          this.assignmentContent.paginator = this.firstPaginator;
          this.assignmentPage = this.assignmentContent.connect();
        },1000)
        if (this.assignmentContent?.data?.length > 0) {
          this.emptyAssignment = false;
        } else {
          this.emptyAssignment = true
        }
      }
      this.showSkeleton = false;
    })
  }

  //Project Module
  getprojectActivityData() {
    this.showSkeleton = true;
    this.learnerService.getprojectActivityData(this.userId, this.courseId, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getprojectActivityData.success) {
        this.projectContent = new MatTableDataSource(data?.data?.getprojectActivityData?.data);
        setTimeout(()=>{
          this.projectContent.paginator = this.secondPaginator;
          this.projectPage = this.projectContent.connect();
        },1000)
        if (this.projectContent?.data?.length > 0) {
          this.emptyProject = false;
        } else {
          this.emptyProject = true
        }
      } else {
        this.emptyProject = true;
      }
      this.showSkeleton = false;
    })
  }

  //Perform Module
  getperformActivityData() {
    this.showSkeleton = true;
    this.learnerService.getperformActivityData(this.userId, this.courseId, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getperformActivityData.success) {
        this.performContent = data?.data?.getperformActivityData?.data;
        var performIteration = [];
        this.performContent.forEach((value)=>{
          value.performActivity.iterationDetails.forEach(element => {
            element.activityenddate = value.performActivity.activityenddate
            element.activityname = value.performActivity.activityname
            element.module_id = value.performActivity.module_id
            element.topic_id = value.performActivity.topic_id
          });
          performIteration.push(...value.performActivity.iterationDetails)
        })
        this.performContentData = new MatTableDataSource(performIteration)
        setTimeout(()=>{
          this.performContentData.paginator = this.thirdPaginator;
          this.performPage = this.performContentData.connect();
        },1000)
        if (this.performContentData?.data.length > 0) {
          this.emptyPerform = false;
        } else {
          this.emptyPerform = true;
        }
      } else{
        this.emptyPerform = true;
      }

      this.showSkeleton = false;
    })
  }

  numPrefix(num) {
    if (num < 10) {
      return 0 + '' + num;
    }
    return num;
  }
  secondsTimeConverter(secs){
    if(isNaN(secs)){
      return '-- : -- : --';
    }
    else{
      return new Date(secs * 1000).toISOString().substr(11, 8);
    }
  }
  percentageCalc(score, total){
    return (score/total)*100
  }
  //get progression table data
  getprogression() {
    this.showProgReport = false
    this.learnerService.getProgressionData(this.userId, this.courseId).subscribe((data: any) => {
      this.apidata = data.data.getCourseReportByUserid.data.module;
      this.isTableData = data.data.getCourseReportByUserid.success;
      this.showProgReport = true;
    });

  }

  getWeekNumber(week) {
    if (week < 10) {
      return 0 + '' + week;
    }
    return week;
  }

  getDoughnutChartData(){
    this.learnerService.getSelfLearningdata('topic',this.userId, this.courseId).subscribe((data:any)=>{
      console.log(data)
      if(data?.data?.selfLearningdatabyUserId?.success) {
        this.doughnutChartData = data?.data?.selfLearningdatabyUserId.data[0];
        setTimeout(()=>{
          this.createChart();
        })
      }
    })

  }
  createChart() {
    let data_load  = [];
    let data_labels = [];
    let data_colors = [];
    if(this.doughnutChartData.completed){
      data_load.push(this.doughnutChartData.completed);
      data_labels.push('Completed');
      data_colors.push('#32CE6A');
    }
    if(this.doughnutChartData.inprogress){
      data_load.push(this.doughnutChartData.inprogress);
      data_labels.push('Inprogress');
      data_colors.push('#FFA800')
    }
    if(this.doughnutChartData.yettostart){
      data_load.push(this.doughnutChartData.yettostart);
      data_labels.push('Yet to start');
      data_colors.push('#CCCCCC');
    }
    if(this.doughnutChartData.completed==0 && this.doughnutChartData.inprogress==0 && this.doughnutChartData.yettostart==0){
      data_load.push(100);
      data_labels.push('Yet to start');
      data_colors.push('#CCCCCC');
    }
    new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: data_labels,
        datasets: [{
          data: data_load,
          backgroundColor: data_colors,
        }]
      },
      options: {
        cutoutPercentage: 60,
        elements: {
          center: {
            text: 'Self Learning',
            color: '#5b646f',
          }
        },
        legend: {
          display: true,
          position: 'bottom',

        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          filler: {
            propagate: false
          },
          labels: {
            render: 'percentage',
            fontColor: ['green', 'white', 'red'],
            precision: 2
          },
          datalabels: {
            formatter: (value, ctx) => {
              // let sum = 0;
              // let dataArr = ctx.chart.data.datasets[0].data;
              // dataArr.map(data => {
              //     sum += data;
              // });
              // let percentage = (value*100 / sum)+"%";
              let percentage = value + "%";
              return percentage;
          },

          }

        },
        title: {
          display: true,
          text: ''
        },tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
      }
      }
    });
  }

  createBarChart() {
    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: ['#03C88D'],
        }]
      },
      options: {

      }
    });
  }

}
