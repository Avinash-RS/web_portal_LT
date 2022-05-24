import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-behavioral-assessment',
  templateUrl: './behavioral-assessment.component.html',
  styleUrls: ['./behavioral-assessment.component.scss']
})
export class BehavioralAssessmentComponent implements OnInit {
  benchMarkScore:any =[
    {score:'1-2',color:'red',label:'DEVELOPMENT SCOPE'},
    {score:'3-4-5',color:'green',label:'LESS INCLINED'},
    {score:'6-7-8',color:'yellow',label:'MORE INCLINED'},
    {score:'9-10',color:'orange',label:'STRENGTH'}

  ];
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openBenchmarkInfo(template:TemplateRef<any>){
    this.dialog.open(template,{
      width: "400px",
      height: "700px",
      position: { right: "0px", bottom: "0px"},
      panelClass: "filter-modal-box",
    })
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
