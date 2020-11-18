import { Component, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet, } from 'ng2-charts';
import { ChartDataSets, ChartOptions, } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-self-learner-avtivity',
  templateUrl: './self-learner-avtivity.component.html',
  styleUrls: ['./self-learner-avtivity.component.scss']
})
export class SelfLearnerAvtivityComponent implements OnInit {

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType;
  public doughnutPlugins = [pluginDataLabels];
  public doughnutColors: Color[] = [{ backgroundColor: ['#679959'] }];
  public doughnut: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',

      labels: {
        padding: 15,
        fontSize: 15,
        usePointStyle: false
      }
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold',
          size: 20,
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  // Activity status doughut Chart
  public activityLabels: Label[] = [];
  public activityData: MultiDataSet = [[]];
  public activityType = 'doughnut';
  public activityPlugins = [
    {
      beforeDraw(chart) {
        const ctx = chart.ctx;
        const txt = 'Activity status';

        // Get options from the center object in options
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'black';

        // Draw text in center
        ctx.fillText('Topic status', centerX, centerY);
      }
    }
  ];
  public activityColors: Color[] = [{ backgroundColor: ['#679B59', '#FBB439', '#CBCBCB'] }];
  public activityCount: any = {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        render: 'percentage',
        fontSize: 15,
        padding: 30,
        usePointStyle: true,
      }
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold',
          size: 20,
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  courseid: any;
  checkDetails: any;
  courseName: any;
  userDetail: any;
  boardDetails: any;
  chartData: any;
  topicData: any;

  constructor(public Lservice: LearnerServicesService, private gs: GlobalServiceService,
              public route: Router) {
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.data);
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
    this.courseid =  this.checkDetails ?  this.checkDetails.courseId : localStorage.getItem('Courseid');
    this.courseName = this.checkDetails ?  this.checkDetails.courseName : localStorage.getItem('CourseName');
  }

  ngOnInit() {
    this.doughnutChartType = 'doughnut';
    this.getBoarddetails();
  }
  goToCourse() {
    this.route.navigateByUrl('/Learner/MyCourse');
  }
  getBoarddetails() {
    this.Lservice.boarddetail(this.userDetail.user_id, this.courseid).subscribe((data: any) => {
      this.boardDetails = data.data.boarddetail.data;
      this.chartData = data.data.boarddetail.data;
      this.topicData = data.data.boarddetail.data.topicData;
      this.topicData.forEach(element => {
        const startDate = new Date(element.startDate);
        element.activityStartDate = moment(startDate).format('ll');
        const endDate = new Date(element.endDate);
        element.activityEndDate = moment(endDate).format('ll');
      });
      this.doughnutChartData = [this.boardDetails.courseProgression];
      this.activityLabels = ['Completed', 'Ongoing', 'Yet to start'];
      this.activityData = [this.chartData.completedTopicPercentage, this.chartData.onGoingTopicPercentage,
        this.chartData.yetToStartTopicPercentage];
    });
  }

}
