import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-questionanswer",
  templateUrl: "./questionanswer.component.html",
  styleUrls: ["./questionanswer.component.scss"]
})

export class QuestionanswerComponent implements OnInit {
  
  constructor(private dialog: MatDialog) { 

  }

  ngOnInit() {

  }
  openQuestionDialog(templateRef){
    this.dialog.open(templateRef, {
      panelClass: 'resourseContainer',
      width: "99%",
      height: "90%",
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  dialogClose(){
    this.dialog.closeAll();
  }
  
}
