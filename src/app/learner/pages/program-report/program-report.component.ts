import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { LearnerServicesService } from "@learner/services/learner-services.service";

@Component({
  selector: "app-program-report",
  templateUrl: "./program-report.component.html",
  styleUrls: ["./program-report.component.scss"]
})

export class ProgramReportComponent implements OnInit {
  UserDetails:any;
  reportList = [
    "Overall Report",
    "Benchmark Assessment",
    "Milestone Assessment",
    "Training Report",
    "Activity Report",
    "Quiz Report"
  ]
  isDesktop:Boolean = false;
  courses:any = [
    {label:"All Courses", id:"all"},
    {label:"course1", id:"course1"},
    {label:"course2", id:"course2"},
    {label:"course3", id:"course3"},
  ];
  courseValue ="all";
  selfLearningData:any;
  getuserid: any;
  constructor(public breakpointObserver: BreakpointObserver,private service:LearnerServicesService) { 

  }

  ngOnInit() {
    this.getuserid= this.UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.breakPoints();
  }

  getSelflearningData(){
    this.service.selflearning_report(this.getuserid.user_id).subscribe((result:any)=>{
      if(result?.data?.selflearning_report?.success) {
        this.selfLearningData = result?.data?.selflearning_report?.data;
      }

    });
  }
  breakPoints() {
    this.breakpointObserver.observe(['(min-width: 720px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isDesktop = true;
      }
      else {
        this.isDesktop = false;
      }
    });
  }


}
