import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-report-b2c',
  templateUrl: './assessment-report-b2c.component.html',
  styleUrls: ['./assessment-report-b2c.component.scss']
})
export class AssessmentReportB2cComponent implements OnInit {
  topicinfo: any;
  SelfDuration = [
    {
      Week : '1',
      Percentage : '64%',
      WeeklyScore: '15',
      isActive:true,
      duration : {
        estimated:"00:60:00",
        spent:"00:50:00"
      },
      topics :{
          total:"75",
          completed:"50"
      }
    },
    {
      Week : '2',
      Percentage : '51%',
      WeeklyScore: '09',
      isActive:false,
      duration : {
        estimated:"00:50:00",
        spent:"00:40:00"
      },
      topics :{
          total:"65",
          completed:"40"
      }
    },
    {
      Week : '3',
      Percentage : '61%',
      WeeklyScore: '16',
      isActive:false,
      duration : {
        estimated:"00:40:00",
        spent:"00:30:00"
      },
      topics :{
          total:"55",
          completed:"30"
      }
    },
    {
      Week : '4',
      Percentage : '48%',
      WeeklyScore: '12',
      isActive:false,
      duration : {
        estimated:"00:30:00",
        spent:"00:20:00"
      },
      topics :{
          total:"44",
          completed:"20"
      }
    }
  ]
  constructor(public route: Router) { }

  ngOnInit(): void {
    this.topicinfo = this.SelfDuration[0];
  }
  
  viewTopicDetails(item, selfDur) {
    this.topicinfo = item;
    selfDur.forEach(element => {
      if(element.Week == item.Week) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }
    })
  }

  backButton() {
    this.route.navigate(['/Landing/MyCourse']);
  }

}
