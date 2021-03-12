import { Component, OnInit, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GlobalServiceService } from "@core/services/handlers/global-service.service";
import { LearnerServicesService } from "@learner/services/learner-services.service";

@Component({
  selector: "app-ask-questions",
  templateUrl: "./ask-questions.component.html",
  styleUrls: ["./ask-questions.component.scss"]
})

export class AskQuestionsComponent implements OnInit {
  allQuestionList = [{"filteredValue":{"question":{"que_id":6,"que":"sdfasdfasdafsadf","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":5,"que":"gokul test for 123 lakdjlf","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":4,"que":"rekost alkul  lakjldf  laidlflakl aldifan","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":3,"que":"aguliar","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":2,"que":"hello boy","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}},{"filteredValue":{"question":{"que_id":1,"que":"hello boy","ans":null,"askDate":"6th Mar, 2021","ansDate":null}}}]
  questionText: string;
  batchId: string;
  localStoCourseid: string;
  courseid: any;
  userDetail: any;
  constructor(private dialog: MatDialog,
    public Lservice: LearnerServicesService,
    public route: Router,
    private gs: GlobalServiceService,
    ) { 

      const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if(detail===undefined){
        this.batchId = localStorage.getItem('currentBatchId')
      }else{
        this.batchId = detail.batch_id
      }
      this.userDetail = this.gs.checkLogout();
      this.localStoCourseid = localStorage.getItem('Courseid');
      this.courseid = detail && detail.id || this.localStoCourseid;
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

getPlayerModuleTopic(){
  this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
    console.log(data)
  })
}

  goBack(){
    alert("going back in progress")
  }
}
