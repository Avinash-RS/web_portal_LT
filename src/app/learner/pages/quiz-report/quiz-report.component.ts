import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-quiz-report",
  templateUrl: "./quiz-report.component.html",
  styleUrls: ["./quiz-report.component.scss"]
})

export class QuizReportComponent implements OnInit {

  UserDetails: any;
  userId: any;
  courseId: any;
  courseName: any;
  cols = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Phone', field: 'phone' }
  ]
  rows = [
    { name: 'Saksham', age: 30, phone: 9911149966 },
    { name: 'Pyiyam', age: 36, phone: 9953005038 },
    { name: 'Nancy', age: 29, phone: 9911349966 }
  ]
  
  constructor(private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(res => {
      if(res){
        this.courseId = atob(res.CourseId)
        this.courseName = atob(res.CourseName)        
      }
    });
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userId = this.UserDetails.user_id;
  }

  ngOnInit() {
  }
}
