import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
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
              "week": "3",
              "topicCount": {
                  "total": 10,
                  "completed": 8
              },
              "knowledgeCount": {
                  "total": 10,
                  "completed": 8
              },
              "totalDuration": 5,
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
                          "totalQuestion": 0,
                          "correctAns": 0,
                          "incorrect": 0
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

  selectedIndex: number = 0;
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
  currentTab: any;
  UserDetails: any;
  userId: any;
  courseid: any;
  pagination = true;
  emptyAssignment = false;
  page = 0;
  noofItems = 6;
  assignmentContent: any;
  constructor(
    public learnerService: LearnerServicesService, 
    private gs: GlobalServiceService, 
    public CommonServices: CommonServicesService) { }

  ngOnInit() {
    setTimeout(() => {
      this.createChart();
      this.createBarChart();
    },1000);

    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userId = this.UserDetails.user_id;
    this.courseid = localStorage.getItem('Courseid');
    this.getAssignmentmoduleData();
  }

  tabChanged(event) {
    this.currentTab = event.index;
    if (this.currentTab == 0) {
      this.getAssignmentmoduleData();
    } 
    else if (this.currentTab == 1) {
      this.getprojectActivityData();
    } 
    else if (this.currentTab == 2) {
      this.getperformActivityData();
    }
  }

  //Assignment Module
  getAssignmentmoduleData() {
    this.learnerService.getAssignmentmoduleData(this.userId, this.courseid, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      console.log(data, 'Assignment Module')
      if (data.data.getAssignmentmoduleData.success) {
        this.assignmentContent = data?.data?.getAssignmentmoduleData?.data;
        if (this.assignmentContent == null) {
          this.emptyAssignment = true;
        } else {
          this.emptyAssignment = false
        }
      }
    })
  }
  
  getWeekNumber(week) {
    if (week < 10) {
      return 0 + '' + week;
    } 
    return week;
  }
  //Project Module
  getprojectActivityData() {
    this.learnerService.getprojectActivityData(this.userId, this.courseid, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      console.log(data, 'Project Module');
    })
  }
  
  //Perform Module
  getperformActivityData() {
    this.learnerService.getperformActivityData(this.userId, this.courseid, this.pagination, this.page, this.noofItems).subscribe((data: any) => {
      console.log(data, 'Perform Module');
    })
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
