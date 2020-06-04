import { Component, OnInit, TemplateRef } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog ,MatDialogConfig} from '@angular/material';

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
  url: string
  urlSafe: SafeResourceUrl;
  user_id: any
  breakpoint: number;
  course_id: any;
  courseDeatils: any;
  modulength: any;
  public isCollapsed = false;
  countofdoc: any;
  question_id: any = [];
  jsonData: any;
  allFeedbackQue: any;
  constructor(private dialog: MatDialog, public sanitizer: DomSanitizer, public spinner: NgxSpinnerService, public activatedRoute: ActivatedRoute, private alert: AlertServiceService,
    public service: LearnerServicesService, public route: Router, public commonService: CommonServicesService, ) {
    var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);


    this.contentid = detail.id;
    this.user_id = detail.user;
    this.course_id = detail.course_id
    localStorage.setItem('scorm_user_id', this.user_id)
    localStorage.setItem('course_id', this.course_id)
    this.spinner.show();
    this.commonService.viewCurseByID(this.course_id).subscribe(data => {
      if (data.data['viewcourse'].success == true) {
        this.courseDeatils = data.data['viewcourse']['message'];
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.alert.openAlert(data.data['viewcourse']['error_msg'], null)
      }

    })
    if (detail.feed_back == 1) {
      //  this.test();
    }
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.passCourseId();
    this.contentid = 'dfdfd'
    this.url = environment.scormUrl + 'scormPlayer.html?contentID=' + this.contentid + '&user_id=' + this.user_id + '&course_id=' + this.course_id
    this.getModuleData();
  }
  getcontent() {
    this.service.list_content().subscribe(data => {
    })
  }
  passCourseId() {
    this.commonService.geturl(this.course_id).subscribe(data => {
    })
  }

  getModuleData() {
    this.service.getModuleData(this.course_id).subscribe(data => {
      if (data.data['getmoduleData']['success'] === 'true') {
        this.content = data.data['getmoduleData']['data'][0];
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
        this.modulength = this.content['coursedetails'].length;
        this.content.coursedetails.forEach(moduledetails => {
          moduledetails.moduledetails.forEach(element => {
            this.countofdoc = element.resourse.count;
            return true
          });
        });
      }
    })
  }

  downloadAll(urls) {
    var arr: any = [];
    urls.forEach(element => {
      arr.push(element.path);
    });
    var link = document.createElement('a');
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    for (var i = 0; i < arr.length; i++) {
      link.href = arr[i];
      link.click();
    }
    document.body.removeChild(link);
  }
  moresection(vale, modelenght) {
    this.modulength = modelenght - 5;
    if (vale == true) {
      this.isCollapsed = false
    } else {
      this.isCollapsed = true
    }
  }

  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

  }
  getFeedbackQue() {
    this.service.getFeedbackQuestion().subscribe(data => {
      //console.log(data.data['getFeedbackQuestion']['success'])
      if (data.data['getFeedbackQuestion']['success'] === true) {
        ///console.log(data.data['getFeedbackQuestion'])
        this.allFeedbackQue = data.data['getFeedbackQuestion']['data']
      }
    })
  }
  submitFeedback(are, are1, selectOption) {
    var question_ans: any = [];
    question_ans.push({ question: 'What do you like about the module ?', answer: are }, { question: 'What could be improved ?', answer: are1 }, { question: 'Would you recommend this to a friend ?', answer: selectOption })
    this.question_id.question_ans = question_ans
    this.question_id.user_id = 'hghghjg'
    this.service.InsertCourseFeedback(this.question_id).subscribe(data => {
      if (data.data['InsertCourseFeedback']['success'] == true) {
        console.log('success')
      } else {
        console.log('fail')
      }
    })
  }


  test(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

}
