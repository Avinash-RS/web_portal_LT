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
  constructor() { 

  }

  ngOnInit() {

  }
}
