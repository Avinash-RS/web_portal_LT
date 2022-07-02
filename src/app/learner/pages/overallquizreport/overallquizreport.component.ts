import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { LearnerServicesService } from "@learner/services/learner-services.service";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-overallquizreport',
  templateUrl: './overallquizreport.component.html',
  styleUrls: ['./overallquizreport.component.scss']
})
export class OverallquizreportComponent implements OnInit {
  public coursebarChartLabels: Label[] = [];
  public ChartType: ChartType = 'bar';
  public coursebarChartLegend = false;
  public ChartPlugins = [];
  public barChartDataSet: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
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
      callbacks: { 
        label:function(tooltipItem, data){
          return ""
        }
      }
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
  points:any = [
    {color: 'good', label: '71-100% Good'},
    {color: 'avg', label: '31-70% Average'},
    {color:' poor', label: '0-30% poor'}
  ];
  defaultColDef = {
    resizable: false,
    floatingFilter: false,
    enableColResize: false,
    sortable: false,
    lockPosition: true,
    suppressMenu: true,
    unSortIcon: true,
  };
  rows = [
    {quiz_name:'asasa',start_date:'02-02-2022',no_of_question:'10',correct_answer:'9',score:'90',status:'Good'},
    {quiz_name:'sdsds',start_date:'02-02-2022',no_of_question:'50',correct_answer:'5',score:'50',status:'Average'},
    {quiz_name:'sdsds',start_date:'02-02-2022',no_of_question:'20',correct_answer:'2',score:'20',status:'Poor'},
  ]
  cols = [
    { headerName: 'Quiz Topics', field: 'quiz_name', width: 230, tooltipField: 'quiz_name',
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
    { headerName: 'Date', field: 'start_date', minWidth: 90, width: 90,
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
    { headerName: 'Total Questions', field: 'no_of_question', minWidth: 85, width: 85},
    { headerName: 'No. of Correct Answers', field: 'correct_answer', minWidth: 110, width: 110},
    { headerName: 'Score', field: 'score',width: 65, minWidth: 65,
    cellRenderer: (params) => {
      if (params?.data?.score) {
        return params?.data?.score + '%';
      }
    }},
    { headerName: 'Status', field: 'status', minWidth: 60, width: 60, cellClass:'statusClass',
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
  gridApi: any;
  getuserid: any;
  secretKey = '(!@#Passcode!@#)';
  sourceData: any;
  barLabel: any;
  pageSize:number = 10;
  pageNumber:number = 1;
  startIndex:number = 0;
  endIndex:number = this.pageSize;
  totalItem:number = 0;
  toalPages:number;
  barchartData: any;
  barchartColor: any[];
  barLabelTMP: any;
  constructor(private service:LearnerServicesService) { 
    
  }

  ngOnInit(): void {
    this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.getuserid)
    const id = CryptoJS.AES.decrypt(
      this.getuserid.user_id,
      this.secretKey.trim()
    ).toString(CryptoJS.enc.Utf8);
    this.service.overallQuizReport(this.getuserid.username,"").subscribe((arg:any) =>{ 
      this.sourceData = arg.data.overallQuizReport
      this.generateQuizBarChart()
    });
    
  }

  generateQuizBarChart() {
     this.barchartData = [];
    this.barchartColor = [];
    this.barLabel = [];
    this.barLabelTMP = [];
    this.toalPages = Math.ceil(this.sourceData.bar_chart.length/this.pageSize);
    this.totalItem = this.sourceData.bar_chart.length
    if (this.sourceData.bar_chart.length > 0) {
      this.sourceData.bar_chart.forEach((element: any) => {
        this.barchartData.push(element.score_earned);
        this.barchartColor.push(element.color);
        this.barLabelTMP.push(element.quiz_name);

      });
      this.barChartDataSet = [
        {
          data: this.barchartData.slice(this.startIndex,this.endIndex),
          backgroundColor: this.barchartColor.slice(this.startIndex,this.endIndex),
          hoverBackgroundColor: this.barchartColor.slice(this.startIndex,this.endIndex),
          barThickness: 15,
        }
      ];
      this.barLabel = this.barLabelTMP.slice(this.startIndex,this.endIndex)
    }
  }

  paginate(e){
    if(e == 'prev') {
      this.pageNumber--;
    }
    else {
      this.pageNumber++;
    }
    this.startIndex = (this.pageNumber -1) * this.pageSize;
    this.endIndex = Math.min((this.startIndex + 10 ),this.totalItem);
    this.barChartDataSet = [

      {
        data: this.barchartData.slice(this.startIndex,this.endIndex),
        backgroundColor: this.barchartColor.slice(this.startIndex,this.endIndex),
        hoverBackgroundColor: this.barchartColor.slice(this.startIndex,this.endIndex),
        barThickness: 15,
      }
  
    ];
  
    this.barLabel = this.barLabelTMP.slice(this.startIndex,this.endIndex);
  
   }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // this.geTQuizData();
  }
}
