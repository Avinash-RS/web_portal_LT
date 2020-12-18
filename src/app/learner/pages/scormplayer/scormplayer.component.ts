import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { LearnerServicesService } from '../../services/learner-services.service';


@Component({
  selector: 'app-scormplayer',
  templateUrl: './scormplayer.component.html',
  styleUrls: ['./scormplayer.component.scss']
})
export class ScormplayerComponent implements OnInit {
  contentid: any;
  content: any;
  syllabus: any;
  modules: any[];
  authorDetails: any[];
  name = 'Set iframe source';
  url: string;
  urlSafe: SafeResourceUrl;
  userId: any;
  breakpoint: number;
  courseId: any;
  courseDeatils: any;
  modulength: any;
  public isCollapsed = false;
  countofdoc: any;
  questionId: any = [];
  playerStatus: any = [];
  jsonData: any;
  allFeedbackQue: any;
  getuserid: any;
  show = false;
  checkDetails: any;
  user_token;
  constructor(private dialog: MatDialog, public sanitizer: DomSanitizer,
              public spinner: NgxSpinnerService, public activatedRoute: ActivatedRoute, private alert: AlertServiceService,
              public service: LearnerServicesService, public route: Router, public commonService: CommonServicesService, ) {
                this.user_token = sessionStorage.getItem("token")
    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);

    this.checkDetails = detail;
    this.contentid = detail.id;
    this.userId = detail.user;
    this.courseId = detail.course_id;
    localStorage.setItem('scorm_user_id', this.userId);
    localStorage.setItem('course_id', this.courseId);
    this.spinner.show();
    this.commonService.viewCurseByIDForLearner(this.courseId).subscribe((data: any) => {
      if (data.data.view_course_for_learner.success === true) {
        this.courseDeatils = data.data.view_course_for_learner.message;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.alert.openAlert(data.data.view_course_for_learner.error_msg, null);
      }

    });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.passCourseId();
    this.contentid = 'dfdfd';
    this.url = environment.scormUrl + 'scormPlayer.html?contentID=' +
    this.contentid + '&user_id=' + this.userId + '&course_id=' + this.courseId + '&token=' + this.user_token;
    // this.getModuleData();
    this.getFeedbackQue();
    this.getCoursePlayerStatus();
  }
  getCoursePlayerStatus() {
    this.service.getCoursePlayerStatusForCourse(this.userId, this.courseId).subscribe((data: any) => {
      this.playerStatus = data.data.getCoursePlayerStatusForCourse.message;
      if (this.checkDetails.feed_back === 1 && this.playerStatus.feedback_status === false && this.playerStatus.status === 'completed') {
    this.show = true;
    } else {
      this.show = false;
    }
    });
  }
  getcontent() {
    this.service.list_content().subscribe(data => {
    });
  }
  passCourseId() {
    this.commonService.geturl(this.courseId).subscribe(data => {
    });
  }

  // getModuleData() {
  //   this.service.getModuleData(this.course_id).subscribe(data => {
  //     if (data.data['getmoduleData']['success'] === 'true') {
  //       this.content = data.data['getmoduleData']['data'][0];
  //       this.getuserid= JSON.parse(localStorage.getItem('UserDetails'))
  // tslint:disable-next-line:max-line-length
  //       this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl( environment.scormUrl+'/scormPlayer.html?contentID='+this.course_id+'&user_id='+this.user_id+'&user_obj_id='+this.getuserid._id);
  //       //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
  //       this.modulength = this.content['coursedetails'].length;
  //       this.content.coursedetails.forEach(moduledetails => {
  //         moduledetails.moduledetails.forEach(element => {
  //           this.countofdoc = element.resourse.count;
  //           return true
  //         });
  //       });
  //     }
  //   })
  // }

  downloadAll(urls) {
    const arr: any = [];
    urls.forEach(element => {
      arr.push(element.path);
    });
    const link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      link.href = arr[i];
      link.click();
    }
    document.body.removeChild(link);
  }
  moresection(vale, modelenght) {
    this.modulength = modelenght - 5;
    if (vale === true) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

  }
  getFeedbackQue() {
    this.service.getFeedbackQuestion().subscribe((data: any) => {
      if (data.data.getFeedbackQuestion.success === true) {
        this.allFeedbackQue = data.data.getFeedbackQuestion.data;
      }
    });
  }
  submitFeedback(are, are1, selectOption) {
    const questionAns: any = [];
    questionAns.push({ question: 'What do you like about the module ?', answer: are },
     { question: 'What could be improved ?', answer: are1 }, { question: 'Would you recommend this to a friend ?', answer: selectOption });
    this.questionId.question_ans = questionAns;
    this.questionId.user_id = this.userId;
    this.questionId.course_id = this.courseId;
    this.service.InsertCourseFeedback(this.questionId).subscribe((data: any) => {
      if (data.data.InsertCourseFeedback.success === 'true') {
        this.show = false;
      } else {
      }
    });
  }
  onRate(rating, id) {
    const jsonData = {
      rating: rating.newValue,
      question_id: id
    };
    this.questionId.push(jsonData);

  }
}
