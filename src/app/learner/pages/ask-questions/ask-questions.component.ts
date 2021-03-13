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
  allQuestionList = [];
  questionText: string;
  batchId: string;
  localStoCourseid: string;
  courseid: any;
  userDetail: any;
  moduleTopicData: any;
  mainTopic:any = null;
  mainModule:any = null;
  qaSortKey:any = -1;
  mainPagenumber: any=0;
  mainModuleName: any = null;
  constructor(private dialog: MatDialog,
    public Lservice: LearnerServicesService,
    public route: Router,
    private gs: GlobalServiceService,
  ) {

    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(detail)
    if (detail === undefined) {
      this.batchId = localStorage.getItem('currentBatchId');
      this.courseid = localStorage.getItem('Courseid');
    } else {
      this.batchId = detail.batch_id;
      this.courseid = detail.course_id;
    }
    this.userDetail = this.gs.checkLogout();
    
    this.getPlayerModuleTopic();
    this.getQuestionsAnswerlists()
  }

  ngOnInit() {

  }

  openQuestionInput(templateRef: TemplateRef<any>) {
    this.questionText = "";
    this.dialog.open(templateRef, {
      width: '60%',
      height: '80%',
      closeOnNavigation: true,
      //disableClose: true,
    });
  }

  getPlayerModuleTopic() {
    this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      if(data.data?.playerModuleAndTopic?.success=== true){
        this.moduleTopicData = data.data?.playerModuleAndTopic?.message[0];
        console.log(this.moduleTopicData)
      }
      
    });
  }

  getQuestionsAnswerlists(){
    this.Lservice.getQAsortsearch(this.batchId,this.courseid,this.qaSortKey,this.mainPagenumber,this.mainModuleName,this.mainTopic)
    .subscribe((resdata:any)=>{
      console.log(resdata);
      if(resdata.data.sortsearch.message){
        this.allQuestionList = resdata.data.sortsearch.message
      }else{
        this.allQuestionList = []
      }
      
    })
  }

  mainQAFilter(call){
    if(call==='M'){
      this.mainModuleName = this.mainModule?this.mainModule.title:null;
      this.mainTopic=null
    }
    this.getQuestionsAnswerlists()

  }

  goBack() {
    this.route.navigateByUrl('/Learner/MyCourse');
  }
}
