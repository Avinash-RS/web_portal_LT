import { Component, OnInit,ViewChild,ElementRef} from "@angular/core";
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
  @ViewChild('leftContainer') leftContainer: ElementRef;

  htmlContent = '';
  selectedIndex = 0;
  questionCount = 0;
  answerCount = 0;
  searchKey = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Please ask your question with concise and add any other details here',
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
  requestType: string = 'un_answered&answered';
  pageNumber: number = 0;
  qaDataList: any;
  showSkeleton: boolean = false;
  showNumSkeleton: boolean;
  questionText: any;
  courseName: string;
  totalCount: any;
  unAnsCheck: any;
  timeoutval: NodeJS.Timeout;
  filterBy : any[] =[
    { value: "un_answered&answered", viewValue: "All" },
    { value: "answered", viewValue: "Answered" },
    { value: "un_answered", viewValue: "Unanswered" },
  ];
  selectedtype = 'un_answered&answered'
  constructor(private dialog: MatDialog, private learnerService: LearnerServicesService,private toastr: ToastrService,) {
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails'))
    this.courseId = localStorage.getItem("Courseid")
    this.courseName = localStorage.getItem("CourseName")
  }

  ngOnInit() {
    this.getQAData();
    this.getQACount()
  }

  contextmenu() {
    event.preventDefault();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
  }

  contentChange() {
    this.pageNumber = 0;
    switch (this.selectedIndex) {
      // case 0:
      //   this.requestType = 'answered'
      //   this.getQACount()
      //   this.getQAData();
      //   break;
      case 0:
        this.requestType = 'un_answered&answered';
        this.selectedtype = 'un_answered&answered';
        this.getQACount()
        this.getQAData();
        break;
      case 1:
        this.requestType = 'all'
        this.getQACount()
        this.getQAData();
        break;

      default:
        break;
    }
  }
  getQACount() {
    this.showNumSkeleton = false
    this.learnerService.getengineersForumQA_Count(this.UserDetails.user_id, this.courseId).subscribe((rdata: any) => {
      let qcountData = rdata.data.getengineersForumQA_Count.data.questionCount
      let acountData = rdata.data.getengineersForumQA_Count.data.anweredCount
      this.animateValue('qCount', 0, qcountData ? qcountData : 0, 1000)
      this.animateValue('aCount', 0, acountData ? acountData : 0, 1000)
      this.showNumSkeleton = true
    })
  }
  animateValue(id, start, end, duration) {
    var obj = document.getElementById(id);
    if (start === end) {
      obj.innerHTML = end;
    }
    else {
      var range = end - start;
      var current = start;
      var increment = end > start ? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));

      var timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }

  onScrollDown() {
    this.pageNumber = this.pageNumber + 1;
    this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, this.requestType, this.pageNumber, this.searchKey).subscribe((result: any) => {
      const resultdata = result.data.getengineersForumData.data;
      this.totalCount = result.data.getengineersForumData.totalcount;
      if (resultdata.length) {
        let array: any;
        array = resultdata;
        this.qaDataList.push(...array);
      }
    });
  }
  getQAData() {
    this.showSkeleton = false
    this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, this.requestType, this.pageNumber, this.searchKey).subscribe((rdata: any) => {
      this.qaDataList = rdata.data.getengineersForumData.data
      this.totalCount = rdata.data.getengineersForumData.totalcount;
      if(this.searchKey===''&&this.selectedIndex==0 && this.requestType=='answered'&& (this.totalCount==0||this.totalCount==null)){
        this.showSkeleton = false
        this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, 'un_answered', this.pageNumber,'').subscribe((check: any) => {
          this.unAnsCheck = check.data.getengineersForumData.totalcount
          this.showSkeleton = true
        });
      }
      this.showSkeleton = true
    })
  }

  createQuestion() {
    if (this.htmlContent) {
      let regexKey = /[&<>#]/gi;
      if (this.htmlContent.search(regexKey) == -1) {
        this.toastr.warning("spl key")
        return false
      }

      this.learnerService.createEngineersForumData(this.UserDetails.user_id, this.UserDetails.full_name, this.courseId, this.htmlContent, this.courseName).subscribe((rdata: any) => {
        if (rdata?.errors && rdata?.errors[0]?.message === "Request failed with status code 413") {
          this.toastr.warning("Content limit exceeded!!")

        } else {
          if (rdata.data.createEngineersForumData.success) {
            // this.selectedIndex = 1
            this.dialogClose('confirm');
            this.toastr.success(rdata.data.createEngineersForumData.message);
          } else {
            this.toastr.warning(rdata.data.createEngineersForumData.message)
          }
        }
        this.showSkeleton = true
      })

    } else {
      this.toastr.warning("Question cannot be empty")
    }
  }

  openQuestionDialog(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: 'QAContainer',
      width: "50%",
      height: "55%",
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0];
    const containerarea = document.getElementsByClassName('mat-dialog-container')[0];
    rclickctrl(backdrop)
    rclickctrl(containerarea)
    function rclickctrl(element){
      element.addEventListener("contextmenu", ( e )=> {
        e.preventDefault();
        return false;
      } );
    }
  }
  dialogClose(value?) {
    if(value){
      this.pageNumber = 0;
      this.getQAData();
      this.getQACount();
      setTimeout(()=>{
        this.leftContainer.nativeElement.scrollTop = 0
        this.leftContainer.nativeElement.scrollIntoView({ behavior: 'smooth' }); 
      },1000)  
     }
    this.dialog.closeAll();
    this.htmlContent = "";
  }


  //Pagination
  onpagination(event) {
    this.pageNumber = event - 1;
    this.getQAData();
    this.getQACount();
  }

  searchcaller(){
    this.timeoutval = setTimeout(()=>{
      clearTimeout(this.timeoutval)
      this.getQAData();
      // this.getQACount();
    },500)
  }
  getQAtype(){
    this.pageNumber = 0;
    this.requestType = this.selectedtype;
    this.getQAData();
  }

}
