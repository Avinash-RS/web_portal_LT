import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mycourse-item-component',
  templateUrl: './mycourse-item-component.html',
  styleUrls: ['./mycourse-item-component.scss'],
  providers: [DatePipe]
})

export class MycourseItemComponent implements OnInit {
  bufferValue = 100;
  mode = 'determinate';
  blobKey = environment.blobKey;
  // tslint:disable-next-line:no-input-rename
  @Input('courseItems') course: any = {};
  // NOT USING ANY WHERE
  // @Input() completedCourse: number;
  // @Input() globalData: any = {};
  userDetails: any;
  userDetail: any;
  recordedData: any;
  finalFullData: any;
  finalStatus: any = null;
  role: any;
  courseWeekCircle: any;
  instDefault: any = '../../../../assets/Landing/MyCourseicons/Instructor_default.svg';
  activityDefault: any = '../../../../assets/Landing/MyCourseicons/Activities_defult.svg';
  discussDefault: any = '../../../../assets/Landing/MyCourseicons/Discussion_default.svg';
  tabselector: any = 0;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplaySpeed: 700,
    dotsSpeed: 700,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 1
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
      1200: {
        items: 1,
      }
    },
    nav: true
  };
  // tabTitleVal: string = 'Self-Paced Learning';
  constructor(
    public translate: TranslateService,
    public service: CommonServicesService,
    private alert: AlertServiceService,
    private gs: GlobalServiceService,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
    const lang = localStorage.getItem('language');
    this.translate.use(lang ? lang : 'en');
  }


  ngOnInit() {
    // this.translate.use('ta');
    this.courseWeekCircle = (this.course.week_completed_count !== null ?
       this.course.week_completed_count : 0) + '/' + (this.course.week_total_count !== null ? this.course.week_total_count : 0);
      // console.log(new Date(this.course.batch_end_date))
      // console.log(this.dateObj.getFullYear() + "-" + (this.dateObj.getMonth() + 1) + "-" + this.dateObj.getDate())
    this.course.batch_end_date_Timer = new Date(this.course.batch_end_date).getTime();
  }
  // progression report
  gotoProgression(course,from) {
    if(!from){
      var isValid = this.batchRestriction(course)
    } else {
      isValid = true
    }
    if (isValid) { 
    const data = {
      courseId : course.course_id,
      courseName: course.course_name,
    };
    this.router.navigate(['/Learner/progressionReport'], {
      queryParams:
      {
        CourseId: btoa(course.course_id),
        CourseName: btoa(course.course_name),
        fromPage: 'mycourse',
      }
    });
  }
  }

  gotoQuiz(course) {
    const isValid = this.batchRestriction(course)
    if (isValid) { 
    const data = {
      courseId : course.course_id,
      courseName: course.course_name
    };
    this.router.navigate(['/Learner/quizreport'], {
      queryParams:
      {
        CourseId: btoa(course.course_id),
        CourseName: btoa(course.course_name)
      }
    });
  }
  }
  // PLAYER PAGE NAVIGATION
  gotoDesc(c,value,from?) {
    if(!from){
      var isValid = this.batchRestriction(c)
    } else {
      isValid = true
    } 
    if (isValid) { 
    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name,
      course_status: c.course_status,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date,
      isTesting: c?.isTesting ? true :false,
      link: c.link,
      toc: c.toc,
      lastLogIndex: c.lastLogIndex,
      lastModule: c.lastModule,
      lastTopic: c.lastTopic,
      checklevel: c.checklevel,
      module_id: c.module_id,
      topic_id: c.topic_id,
      course_type: c.course_type,
      payType : c.batchid ? undefined : 'paid',
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    // } else {
    localStorage.setItem('currentBatchEndDate', c.batch_end_date);
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('CourseType', c.course_type);
    localStorage.setItem('payType', value ? 'paid' : undefined);
    localStorage.setItem('persentage', c && c.coursePlayerStatus &&
    c.coursePlayerStatus.course_percentage ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    localStorage.setItem('isTesting',c?.isTesting ? 'true' :'false')
    localStorage.setItem('resumeData', JSON.stringify({link: c.link, lastModule: c.lastModule,
    lastTopic: c.lastTopic, module_id: c.module_id, topic_id: c.topic_id, checklevel: c.checklevel,
    course_status: c.course_status, toc: c.toc}));
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });
    }
    // }
  }
// qafourm
  goToForum(c) {
    const isValid = this.batchRestriction(c)
    if (isValid) { 
    localStorage.setItem('Courseid', c.course_id);
    const bt = c.batchid ? {
      batchid: c.batchid,
      batchenddate: c.batch_end_date,
      batch_start_date: c.batch_start_date,
      batchname: c.batch_name
    } : null;
    const detail = {
      id: c.course_id,
      name: c.course_name,
      batchdetails: bt
    };
    localStorage.setItem('course', btoa(JSON.stringify(detail)));
    this.router.navigateByUrl('/Learner/discussionForum', { state: { detail } });
  }
  }


 // ACTIVITY NAVIGATION
 gotoSubmissionDetails(course) {
  const isValid = this.batchRestriction(course)
  if (isValid) { 
  localStorage.removeItem('userTabLocation');
  const data1 = {
    courseId: course.course_id,
    courseName: course.course_name,
  };
  localStorage.setItem('Courseid', data1.courseId);
  localStorage.setItem('CourseName', data1.courseName);
  // this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
  this.router.navigate(['/Learner/activities'], {
    queryParams:
    {
      courseId: btoa(course.course_id),
      courseName: btoa(course.course_name),
      batchId: btoa(course.batchid)
    }
  });
}
}

// INSTRUCTOR LED PAGE NAVIGATION
goInstructorLed(c) {
  const isValid = this.batchRestriction(c)
  if (isValid) { 
  localStorage.setItem('Courseid', c.course_id);
  const detail = {
    id: btoa(c.course_id),
    name: c.course_name
  };
  localStorage.setItem('course', btoa(JSON.stringify(detail)));
  // this.router.navigateByUrl('/Learner/instructorLed', { state: { detail } });
  this.router.navigate(['/Learner/instructorLed'], { queryParams: detail }); // ['/booking'],{queryParams: {Id :id}}
}
}
// ASK A QUESTION
gotoAskQuestions(c) {
  const isValid = this.batchRestriction(c)
  if (isValid) {
  c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();
  const detail = {
    course_name: c.course_name,
    course_id: c.course_id,
    batch_id: c.batchid,
    batchEndTime: c.batch_end_date_Timer,
  };
  localStorage.setItem('Courseid', c.course_id);
  localStorage.setItem('currentBatchId', c.batchid);
  localStorage.setItem('CourseName', c.course_name);
  localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer);
  if (c.course_status !== 'start') {
    this.router.navigateByUrl('/Learner/askQuestions', { state: { detail } });
  }
  else if (c.course_status == 'start') {
    this.toastr.warning('Please start the course to access the Q&A');
  }
}
}

gotoquestionanswer(course) {
  const isValid = this.batchRestriction(course)
  if (isValid) { 
  this.router.navigate(['/Learner/questionanswer']);
  localStorage.setItem('Courseid', course.course_id);
  localStorage.setItem('CourseName', course.course_name);
  localStorage.setItem('currentBatchId', course.batchid);
  }
}

openGallery(c) {
  const isValid = this.batchRestriction(c)
  if (isValid) { 
  this.router.navigate(['/Learner/coursegallery'], {
    queryParams:
    {
      id: btoa(c.course_id),
      name: c.course_name
    }
  });
}
}

  // course report
  openReport(c) {
    const isValid = this.batchRestriction(c)
    if (isValid) { 
      if(this.userDetail.userOrigin == 'learner') {
       this.router.navigate(['/Learner/assessmentreport'])
      } else {
        this.router.navigate(['/Learner/coursereport'], {
          queryParams:
          {
            id: btoa(c.course_id),
            name: c.course_name,
            batchId: btoa(c.batchid),
            QA_totalweeks : c.QA_totalweeks,
            selflearning_totalweeks : c.selflearning_totalweeks
          }
        });
      }
  }
  }

  batchRestriction(course){
    if(!course?.batchStarted && !course?.batchClosed){
      this.toastr.warning('We understand your interest. Please come back on '+ this.datePipe.transform(course?.batch_start_date, 'dd/MM/yyyy') + ' to start the course.');
      return false;
    } 
    else if(course?.batchClosed){
      this.toastr.warning('Your subscription for this course has expired');
      return false;
    } 
    else {
      return true;
    }
  }

  // tabclicker(indexVal){
  //   this.tabTitleVal = ""
  //   let titlevalues = ['Self-Paced Learning', 'Instructor Led', 'Discussion Forum', 'Activities']
  //   setTimeout(() => {
  //     this.tabTitleVal = titlevalues[indexVal]
  //   }, 400);
  // }
}
