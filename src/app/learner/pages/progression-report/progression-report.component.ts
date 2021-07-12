import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
declare const Chart;

@Component({
  selector: 'app-progression-report',
  templateUrl: './progression-report.component.html',
  styleUrls: ['./progression-report.component.scss']
})
export class ProgressionReportComponent implements OnInit {
  mode = 'determinate';
  bufferValue = 100;

apidata = {
  "success": true,
  "message": {
      "_id": "60829e472bf07f0011139b6b",
      "module": [
          {
              "name": "Single Line Diagram",
              "week": 3,
              "topicCount": {
                  "total": 10,
                  "completed": 8
              },
              "knowledgeCount": {
                  "total": 10,
                  "completed": 8
              },
              "totalDuration": 60,
              "overAllPercentage": 100,
              "colourCode": {
                  "value": "green",
                  "enums": [
                      "green",
                      "orange",
                      "grey"
                  ]
              },
              "topicDetails": [
                  {
                      "id": 827570,
                      "name": "Single Line Diagram",
                      "activityDetails": {
                          "name": "activityone",
                          "totalDuration": 10,
                          "completedPercentage": 60
                      },
                      "knowledgeDetails": {
                          "name": "knowone",
                          "totalQuestion": 10,
                          "correctAns": 8,
                          "incorrect": 2
                      },
                      "status": {
                          "value": "completed",
                          "enums": [
                              "completed",
                              "inprogress",
                              "yetToStart"
                          ]
                      }
                  }
              ]
          },
          {
            "name": "Single Line Diagram",
            "week": 3,
            "topicCount": {
                "total": 10,
                "completed": 8
            },
            "knowledgeCount": {
                "total": 10,
                "completed": 8
            },
            "totalDuration": 60,
            "overAllPercentage": 60,
            "colourCode": {
                "value": "green",
                "enums": [
                    "green",
                    "orange",
                    "grey"
                ]
            },
            "topicDetails": [
                {
                    "id": 827570,
                    "name": "Single Line Diagram",
                    "activityDetails": {
                        "name": "activityone",
                        "totalDuration": 10,
                        "completedPercentage": 60
                    },
                    "knowledgeDetails": {
                        "name": "knowone",
                        "totalQuestion": 10,
                        "correctAns": 8,
                        "incorrect": 2
                    },
                    "status": {
                        "value": "completed",
                        "enums": [
                            "completed",
                            "inprogress",
                            "yetToStart"
                        ]
                    }
                }
            ]
        }
      ]
  }
};

  public barChartOptions: ChartOptions = {
    responsive: true,
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
  public barChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#2280C1',
      barThickness: 16,
    }
  ];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.createChart();
      this.createBarChart();
    }, 1000)

    
  }

  createChart() {
    new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Inprogress', 'Yet to start'],
        datasets: [{
          data: [30, 40, 30],
          backgroundColor: ['#32CE6A', '#FFA800', '#CCCCCC'],
        }]
      },
      options: {
        cutoutPercentage: 60,
        elements: {
          center: {
            text: 'Self Learning',
            color: '#5b646f',
          }
        },
        legend: {
          display: true,
          position: 'bottom',

        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          filler: {
            propagate: false
          },
          labels: {
            render: 'percentage',
            fontColor: ['green', 'white', 'red'],
            precision: 2
          }
        },
        title: {
          display: true,
          text: ''
        }
      }
    });
  }

  createBarChart() {
    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: ['#03C88D'],
        }]
      },
      options: {

      }
    });
  }

}
