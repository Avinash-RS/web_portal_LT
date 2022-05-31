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
  public barChartLabels: Label[];
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
  legends = [];
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
  liveclassroomLegend:any = [];
  defaultColDef = {
    resizable: false,
    floatingFilter: false,
    enableColResize: false,
    sortable: false,
    lockPosition: true,
    suppressMenu: true,
    unSortIcon: true,
  };
  cols = [
    { headerName: 'Day', field: 'Day', width: 100, 
    cellRenderer: (params) => { 
        return params.rowIndex + 1;
    }
  },
    { headerName: 'Topic Name', field: 'topicname', minWidth: 200, width: 200},
    { headerName: 'Date', field: 'startdate', minWidth: 100, width: 100},
    { headerName: 'Attendance', field: 'Attendance', minWidth: 150, width: 150, cellClass:'statusClass',
    cellRenderer: (params) => {
      console.log(params?.data);
      if (params?.data?.attendencedetails?.Attendence === 'Yes') {
        return `<div class="statusBtn present">
                  <em class="lxp-Completion"></em> <div>Present</div>
        </div>`;
      } else {
        return `<div class="statusBtn absent">
                  <em class="lxp-Completion"></em>  <div>Absent</div>
                </div>`;
      } 
    }},
  ];
  gridApi: any;
  rowData: any;
  showProgReport:boolean = false;
  liveClassroomData:any;
  selfLearnLegends:any = [];
  constructor(private http: HttpClient,private service:LearnerServicesService) { }

  ngOnInit(): void {
    this.getSelflearningData();
    this.getLiveClassroomData();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getSelflearningData(){
    this.service.selflearning_report('191654248878434','mls2eg').subscribe((result:any)=>{
      this.showProgReport = true;
      if(result?.data?.selflearning_report?.success) {
        this.selfLearningData = result?.data?.selflearning_report?.data;
        if(this.selfLearningData.progressionChart.length > 0) {
          var bardata = [];
          var barlabel = []
          var randomColor = [];
          this.selfLearnLegends = [];
          this.selfLearningData.progressionChart.forEach(element => {
            const color = '#' + Math.floor(Math.random()*16777215).toString(16);
            bardata.push(element.course_percentage);
            barlabel.push(element.course_name);
            randomColor.push(color);
            this.selfLearnLegends.push({label:element?.course_name,color: color})
          });
        }
        this.barChartLabels = barlabel;
        this.barChartDataSet = [
          {
            data: bardata,
            backgroundColor: randomColor,
            hoverBackgroundColor: randomColor,
            barThickness: 35,
          }
        ];
      }
    });
  }
  getLiveClassroomData(){
    this.service.overallActivityAttendance('191654248878434','mls2eg').subscribe((result:any)=>{ 
      if(result?.data?.overallActivityAttendance?.success) {
        this.liveClassroomData = result?.data?.overallActivityAttendance?.data[0];
        this.pieChartDataSet = [
          {
            data: [
              this.liveClassroomData?.attendanceGraph?.allSessionCount,
              this.liveClassroomData?.attendanceGraph?.allPresentCount,
              this.liveClassroomData?.attendanceGraph?.allSessionCount - this.liveClassroomData?.attendanceGraph?.allPresentCount
            ],
            backgroundColor: ['#607D8B','#49AE31','#FEA800'],
          }
        ];
        this.liveclassroomLegend = [
          {label:'Total Sessions',count:this.liveClassroomData?.attendanceGraph?.allSessionCount,color:'#607D8B'},
          {label:'Attended Sessions',count:this.liveClassroomData?.attendanceGraph?.allPresentCount,color:'#49AE31'},
          {label:'Absent Sessions',count:this.liveClassroomData?.attendanceGraph?.allSessionCount - this.liveClassroomData?.attendanceGraph?.allPresentCount,color:'#FEA800'}
        ];
        
      }
    });
  }
  rowSpan(params: RowSpanParams) {
    if (params.data.remarks === 'Regular, very punctual to classes and silent listener & performer. Response to questions regularly (mostly via IM Messages). She is new to Java Programming but understands the concepts easily. Need to be more interactive by asking questions/doubts') {
      return 3;
    }
  }
  secondsTimeConverter(secs) {
    if (isNaN(secs)) {
      return '-- : -- : --';
    } else {
      return new Date(secs * 1000).toISOString().substr(11, 8);
    }
  }
  handleOpened(moduleItem) {
    moduleItem.isOpened = true;
  }
  handleClosed(moduleItem) {
    moduleItem.isOpened = false;
  }
}
