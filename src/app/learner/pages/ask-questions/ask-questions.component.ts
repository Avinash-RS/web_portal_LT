import { Component, OnInit, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GlobalServiceService } from "@core/services/handlers/global-service.service";
import { LearnerServicesService } from "@learner/services/learner-services.service";
import { ToastrService } from "ngx-toastr";
// import { NgxUiLoaderService, SPINNER } from "ngx-ui-loader";

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
  scrollselector:any=".myQuestions"
  moduleTopicData: any;
  mainTopic:any = null;
  mainModule:any = null;
  qaSortKey:any = -1;
  mainPagenumber: any=0;
  mainModuleName: any = null;
  questionTopicList = null;
  questionTopic = null;
  questionModule: any = null;
  courseName: any;
  isLoading:boolean=true;
  loadMessage:any='Loading..';
  emptyMessage:any='No Questions / Answers to display.';
  screenWidth: number;

  dateObj = new Date()
  currentDate = new Date(this.dateObj.getFullYear() + '-' + (this.dateObj.getMonth() + 1) + '-' + this.dateObj.getDate()).getTime();
  batchEndTime: any;

  constructor(private dialog: MatDialog,
    public Lservice: LearnerServicesService,
    public route: Router,
    private gs: GlobalServiceService,
    private toastr: ToastrService,
    // private ngxLoader: NgxUiLoaderService
  ) {
    this.screenWidth = window.innerWidth
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(detail)
    if (detail === undefined) {
      this.batchId = localStorage.getItem('currentBatchId');
      this.courseid = localStorage.getItem('Courseid');
      this.courseName = localStorage.getItem('CourseName');
      this.batchEndTime = localStorage.getItem('currentBatchEndDate')
    } else {
      this.batchId = detail.batch_id;
      this.batchId = detail.batch_id;
      this.courseid = detail.course_id;
      this.courseName = detail.course_name;
      this.batchEndTime = detail.batchEndTime;
    }
    this.userDetail = this.gs.checkLogout();
    
    this.getPlayerModuleTopic();
    this.getQuestionsAnswerlists()
  }

  ngOnInit() {

  }

  openQuestionInput(templateRef: TemplateRef<any>) {
    console.log(this.moduleTopicData);
    this.questionText = "";
    if(this.screenWidth>650){
      this.dialog.open(templateRef, {
        width: '60%',
        height: '80%',
        closeOnNavigation: true,
        disableClose: true,
      });
    }else{
      this.dialog.open(templateRef, {
        width: '100%',
        height: '80%',
        closeOnNavigation: true,
        disableClose: true,
      });
    }
    
  }

  getPlayerModuleTopic() {
    this.Lservice.playerModuleAndTopic(this.courseid, this.userDetail.user_id).subscribe((data: any) => {
      if(data.data?.playerModuleAndTopic?.success=== true){
        let tmpData = data.data?.playerModuleAndTopic?.message[0].childData;
        this.moduleTopicData = []
        tmpData.forEach(element => {
          this.moduleTopicData.push(... element.childData)
        });

        console.log(this.moduleTopicData)
      }
      
    });
  }

  getQuestionsAnswerlists(){
    this.isLoading = true;
    this.Lservice.getQAsortsearch(this.batchId,this.courseid,this.qaSortKey,this.mainPagenumber,this.mainModuleName,this.mainTopic)
    .subscribe((resdata:any)=>{
      this.isLoading = false;
      if(resdata.data.sortsearch.message){
        this.allQuestionList.push.apply(this.allQuestionList,resdata.data.sortsearch.message)
      }else{
        this.allQuestionList = []
      }
      
    })
  }
  onScroll(){
    this.mainPagenumber = this.mainPagenumber+1
    this.getQuestionsAnswerlists()
  }

  mainQAFilter(call){
    this.mainPagenumber=0;
    this.allQuestionList = []
    if(call==='M'){
      this.mainModuleName = this.mainModule?this.mainModule.title:null;
      this.mainTopic=null
    }
    this.getQuestionsAnswerlists()

  }

  askQAModuleSelect(){
    this.questionModule = this.questionTopicList?.title
    this.questionTopic=null
  }

  submitMyQuestion(){
    if(this.questionModule ){
    if(this.questionTopic){
    if(this.questionText.trim().length){
      // this.ngxLoader.start();
      this.Lservice.askaquestion(this.userDetail.user_id,this.courseid,this.questionModule,this.questionTopic,this.questionText).subscribe((data:any)=>{
        // console.log(data)
        this.questionText="";
        // this.ngxLoader.stop()
        if(data?.data?.askaquestion?.success){
          this.closedialogbox()
          this.toastr.success(data?.data?.askaquestion?.message)
        }else{
         // this.toastr.warning(data?.data?.bookmark?.message)
        }
      })
    }else{
      this.toastr.warning("Please enter some text")
    }
  }else{
    this.toastr.warning("Please select a topic")
  }
    }else{
      this.toastr.warning("Please select a module")
    }
  }

  closedialogbox(){
    this.questionModule = null;
    this.questionTopic = null;
    this.mainTopic=null
    this.questionTopicList=null;
    this.questionTopic=null
    this.dialog.closeAll();
  }

  goBack() {
    this.route.navigateByUrl('/Learner/MyCourse');
  }
}
