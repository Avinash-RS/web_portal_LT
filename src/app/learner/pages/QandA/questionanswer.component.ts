import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AngularEditorConfig } from "@kolkov/angular-editor";
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
    placeholder: 'Enter text here...',
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
  constructor(private dialog: MatDialog) { 

  }

  ngOnInit() {
  }
  
  // make sure to destory the editor
  ngOnDestroy(): void {
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
