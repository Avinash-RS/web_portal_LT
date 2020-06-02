import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  chart: any;
  report_data;
  total_count;

  constructor(public route: Router, private gs: GlobalServiceService, ) {
    localStorage.setItem('role', 'admin');
    this.gs.checkLogout();
    this.report_data = this.route.getCurrentNavigation().extras.state.type;
    // && this.route.getCurrentNavigation().extras.state.detail
    if (this.report_data) {
      this.total_count = parseInt(this.report_data.duplicate_count) +
      parseInt(this.report_data.failure_count) + parseInt(this.report_data.success_count);
    } else {
    this.route.navigate(['/Admin/auth/userManagement']);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.drawChart();
    }, 1000);
  }

  drawChart() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Successfully uploaded', 'Email format is incorrect', 'Already Exists'],
        datasets: [
          {
            data: [parseInt(this.report_data.success_count), parseInt(this.report_data.failure_count), parseInt(this.report_data.duplicate_count)],
            backgroundColor: ['#008000', '#ff0000', '#ffa500'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          position: 'right',
          // maxWidth: 100,
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }
  downloadDoc(url) {
    window.location.href = url;
  }
}
