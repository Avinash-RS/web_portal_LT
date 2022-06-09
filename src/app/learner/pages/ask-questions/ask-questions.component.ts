import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonServicesService } from '@core/services/common-services.service';
import * as CryptoJS from 'crypto-js';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrls: ['./ask-questions.component.scss']
})

export class AskQuestionsComponent implements OnInit {
  allQuestionList = [];
  questionText: string;
  batchId: string;
  localStoCourseid: string;
  courseid: any;
  userDetail: any;
  scrollselector: any = '.myQuestions';
  moduleTopicData: any;
  mainTopic: any = 'all';
  mainModule: any = 'all';
  qaSortKey: any = -1;
  mainPagenumber: any = 0;
  mainModuleName: any = null;
  questionTopicList = null;
  questionTopic = null;
  questionModule: any = null;
  courseName: any;
  isLoading: boolean = true;
  loadMessage: any = 'Loading..';
  emptyMessage: any = 'No Questions / Answers to display.';
  screenWidth: number;
  secretKey = '(!@#Passcode!@#)';
  dateObj = new Date();
  currentDate = new Date(this.dateObj.getFullYear() + '-' + (this.dateObj.getMonth() + 1) + '-' + this.dateObj.getDate()).getTime();
  batchEndTime: any;
  checkLevel: boolean = false;
  ///new variables
  selectedIndex = 0;
  showSkeleton:boolean = true;
  qaDataList:any = [];
  htmlContent = '';
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
  searchKey = '';
  userID = null;
  constructor(private dialog: MatDialog,
              public Lservice: LearnerServicesService,
              public route: Router,
              private gs: GlobalServiceService,
              private toastr: ToastrService,
              public translate: TranslateService,
              public commonService: CommonServicesService
    // private ngxLoader: NgxUiLoaderService
  ) {
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
    this.screenWidth = window.innerWidth;
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if (detail === undefined) {
      this.batchId = localStorage.getItem('currentBatchId');
      this.courseid = localStorage.getItem('Courseid');
      this.courseName = localStorage.getItem('CourseName');
      this.batchEndTime = localStorage.getItem('currentBatchEndDate');
    } else {
      this.batchId = detail.batch_id;
      this.batchId = detail.batch_id;
      this.courseid = detail.course_id;
      this.courseName = detail.course_name;
      this.batchEndTime = detail.batchEndTime;
    }
    this.userDetail = this.gs.checkLogout();
    if (this.courseid) {
      this.userID = this.userDetail.user_id;
    this.getPlayerModuleTopic();
    this.getQuestionAnswer(true);
    } else {
        this.route.navigateByUrl("/Landing/MyCourse");
    }
  }
  
  ngOnInit() {
   return true;
  }
  getQuestionAnswer(getcount:boolean) {
    this.showSkeleton = true;
    this.Lservice.getvocationalqNda(this.userID,this.batchId, this.courseid, this.qaSortKey, this.mainPagenumber, this.mainModuleName == 'all' ? null :this.mainModuleName, this.mainTopic =='all' ? null: this.mainTopic,this.searchKey).subscribe((result:any) => {
      this.showSkeleton = false;
      if(result?.data?.vocationalqNda?.success && result?.data?.vocationalqNda?.message.length > 0){
        this.qaDataList.push(...result.data.vocationalqNda.message);
        if(getcount){
          const qcountData = result?.data?.vocationalqNda?.count ? parseInt(result.data.vocationalqNda.count) : 0;
          const acountData =  result?.data.vocationalqNda?.ansCount ? parseInt(result?.data.vocationalqNda?.ansCount) : 0;
              this.selectedIndex == 0 ?  this.animateValue('qCount', 0, qcountData, 1000):'';
               this.animateValue('aCount', 0, acountData, 1000);
        }
      }
      else{
        if(getcount){ 
          this.selectedIndex == 0 ?  this.animateValue('qCount', 0, 0, 1000):'';
          this.animateValue('aCount', 0, 0, 1000);
        }
      }
    });
  }
  openQuestionInput(templateRef: TemplateRef<any>) {
    this.questionText = '';
    if (this.screenWidth > 650) {
      this.dialog.open(templateRef, {
        width: '38%',
        height: '80%',
        closeOnNavigation: true,
        disableClose: true,
        panelClass:'qadialog'
      });
    } else {
      this.dialog.open(templateRef, {
        width: '100%',
        height: '80%',
        closeOnNavigation: true,
        disableClose: true,
        panelClass:'qadialog'
      });
    }
  }
  getPlayerModuleTopic() {
    // tslint:disable-next-line: prefer-const
    let param: any = {};
    param.parent = '';
    param.contentID = this.courseid;
    // tslint:disable-next-line: prefer-const
    let id = CryptoJS.AES.decrypt(this.userDetail.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    param.user_id = id;
    param.batchid = this.batchId;
    this.commonService.getTOC(param).subscribe((data: any) => {
      if (data.success === true) {
        this.checkLevel = data.checkLevel;
        const tmpData = data?.message;
        this.moduleTopicData = [];
        tmpData.forEach(element => {
          this.moduleTopicData.push(... element.childData);
        });
      }
    });
  }
  onScroll() {
    this.mainPagenumber = this.mainPagenumber + 1;
    this.getQuestionAnswer(false);
  }
  mainQAFilter(call) {
    this.qaDataList = [];
    this.mainPagenumber = 0;
    if (call === 'M') {
      if (this.mainModule?.id) {
        this.getTopicV2(this.mainModule?.id, 'filter');
        this.mainModuleName = this.mainModule ? this.mainModule?.id : null;
        this.mainTopic = 'all';
      } else {
        this.mainModuleName = null;
        this.mainTopic = 'all';
      }
    }
    this.getQuestionAnswer(false);
  }
  getTopicV2(parent, call) {
    // tslint:disable-next-line: prefer-const
    let param: any = {};
    param.parent = parent;
    param.contentID = this.courseid;
    // tslint:disable-next-line: prefer-const
    let id = CryptoJS.AES.decrypt(this.userDetail.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    param.user_id = id;
    param.batchid = this.batchId;
    this.commonService.getTOC(param).subscribe((data: any) => {
      if (call === 'filter') {
        this.mainModule.childData = data.message;
      }
      if (call === 'selector') {
        this.questionTopicList.childData = data.message;
      }
    });
  }

  askQAModuleSelect() {
    this.getTopicV2(this.questionTopicList.id, 'selector');
    this.questionModule = this.questionTopicList?.id;
    this.questionTopic = null;
  }

  submitMyQuestion() {
    if (this.questionModule ) {
    if (this.questionTopic) {
    if (this.questionText.trim().length) {
      this.Lservice.askaquestion(this.userDetail.user_id, this.courseid, this.questionModule,
         this.questionTopic, this.questionText).subscribe((data: any) => {
        this.questionText = '';
        if (data?.data?.askaquestion?.success) {
          this.closedialogbox();
          this.toastr.success(data?.data?.askaquestion?.message);
          this.tabchange();
        } else {
         // this.toastr.warning(data?.data?.bookmark?.message)
        }
      });
    } else {
      this.toastr.warning('Please enter some text');
    }
  } else {
    this.toastr.warning('Please select a topic');
  }
    } else {
      this.toastr.warning('Please select a module');
    }
  }

  closedialogbox() {
    this.questionModule = null;
    this.questionTopic = null;
    this.mainTopic = null;
    this.questionTopicList = null;
    this.questionTopic = null;
    this.dialog.closeAll();
  }

  goBack() {
    this.route.navigateByUrl('/Landing/MyCourse');
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
  searchcaller(e){
    if (this.searchKey.length >= 3) {
      this.qaDataList = [];
      this.mainPagenumber = 0;
      this.getQuestionAnswer(false);
    }
    if (e.keyCode === 8 && this.searchKey.length === 0) {
      this.resetSearch();
    }
  }
  resetSearch() {
    this.qaDataList = [];
    this.searchKey = '';
    this.mainPagenumber = 0;
    this.getQuestionAnswer(false);
  }
  contextmenu(e) {
    e.preventDefault();
  }
  tabchange(){
    this.qaDataList = [];
    this.searchKey = '';
    this.mainPagenumber = 0;
    this.userID = this.selectedIndex == 0 ?  this.userDetail.user_id : null;
    this.mainModule = 'all';
    this.mainTopic = 'all';
    this.mainModuleName = null;
    this.getQuestionAnswer(true);
  }
}
