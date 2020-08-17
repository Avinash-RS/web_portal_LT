import { Component, OnInit, Input, Output } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, Label,MultiDataSet,} from 'ng2-charts';
import { ChartDataSets, ChartOptions, } from 'chart.js';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input('data') data: any;
  @Input('label') label: any;

  public lineChartData: ChartDataSets[] = [{data: [10,20], label: 'Series A' }];
  public lineChartLabels: Label[] = ['day 1'];
  public lineChartColors: Color[] = [{ borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)', }];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginDataLabels];
  public lineChartOptions: any = {responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            if (Math.floor(label) === label) {
              return label; }}, }}]},
    plugins: {
      datalabels: {
        backgroundColor: '#a28bf5',
        borderRadius: 4,
          color: 'white',
          font: {
            weight: 'bold'
          },
            datalabels: {
              align: 'end',
              anchor: 'end'
            }
      }
    }
  };
  constructor() {}

  ngOnInit() {
  //  console.log(this.data,this.label)
    // this.lineChartData = [{data: this.data, label: 'Series A' }];
    // console.log( this.lineChartData,' this.lineChartData')
    // this.lineChartLabels = [this.label]
  }

}
