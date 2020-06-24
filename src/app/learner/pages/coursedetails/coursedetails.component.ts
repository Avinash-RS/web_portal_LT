import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '../../../../environments/environment';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {
  course: any = null;
  // loadingCourse = false;
  // customOptions1: any = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 700,
  //   navText: ['<', '>'],
  //   responsive: {
  //     400: {
  //       items: 1
  //     }
  //   },
  //   nav: true
  // };

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  wishlist: any = [];
  syllabus: {}[];
  open = false;
  userDetail: any;
  showShortDesciption = true;
  clicked: any = 'media';
  content: any;
  modulength: any;
  isCollapsed: any;
  panelOpenState = false;
  showFiller = false;
  courseTime: any;
  url: string;
  urlSafe: SafeResourceUrl;
  userid: any;
  courseid: any;
  contentid: string;
  getuserid: any;
  topicData: any[];
  resourceFile: any;
  constructor(private router: ActivatedRoute, public Lservice: LearnerServicesService,
              public service: CommonServicesService, private gs: GlobalServiceService,
              public route: Router, private alert: AlertServiceService,
              public sanitizer: DomSanitizer) {

    const detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if (this.gs.checkLogout()) {
      this.courseid = detail.id;
      this.userDetail = this.gs.checkLogout();
      this.service.viewCurseByID(detail && detail.id || '1', this.userDetail.user_id)
        .subscribe((viewCourse: any) => {
          if (viewCourse.data.viewcourse && viewCourse.data.viewcourse.success) {
            this.course = viewCourse.data.viewcourse.message;
            if (this.course.topicData && this.course.topicData.length) {
              this.topicData = [];
              this.course.topicData.forEach(element => {
                const subArr = [];
                element.moduleData.forEach(element1 => {
                  subArr.push(element1.moduledetails);
                });
                const obj = {
                  modulename: element.moduleData[0].modulename,
                  moduledetails: subArr
                };
                this.topicData.push(obj);
              });
            }
            this.course.topicData = this.topicData;

            this.course.wishlisted = detail.wishlist || false;
            this.course.wishlist_id = detail.wishlist_id || null;
            this.course.enrollment_status = detail.enrollment_status;
          }
        });
    }
    this.Lservice.getModuleData(detail.id, this.userDetail.user_id).subscribe((data: any) => {
      this.content = data.data.getmoduleData.data[0];
      this.resourceFile = this.content?.coursedetails[0]?.moduledetails[0]?.resourse?.files;
      this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
        (environment.scormUrl + '/scormPlayer.html?contentID=' +
          this.courseid + '&user_id=' + this.userid + '&user_obj_id=' + this.getuserid._id);
      this.modulength = this.content.coursedetails.length;
      this.courseTime = this.content.coursetime;
    });
  }
  clickedT(i) {
    this.clicked = i;
  }

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }
  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
    }
  }
  scroll(el: HTMLElement) {
    el.scrollTop = 0;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // playCourse(i) {
  //   this.route.navigate(['/Learner/scorm', { id: i }]);
  //   this.service.syllabus_of_particular_scorm('FSL ').subscribe((viewCourse: any) => {
  //   });
  // }

  selectWishlist(course) {
    // this.loader.show();
    if (this.gs.checkLogout()) {
      if (this.course.wishlisted === false) {
        this.service.addWishlist(course.course_id, this.userDetail._id).subscribe((addWishlist: any) => {
          if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            this.course.wishlist_id = addWishlist.data.add_to_wishlist.wishlist_id;
            this.gs.canCallWishlist(true);
            // this.loader.hide();
          }
        });
      } else {
        this.service.removeWishlist(course.wishlist_id).subscribe((addWishlist: any) => {
          if (addWishlist.data.delete_wishlist && addWishlist.data.delete_wishlist.success) {
            this.course.wishlisted = !this.course.wishlisted;
            course.wishlist_id = null;
            this.gs.canCallWishlist(true);
            // this.loader.hide();
          }
        });
      }
    }
  }

  // enrollCourse() {
  //   this.service.enrollcourse(this.userDetail.user_id, this.userDetail.group_id[0], this.course.course_id)
  //     .subscribe((enrollCourse: any) => {
  //       if (enrollCourse.data) {
  //         if (enrollCourse.data.enrollcourse.success) {
  //           Swal.fire('User enrolled successfully for the course');
  //         } else {
  //           Swal.fire(enrollCourse.data.enrollcourse.message);
  //         }
  //       } else {
  //         Swal.fire('Please try again later');
  //       }
  //     });
  // }

// }


// getModuleData(){
//     this.service.getModuleData(this.course_id).subscribe((data: any) => {
//       if (data.data.getmoduleData.success === 'true') {
//         this.content = data.data.getmoduleData.data[0];
//         this.getuserid = JSON.parse(localStorage.getItem('UserDetails'));
//         this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
//         (environment.scormUrl + '/scormPlayer.html?contentID=' +
//         this.course_id + '&user_id=' + this.user_id + '&user_obj_id=' + this.getuserid._id);
//         // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/scormContent' + this.content.url);
//         this.modulength = this.content.coursedetails.length;
//         this.content.coursedetails.forEach(moduledetails => {
//           moduledetails.moduledetails.forEach(element => {
//             this.countofdoc = element.resourse.count;
//             return true;
//           });
//         });
//       }
//     });
  }
