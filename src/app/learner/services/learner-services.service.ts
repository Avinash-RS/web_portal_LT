import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

import { addTopicreference, bulkclaimcourse, claimcourse, createGuidanceRequest,
   CreateNewThread, CreateNewThreadBid, deleteQualification, getCourseCategorySearch,
    getLevelSubCategoryData, gettopicdetail, getChangePasswordupdateprofile,
    getDistrictdetails, getForgotpasswordbyResetpassword, getForgotpasswordbyUsername,
     getForgotUsernamemobileEmail, getStatedetails, InsertCourseFeedback, markAsRead,
       playerstatusrealtime, resendOtponprofile, saveAttendies, updateEmailonprofile,
       updateMobileonprofile, updateProfile, updateVerifyotpmobileonProfile,
       userMstrdata, userRegistration, userRegistrationdone, userRegistrationmobileOtpsend,
         userRegistrationmobileOtpverify, userRegistrationUsernamesuggestion, viewProfile, viewProfile1, user_experience, set_bookmark, set_askaquestion, getMyQuestion, get_allquestion, getQAsortsearch,getActivityCalendar, getengineersForumData, createEngineersForumData} from './operations/learner_mutation';
import {
boarddetail, checkExistingUser, getActivityDetailsByBatchAndCourseID, getAssignmentmoduleData,
 getcalenderactivity, getCountForCategories, getCountForJobroleCategories, getCoureBasedOnCatalog,
  getCourseActivities, getCoursePlayerStatusForCourse, getDetailsCount, getFeedbackQuestion,
   getlearnerdashboard, getLearnerenrolledCourses, getlearnertrack, getLevelCategoryData,
    getLoginUserDetail, getmoduleData, getperformActivityData, getPopularcourse, getprojectActivityData,
  // getReadLearnerActivity,
  getReadLeanerActivity, getsupersubcategory, getTopicAttendanceDetailsByUsername, getActivecourseCount,
  getAllCategory, getBoardUniversitydetails, getCountrydetails, getCoursebySubcategory,
   getCoursebyUser, getDisciplinedetails, getInstitutedetails, getLanguagedetails,
   getModuletopic, getOrganizationbyId, getPopularCourse, getQualificationdetails,
     getSpecificationdetails, getSubCategory, getTrendingcourse, getUserdetail,
     getUserdetailUsername, listContent, login, playerModuleAndTopic, singleBatchInfo,
     syllabusofParticularScorm, ViewAllThreadData, ViewAllThreadDataBid, ViewSingleTopicDiscussionData, get_batchwise_learner_dashboard_data, get_learner_dashboard_count,
     getCourseGallery , getLearnerNewCourseReport, getCourseReportByUserid, getProgressionActivitydata,selfLearningdatabyUserId, getengineersForumQA_Count,recentlycourse,getlabactivity,labactivity,weekWiseCourseChart
} from './operations/learner_query';


@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {
  secretKey = "(!@#Passcode!@#)";
  httpOptions;
  envWcaApi: any = environment.wcaapiurl;
  envApi: any = environment.apiUrl;
  envApiImg: any = environment.apiUrlImg;
  envCourseApi: any = environment.createCourseApi;
  envDomain: any = environment.domain;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private Apollo: Apollo, private http: HttpClient) { }

  getToken(){
    const token = localStorage.getItem('token')||sessionStorage.getItem('token'); 
    var userDetails = JSON.parse(localStorage.getItem('UserDetails'))
    this.httpOptions = {
      headers: new HttpHeaders({ 
        Authorization: 'Bearer '+token,
        requestId: CryptoJS.AES.encrypt(userDetails['user_id'], this.secretKey.trim()).toString()
       })
    };
  }
  
  closeRecoderdData$ = new Subject<any>();
  closeRecoderdData = this.closeRecoderdData$.asObservable();

  performDetailsSend$ = new Subject<any>();
  performDetailsSend = this.performDetailsSend$.asObservable();

  itrationSend$ = new Subject<any>();
  itrationSend = this.itrationSend$.asObservable();

  closeMobileResp$ = new Subject<any>();
  closeMobileResp = this.closeMobileResp$.asObservable();
  ProgressPercentage = new Subject<any>();

  sendMessage(fileCount, message: string) {
    this.ProgressPercentage.next(
      { 
        text: message ,
        count: fileCount
      }
      );
  }

uploadAssignments(fromdata) { 
  this.getToken();
  return this.http.post(this.envApi + 'wca/learnerscorefile', fromdata, this.httpOptions); 
}

imageupload(fb) {
  this.getToken();
  return this.http.post<any[]>(this.envApiImg + `upload/image`, fb,this.httpOptions);
}

postcomment(data) {
  this.getToken();
  return this.http.post(this.envApi + 'postcomment', data, this.httpOptions);
}

unlikepost(data) {
  this.getToken();
  return this.http.post(this.envApi + 'post_unlike', data, this.httpOptions);
}
likepost(data) {
  this.getToken();
  return this.http.post(this.envApi + 'post_like', data, this.httpOptions);
}
getEmail(input) 
  {
    this.getToken();
   return this.http.post(this.envApi + 'getuserRecordbasedonSecretKey', input,this.httpOptions);
   }

   learnerUploadVideo(data) { 
    this.getToken();
    return this.http.post(environment.apiUrl + 'globalupload', data,this.httpOptions);
   }
  learnerSumbitdeleteVideo(submitData) { 
    this.getToken();
    return this.http.post(environment.apiUrl + 'wca/learnerSumbitdeleteVideo', submitData,this.httpOptions); 
  }
  insertRecord(data) { 
    this.getToken();
    return this.http.post(environment.apiUrl + 'learnerUploadVideo', data,this.httpOptions); }
  learnerRecordVideo(data) { 
    this.getToken();
    return this.http.post(environment.apiUrl + 'wca/learnerRecordVideo', data,this.httpOptions); }


  uploadVideo(image) {
    this.getToken();
    return this.http.post(environment.wcaapiurl + 'api/upload/uploadimagefile', image,this.httpOptions);
  }


clearMessage() {
  this.ProgressPercentage.next();
}
getMessage(): Observable<any> {
  return this.ProgressPercentage.asObservable();
}
  public getData(userid, date) {
    return this.Apollo.query({
      query: getReadLeanerActivity,
      variables: {
        userid,
        date
      }
    });
  }

  login(username, password, isAdmin) {
    return this.Apollo.query({
      query: login,
      variables: {
        username,
        password,
        is_admin: isAdmin
      }
    });
  }


  // getEmail(input) {
  //   const token = localStorage.getItem('token') ;
  //   const httpOptions = {
  //     headers: new HttpHeaders({ Authorization: token })
  //   };
  //   return this.http.post(this.envApi + 'getuserRecordbasedonSecretKey', input, httpOptions);
  // }

  user_registration(email, fullName, mobileNumber, titleId, termsandconditions) {
    return this.Apollo.query({
      query: userRegistration,
      variables: {
        full_name: fullName,
        mobile_number: mobileNumber,
        title_id: titleId,
        email,
        term_condition: termsandconditions,
        domain: this.envDomain
      }
    });
  }

  submit_otp(userId, id, mobile, email) {
    return this.Apollo.query({
      query: userRegistrationmobileOtpsend,
      variables: {
        user_id: userId,
        user: id,
        mobile_number: mobile,
        email
      }
    });
  }


  user_registration_verify(otp, mobileNumber) {
    return this.Apollo.query({
      query: userRegistrationmobileOtpverify,
      variables: {
        otp,
        mobile_number: mobileNumber
      }
    });
  }


  user_registration_done(userId, username, password, createdByIP) {
    return this.Apollo.query({
      query: userRegistrationdone,
      variables: {
        user_id: userId,
        username,
        password,
        created_by_ip: createdByIP
      }
    });
  }

  view_profile(userId) {
    return this.Apollo.query({
      query: viewProfile,
      variables: {
        user_id: userId
      }
    });
  }

  get_country_details() {
    return this.Apollo.query({
      query: getCountrydetails
    });
  }

  get_state_details(id) {
    return this.Apollo.query({
      query: getStatedetails,
      variables: {
        _id: id
      }
    });
  }

  getMyCourse(userId) {
    return this.Apollo.query({
      query: getCoursebyUser,
      variables: {
        user_id: userId
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
      query: userRegistrationUsernamesuggestion,
      variables: {
        user_id: userId
      }
    });
  }

  // checks for existing user or not
  check_existing_user(name) {
    return this.Apollo.query({
      query: checkExistingUser,
      variables: {
        username: name
      }
    });
  }


  forgotUsernameandPassword(type, subtype, mobileNumber, email) {
    return this.Apollo.query({
      query: getForgotUsernamemobileEmail,
      variables: {
        type,
        subtype,
        mobile_number: mobileNumber,
        email,
        domain: this.envDomain
      }
    });
  }
  forgotPasswordByUsername(username) {
    return this.Apollo.query({
      query: getForgotpasswordbyUsername,
      variables: {
        username
      }
    });
  }
  resetPassword(username, password,resetCode) {
    return this.Apollo.query({
      query: getForgotpasswordbyResetpassword,
      variables: {
        username,
        password,
        resetCode
      }
    });
  }
  get_qualification_details() {
    return this.Apollo.query({
      query: getQualificationdetails
    });
  }
  get_board_university_details(id) {
    return this.Apollo.query({
      query: getBoardUniversitydetails,
      variables: {
        _id: id
      }
    });
  }

  get_district_details(country, state) {
    return this.Apollo.query({
      query: getDistrictdetails,
      variables: {
        country,
        state
      }
    });
  }


  get_change_password_updateprofile(username, oldPassword, password) {
    return this.Apollo.query({
      query: getChangePasswordupdateprofile,
      variables: {
        username,
        old_password: oldPassword,
        password
      }
    });
  }
  get_discipline_details(id) {
    return this.Apollo.query({
      query: getDisciplinedetails,
      variables: {
        _id: id
      }
    });
  }
  get_specification_details() {
    return this.Apollo.query({
      query: getSpecificationdetails
    });
  }
  get_institute_details() {
    return this.Apollo.query({
      query: getInstitutedetails
    });
  }
  get_language_details() {
    return this.Apollo.query({
      query: getLanguagedetails
    });
  }

  update_mobile_onprofile(userId, mobileNumber) {
    return this.Apollo.query({
      query: updateMobileonprofile,
      variables: {
        user_id: userId,
        mobile_number: mobileNumber
      }
    });
  }


  update_verifyotp_mobile_onprofile(userId, mobileNumber, otp) {
    return this.Apollo.query({
      query: updateVerifyotpmobileonProfile,
      variables: {
        user_id: userId,
        mobile_number: mobileNumber,
        otp
      }
    });
  }
  get_user_detail(email) {
    return this.Apollo.query({
      query: getUserdetail,
      variables: {
        email
      }
    });
  }
  getLoginUserDetail(email) {
    return this.Apollo.query({
      query: getLoginUserDetail,
      variables: {
        username: email
      }
    });
  }

  get_user_detail_username(username) {
    return this.Apollo.query({
      query: getUserdetailUsername,
      variables: {
        username
      }
    });
  }


  update_email_onprofile(userId, email) {
    return this.Apollo.query({
      query: updateEmailonprofile,
      variables: {
        user_id: userId,
        email,
        domain: this.envDomain
      }
    });
  }
  list_content() {
    return this.Apollo.query({
      query: listContent,
      variables: {}
    });
  }

  syllabus_of_particular_scorm(contentid, userId, courseId) {
    return this.Apollo.query({
      query: syllabusofParticularScorm,
      variables: {
        contentid,
        user_id: userId,
        course_id: courseId
      }
    });
  }

  getModuleData(courseId, userid) {
    return this.Apollo.query({
      query: getmoduleData,
      variables: {
        courseid: courseId,
        user_id: userid
      }
    });
  }

  update_profile(userData) {
    return this.Apollo.query({
      query: updateProfile,
      variables: userData
    });
  }

  delete_qualification(qualificationData) {
    return this.Apollo.query({
      query: deleteQualification,
      variables: qualificationData
    });
  }


  resend_otp_onprofile(userId) {
    return this.Apollo.query({
      query: resendOtponprofile,
      variables: {
        user_id: userId
      }
    });
  }

  getcoursecategory(groupid: any) {
    return this.Apollo.query({
      query: getAllCategory,
      variables: {
        group_id: groupid
      }
    });
  }

  getcoursesubcategory(categoryid) {
    return this.Apollo.query({
      query: getSubCategory,
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
      query: getCoursebySubcategory,
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

  get_module_topic(courseId) {
    return this.Apollo.query({
      query: getModuletopic,
      variables: {
        course_id: courseId
      }
    });
  }

  gettopicdetail(id, modulename) {
    return this.Apollo.query({
      query: gettopicdetail,
      variables: {
        _id: id,
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
    subCategory: any,
    supeSubcategory: any,
    courseLanguage: any,
    courseMode: any,
    authorDetails: any,
    partnerDetails: any,
    pagenumber,
    perPage,
    publishedToDate,
    publishedFromDate,
    catalogueVisibility
  ) {
    return this.Apollo.query({
      query: getCourseCategorySearch,
      variables: {
        category,
        sub_category: subCategory,
        super_sub_category: supeSubcategory,
        course_language: courseLanguage,
        course_mode: courseMode,
        author_details: authorDetails,
        partner_details: partnerDetails,

        pagenumber,
        perPage,
        publishedFromDate,
        publishedToDate,
        catalogue_visibility: catalogueVisibility
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

  view_profile1(userId) {
    return this.Apollo.query({
      query: viewProfile1,
      variables: {
        user_id: userId
      }
    });
  }

  get_enrolled_courses(userId, id, catalogueId, categoryId, jobRoleCategoryId, searchString) {
    return this.Apollo.query({
      query: getLearnerenrolledCourses,
      variables: {
        user_id: userId,
        user_obj_id: id,
        catalogue_id: catalogueId,
        category_id: categoryId,
        jobRoleCategoryId,
        searchString
      }
    });
  }

  bulkclaimcourse(id, userId, categoryId, categoryName) {
    return this.Apollo.query({
      query: bulkclaimcourse,
      variables: {
        id,
        user_id: userId,
        category_id: categoryId,
        categoryName
      }
    });
  }

  getCountForCategories(userObjId) {
    return this.Apollo.query({
      query: getCountForCategories,
      variables: {
        userObjId
      }
    });
  }

  getCoureBasedOnCatalog(catalogueId, categoryId, userObjId, subCategoryId, superSubCategoryId) {
    return this.Apollo.query({
      query: getCoureBasedOnCatalog,
      variables: {
        catalogue_id: catalogueId,
        category_id: categoryId,
        userObjId,
        subCategoryId,
        superSubCategoryId
      }
    });
  }



  getLearnerDashboard(userId, userObjId, pagenumber, requesType, courseType) {
    return this.Apollo.query({
      query: getlearnerdashboard,
      variables: {
        user_id: userId,
        user_obj_id: userObjId,
        pagenumber,
        request_type: requesType,
        course_type: courseType
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
      query: getPopularCourse
    });
  }

  getTrendingInLanding() {
    return this.Apollo.query({
      query: getTrendingcourse
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

  getCoursePlayerStatusForCourse(userId, courseId) {
    return this.Apollo.query({
      query: getCoursePlayerStatusForCourse,
      variables: {
        user_id: userId,
        course_id: courseId
      }
    });
  }

  playerModuleAndTopic(contentID, userId) {
    return this.Apollo.query({
      query: playerModuleAndTopic,
      variables: {
        contentID,
        user_id: userId
      }
    });
  }

  playerstatusrealtime(userId, contentID, module: any, percentage) {
    return this.Apollo.query({
      query: playerstatusrealtime,
      variables: {
        user_id: userId,
        contentID,
        module,
        percentage
      }
    });
  }

  viewsingletopicdiscussion(topicSlug, uid) {
    return this.Apollo.query({
      query: ViewSingleTopicDiscussionData,
      variables: {
        topic_slug: topicSlug,
        uid
      }
    });
  }

  ViewAllThreadData(modId, cid, bid?) {
    if (bid) {
      return this.Apollo.query({
        query: ViewAllThreadDataBid,
        variables: {
          module_name: modId,
          course_id: cid,
          batch_id: bid
        }
      });
    } else {
      return this.Apollo.query({
        query: ViewAllThreadData,
        variables: {
          module_name: modId,
          course_id: cid,
        }
      });
    }
  }

  createNewThread(uid, courseId, moduleName, title, content, courseName, batch?) {
    if (batch) {
      return this.Apollo.query({
        query: CreateNewThreadBid,
        variables: {
          uid,
          course_id: courseId,
           module_name: moduleName,
            title,
            content,
            course_name: courseName,
            batch_name: batch.batch_name,
            batch_id: batch.batch_id
        }
      });
    } else {
      return this.Apollo.query({
        query: CreateNewThread,
        variables: {
          uid, course_id: courseId, module_name: moduleName, title, content, course_name: courseName
        }
      });
    }
  }

  getReadLeanerActivity(userid, date, courseid,status,activity,datetype) {
    return this.Apollo.query({
      query: getReadLeanerActivity,
      variables: {
        userid,
        date,
        courseid,
        status,
        activity,
        datetype
      }
    });
  }

  getAllActivity(userid, date) {
    return this.Apollo.query({
      query: getcalenderactivity,
      variables: {
        userid,
        date
      }
    });
  }

  getLearnerActivity(courseId,status,dateType,date,activityType,userId){
    return this.Apollo.query({
      query: getActivityCalendar,
      variables: {
        courseId,
        status,
        dateType,
        activityType,
        date,
        userId
      }
    });
  }

  get_organization_by_id(organizationId) {
    return this.Apollo.query({
      query: getOrganizationbyId,
      variables: {
        organization_id: organizationId
      }
    });
  }

  claimcourse(id, userId, courseId, courseName, categoryName) {
    return this.Apollo.query({
      query: claimcourse,
      variables: {
        id,
        user_id: userId,
        course_id: courseId,
        courseName,
        categoryName
      }
    });
  }

  getSingleBatchInfo(uid, cid) {
    return this.Apollo.query({
      query: singleBatchInfo,
      variables: {
        user_id: uid,
        course_id: cid
      }
    });
  }

  getRegisterTitle() {
    return this.Apollo.query({
      query: userMstrdata,
      variables: {}
    });
  }

  add_topic_reference(userId, batchId, courseId, moduleId, topicId, referenceId, referenceStatus, createdBy) {
    return this.Apollo.query({
      query: addTopicreference,
      variables: {
        user_id: userId,
        batch_id: batchId,
        course_id: courseId,
        module_id: moduleId,
        topic_id: topicId,
        reference_id: referenceId,
        reference_status: referenceStatus,
        created_by: createdBy
      }
    });
  }

  getCountForJobroleCategories(userObjId, userId) {
    return this.Apollo.query({
      query: getCountForJobroleCategories,
      variables: {
        userObjId,
        userId
      }
    });
  }
  markAsRead(notifications: any, userId) {
    return this.Apollo.query({
      query: markAsRead,
      variables: {
        notifications,
        userId
      }
    });
  }
  getCourseActivities(userId, PageNumber, courseId, sortType, searchValue, searchColumn, statusBased) {
    return this.Apollo.query({
      query: getCourseActivities,
      variables: {
        user_id: userId,
        pagenumber: PageNumber,
        course_id: courseId,
        sort_type: sortType,
        searchvalue: searchValue,
        searchcolumn: searchColumn,
        status: statusBased,
      }
    });
  }
  getlabactivity(labdata){
    return this.Apollo.query({
      query:getlabactivity,
      variables:{
        batchid: labdata.batchid,
        course_id:labdata.course_id
      }
    })
  }

  labactivity(labdetails){
    return this.Apollo.query({
      query: labactivity,
      variables:{
        username:labdetails.username,
        course_id:labdetails.course_id
      }
    });
  }

  getAssignmentmoduleData(userId,courseid,pagination,page,noofItems) {
    return this.Apollo.query({
      query: getAssignmentmoduleData,
      variables: {
        user_id: userId,
        courseid,
        page,
        pagination,
        noofItems
      }
    });
  }
getprojectActivityData(userId, courseId,pagination,page,noofItems) {
  return this.Apollo.query({
    query: getprojectActivityData,
    variables: {
      userId,
      courseId,
      pagination,
      page,
      noofItems
    }
  });
}
// get perform activity details
  getperformActivityData(userId, courseId,pagination,page,noofItems) {
    return this.Apollo.query({
      query: getperformActivityData,
      variables: {
        userId,
        courseId,
        pagination,
        page,
        noofItems
      }
    });
  }

  get_active_course_count(userId) {
    return this.Apollo.query({
      query: getActivecourseCount,
      variables: {
        user_id: userId,
      }
    });
  }

  boarddetail(userId, courseId) {
    return this.Apollo.query({
      query: boarddetail,
      variables: {
        user_id: userId,
        course_id: courseId
      }
    });
  }


getActivityDetailsByCourseAndBatchID(batchid, courseid) {
    return this.Apollo.query({ // Get Activity Details For Instrcutor Led Screen.
      query: getActivityDetailsByBatchAndCourseID,
      variables: {
        batchid,
        courseid
      }
    });
  }

  getAttendanceByUsername(courseid, fullName, userId) {
    return this.Apollo.query({ // Get Activity Details For Instrcutor Led Screen.
      query: getTopicAttendanceDetailsByUsername,
      variables: {
        courseid,
        full_name: fullName,
        user_id: userId
      }
    });
  }

  get_batchwise_learner_dashboard_data(user_id,request_type,jobroleCategoryId) {
    return this.Apollo.query({
      query: get_batchwise_learner_dashboard_data,
      variables: {
        user_id,
        request_type,
        jobroleCategoryId
      }
    });
  }

  get_learner_dashboard_count(user_id,user_obj_id, jobroleCategoryId) {
    return this.Apollo.query({
      query: get_learner_dashboard_count,
      variables: {
        user_id,
        user_obj_id,
        jobroleCategoryId
      }
    });
  }

  userexperience(user_id,course_id,module,topic,userexperience,status) {
    return this.Apollo.query({
      query: user_experience,
      variables: {
        user_id,
        course_id,
        module,
        topic,
        userexperience,
        status
      }
    });
  }
  bookmark(user_id,course_id,module,topic,bookmark) {
    return this.Apollo.query({
      query: set_bookmark,
      variables: {
        user_id,
        course_id,
        module,
        topic,
        bookmark
      }
    });
  }
  
  askaquestion(user_id,course_id,module,topic,question) {
    return this.Apollo.query({
      query: set_askaquestion,
      variables: {
        user_id,
        course_id,
        module,
        topic,
        question
      }
    });
  }

  getMyQuestion(user_id,course_id,module,topic) {
    return this.Apollo.query({
      query: getMyQuestion,
      variables: {
        user_id,
        course_id,
        module,
        topic,
      }
    });
  }
  getallquestion(user_id,course_id,module,topic,sort,batchid) {
    return this.Apollo.query({
      query: get_allquestion,
      variables: {
        user_id,
        course_id,
        module,
        topic,
        sort,
        batchid
      }
    });
  }
  getQAsortsearch(batchid, course_id, sort, pagenumber, module, topic) {
    return this.Apollo.query({
      query: getQAsortsearch,
      variables: {
        batchid,
        course_id,
        sort,
        pagenumber,
        type: true,
        module,
        topic,
        screenType: 'learner'
      }
    });
  }

  getcourseGallery(courseid) {
    return this.Apollo.query({
      query: getCourseGallery,
      variables: {
        courseid
      }
    });
  }
  getLearnerNewCourseReport(batchid,courseid,userid,refresh,selflearning_totalweeks,colloboration_totalweeks) {
    return this.Apollo.query({
      query: getLearnerNewCourseReport,
      variables: {
        batchid,
        courseid,
        userid,
        refresh,
        selflearning_totalweeks,
        colloboration_totalweeks
      }
    });
  }

 getProgressionData(user_id,course_id) {
    return this.Apollo.query({
      query: getCourseReportByUserid,
      variables: {
        user_id,
        course_id,
      }
    });
  }

  getSelfLearningdata(type,userId,courseId) {
    return this.Apollo.query({
      query: selfLearningdatabyUserId,
      variables: {
        type,
        userId,
        courseId,
      }
    });
  }

  getProgressionActivitydata(userId,courseId) {
    return this.Apollo.query({
      query: getProgressionActivitydata,
      variables: {
        userId,
        courseId,
      }
    });
  }
  getengineersForumData(userId,courseId,requestType,pagenumber,searchString) {
    return this.Apollo.query({
      query: getengineersForumData,
      variables: {
        userId,
        courseId,
        requestType,
        pagenumber,
        searchString
      }
    });
  }
  getengineersForumQA_Count(userId,courseId) {
    return this.Apollo.query({
      query: getengineersForumQA_Count,
      variables: {
        userId,
        courseId,
      }
    });
  }
  createEngineersForumData(userId,userName,courseId,question,courseName) {
    return this.Apollo.query({
      query: createEngineersForumData,
      variables: {
        userId,
        userName,
        courseId,
        question,
        courseName
      }
    });
  }

  recentlycourse(user_id) {
    return this.Apollo.query({
      query: recentlycourse,
      variables: {
        user_id
      }
    });
  }

  getweekWiseCourseChart(courseId,userId,startDate){
    return this.Apollo.query({
      query:weekWiseCourseChart,
      variables:{
        courseId:courseId,
        userId:userId,
        startDate:startDate
      }
    });
  }
}
