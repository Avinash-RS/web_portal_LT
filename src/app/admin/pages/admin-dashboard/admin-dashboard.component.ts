import { Component, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';
import { from } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('lineChart', {}) private chartRef;
  chart : any;
  month = [];
  price = [];
  days= [];
  public isCollapsed = false;
  constructor() {
    this.days = [{
      id: 1, name: 'Last 7 days'},
      {id: 2, name: 'Last 14 days'},
  ]
   }
  

  ngOnInit() {

    this.month = ['1st may 20', '2st may 20', '3st may 20', '4st may 20', '5st may 20', '6st may 20', '7st may 20'];
    this.price = [0,50,100,150,200,250,300,350];
    this.chart = new Chart(this.chartRef.nativeElement,{
    type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              borderColor: '#a38bf6',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
        });
  }

}
