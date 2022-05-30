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

  behavioural = [
    {label:'THOUGHT FACTOR',img:'https://assets.lntedutech.com/application_images/thoughtfactor.webp',description:'Constitutes a group of behavioural competencies that focuses on Cognitive factors like Detail Orientation, Critical thinking and Creative thinking.',stenscore:[
      {label:"Detail-Oriented",color:'#CBD613'},
      {label:"Critical Thinking",color:'#95C330'},
      {label:"Creative Thinking",color:'#687C3C'},
    ]},
    {label:'INTERPERSONAL',img:'https://assets.lntedutech.com/application_images/interpersonal.webp',description:'Constitutes a group of behavioural competencies that focuses on Cognitive factors like Detail Orientation, Critical thinking and Creative thinking.',stenscore:[
      {label:"Communication",color:'#FCC537'},
      {label:"Positive Attitude",color:'#F59840'},
      {label:"Teamwork",color:'#E5763E'},
    ]},
    {label:'CORE/PERSONAL',img:'https://assets.lntedutech.com/application_images/core.webp',description:'Constitutes a group of behavioural competencies that focuses on Cognitive factors like Detail Orientation, Critical thinking and Creative thinking.',stenscore:[
      {label:"Self-Reliant",color:'#5DB2DF'},
      {label:"Growth Mindset",color:'#5783BE'},
      {label:"Receptiveness",color:'#5461A7'},
    ]},
    {label:'EMOTION',img:'https://assets.lntedutech.com/application_images/emotion.webp',description:'Constitutes a group of behavioural competencies that focuses on Cognitive factors like Detail Orientation, Critical thinking and Creative thinking.',stenscore:[
      {label:"Adaptability",color:'#E5A3F5'},
      {label:"Anxiety Manage",color:'#CA63E3'},
      {label:"Self-Awareness",color:'#A63BC0'},
    ]}
  ]
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openBenchmarkInfo(template:TemplateRef<any>){
    this.dialog.open(template,{
      width: "360px",
      height: "690px",
      position: { right: "0px", bottom: "0px"},
      panelClass: "filter-modal-box",
    })
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
