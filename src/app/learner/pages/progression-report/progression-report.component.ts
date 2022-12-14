import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';
declare const Chart;
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-progression-report',
  templateUrl: './progression-report.component.html',
  styleUrls: ['./progression-report.component.scss'],
  providers : [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
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
  showWeek = true;
  public chartPlugins = [pluginDataLabels];
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      displayColors: false,
      callbacks: {
        label(tooltipItem, data) {
          return  data['datasets'][0]['data'][tooltipItem['index']]['mins'] + ' mins';
        }
      }
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        gridLines: {
          borderDash: [1, 3],
          color: '#2280C1'
        },
        ticks: {
          min: 0,
          // max: 180,
          stepSize: 1,
          callback(value) {
            return value + '  ';
          }
        }
      }],
    },
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
  public barChartLabels: Label[] = [];
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
  };
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: '#2280C1',
      hoverBackgroundColor: '#2280C1',
      barThickness: 12,
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
  weekWiseChartDatalabel: any = [];
  weekWiseChartData: any = [];
  totalhoursSpend: string = '0 mins';
  weekWiseDate;
  today = new Date();
  pipe = new DatePipe('en-US');
  fromPage: any;
  contentHide = false;
  constructor(
    public learnerService: LearnerServicesService,
    private gs: GlobalServiceService,
    public CommonServices: CommonServicesService,
    public route: Router, private activeRoute: ActivatedRoute,
    public translate: TranslateService) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    // const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().query &&
    //   this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.activeRoute.queryParams.subscribe(res => {
      if (res) {
        this.courseId = atob(res.CourseId);
        this.courseName = atob(res.CourseName);
        this.fromPage = res.fromPage;
      }
    });
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (this.UserDetails.userOrigin == 'microLearn' || this.UserDetails.userOrigin == 'learner') {
      this.contentHide = true;
    } else {
      this.contentHide = false;
    }
    this.userId = this.UserDetails.user_id;
  }

  ngOnInit() {
    this.getprogression();
    this.getAssignmentmoduleData();
    this.getPieChartData();
    this.getDoughnutChartData();
    this.setStartdate();
    this.getWeekCourseData();
  }
  setStartdate() {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const firstday = new Date(curr.setDate(first)).toUTCString();
    this.weekWiseDate = new Date(firstday);
  }
  backbutton() {
    if (this.fromPage === 'mycourse') {
      this.route.navigate(['/Landing/MyCourse']);
    } else {
      this.route.navigate(['/Landing/Microcourses']);
    }
  }
  getWeekCourseData() {
    this.weekWiseChartDatalabel = [];
    this.weekWiseChartData = [];
    const myFormattedDate = moment(this.weekWiseDate).format('yyyy-MM-DD');
    this.learnerService.getweekWiseCourseChart(this.courseId, this.userId, myFormattedDate, '').subscribe((result: any) => {
      if (result.data.weekWiseCourseChart.success) {
        this.totalhoursSpend = result.data.weekWiseCourseChart.data.totalhoursSpend;
        result.data.weekWiseCourseChart.data.chartdata.forEach((data: any) => {
          this.weekWiseChartDatalabel.push(data.day);
          // tslint:disable-next-line: radix
          this.weekWiseChartData.push({y: parseInt(data.minutes) / 60, mins: data.minutes});
        });
        this.generateWeekwiseChart();
      } else {
        this.weekWiseChartDatalabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.weekWiseChartData = [0, 0, 0, 0, 0, 0, 0, 0];
        this.generateWeekwiseChart();
      }
    });
  }
  changeWeekDate() {
    this.getWeekCourseData();
  }
  generateWeekwiseChart() {
    this.barChartLabels = this.weekWiseChartDatalabel;
    this.barChartData = [
      {
        data: this.weekWiseChartData,
        backgroundColor: '#2280C1',
        hoverBackgroundColor: '#2280C1',
        barThickness: 12,
      }
    ];
  }
  getPieChartData() {

    // activity chart data
    const defaultData = {
              ' assignment_total ': 0,
              ' assignment_completed ': 0,
              ' project_total ': 0,
              ' project_completed ': 0,
              ' perform_total ': 0,
              ' perform_completed ': 0,
              ' liveclassroom_total ': 0,
              ' liveclassroom_completed ': 0
            };
    this.pieData = defaultData;
    this.learnerService.getProgressionActivitydata(this.userId, this.courseId).subscribe((data: any) => {
      if (data?.data?.getProgressionActivitydata?.success) {
     this.pieData = data.data.getProgressionActivitydata.data[0];
      }
    });
  }

  tabChanged(event) {
    this.currentTab = event.index;
    if (this.currentTab === 0) {
      this.getAssignmentmoduleData();
    } else if (this.currentTab === 1) {
      this.getprojectActivityData();
    } else if (this.currentTab === 2) {
      this.getperformActivityData();
    }
  }
  // Assignment Module
  getAssignmentmoduleData() {
    this.showSkeleton = true;
    this.learnerService.getAssignmentmoduleData(this.userId, this.courseId, this.pagination,
      this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getAssignmentmoduleData.success) {
        this.assignmentContent = new MatTableDataSource(data?.data?.getAssignmentmoduleData?.data);
        setTimeout(() => {
          this.assignmentContent.paginator = this.firstPaginator;
          this.assignmentPage = this.assignmentContent.connect();
        }, 1000);
        if (this.assignmentContent?.data?.length > 0) {
          this.emptyAssignment = false;
        } else {
          this.emptyAssignment = true;
        }
      }
      this.showSkeleton = false;
    });
  }

  // Project Module
  getprojectActivityData() {
    this.showSkeleton = true;
    this.learnerService.getprojectActivityData(this.userId, this.courseId, this.pagination,
      this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getprojectActivityData.success) {
        this.projectContent = new MatTableDataSource(data?.data?.getprojectActivityData?.data);
        setTimeout(() => {
          this.projectContent.paginator = this.secondPaginator;
          this.projectPage = this.projectContent.connect();
        }, 1000);
        if (this.projectContent?.data?.length > 0) {
          this.emptyProject = false;
        } else {
          this.emptyProject = true;
        }
      } else {
        this.emptyProject = true;
      }
      this.showSkeleton = false;
    });
  }

  // Perform Module
  getperformActivityData() {
    this.showSkeleton = true;
    this.learnerService.getperformActivityData(this.userId, this.courseId, this.pagination,
      this.page, this.noofItems).subscribe((data: any) => {
      if (data.data.getperformActivityData.success) {
        this.performContent = data?.data?.getperformActivityData?.data;
        const performIteration = [];
        this.performContent.forEach((value) => {
          value.performActivity.iterationDetails.forEach(element => {
            element.activityenddate = value.performActivity.activityenddate;
            element.activityname = value.performActivity.activityname;
            element.module_id = value.performActivity.module_id;
            element.topic_id = value.performActivity.topic_id;
          });
          performIteration.push(...value.performActivity.iterationDetails);
        });
        this.performContentData = new MatTableDataSource(performIteration);
        setTimeout(() => {
          this.performContentData.paginator = this.thirdPaginator;
          this.performPage = this.performContentData.connect();
        }, 1000);
        if (this.performContentData?.data.length > 0) {
          this.emptyPerform = false;
        } else {
          this.emptyPerform = true;
        }
      } else {
        this.emptyPerform = true;
      }

      this.showSkeleton = false;
    });
  }

  numPrefix(num) {
    if (num < 10) {
      return 0 + '' + num;
    }
    return num;
  }
  secondsTimeConverter(secs) {
    if (isNaN(secs)) {
      return '-- : -- : --';
    } else {
      return new Date(secs * 1000).toISOString().substr(11, 8);
    }
  }
  percentageCalc(score, total) {
    return (score / total) * 100;
  }
  // get progression table data
  getprogression() {
    this.showProgReport = false;
    this.learnerService.getProgressionData(this.userId, this.courseId).subscribe((data: any) => {
      this.apidata = data.data.getCourseReportByUserid.data.module;
      if (this.UserDetails?.org_type === 'Corporate') {
        this.apidata = this.apidata.filter(e => e.modulestatus !== 'false');
      }
      if (this.apidata && this.apidata[0]?.moduleName) {
        this.showWeek = false;
      } else {
        this.showWeek = true;
      }
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

  getDoughnutChartData() {
    this.learnerService.getSelfLearningdata('topic', this.userId, this.courseId).subscribe((data: any) => {
      if (data?.data?.selfLearningdatabyUserId?.success) {
        this.doughnutChartData = data?.data?.selfLearningdatabyUserId.data[0];
        setTimeout(() => {
          this.createChart();
        });
      }
    });

  }
  createChart() {
    const data_load  = [];
    const data_labels = [];
    const data_colors = [];
    if (this.doughnutChartData.completed) {
      data_load.push(this.doughnutChartData.completed);
      data_labels.push('Completed');
      data_colors.push('#32CE6A');
    }
    if (this.doughnutChartData.inprogress) {
      data_load.push(this.doughnutChartData.inprogress);
      data_labels.push('Inprogress');
      data_colors.push('#FFA800');
    }
    if (this.doughnutChartData.yettostart) {
      data_load.push(this.doughnutChartData.yettostart);
      data_labels.push('Yet to start');
      data_colors.push('#CCCCCC');
    }
    if (this.doughnutChartData.completed === 0 && this.doughnutChartData.inprogress === 0 && this.doughnutChartData.yettostart === 0) {
      data_load.push(100);
      data_labels.push('Yet to start');
      data_colors.push('#CCCCCC');
    }
    // tslint:disable-next-line:no-unused-expression
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
          display: false,
          position: 'bottom',
          align: 'center'

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
            // anchor: 'end',
            // align: 'end',
            font: {
              size: 12,
              weight: 'bold'
            },
            formatter: (value: string) => {
              const percentage = value + '%  ';
              return percentage;
            },
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 40
          }
        },
        title: {
          display: true,
          text: ''
        }, tooltips: {
          callbacks: {
            label(tooltipItem: { [x: string]: string | number; }, data: { [x: string]: { [x: string]: { [x: string]: string; }; }[]; }) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        }
      }
    });
  }

  handleOpened(moduleItem) {
    moduleItem.isOpened = true;
  }
  handleClosed(moduleItem) {
    moduleItem.isOpened = false;
  }
}
