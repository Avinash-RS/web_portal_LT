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
  displayMode: number =1;
  constructor(public learnerservice: LearnerServicesService, private globalservice: GlobalServiceService) { }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    if(!this.userDetailes.group_id){
      this.userDetailes.group_id ='1';
    }

    this.loadcategoryandcourses();
  }
  loadcategoryandcourses() {
    this.type = 'category';
    this.pagenumber = 0;
    this.getcoursecategories();
    this.getallcourses();
  }
  getcoursecategories() {
    // console.log(this.userDetailes);
    this.learnerservice.getcoursecategory(this.userDetailes.group_id).subscribe((result: any) => {
      console.log(result);
      console.log(result.data.get_all_category.message);
      this.categories = result.data.get_all_category.message;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
}
  getcoursesubcategories(category) {
    this.type = 'subcategory';
    console.log(category);
    const categoryid = category.category_id ? category.category_id : category.sub_category_id;
    console.log(categoryid);
    this.learnerservice.getcoursesubcategory(categoryid).subscribe((result: any) => {
      console.log(result.data.get_sub_category.message);
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
    console.log(result.data.get_course_by_subcategory.message);
    this.allcourses = result.data.get_course_by_subcategory.message;
    // this.allcourses = result.data.get_a
 });
 }

 getallcourses() {
   if(this.userDetailes.group_id){

   }
  this.learnerservice.getallcourses('1', this.pagenumber).subscribe((result: any) => {
    console.log('-----'+result);
    this.allcourses = result.data.get_all_course_by_usergroup.message;
 });
 }

 test() {
  $('.option__button').on('click', function() {
    $('.option__button').removeClass('selected');
    $(this).addClass('selected');
    if ($(this).hasClass('option--grid')) {
      $('.results-section').attr('class', 'results-section results--grid');
    } else if ($(this).hasClass('option--list')) {
      $('.results-section').attr('class', 'results-section results--list');
    }
  });
  }
  /**
   * Determines whether scroll down on
   */
  next(event) {
    console.log(event);
    this.pagenumber = this.pagenumber + 1;
    console.log(this.userDetailes);
    this.learnerservice.getallcourses('1', this.pagenumber).subscribe((result: any) => {
     console.log(result.data.get_all_course_by_usergroup.message);
     this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
    });
  }
}
