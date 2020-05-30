import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { logout, viewcourse, view_wishlist, list_content, syllabus_of_particular_scorm,
  getCoursesByName,get_all_course_by_usergroup} from '@core/services/operations/common_query';
import { add_to_wishlist, delete_wishlist, getPlayerStatus, geturl, enrollcourse,
  getCourseCategorySearch, getDetailsCount} from '@core/services/operations/common_mutation';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private Apollo: Apollo) { }

  globalSearch$ = new Subject<any>();
  globalSearch = this.globalSearch$.asObservable();

  globalFilter$ = new Subject<any>();
  globalFilter = this.globalFilter$.asObservable();

  globalCourses$ = new Subject<any>();
  globalCourses = this.globalCourses$.asObservable();

  globalFilterCategory$ = new Subject<any>();
  globalFilterCategory = this.globalFilterCategory$.asObservable();

  globalCategory$ = new Subject<any>();
  globalCategory = this.globalCategory$.asObservable();

  globalAllCategory$ = new Subject<any>();
  globalAllCategory = this.globalAllCategory$.asObservable();

  logout(user_id, is_admin) {
    // this.Apollo.getClient().resetStore();
    return this.Apollo.query({
      query: logout,
      variables: {
        user_id,
        is_admin
      }
    });
  }

  viewCurseByID(course_id) {
    return this.Apollo.query({
      query: viewcourse,
      variables: {
        course_id,
      }
    });
  }

  viewWishlist(userid) {
    return this.Apollo.query({
      query: view_wishlist,
      variables: {
        user_id:userid,
      }
    });
  }

  addWishlist(course_id, user_id) {
    return this.Apollo.query({
      query: add_to_wishlist,
      variables: {
        course_id,
        user_id
      }
    });
  }

  removeWishlist(wishlist_id) {
    return this.Apollo.query({
      query: delete_wishlist,
      variables: {
        wishlist_id,
      }
    });
  }
  list_content() {
    return this.Apollo.query({
      query: list_content,
    });
  }

  syllabus_of_particular_scorm(contentid) {
    return this.Apollo.query({
      query: syllabus_of_particular_scorm,
      variables: {
        contentid,
      }
    });
  }
  getPlayerStatus(id) {
    return this.Apollo.query({
      query: getPlayerStatus,
      variables: {
        user_id: id
      }
    });
  }

  geturl(courseid) {
    return this.Apollo.query({
      query: geturl,
      variables: {
        courseid
      }
    });
  }

  getCoursesByName(courseName) {
    return this.Apollo.query({
      query: getCoursesByName,
      variables: {
        courseName,
      }
    });
  }
  getallcourses(groupid, pagenumber,sort_type) {
    return this.Apollo.query({
      query: get_all_course_by_usergroup,
      variables: {
        group_id: groupid,
        pagenumber: pagenumber,
        sort_type:sort_type
      }
    });
  }
  enrollcourse(id, group_id, course_id) {
    return this.Apollo.query({
      query: enrollcourse,
      variables: {
        user_id: id,
        group_id,
        course_id,
      }
    });
  }
  postGuildelineSearchData(category: any,sub_category: any,super_sub_category: any ,course_language:any,course_mode:any,
    author_details:any,partner_details:any,
    pagenumber,perPage,publishedToDate,publishedFromDate){
    return this.Apollo.query({
      query: getCourseCategorySearch,
      variables: {
        category: category,
        sub_category: sub_category,
        super_sub_category:super_sub_category,
        course_language:course_language,
        course_mode:course_mode,
        author_details:author_details,
        partner_details: partner_details,
       
        pagenumber:pagenumber,
        perPage:perPage,
        publishedFromDate:publishedFromDate,
        publishedToDate:publishedToDate
      }
    });
  }
  getGuidelineSearch(){
    return this.Apollo.query({
      query: getDetailsCount
    });
  }
}
