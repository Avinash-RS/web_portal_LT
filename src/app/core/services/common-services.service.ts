import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {
  logout, viewcourse, view_wishlist, list_content, syllabus_of_particular_scorm,
  getCoursesByName, get_all_course_by_usergroup
} from '@core/services/operations/common_query';
import {
  add_to_wishlist, delete_wishlist, getPlayerStatus, geturl, enrollcourse,
  getCourseCategorySearch, getDetailsCount
} from '@core/services/operations/common_mutation';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private Apollo: Apollo, private http: HttpClient,) { }
  //Search Component for search all courses
  globalSearch$ = new Subject<any>();
  globalSearch = this.globalSearch$.asObservable();

  //Global for all courses(Guideline search to Category and View all courses)
  globalCourses$ = new Subject<any>();
  globalCourses = this.globalCourses$.asObservable();

  //Guideline search to Category for Clear all filter
  globalFilterCategory$ = new Subject<any>();
  globalFilterCategory = this.globalFilterCategory$.asObservable();

  //Guideline search to Category for removing Category from applied filter
  globalCategory$ = new Subject<any>();
  globalCategory = this.globalCategory$.asObservable();

  //Category to view all courses component for applying category
  globalAllCategory$ = new Subject<any>();
  globalAllCategory = this.globalAllCategory$.asObservable();

  // Category to guideline search component
  selectedCategory$ = new Subject<any>();
  selectedCategory = this.selectedCategory$.asObservable();

  // Category to view all courses component to show category on applied filter
  appliedCategory$ = new Subject<any>();
  appliedCategory = this.appliedCategory$.asObservable();

  loader$ = new Subject<boolean>();
  loader = this.loader$.asObservable();

  isLoad = true;

  //While closing video palyer, pause video in course preview page
  pauseVideo$ = new Subject<any>();
  pauseVideo = this.pauseVideo$.asObservable();

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

  viewCurseByID(course_id,user_id) {
    return this.Apollo.query({
      query: viewcourse,
      variables: {
        course_id,
        user_id
      }
    });
  }

  viewWishlist(userid, pagenumber) {
    return this.Apollo.query({
      query: view_wishlist,
      variables: {
        user_id: userid,
        pagenumber
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

  getCoursesByName(courseName, pagenumber) {
    return this.Apollo.query({
      query: getCoursesByName,
      variables: {
        courseName,
        pagenumber
      }
    });
  }
  getallcourses(groupid, pagenumber, sort_type) {
    return this.Apollo.query({
      query: get_all_course_by_usergroup,
      variables: {
        group_id: groupid,
        pagenumber,
        sort_type
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
  postGuildelineSearchData(category: any, sub_category: any, super_sub_category: any, course_language: any, course_mode: any,
    author_details: any, partner_details: any,
    pagenumber, perPage, publishedToDate, publishedFromDate) {
    return this.Apollo.query({
      query: getCourseCategorySearch,
      variables: {
        category,
        sub_category,
        super_sub_category,
        course_language,
        course_mode,
        author_details,
        partner_details,

        pagenumber,
        perPage,
        publishedFromDate,
        publishedToDate
      }
    });
  }
  getGuidelineSearch() {
    return this.Apollo.query({
      query: getDetailsCount
    });
  }
  getIpAddressByUrl() {
    // return 'http://api.ipify.org/?format=json';
    this.http.get(environment.systemIp).subscribe((res: any) => {
      // this.ipAddress = res.ip;
      localStorage.setItem('Systemip', res.ip);
    });
  }
}
