import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { LearnerServicesService } from "@learner/services/learner-services.service";
@Component({
  selector: "app-questionanswer",
  templateUrl: "./questionanswer.component.html",
  styleUrls: ["./questionanswer.component.scss"]
})

export class QuestionanswerComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Please ask your question with consice and add any other details here',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo','redo','strikeThrough','subscript','superscript','heading','fontName'],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'unlink',
        'insertVideo',
        // 'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  UserDetails: any;
  courseId: string;
  requestType: string = 'all';
  pageNumber:number = 0;
  constructor(private dialog: MatDialog, private learnerService: LearnerServicesService) { 
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails'))
    this.courseId = localStorage.getItem("Courseid")
  }

  ngOnInit() {
    this.getQAData()
  }
  
  // make sure to destory the editor
  ngOnDestroy(): void {
  }

  getQAData(){
    this.learnerService.getengineersForumData(this.UserDetails.user_id,this.courseId,this.requestType,this.pageNumber).subscribe((rdata:any)=>{
      console.log(rdata)
    })
  }

  openQuestionDialog(templateRef){
    this.dialog.open(templateRef, {
      panelClass: 'resourseContainer',
      width: "50%",
      height: "90%",
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  dialogClose(){
    this.dialog.closeAll();
  }
  
}
