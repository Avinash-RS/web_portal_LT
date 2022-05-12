import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  add_to_wishlist, delete_wishlist, enrollcourse,
  getCourseCategorySearch, getDetailsCount, getPlayerStatus, geturl
} from '@core/services/operations/common_mutation';
// tslint:disable-next-line: max-line-length
import { getAllNotifications, getCoursesByName, get_all_course_by_usergroup, list_content, logout, syllabus_of_particular_scorm, viewcourse, view_wishlist, view_course_for_learner } from '@core/services/operations/common_query';
import { environment } from '@env/environment';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import * as publicIp from 'public-ip';
@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  httpOptions;
  // Search Component for search all courses
  globalSearch$ = new Subject<any>();
  globalSearch = this.globalSearch$.asObservable();

  // Global for all courses(Guideline search to Category and View all courses)
  globalCourses$ = new Subject<any>();
  globalCourses = this.globalCourses$.asObservable();

  // Guideline search to Category for Clear all filter
  globalFilterCategory$ = new Subject<any>();
  globalFilterCategory = this.globalFilterCategory$.asObservable();

  // Guideline search to Category for removing Category from applied filter
  globalCategory$ = new Subject<any>();
  globalCategory = this.globalCategory$.asObservable();

  // Category to view all courses component for applying category
  globalAllCategory$ = new Subject<any>();
  globalAllCategory = this.globalAllCategory$.asObservable();

  // Category to guideline search component
  selectedCategory$ = new Subject<any>();
  selectedCategory = this.selectedCategory$.asObservable();

  // Category to view all courses component to show category on applied filter
  appliedCategory$ = new Subject<any>();
  appliedCategory = this.appliedCategory$.asObservable();

  // performance mobile Responsive
  menuSelectedPerform$ = new Subject<any>();
  menuSelectedPerform = this.menuSelectedPerform$.asObservable();

  loader$ = new Subject<boolean>();
  loader = this.loader$.asObservable();

  isLoad = true;

  notificationCount$ = new Subject<any>();
  notificationCount = this.notificationCount$.asObservable();

  notificationStatus$ = new Subject<any>();
  notificationStatus = this.notificationStatus$.asObservable();

  openAvailCourcePopup$ = new Subject<any>();
  openAvailCourcePopup = this.openAvailCourcePopup$.asObservable();

  closeAvailPopup$ = new Subject<any>();
  closeAvailPopup = this.closeAvailPopup$.asObservable();

  openNotification$ = new Subject<any>();
  openNotification = this.openNotification$.asObservable();

  updateProfilePic = new Subject<any>();
  // While closing video palyer, pause video in course preview page
  pauseVideo$ = new Subject<any>();
  pauseVideo = this.pauseVideo$.asObservable();

  constructor(private apollo: Apollo, private http: HttpClient, ) { }

  getToken() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    var userDetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        requestId: userDetails['user_id']
       })
    };
  }
  logout(user_id, is_admin) {
    // this.apollo.getClient().resetStore();
    var is_step = localStorage.getItem('step') == 'true' ? true : false;
    return this.apollo.query({
      query: logout,
      variables: {
        user_id,
        is_admin,
        is_step
      }
    });
  }

  viewCurseByID(courseId, userId) {
    return this.apollo.query({
      query: viewcourse,
      variables: {
        course_id: courseId,
        user_id: userId
      }
    });
  }

  viewCurseByIDForLearner(courseId) {
    return this.apollo.query({
      query: view_course_for_learner,
      variables: {
        course_id: courseId
      }
    });
  }

  viewWishlist(userid, pagenumber) {
    return this.apollo.query({
      query: view_wishlist,
      variables: {
        user_id: userid,
        pagenumber
      }
    });
  }

  addWishlist(courseId, userId) {
    return this.apollo.query({
      query: add_to_wishlist,
      variables: {
        courseId,
        userId
      }
    });
  }

  removeWishlist(wishlistId) {
    return this.apollo.query({
      query: delete_wishlist,
      variables: {
        wishlistId,
      }
    });
  }
  list_content() {
    return this.apollo.query({
      query: list_content,
    });
  }

  syllabus_of_particular_scorm(contentid) {
    return this.apollo.query({
      query: syllabus_of_particular_scorm,
      variables: {
        contentid,
      }
    });
  }
  getPlayerStatus(id) {
    return this.apollo.query({
      query: getPlayerStatus,
      variables: {
        user_id: id
      }
    });
  }

  geturl(courseid) {
    return this.apollo.query({
      query: geturl,
      variables: {
        courseid
      }
    });
  }

  getCoursesByName(courseName, pagenumber) {
    return this.apollo.query({
      query: getCoursesByName,
      variables: {
        courseName,
        pagenumber
      }
    });
  }
  getallcourses(groupid, pagenumber, sortType) {
    return this.apollo.query({
      query: get_all_course_by_usergroup,
      variables: {
        group_id: groupid,
        pagenumber,
        sortType
      }
    });
  }
  enrollcourse(id, groupId, courseId) {
    return this.apollo.query({
      query: enrollcourse,
      variables: {
        user_id: id,
        groupId,
        courseId,
      }
    });
  }
  postGuildelineSearchData(category: any, subCategory: any, superSubCategory: any, courseLanguage: any, courseMode: any,
                           authorDetails: any, partnerDetails: any,
                           pagenumber, perPage, publishedToDate, publishedFromDate) {
    return this.apollo.query({
      query: getCourseCategorySearch,
      variables: {
        category,
        subCategory,
        superSubCategory,
        courseLanguage,
        courseMode,
        authorDetails,
        partnerDetails,

        pagenumber,
        perPage,
        publishedFromDate,
        publishedToDate
      }
    });
  }
  getAllNotifications(userId, userType, pagenumber) {
    return this.apollo.query({
      query: getAllNotifications,
      variables: {
        userId,
        userType,
        pagenumber
      }
    });
  }
  getGuidelineSearch() {
    return this.apollo.query({
      query: getDetailsCount
    });
  }
  getIpAddressByUrl() {
    publicIp.v4().then((ip) => {
      localStorage.setItem('Systemip', ip);
    });
  }
  verifyCaptcha(response) {
    let data = {
      ' response ': response,
      // Visible captcha
      // 'secret': '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'
      // invisble captcha
      ' secret ': '6LfFoOccAAAAADiqVaCeBi5wK9ShZBYE3BwR9Cdq'
    };
    // return this.http.get(`https://www.google.com/recaptcha/api/siteverify?email=l7gokul@gmail.com&g-recaptcha-response=${response}`);
    return this.http.post(`https://www.google.com/recaptcha/api/siteverify`, data);
  }

  getTOC(postParam) {
    this.getToken();
    return this.http.post(environment.apiUrl + 'navTreeV2', postParam, this.httpOptions);
  }
  urlStatusCheck(url) {
    return this.http.get(url,{responseType:'text'})
}
  
}
