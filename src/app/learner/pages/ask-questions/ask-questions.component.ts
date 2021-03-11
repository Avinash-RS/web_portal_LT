import { Component, OnInit, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-ask-questions",
  templateUrl: "./ask-questions.component.html",
  styleUrls: ["./ask-questions.component.scss"]
})

export class AskQuestionsComponent implements OnInit {
  allQuestionList = [{"filteredValue":{"question":{"que_id":6,"que":"sdfasdfasdafsadf","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":5,"que":"gokul test for 123 lakdjlf","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":4,"que":"rekost alkul  lakjldf  laidlflakl aldifan","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":3,"que":"aguliar","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":2,"que":"hello boy","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":1,"que":"hello boy","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}}]
  questionText: string;
  constructor(private dialog: MatDialog,) { 
    
  }

  ngOnInit() {

  }

  openQuestionInput(templateRef: TemplateRef<any>){
    this.questionText="";
    this.dialog.open(templateRef, {
  width: '60%',
  height: '80%',
  closeOnNavigation: true,
  //disableClose: true,
});
}

  goBack(){
    alert("going back in progress")
  }
}
