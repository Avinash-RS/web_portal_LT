import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { LearnerServicesService } from "@learner/services/learner-services.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-questionanswer",
  templateUrl: "./questionanswer.component.html",
  styleUrls: ["./questionanswer.component.scss"]
})

export class QuestionanswerComponent implements OnInit {
  htmlContent = '';
  selectedIndex = 0;
  questionCount = 0;
  answerCount = 0;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Please ask your question with consice and add any other details here',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript', 'heading', 'fontName'],
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
  requestType: string = 'answered';
  pageNumber: number = 0;
  qaDataList: any;
  showSkeleton: boolean = false;
  showNumSkeleton: boolean;
  questionText: any;
  courseName: string;
  totalCount: any;
  constructor(private dialog: MatDialog, private learnerService: LearnerServicesService,private toastr: ToastrService,) {
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails'))
    this.courseId = localStorage.getItem("Courseid")
    this.courseName = localStorage.getItem("CourseName")
  }

  ngOnInit() {
    this.getQAData();
    this.getQACount()
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
  }

  contentChange() {
    this.pageNumber = 0;
    switch (this.selectedIndex) {
      case 0:
        this.requestType = 'answered'
        this.getQAData();
        break;
      case 1:
        this.requestType = 'un_answered'
        this.getQAData();
        break;
      case 2:
        this.requestType = 'all'
        this.getQAData();
        break;

      default:
        break;
    }
  }
  getQACount(){
    this.showNumSkeleton = false
    this.learnerService.getengineersForumQA_Count(this.UserDetails.user_id, this.courseId).subscribe((rdata: any) => {
      console.log(rdata)
      let qcountData = rdata.data.getengineersForumQA_Count.data.questionCount
      let acountData = rdata.data.getengineersForumQA_Count.data.anweredCount
      this.animateValue('qCount', 0, qcountData?qcountData:0, 1000)
      this.animateValue('aCount', 0,acountData?acountData:0 , 1000)
      this.showNumSkeleton = true
    })
  }
  animateValue(id, start, end, duration) {
    var obj = document.getElementById(id);
    if (start === end)
    {
      obj.innerHTML = end;
    }
    else{
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
  }
}

  getQAData() {
    this.showSkeleton = false
    this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, this.requestType, this.pageNumber).subscribe((rdata: any) => {
      this.qaDataList = rdata.data.getengineersForumData.data
      this.totalCount = rdata.data.getengineersForumData.totalcount;
      this.showSkeleton = true
    })
  }

  createQuestion(){
    if(this.htmlContent){
    this.learnerService.createEngineersForumData(this.UserDetails.user_id, this.UserDetails.full_name, this.courseId, this.htmlContent, this.courseName).subscribe((rdata: any) => {
      console.log(rdata);
      if(rdata?.errors && rdata?.errors[0]?.message==="Request failed with status code 413")
      {
        this.toastr.warning("Content limit exceeded!!")
        
      }else{
        if(rdata.data.createEngineersForumData.success){
          this.selectedIndex = 1
          this.dialogClose();
          this.toastr.success(rdata.data.createEngineersForumData.message)
        }else{
          this.toastr.warning(rdata.data.createEngineersForumData.message)
        }
      }
      this.showSkeleton = true
    })

  }else{
    this.toastr.warning("Answer cannot be empty")
  }
  }

  openQuestionDialog(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: 'resourseContainer',
      width: "50%",
      height: "90%",
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  dialogClose() {
    this.getQAData();
    this.getQACount();
    this.dialog.closeAll();
    this.htmlContent = "";
  }

  
  //Pagination
  onpagination(event){
    this.pageNumber = event - 1;
    this.getQAData();
    this.getQACount();
  }

}
