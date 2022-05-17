import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.component.html',
  styleUrls: ['./trainingreport.component.scss']
})
export class TrainingreportComponent implements OnInit {
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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
