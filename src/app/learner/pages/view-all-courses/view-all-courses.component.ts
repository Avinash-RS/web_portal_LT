import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
declare var $: any;

@Component({
  selector: 'app-view-all-courses',
  templateUrl: './view-all-courses.component.html',
  styleUrls: ['./view-all-courses.component.scss']
})
export class ViewAllCoursesComponent implements OnInit {
  userDetailes: any;
  categories: any;
  type: any;
  subcategories: any;
  allcourses: any;
  showdesc = true;
  pagenumber = 0;
  showPublishedDate: boolean;
  btnType: any;
  viewType: string = 'grid';
  showCount: boolean;
  showRating: boolean;
  displayMode: number = 1;
  paginationpgno: any;
  
  constructor(public learnerservice: LearnerServicesService, private globalservice: GlobalServiceService) {
    this.btnType = "Enroll Now"
  }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    if (!this.userDetailes.group_id) {
      this.userDetailes.group_id = '1';
    }

    this.loadcategoryandcourses();
  }
  loadcategoryandcourses() {
    this.type = 'category';
    this.pagenumber = 0;
    this.paginationpgno = 0;
    this.getcoursecategories();
    this.getallcourses();
  }
  getcoursecategories() {
    // console.log(this.userDetailes);
    this.learnerservice.getcoursecategory(this.userDetailes.group_id).subscribe((result: any) => {
      this.categories = result.data.get_all_category.message;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  getcoursesubcategories(category) {
    this.type = 'subcategory';
    const categoryid = category.category_id ? category.category_id : category.sub_category_id;
    this.learnerservice.getcoursesubcategory(categoryid).subscribe((result: any) => {
      this.subcategories = result.data.get_sub_category.message;
      this.getcourses(category);
    });
  }

  getcourses(category) {
    this.pagenumber = 0;
    category.type = this.type;
    category._id = category.category_id ? category.category_id : category.sub_category_id;
    category.pagenumber = this.pagenumber;
    this.learnerservice.getcourse(category).subscribe((result: any) => {
      this.allcourses = result.data.get_course_by_subcategory.message;
      // this.allcourses = result.data.get_a
    });
  }

  getallcourses() {
    if (this.userDetailes.group_id) {
    }
    this.learnerservice.getallcourses('1', this.pagenumber).subscribe((result: any) => {
      this.allcourses = result.data.get_all_course_by_usergroup.message;
    });
  }

  // test() {
  //   $('.option__button').on('click', function () {
  //     $('.option__button').removeClass('selected');
  //     $(this).addClass('selected');
  //     if ($(this).hasClass('option--grid')) {
  //       $('.results-section').attr('class', 'results-section results--grid');
  //     } else if ($(this).hasClass('option--list')) {
  //       $('.results-section').attr('class', 'results-section results--list');
  //     }
  //   });
  // }
  /**
   * Determines whether scroll down on
   */
  onpagination(event) {
    console.log(event);
    this.paginationpgno = event;
    this.pagenumber = this.pagenumber + 1;
    console.log(this.userDetailes);
    this.learnerservice.getallcourses('1', this.pagenumber).subscribe((result: any) => {
      console.log(result.data.get_all_course_by_usergroup.message);
      this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
    });
  }
}
