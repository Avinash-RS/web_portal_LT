import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { RowSpanParams } from 'ag-grid-community';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.scss']
})
export class TrainingreportComponent implements OnInit {
  selfLearningData;
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend:{
      display:false
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        },
        formatter: (value, ctx) => {
          let percentage = value + "%";
          return percentage;
      },
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
          stepSize: 10,
          callback(value) {
            return value + '% ';
          }
        }
      }],
    }
  };
  public barChartLabels: Label[] = ['SQL Database for Beginners', 'Learn How to Code', 'Modern Web Design ', 'Angular Crash Course', 'STEP Campus to Corporate', 'Angular Crash Course'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  ChartLegend:boolean = false;
  public barChartDataSet: ChartDataSets[] = [
    {
      data: [50,80,64,90,70,20],
      backgroundColor: ['#49AE31','#1B4E9B','#27BBEE','#BE2020','#FFCC00','#AE5FDE'],
      hoverBackgroundColor: ['#49AE31','#1B4E9B','#27BBEE','#BE2020','#FFCC00','#AE5FDE'],
      barThickness: 35,
    }
  ];
  legends = [
    {color:'#49AE31',label:'SQL Database for Beginners'},
    {color:'#1B4E9B',label:'Learn How to Code'},
    {color:'#27BBEE',label:'Modern Web Design'},
    {color:'#BE2020',label:'Angular Crash Course'},
    {color:'#FFCC00',label:'STEP Campus to Corporate'},
    {color:'#AE5FDE',label:'Angular Crash Course'},
  ];
  //pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Total Sessions','Attended Sessions','Absent Sessions'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];
  public pieChartDataSet: ChartDataSets[] = [
    {
      data: [23, 18, 5],
      backgroundColor: ['#607D8B','#49AE31','#FEA800'],
    }
  ];
  liveclassroomLegend = [
    {label:'Total Sessions',count:23,color:'#607D8B'},
    {label:'Attended Sessions',count:18,color:'#49AE31'},
    {label:'Absent Sessions',count:5,color:'#FEA800'}
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
    {Day:'1',Topic:'Dotnet Collection Asses…',Date:'02-02-2022',Attendance:'Present',remarks:'Regular, very punctual to classes and silent listener & performer. Response to questions regularly (mostly via IM Messages). She is new to Java Programming but understands the concepts easily. Need to be more interactive by asking questions/doubts'},
    {Day:'2',Topic:'Dotnet Collection Asses…',Date:'02-02-2022',Attendance:'Absent',remarks:''},
    {Day:'3',Topic:'Dotnet Collection Asses…',Date:'02-02-2022',Attendance:'Present',remarks:''},
  ]
  cols = [
    { headerName: 'Day', field: 'Day', width: 100, tooltipField: 'quiz_name',},
    { headerName: 'Topic Name', field: 'Topic', minWidth: 200, width: 200},
    { headerName: 'Date', field: 'Date', minWidth: 100, width: 100},
    { headerName: 'Attendance', field: 'Attendance', minWidth: 150, width: 150, cellClass:'statusClass',
    cellRenderer: (params) => {
      if (params?.data?.Attendance === 'Present') {
        return `<div class="statusBtn present">
                  <em class="lxp-Completion"></em> <div>Present</div>
        </div>`;
      } else {
        return `<div class="statusBtn absent">
                  <em class="lxp-Completion"></em>  <div>Absent</div>
                </div>`;
      } 

    }},
    { headerName: 'Remarks', minWidth: 200, width: 200,
    field: 'remarks',
      rowSpan: this.rowSpan,
      cellClassRules: {
        'cell-span': "value=== 'Regular, very punctual to classes and silent listener & performer. Response to questions regularly (mostly via IM Messages). She is new to Java Programming but understands the concepts easily. Need to be more interactive by asking questions/doubts'",
      },
  },
  ];
  gridApi: any;
  rowData: any;
  constructor(private http: HttpClient,private service:LearnerServicesService) { }

  ngOnInit(): void {
    console.log(this.selfLearningData);
    this.getSelflearningData();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getSelflearningData(){
    this.service.selflearning_report('191654248878434','mls2eg').subscribe((result:any)=>{
      if(result?.data?.selflearning_report?.success) {
        this.selfLearningData = result?.data?.selflearning_report?.data;
        if(this.selfLearningData.progressionChart.length > 0) {
          var bardata = [];
          var barlabel = []
          this.selfLearningData.progressionChart.forEach(element => {
            bardata.push(element.course_percentage);
            barlabel.push(element.course_name);
          });
        }
        this.barChartLabels = barlabel;
        this.barChartDataSet = [
          {
            data: bardata,
            // backgroundColor: ['#49AE31','#1B4E9B','#27BBEE','#BE2020','#FFCC00','#AE5FDE'],
            // hoverBackgroundColor: ['#49AE31','#1B4E9B','#27BBEE','#BE2020','#FFCC00','#AE5FDE'],
            barThickness: 35,
          }
        ];
      }
    });
  }
  rowSpan(params: RowSpanParams) {

    if (params.data.remarks === 'Regular, very punctual to classes and silent listener & performer. Response to questions regularly (mostly via IM Messages). She is new to Java Programming but understands the concepts easily. Need to be more interactive by asking questions/doubts') {
      return 3;
    }
  }
}
