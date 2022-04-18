import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz-report',
  templateUrl: './quiz-report.component.html',
  styleUrls: ['./quiz-report.component.scss']
})

export class QuizReportComponent implements OnInit {

  UserDetails: any;
  userId: any;
  courseId: any;
  courseName: any;
  cols = [
    { headerName: 'Quiz Topics', field: 'quiz_name', width: 200,
    cellRenderer: (params) => {
      if (params?.data) {
        return `<div class="countWrapper d-flex align-items-center">
        <div class="icon"><i class="lxp-Quiz_Report"></i></div>
        <span class="count">${params?.data?.quiz_name}</span>
        </div>`;
      } else {
        return '';
      }
    }},
    { headerName: 'Date', field: 'start_date', minWidth: 150, width: 150,
    cellRenderer: (params) => {
      if (params?.data?.start_date) {
        // let result = params?.data?.start_date.substring(0, 10);
        // return moment(result).local().format('DD/MM/YY');
        return params?.data?.start_date;
      } else {
        return '';
      }
    }
  },
    { headerName: 'Total Questions', field: 'no_of_question', minWidth: 170, width: 170 },
    { headerName: 'No. of Correct Answers', field: 'correct_answer', minWidth: 200, width: 200},
    { headerName: 'Score', field: 'score', width: 100, minWidth: 100,
    cellRenderer: (params) => {
      if (params?.data?.score) {
        return params?.data?.score + '%';
      }
    }},
    { headerName: 'Status', field: 'status', minWidth: 150, width: 150,
    cellRenderer: (params) => {
      if (params?.data?.status === 'Good') {
        return `<div class="d-flex align-items-center justify-content-center statusBtn good">Good</div>`;
      } else if (params?.data?.status === 'Average') {
        return `<div class="d-flex align-items-center justify-content-center statusBtn avg">Average</div>`;
      } else {
        return `<div class="d-flex align-items-center justify-content-center statusBtn poor">Poor</div>`;
      }

    } }
  ];
  rows = [];
  barLabel: any = [];
  quizData: any = {
    bar_chart: [],
    doughnut_chart: {to_score: 0, count: 0, percent: 0},
    table_chart : []
  };
  public coursebarChartLabels: Label[] = [];
  public ChartType: ChartType = 'bar';
  public coursebarChartLegend = false;
  public ChartPlugins = [];
  public barChartDataSet: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: '#2280C1',
      barThickness: 15,
    }
  ];
  public courseChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled : true,
      displayColors: false,
      backgroundColor: 'white',
      mode: 'index',
      titleFontColor: '#c02222',
      bodyFontColor: '#49ae31',
      borderColor: '#999',
      borderWidth: 1,
      footerFontColor: '#333333',
      footerMarginTop: 8,
      footerSpacing: 8,
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        },
      //   formatter: (value, ctx) => {
      //     let percentage = value.y + "%";
      //     return percentage;
      // },
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0
    }
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false,
      },
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        gridLines: {
          borderDash: [1, 3],
          color: '#b3b3b3'
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
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
  points: any = [
    {color: 'good', label: '71-100% Good'},
    {color: 'avg', label: '31-70% Average'},
    {color: 'poor', label: '0-30% poor'}
  ];
  constructor(private activeRoute: ActivatedRoute, public learnerService: LearnerServicesService, ) {
    this.activeRoute.queryParams.subscribe(res => {
      if (res) {
        this.courseId = atob(res.CourseId);
        this.courseName = atob(res.CourseName);
      }
    });
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userId = this.UserDetails?.user_id;
  }

  ngOnInit() {
    this.geTQuizData();
  }
  geTQuizData() {
    this.learnerService.getlearnerquiz(this.UserDetails?.username ? this.UserDetails?.username : '').subscribe((result: any) => {
      if (result?.data?.getlearnerquiz?.success) {
        this.quizData =  {
          bar_chart : result?.data?.getlearnerquiz?.message?.bar_chart,
          doughnut_chart : result?.data?.getlearnerquiz?.message?.doughnut_chart,
          table_chart : result?.data?.getlearnerquiz?.message?.table_chart,
        };
        this.rows = this.quizData.table_chart;
        this.generateBarChart();
      } else {
        this.quizData =  {
          bar_chart : [],
          doughnut_chart: {to_score: 0, count: 0, percent: 0},
          table_chart: [],
        };
      }
    });
  }
  generateBarChart() {
    var barchartData = [];
    var barchartColor = [];
    this.barLabel = [];
    if (this.quizData.bar_chart.length > 0) {
      this.quizData.bar_chart.forEach((element: any) => {
        barchartData.push(element.score_earned);
        barchartColor.push(element.color);
        this.barLabel.push(element.quiz_name);

      });
      this.barChartDataSet = [
        {
          data: barchartData,
          backgroundColor: barchartColor,
          hoverBackgroundColor: barchartColor,
          barThickness: 12,
        }
      ];
    }
  }
}
