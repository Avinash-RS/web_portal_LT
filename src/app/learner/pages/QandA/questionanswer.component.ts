import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.scss']
})

export class QuestionanswerComponent implements OnInit {
  @ViewChild('leftContainer', { static: true }) leftContainer: ElementRef;

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
    translate: 'yes',
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
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
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
  filterBy: any[] = [
    { value: 'un_answered&answered', viewValue: 'All' },
    { value: 'answered', viewValue: 'Answered' },
    { value: 'un_answered', viewValue: 'Unanswered' },
  ];
  selectedtype = 'un_answered&answered';
  tabType = 'user';
  fromSideBtn: boolean = false;
  batchId = '';
  constructor(public route: Router, private dialog: MatDialog, private learnerService: LearnerServicesService, private toastr: ToastrService,
              public translate: TranslateService) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    this.UserDetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.courseId = localStorage.getItem('Courseid');
    this.courseName = localStorage.getItem('CourseName');
    this.batchId = localStorage.getItem('currentBatchId');
  }

  ngOnInit() {
    this.selectedIndex = 1;
    if(this.courseId){
    this.contentChange();
    }else{
      // this.toastr.warning("Failed to load.. redirecting to dashboard.");
        this.route.navigateByUrl("/Landing/MyCourse");
    }
  }

  contextmenu() {
    event.preventDefault();
  }

  contentChange() {
    this.pageNumber = 0;
    switch (this.selectedIndex) {
      case 0:
        this.tabType = 'user';
        this.requestType = 'un_answered&answered';
        this.selectedtype = 'un_answered&answered';
        this.getQACount();
        this.getQAData();
        break;
      case 1:
        this.tabType = 'course';
        if (!this.fromSideBtn) {
        this.requestType = 'un_answered&answered';
        this.selectedtype = 'un_answered&answered';
        this.getQACount();
        this.getQAData();
        }
        this.fromSideBtn = false;
        break;
      default:
        break;
    }
  }
  getQACount() {
    this.showNumSkeleton = false;
    this.learnerService.getengineersForumQA_Count(this.UserDetails.user_id, this.courseId).subscribe((rdata: any) => {
      const qcountData = rdata.data.getengineersForumQA_Count.data.questionCount;
      const acountData = rdata.data.getengineersForumQA_Count.data.anweredCount;
      this.animateValue('qCount', 0, qcountData ? qcountData : 0, 1000);
      this.animateValue('aCount', 0, acountData ? acountData : 0, 1000);
      this.showNumSkeleton = true;
    });
  }
  animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (start === end) {
      obj.innerHTML = end;
    } else {
      const range = end - start;
      let current = start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));

      const timer = setInterval(() => {
        current += increment;
        obj.innerHTML = current;
        if (current === end) {
          clearInterval(timer);
        }

      }, 1);

      setTimeout(() => {
        obj.innerHTML = end;
        clearInterval(timer);
      }, 800);
    }
  }

  onScrollDown() {

    this.pageNumber = this.pageNumber + 1;
    this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId,
      this.requestType, this.pageNumber, this.searchKey, this.tabType).subscribe((result: any) => {
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
    this.showSkeleton = false;
    this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, this.requestType,
      this.pageNumber, this.searchKey, this.tabType).subscribe((rdata: any) => {
      this.qaDataList = rdata.data.getengineersForumData.data;
      this.totalCount = rdata.data.getengineersForumData.totalcount;
      if (this.searchKey === '' && this.selectedIndex === 0 && this.requestType === 'nswered'
      && (this.totalCount === 0 || this.totalCount == null)) {
        this.showSkeleton = false;
        this.learnerService.getengineersForumData(this.UserDetails.user_id, this.courseId, 'un_answered',
        this.pageNumber, '', this.tabType).subscribe((check: any) => {
          this.unAnsCheck = check.data.getengineersForumData.totalcount;
          this.showSkeleton = true;
        });
      }
      this.showSkeleton = true;
    });
  }

  createQuestion() {
    if (this.htmlContent) {
      // console.log(this.htmlContent)
      // let regexKey = /[&<>#]/gi;
      // if (this.htmlContent.search(regexKey) == -1) {
      //   this.toastr.warning("Please dont use special characters")
      //   return false
      // }

      this.learnerService.createEngineersForumData(this.UserDetails.user_id, this.UserDetails.full_name,
        this.courseId, this.htmlContent, this.courseName, this.batchId, this.UserDetails.orgId).subscribe((rdata: any) => {
        if (rdata?.errors && rdata?.errors[0]?.message === 'Request failed with status code 413') {
          this.toastr.warning('Content limit exceeded!!');

        } else {
          if (rdata.data.createEngineersForumData.success) {
            // this.selectedIndex = 1
            this.dialogClose('confirm');
            this.toastr.success(rdata.data.createEngineersForumData.message);
          } else {
            this.toastr.warning(rdata.data.createEngineersForumData.message);
          }
        }
        this.showSkeleton = true;
      });

    } else {
      this.toastr.warning('Question cannot be empty');
    }
  }

  openQuestionDialog(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: 'QAContainer',
      width: '50%',
      height: '55%',
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName('cdk-overlay-backdrop')[0];
    const containerarea = document.getElementsByClassName('mat-dialog-container')[0];
    rclickctrl(backdrop);
    rclickctrl(containerarea);
    function rclickctrl(element) {
      element.addEventListener('contextmenu', ( e ) => {
        e.preventDefault();
        return false;
      } );
    }
  }
  dialogClose(value?) {
    if (value) {
      this.pageNumber = 0;
      this.getQAData();
      this.getQACount();
      setTimeout(() => {
        this.leftContainer.nativeElement.scrollTop = 0;
        this.leftContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
     }
    this.dialog.closeAll();
    this.htmlContent = '';
  }


  // Pagination
  onpagination(event) {
    this.pageNumber = event - 1;
    this.getQAData();
    this.getQACount();
  }

  searchcaller(e) {
    // this.timeoutval = setTimeout(()=>{
    //   clearTimeout(this.timeoutval)
    //   this.pageNumber = 0;
    //   this.getQAData();
    //   // this.getQACount();
    // },500)
    if (this.searchKey.length >= 3) {
      this.pageNumber = 0;
      this.getQAData();
    }
    if (e.keyCode === 8 && this.searchKey.length === 0) {
      this.resetSearch();
    }
  }
  getQAtype() {
    this.pageNumber = 0;
    this.requestType = this.selectedtype;
    this.getQAData();
  }
  resetSearch() {
    this.searchKey = '';
    this.pageNumber = 0;
    this.getQAData();
  }
  navigateAllQA(type) {
    this.tabType = 'course';
    this.fromSideBtn = true;
    this.selectedtype = type;
    this.requestType = type;
    this.selectedIndex = 1;
    this.pageNumber = 0;
    this.getQACount();
    this.getQAData();
  }
}
