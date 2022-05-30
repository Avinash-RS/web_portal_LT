import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-benchmarkreport',
  templateUrl: './benchmarkreport.component.html',
  styleUrls: ['./benchmarkreport.component.scss']
})
export class BenchmarkreportComponent implements OnInit {
  benchmarkContent =[
    {label:'Assessment Details',description:'The Testing Skill analyses the Analytical thinking of the candidate with Flowchart, Geo Sudoko, Game Based Test and Pseudocode.'},
    {label:'Basic Concepts',description:'The IT Common pool has collection of questions with the Programming Skill, OOPs Methodology, PL/SQL, Web Applications components and the individual skill on each platform will be analyzed.'},
    {label:'Skill Assessment',description:'The Java Assessment has modules like Angular, Operators, Flow Control, Polymorphism and Inheritance.'},
  ];
  verticalChartData = [];
  competancyData = [];
  public horizontalchartoption :ChartOptions = {
    responsive: true,
    legend:{
      display:false
    },
    scales: { 
      xAxes: [{
        ticks: {
          display: false,
      },
      }],
      yAxes: [{
        ticks: {
          display: false,
      },
      gridLines: {
        display:false
      },
      }]
    },
    plugins: {
      datalabels: { 
        display:false
      }
     }
  }
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
          stepSize: 20,
          callback(value) {
            return value + '  ';
          }
        }
      }],
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  ChartLegend:boolean = false;
  public barChartDataSet: ChartDataSets[] = [
    {
      data: [50,80,64,90,70,20],
      backgroundColor: ['#C84656','#DFBD3F','#68D886','#FEC623','#68D886','#C84656'],
      hoverBackgroundColor: ['#C84656','#DFBD3F','#68D886','#FEC623','#68D886','#C84656']
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
