import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';

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
  pagenumber = 0;
  constructor(public learnerservice: LearnerServicesService, private globalservice: GlobalServiceService) { }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    this.loadcategoryandcourses();
  }
  loadcategoryandcourses() {
    this.type = 'category';
    this.pagenumber = 0;
    this.getcoursecategories();
    this.getallcourses();
  }
  getcoursecategories() {
    console.log(this.userDetailes);
    this.learnerservice.getcoursecategory(this.userDetailes.group_id).subscribe((result: any) => {
      console.log(result)
    console.log(result.data.get_all_category.message);
    this.categories = result.data.get_all_category.message;
    });
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
  category.type = this.type;
  category._id = category.category_id ? category.category_id : category.sub_category_id;
  category.pagenumber = this.pagenumber;
  console.log(category)
  this.learnerservice.getcourse(category).subscribe((result: any) => {
    console.log(result.data.get_course_by_subcategory.message);
    this.allcourses = result.data.get_course_by_subcategory.message;
    // this.allcourses = result.data.get_a
 });
 }

 getallcourses() {
  this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
    console.log(result);
    this.allcourses = result.data.get_all_course_by_usergroup.message;
 });
 }


  /**
   * Determines whether scroll down on
   */
  onScrollDown() {
    this.pagenumber = this.pagenumber + 15;
    console.log(this.userDetailes.group_id[0]);
    this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
     console.log(result.data.get_all_course_by_usergroup.message);
     this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
    });
  }
}
