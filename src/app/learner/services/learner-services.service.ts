import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  login,
  get_course_by_user,
  get_country_details,
  get_qualification_details,
  get_trending_course,
  get_board_university_details,
  get_discipline_details,
  get_specification_details,
  get_popular_course,
  get_institute_details,
  get_language_details,
  get_user_detail,
  list_content,
  syllabus_of_particular_scorm,
  getmoduleData,
  get_user_detail_username,
  check_existing_user,
  get_all_category,
  getPopularcourse,
  get_sub_category,
  get_course_by_subcategory,
  get_module_topic,
  getsupersubcategory,
  getLevelCategoryData,
  getDetailsCount,
  getlearnertrack,
  getLearnerenrolledCourses,
  getlearnerdashboarddetails,
  getFeedbackQuestion,
  getCoursePlayerStatusForCourse,
  getAssignmentmoduleData,
  playerModuleAndTopic,
  ViewSingleTopicDiscussionData,
  ViewAllThreadData,
  // get_read_learner_activity,
  getReadLeanerActivity,
  get_organization_by_id,
  getCountForCategories
} from './operations/learner_query';

import {
  user_registration,
  user_registration_mobile_otp_send,
  user_registration_mobile_otp_verify,
  get_forgot_username_mobile_email,
  get_forgot_password_byusername,
  user_registration_username_suggestion,
  view_profile,
  get_state_details,
  user_registration_done,
  get_forgot_password_byresetpassword,
  get_district_details,
  get_change_password_updateprofile,
  update_mobile_onprofile,
  getLevelSubCategoryData,
  update_verifyotp_mobile_onprofile,
  update_email_onprofile,
  update_profile,
  resend_otp_onprofile,
  delete_qualification,
  gettopicdetail,
  getCourseCategorySearch,
  view_profile1,
  createGuidanceRequest,
  InsertCourseFeedback,
  playerstatusrealtime,
  CreateNewThread
} from './operations/learner_mutation';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {
  envWcaApi: any = environment.wcaapiurl;
  envApi: any = environment.apiUrl;
  envApiImg: any = environment.apiUrlImg;
  envCourseApi: any = environment.createCourseApi;
  envDomain: any = environment.domain;

  constructor(private Apollo : Apollo, private http: HttpClient) {}

  public getData(userid, date) {
    return this.Apollo.query({
      query: getReadLeanerActivity,
      variables: {
        userid,
        date
      }
    });
  }
  login(username, password, is_admin) {
    return this.Apollo.query({
      query: login,
      variables: {
        username,
        password,
        is_admin
      }
    });
  }

  imageupload(fb) {
    return this.http.post<any[]>(this.envApiImg + `upload/image`, fb);
  }

  postcomment(data) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token })
    };
    return this.http.post(this.envApi + 'postcomment', data, httpOptions);
  }

  unlikepost(data) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token })
    };
    return this.http.post(this.envApi + 'post_unlike', data, httpOptions);
  }
  likepost(data) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token })
    };
    return this.http.post(this.envApi + 'post_like', data, httpOptions);
  }

  user_registration(email, full_name, mobile_number, termsandconditions) {
    return this.Apollo.query({
      query: user_registration,
      variables: {
        full_name,
        mobile_number,
        email,
        term_condition: termsandconditions,
        domain: this.envDomain
      }
    });
  }

  submit_otp(user_id, _id, mobile, email) {
    return this.Apollo.query({
      query: user_registration_mobile_otp_send,
      variables: {
        user_id,
        user: _id,
        mobile_number: mobile,
        email
      }
    });
  }

  user_registration_verify(otp, mobile_number) {
    return this.Apollo.query({
      query: user_registration_mobile_otp_verify,
      variables: {
        otp,
        mobile_number
      }
    });
  }

  user_registration_done(user_id, username, password, created_by_ip) {
    return this.Apollo.query({
      query: user_registration_done,
      variables: {
        user_id,
        username,
        password,
        created_by_ip
      }
    });
  }
  view_profile(user_id) {
    return this.Apollo.query({
      query: view_profile,
      variables: {
        user_id
      }
    });
  }
  get_country_details() {
    return this.Apollo.query({
      query: get_country_details
    });
  }
  get_state_details(_id) {
    return this.Apollo.query({
      query: get_state_details,
      variables: {
        _id
      }
    });
  }
  getMyCourse(user_id) {
    return this.Apollo.query({
      query: get_course_by_user,
      variables: {
        user_id
      }
    });
  }
  // submit_otp(user_id,_id,mobile) {
  //   return this.Apollo.query({
  //     query: user_registration_mobile_otp_send,
  //     variables: {
  //       mobile_number:mobile,
  //       user_id:user_id,
  //       user:_id,

  userNamesuggestion(userId) {
    return this.Apollo.query({
      query: user_registration_username_suggestion,
      variables: {
        user_id: userId
      }
    });
  }

  // checks for existing user or not
  check_existing_user(name) {
    return this.Apollo.query({
      query: check_existing_user,
      variables: {
        username: name
      }
    });
  }

  forgotUsernameandPassword(type, subtype, mobile_number, email) {
    return this.Apollo.query({
      query: get_forgot_username_mobile_email,
      variables: {
        type,
        subtype,
        mobile_number,
        email,
        domain: this.envDomain
      }
    });
  }
  forgotPasswordByUsername(username) {
    return this.Apollo.query({
      query: get_forgot_password_byusername,
      variables: {
        username
      }
    });
  }
  resetPassword(username, password) {
    return this.Apollo.query({
      query: get_forgot_password_byresetpassword,
      variables: {
        username,
        password
      }
    });
  }
  get_qualification_details() {
    return this.Apollo.query({
      query: get_qualification_details
    });
  }
  get_board_university_details(id) {
    return this.Apollo.query({
      query: get_board_university_details,
      variables: {
        _id: id
      }
    });
  }

  get_district_details(country, state) {
    return this.Apollo.query({
      query: get_district_details,
      variables: {
        country,
        state
      }
    });
  }

  get_change_password_updateprofile(username, old_password, password) {
    return this.Apollo.query({
      query: get_change_password_updateprofile,
      variables: {
        username,
        old_password,
        password
      }
    });
  }
  get_discipline_details(id) {
    return this.Apollo.query({
      query: get_discipline_details,
      variables: {
        _id: id
      }
    });
  }
  get_specification_details() {
    return this.Apollo.query({
      query: get_specification_details
    });
  }
  get_institute_details() {
    return this.Apollo.query({
      query: get_institute_details
    });
  }
  get_language_details() {
    return this.Apollo.query({
      query: get_language_details
    });
  }

  update_mobile_onprofile(user_id, mobile_number) {
    return this.Apollo.query({
      query: update_mobile_onprofile,
      variables: {
        user_id,
        mobile_number
      }
    });
  }

  update_verifyotp_mobile_onprofile(user_id, mobile_number, otp) {
    return this.Apollo.query({
      query: update_verifyotp_mobile_onprofile,
      variables: {
        user_id,
        mobile_number,
        otp
      }
    });
  }
  get_user_detail(email) {
    return this.Apollo.query({
      query: get_user_detail,
      variables: {
        email
      }
    });
  }

  get_user_detail_username(username) {
    return this.Apollo.query({
      query: get_user_detail_username,
      variables: {
        username
      }
    });
  }

  update_email_onprofile(user_id, email) {
    return this.Apollo.query({
      query: update_email_onprofile,
      variables: {
        user_id,
        email,
        domain: this.envDomain
      }
    });
  }
  list_content() {
    return this.Apollo.query({
      query: list_content,
      variables: {}
    });
  }
  syllabus_of_particular_scorm(contentid, user_id, course_id) {
    return this.Apollo.query({
      query: syllabus_of_particular_scorm,
      variables: {
        contentid,
        user_id,
        course_id
      }
    });
  }
  getModuleData(course_id, userid) {
    return this.Apollo.query({
      query: getmoduleData,
      variables: {
        courseid: course_id,
        user_id: userid
      }
    });
  }

  update_profile(userData) {
    return this.Apollo.query({
      query: update_profile,
      variables: userData
    });
  }

  delete_qualification(qualificationData) {
    return this.Apollo.query({
      query: delete_qualification,
      variables: qualificationData
    });
  }

  resend_otp_onprofile(user_id) {
    return this.Apollo.query({
      query: resend_otp_onprofile,
      variables: {
        user_id
      }
    });
  }

  getcoursecategory(groupid: any) {
    return this.Apollo.query({
      query: get_all_category,
      variables: {
        group_id: groupid
      }
    });
  }

  getcoursesubcategory(categoryid) {
    return this.Apollo.query({
      query: get_sub_category,
      variables: {
        category_id: categoryid
      }
    });
  }
  getsupersubcategory(subcategoryid) {
    return this.Apollo.query({
      query: getsupersubcategory,
      variables: {
        sub_category_id: subcategoryid
      }
    });
  }

  getcourse(subcategory) {
    return this.Apollo.query({
      query: get_course_by_subcategory,
      variables: {
        input_id: subcategory._id,
        input_type: subcategory.type,
        pagenumber: subcategory.pagenumber
      }
    });
  }

  // getallcourses(groupid, pagenumber,sort_type) {
  //   return this.Apollo.query({
  //     query: get_all_course_by_usergroup,
  //     variables: {
  //       group_id: groupid,
  //       pagenumber: pagenumber,
  //       sort_type:sort_type
  //     }
  //   });
  // }
  get_module_topic(course_id) {
    return this.Apollo.query({
      query: get_module_topic,
      variables: {
        course_id
      }
    });
  }
  gettopicdetail(_id, modulename) {
    return this.Apollo.query({
      query: gettopicdetail,
      variables: {
        _id,
        module_name: modulename
      }
    });
  }
  // Getting all 3 level Category data
  getLevelCategoryData() {
    return this.Apollo.query({
      query: getLevelCategoryData
    });
  }
  // After selection category in category level filter
  getLevelSubCategoryData(level1: any, level2: any, level3: any) {
    return this.Apollo.query({
      query: getLevelSubCategoryData,
      variables: {
        level1,
        level2,
        level3
      }
    });
  }

  // Get guideline search for geeting all filter values
  getGuidelineSearch() {
    return this.Apollo.query({
      query: getDetailsCount
    });
  }

  postCategoryFilter(data) {
    return this.http.post<any[]>(this.envApi + `getsublevelcategories`, data);
  }

  // Guildeline selected filter value and getting courses
  postGuildelineSearchData(
    category: any,
    sub_category: any,
    super_sub_category: any,
    course_language: any,
    course_mode: any,
    author_details: any,
    partner_details: any,
    pagenumber,
    perPage,
    publishedToDate,
    publishedFromDate,
    catalogue_visibility
  ) {
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
        publishedToDate,
        catalogue_visibility
      }
    });
  }

  getlearnertrack(level1: any, level2: any) {
    return this.Apollo.query({
      query: getlearnertrack,
      variables: {
        user_id: level1,
        _id: level2
      }
    });
  }
  view_profile1(user_id) {
    return this.Apollo.query({
      query: view_profile1,
      variables: {
        user_id
      }
    });
  }
  get_enrolled_courses(user_id, id) {
    return this.Apollo.query({
      query: getLearnerenrolledCourses,
      variables: {
        user_id,
        user_obj_id: id
      }
    });
  }
  getCountForCategories() {
    return this.Apollo.query({
      query: getCountForCategories
    });
  }

  get_learner_dashboard(user_id) {
    return this.Apollo.query({
      query: getlearnerdashboarddetails,
      variables: {
        user_id
      }
    });
  }

  createGuidanceRequestLanding(name, emailid, courseid, createdbyip) {
    return this.Apollo.query({
      query: createGuidanceRequest,
      variables: {
        name,
        email_id: emailid,
        created_by_ip: createdbyip,
        course_id: courseid
      }
    });
  }

  getPopularInLanding() {
    return this.Apollo.query({
      query: get_popular_course
    });
  }

  getTrendingInLanding() {
    return this.Apollo.query({
      query: get_trending_course
    });
  }
  getPopularcourse() {
    return this.Apollo.query({
      query: getPopularcourse
    });
  }
  getFeedbackQuestion() {
    return this.Apollo.query({
      query: getFeedbackQuestion
    });
  }
  InsertCourseFeedback(feedback) {
    return this.Apollo.query({
      query: InsertCourseFeedback,
      variables: feedback
    });
  }
  getCoursePlayerStatusForCourse(user_id, course_id) {
    return this.Apollo.query({
      query: getCoursePlayerStatusForCourse,
      variables: {
        user_id,
        course_id
      }
    });
  }

  getAssignmentmoduleData(courseid, user_id) {
    return this.Apollo.query({
      query: getAssignmentmoduleData,
      variables: {
        courseid,
        user_id
      }
    });
  }

  playerModuleAndTopic(contentID, user_id) {
    return this.Apollo.query({
      query: playerModuleAndTopic,
      variables: {
        contentID,
        user_id
      }
    });
  }

  playerstatusrealtime(user_id, contentID, module: any, percentage) {
    return this.Apollo.query({
      query: playerstatusrealtime,
      variables: {
        user_id,
        contentID,
        module,
        percentage
      }
    });
  }

  viewsingletopicdiscussion(topic_slug, uid) {
    return this.Apollo.query({
      query: ViewSingleTopicDiscussionData,
      variables: {
        topic_slug,
        uid
      }
    });
  }

  ViewAllThreadData(modId, cid) {
    return this.Apollo.query({
      query: ViewAllThreadData,
      variables: {
        module_name: modId,
        course_id: cid
      }
    });
  }

  createNewThread(uid, course_id, module_name, title, content, course_name) {
    return this.Apollo.query({
      query: CreateNewThread,
      variables: {
        uid,
        course_id,
        module_name,
        title,
        content,
        course_name
      }
    });
  }

  getReadLeanerActivity(userid, date) {
    return this.Apollo.query({
      query: getReadLeanerActivity,
      variables: {
        userid,
        date
      }
    });
  }

  get_organization_by_id(organization_id) {
    return this.Apollo.query({
      query: get_organization_by_id,
      variables: {
        organization_id
      }
    });
  }
}
