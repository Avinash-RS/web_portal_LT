import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-program-report",
  templateUrl: "./program-report.component.html",
  styleUrls: ["./program-report.component.scss"]
})

export class ProgramReportComponent implements OnInit {
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
  constructor(public breakpointObserver: BreakpointObserver) { 

  }

  ngOnInit() {
    this.breakPoints();
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
