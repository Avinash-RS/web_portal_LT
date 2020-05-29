import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  user_registration, createusergroup, update_notification, groupstatus, update_group,
  create_catelogue, reassigncourse, update_catalogue, delete_catalogue, create_master_catalogue,
  updatecatalogueinfo, unmapcoursesfromcatalogue, coursecataloguemapping, rejectenrollment, approveenrollment
} from './operations/admin_mutation';

import {
  get_user_group, search_user, deactivate_reactivate_user, get_all_user, block_user, get_all_learner_detail,
  get_user_session_detail, get_course_createdby_admin, publishcourse, get_course_published, getgroup, get_user_group_hierarchy,
  getnotificationreports, get_draft_course, getcategoryadmin, getallcatalogue, getallcatalogue_by_id, getcatalogue,
  getenrolledcourses, get_all_enrolledcourses, getcoursesforcatalogue, getcoursesincatalogue, getAdminOverview,
  getAdmindashboardCoursetab, getLeranertabCount, getActiveinactiveCount, getLoginsPerDay, getUsersInWeeks, getProfessionalStudent,
  enrolledCourse, getgroupbyid, getTopfiveDashboardType
} from './operations/admin_query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  _currentUser: any;

  constructor(private Apollo: Apollo, private http: HttpClient) { }

  // for add user - group dropdown
  getUserGroup() {
    return this.Apollo.query({
      query: get_user_group,
    });
  }

  // Add user flow
  // tslint:disable-next-line:variable-name
  user_registration(email: any, full_name: any, termsandconditions: boolean, group_id?: any, group_name?: any, admin?: any[]) {
    return this.Apollo.query({
      query: user_registration,
      variables: {
        full_name,
        email,
        term_condition: termsandconditions,
        group_id,
        group_name,
        admin
      }
    });
  }

  bulkuserupload(fb) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970' })
    };
    return this.http.post<any[]>(environment.apiUrlImg + 'bulkuserupload', fb, httpOptions);
  }
  // end of Add user flow

  // User Management
  getAllUsers(pagenumber, sort, groupname?) {
    return this.Apollo.query({
      query: get_all_user,
      variables: {
        pagenumber,
        sort,
        group_name: groupname
      }
    });
  }
  // api current;y not used
  // tslint:disable-next-line:variable-name
  getLearnerDetail(user_id: any) {
    return this.Apollo.query({
      query: get_all_learner_detail,
      variables: {
        user_id,
      }
    });
  }

  // tslint:disable-next-line:variable-name
  getUserSession(user_id) {
    return this.Apollo.query({
      query: get_user_session_detail,
      variables: {
        user_id,
      }
    });
  }

  // tslint:disable-next-line:variable-name
  searchUser(search_string, pagination, sort) {
    return this.Apollo.query({
      query: search_user,
      variables: {
        search_string,
        pagination,
        sort,
      }
    });
  }

  // tslint:disable-next-line:variable-name
  deActivate_And_reActivate_User(user_id, is_active) {
    return this.Apollo.query({
      query: deactivate_reactivate_user,
      variables: {
        user_id,
        is_active,
      }
    });
  }
  // tslint:disable-next-line:variable-name
  blockUser(user_id, is_blocked) {
    return this.Apollo.query({
      query: block_user,
      variables: {
        user_id,
        is_blocked,
      }
    });
  }
  // end of User Management

  // Group Management
  // tslint:disable-next-line:variable-name
  updateGroup(_id, group_name, group_id) {
    return this.Apollo.query({
      query: update_group,
      variables: {
        _id,
        group_name,
        group_id
      }
    });
  }

  gethierarchies() {
    return this.Apollo.query({
      query: get_user_group_hierarchy,
    });
  }

  getgroup(data) {
    return this.Apollo.query({
      query: getgroup,
      variables: {
        input_id: data.input_id, type: data.type, pagenumber: data.pagenumber
      }
    });
  }

  creategroup(group) {
    return this.Apollo.query({
      query: createusergroup,
      variables: {
        group_name: group.group_name, group_type: group.group_type,
        parent_group_id: group.parent_group_id, hierarchy_id: group.hierarchy_id,
        admin_id: group.admin_id, catalogue_id: group.catalogue_id
      }
    });
  }

  updategroupdetails(data) {
    return this.Apollo.query({
      query: groupstatus,
      variables: {
        catalogue_id: data.catalogue_id,
        catalogue_name: data.catalogue_name,
        is_active: data.is_active,
        group_id: data.group_id,
        group_name: data.group_name,
        group_type: data.group_type,
        parent_group_id: data.parent_group_id,
        hierarchy_id: data.hierarchy_id,
        admin_id: data.admin_id,
        created_by: data.created_by
      }
    });
  }

  getgroupbyid(groupid) {
    return this.Apollo.query({
      query: getgroupbyid,
      variables: {
        group_id: groupid
      }
    });
  }

  // end of Group Management

  // Notifications
  // tslint:disable-next-line:variable-name
  getNotificationData(admin_id) {
    return this.Apollo.query({
      query: getnotificationreports,
      variables: {
        admin_id,
      }
    });
  }
  // tslint:disable-next-line:variable-name
  removeNotificationData(report_id) {
    return this.Apollo.query({
      query: update_notification,
      variables: {
        report_id,
      }
    });
  }
  // end of Notifications

  // Course Management
  // tslint:disable-next-line:variable-name
  getAllCourseCreated(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_course_createdby_admin,
      variables: {
        admin_id: user_id,
        pagenumber
      }
    });
  }
  // tslint:disable-next-line:variable-name
  getAllCoursePublished(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_course_published,
      variables: {
        admin_id: user_id,
        pagenumber
      }
    });
  }
  // tslint:disable-next-line:variable-name
  getAllDrafted(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_draft_course,
      variables: {
        admin_id: user_id,
        pagenumber
      }
    });
  }
  // tslint:disable-next-line:variable-name
  publishCourse(course_id, is_published, level, category_id, sub_category_id, super_sub_category_id) {
    return this.Apollo.query({
      query: publishcourse,
      variables: {
        course_id,
        is_published,
        level,
        category_id,
        sub_category_id,
        super_sub_category_id
      }
    });
  }
  // end of COurse Management

  // Category Management
  createCategory(category) {
    return this.Apollo.query({
      query: create_catelogue,
      variables: {
        input_name: category.input_name,
        input_description: category.input_description,
        input_image: category.input_image,
        creator_id: category.creator_id,
        level: category.level,
        apply_all_courses: category.apply_all_courses,
        course_id: category.course_id,
        parent_category_id: category.parent_category_id,
        parent_sub_category_id: category.parent_sub_category_id,
      }
    });
  }

  getcategories(pgnumber) {
    return this.Apollo.query({
      query: getcategoryadmin,
      variables: {
        pagenumber: pgnumber
      }
    });
  }

  reAssignCourses(course) {
    return this.Apollo.query({
      query: reassigncourse,
      variables: {
        old_level: course.old_level,
        old_category_id: course.old_category_id,
        old_sub_category_id: course.old_sub_category_id,
        old_super_sub_category_id: course.old_super_sub_category_id,
        level: course.level,
        apply_all_courses: course.apply_all_courses,
        course_id: course.course_id,
        category_id: course.category_id,
        sub_category_id: course.sub_category_id,
        super_sub_category_id: course.super_sub_category_id
      }
    });
  }

  updateCatagory(category) {
    return this.Apollo.query({
      query: update_catalogue,
      variables: {
        input_id: category.input_id,
        input_name: category.input_name,
        input_description: category.input_description,
        input_image: category.input_image,
        level: category.level,
      }
    });
  }

  deleteCategory(inputid, Level) {
    return this.Apollo.query({
      query: delete_catalogue,
      variables: {
        input_id: inputid,
        level: Level,
      }
    });
  }

  // End of Category Management

  // catalogue Management
  addNewCatalogue(name, description, id) {
    return this.Apollo.query({
      query: create_master_catalogue,
      variables: {
        catalogue_name: name,
        catalogue_description: description,
        creator_id: id,
      }
    });
  }

  updateCatalogDtl(name, description, id) {
    return this.Apollo.query({
      query: updatecatalogueinfo,
      variables: {
        catalogue_name: name,
        catalogue_description: description,
        catalogue_id: id,
      }
    });
  }

  getAllCatalogue(pg) {
    return this.Apollo.query({
      query: getallcatalogue,
      variables: {
        pagenumber: pg,
      }
    });
  }
  getcatalogues() {
    return this.Apollo.query({
      query: getcatalogue,
    });
  }

  getallcatalogueById(id, pagenumber) {
    return this.Apollo.query({
      query: getallcatalogue_by_id,
      variables: {
        catalogue_id: id,
        pagenumber
      }
    });
  }
  // tslint:disable-next-line:variable-name
  getCourseForCatalogue(catalogue_id, pagenumber) {
    return this.Apollo.query({
      query: getcoursesforcatalogue,
      variables: {
        catalogue_id,
        pagenumber
      }
    });
  }
  // tslint:disable-next-line:variable-name
  getCourseInCatalogue(catalogue_id, pagenumber) {
    return this.Apollo.query({
      query: getcoursesincatalogue,
      variables: {
        catalogue_id,
        pagenumber
      }
    });
  }

  addCourse(id, courseid, selectall) {
    return this.Apollo.query({
      query: coursecataloguemapping,
      variables: {
        catalogue_id: id,
        course_id: courseid,
        select_all: selectall
      }
    });
  }

  removeCourse(id, courseid, selectall) {
    return this.Apollo.query({
      query: unmapcoursesfromcatalogue,
      variables: {
        catalogue_id: id,
        course_id: courseid,
        select_all: selectall
      }
    });
  }

  // End of Catalogue Management

  // Enrollment
  getenrolledcourses(data) {
    console.log('called');
    return this.Apollo.query({
      query: getenrolledcourses,
      variables: {
        group_id: data.group_id,
        pagenumber: data.pagenumber,
        is_individual: data.is_individual,
        course_id: data.course_id
      }
    });
  }

  getenrolledcoursesgroup(pgnumber) {
    return this.Apollo.query({
      query: get_all_enrolledcourses,
      variables: {
        pagenumber: pgnumber,
      }
    });
  }

  rejectenrollment(data) {
    return this.Apollo.query({
      query: rejectenrollment,
      variables: {
        update_type: data.update_type,
        status_reason: data.status_reason,
        enrollments: data.enrollments
      }
    });
  }

  approveenrollment(data) {
    return this.Apollo.query({
      query: approveenrollment,
      variables: {
        update_type: data.update_type,
        status_reason: data.status_reason,
        enrollments: data.enrollments
      }
    });
  }

  // End of enrollment

 // Dashboard
 // getting admin dashboard overview data
  getAdminOverview(days,user_id) {
    return this.Apollo.query({
      query: getAdminOverview,
      variables: {
        days: days,
        user_id:user_id
      }
    });
  }
  // getting admin dashboard data for course tab
  getAdmindashboardCoursetab() {
    return this.Apollo.query({
      query: getAdmindashboardCoursetab,
      variables: {}
    });
  }
  getLeranertabCount() {
    return this.Apollo.query({
      query: getLeranertabCount,
      variables: {}
    });
  }
  //getting Active and in-active chart data
  getActiveinactiveCount(days) {
    return this.Apollo.query({
      query: getActiveinactiveCount,
      variables: {
        days: days
      }
    });
  }
  //getting login per day chart data
  getLoginsPerDay(days) {
    return this.Apollo.query({
      query: getLoginsPerDay,
      variables: {
        days: days,
      }
    });
  }
  //getting login per day data
  getUsersIndays(days) {
    return this.Apollo.query({
      query: getUsersInWeeks,
      variables: {
        weeks: days,
      }
    });
  }
  //getting student and professional chart data
  getProfessionalStudent(days) {
    return this.Apollo.query({
      query: getProfessionalStudent,
      variables: {
        days: days,
      }
    });
  }
  //getting enrolled and free course data for chart 
  enrolledCourse(days) {
    return this.Apollo.query({
      query: enrolledCourse,
      variables: {
        days: days,
      }
    });
  }

  //getting top 5 course 
  getTopfiveDashboardType(type) {
    return this.Apollo.query({
      query: getTopfiveDashboardType,
      variables: {
        type: type
      }
    });
  }
  // End of dashboard
}
