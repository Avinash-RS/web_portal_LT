import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mycourse-item-component',
  templateUrl: './mycourse-item-component.html',
  styleUrls: ['./mycourse-item-component.scss']
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

  userDetail: any;
  recordedData: any;
  finalFullData: any;
  finalStatus: any = null;
  role: any;
  courseWeekCircle: any;
  instDefault: any = '../../../../assets/learner/mycourseicons/Instructor_default.svg';
  activityDefault: any = '../../../../assets/learner/mycourseicons/Activities_defult.svg';
  discussDefault: any = '../../../../assets/learner/mycourseicons/Discussion_default.svg';
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
    private router: Router) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
    let lang = localStorage.getItem('language')
      this.translate.use(lang?lang:'en') 
  }


  ngOnInit() {
    // this.translate.use('ta');
    this.courseWeekCircle = (this.course.week_completed_count !== null ?
       this.course.week_completed_count : 0) + '/' + (this.course.week_total_count !== null ? this.course.week_total_count : 0);
      // console.log(new Date(this.course.batch_end_date))
      // console.log(this.dateObj.getFullYear() + "-" + (this.dateObj.getMonth() + 1) + "-" + this.dateObj.getDate())
      this.course.batch_end_date_Timer = new Date(this.course.batch_end_date).getTime();
  }
  //progression report
  gotoProgression(course) {
    let data = {
      courseId : course.course_id,
      courseName: course.course_name
    }
    this.router.navigate(['/Learner/progressionReport'], {
      queryParams:
      {
        CourseId: btoa(course.course_id),
        CourseName: btoa(course.course_name)
      }
    });
  }
  //PLAYER PAGE NAVIGATION
  gotoDesc(c) {
    c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();

    const detail = {
      id: c.course_id,
      wishlist: c.wishlisted || false,
      wishlist_id: c.wishlist_id || null,
      enrollment_status: null,
      course_name: c.course_name,
      course_status: c.course_status,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date_Timer,
      link:c.link,
      toc:c.toc,
      lastLogIndex:c.lastLogIndex,
      lastModule:c.lastModule,
      lastTopic:c.lastTopic,
      checklevel:c.checklevel,
      module_id:c.module_id,
      topic_id:c.topic_id
      // persentage : c.coursePlayerStatus.course_percentage || 0
    };
    // if (this.screenWidth < 800) {
    // } else {
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer)
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('persentage', c && c.coursePlayerStatus && c.coursePlayerStatus.course_percentage ? c.coursePlayerStatus.course_percentage : '');
    localStorage.setItem('currentBatchId', c.batchid);
    this.router.navigateByUrl('/Learner/courseDetail', { state: { detail } });

    // }
  }
// qafourm
  goToForum(c) {
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


 // ACTIVITY NAVIGATION 
 gotoSubmissionDetails(course) {
  localStorage.removeItem('userTabLocation');
  const data1 = {
    courseId: course.course_id,
    courseName: course.course_name,
  };
  localStorage.setItem('Courseid', data1.courseId);
  localStorage.setItem('CourseName', data1.courseName);
  //this.router.navigateByUrl('/Learner/activities', { state: { data: data1 } });
  this.router.navigate(['/Learner/activities'],{
    queryParams: 
    { 
      courseId: btoa(course.course_id),
      courseName: btoa(course.course_name),
      batchId: btoa(course.batchid)
    }
  });
}

//INSTRUCTOR LED PAGE NAVIGATION
goInstructorLed(c) {
  localStorage.setItem('Courseid', c.course_id);
  const detail = {
    id: btoa(c.course_id),
    name: c.course_name
  };
  localStorage.setItem('course', btoa(JSON.stringify(detail)));
  // this.router.navigateByUrl('/Learner/instructorLed', { state: { detail } });
  this.router.navigate(['/Learner/instructorLed'], { queryParams: detail }); // ['/booking'],{queryParams: {Id :id}}
}
//ASK A QUESTION
gotoAskQuestions(c) {
  c.batch_end_date_Timer = new Date(c.batch_end_date).getTime();
    const detail = {
      course_name: c.course_name,
      course_id: c.course_id,
      batch_id: c.batchid,
      batchEndTime: c.batch_end_date_Timer,
    }
    localStorage.setItem('Courseid', c.course_id);
    localStorage.setItem('currentBatchId', c.batchid);
    localStorage.setItem('CourseName', c.course_name);
    localStorage.setItem('currentBatchEndDate', c.batch_end_date_Timer)
    if(c.course_status!=='start'){
    this.router.navigateByUrl('/Learner/askQuestions', { state: { detail } });
  }
}

gotoquestionanswer(course) {
  this.router.navigate(['/Learner/questionanswer'])
  localStorage.setItem('Courseid', course.course_id);
  localStorage.setItem('CourseName', course.course_name);
  localStorage.setItem('currentBatchId', course.batchid);
}

openGallery(c){
  this.router.navigate(['/Learner/coursegallery'], {
    queryParams:
    {
      id: btoa(c.course_id),
      name: c.course_name
    }
  });
}

  //course report
  openReport(c){
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
  // tabclicker(indexVal){
  //   this.tabTitleVal = ""
  //   let titlevalues = ['Self-Paced Learning', 'Instructor Led', 'Discussion Forum', 'Activities']
  //   setTimeout(() => {
  //     this.tabTitleVal = titlevalues[indexVal]
  //   }, 400);
  // }
}
