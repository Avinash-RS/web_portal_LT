import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
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
      data: [50,30,40,60,10,40,60,10],
      backgroundColor: ['#FFA800','#17B15C','#C02222','#FFA800','#17B15C','#C02222','#FFA800','#17B15C'],
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
  barLabel:Label = ['a','b','c','d','e','f','g','h'];
  points:any = [
    {color: 'good', label: '71-100% Good'},
    {color: 'avg', label: '31-70% Average'},
    {color:' poor', label: '0-30% poor'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
