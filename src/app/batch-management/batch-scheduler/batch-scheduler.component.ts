import { Component, OnInit,ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-batch-scheduler',
  templateUrl: './batch-scheduler.component.html',
  styleUrls: ['./batch-scheduler.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BatchSchedulerComponent implements OnInit {
  dataSource;

  courseColumnsToDisplay = ['course_name', 'module_count','action'];
  ModuleColumnsToDisplay = ['module_name','topic_count' ];
  expandedElement;
  CourseModule = [
    {
      "course_name": "self reading & pre-reading skills",
      "course_details": [
        {
          "module_name": "How to read a paragraph",
          "topic_details": [
            {
              "topic_name": "Topic 1",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "lecture",
              "activity_name": "teaching",
              "Digital_resourse": "1",
              "score": "20"
            },
            {
              "topic_name": "Topic 2",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "VILT",
              "activity_name": "teaching",
              "Digital_resourse": "5",
              "score": "50"
            }
          ]
        },
        {
          "module_name": "How to read a pdf",
          "topic_details": [
            {
              "topic_name": "Topic 3",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "lecture",
              "activity_name": "teaching",
              "Digital_resourse": "1",
              "score": "20"
            },
            {
              "topic_name": "Topic 4",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "VILT",
              "activity_name": "teaching",
              "Digital_resourse": "5",
              "score": "50"
            }
          ]
        }
      ]
    },
    {
      "course_name": "Data structures",
      "course_details": [
        {
          "module_name": "How to read a paragraph",
          "topic_details": [
            {
              "topic_name": "Topic 1",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "lecture",
              "activity_name": "teaching",
              "Digital_resourse": "1",
              "score": "20"
            },
            {
              "topic_name": "Topic 2",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "VILT",
              "activity_name": "teaching",
              "Digital_resourse": "5",
              "score": "50"
            }
          ]
        },
        {
          "module_name": "How to read a pdf",
          "topic_details": [
            {
              "topic_name": "Topic 3",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "lecture",
              "activity_name": "teaching",
              "Digital_resourse": "1",
              "score": "20"
            },
            {
              "topic_name": "Topic 4",
              "start_date": "20/20/20",
              "end_date": "20/20/20",
              "activity_type": "VILT",
              "activity_name": "teaching",
              "Digital_resourse": "5",
              "score": "50"
            }
          ]
        }
      ]
    }
  ]
 
  constructor() { }

  ngOnInit() {
    this.dataSource = this.CourseModule;
    // this.dataSource = new MatTableDataSource(this.CourseModule);
  }

}
