import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {
  user_registration, createusergroup, update_notification, groupstatus, update_group,
  create_catelogue,reassigncourse,update_catalogue
} from './operations/admin_mutation'
import {
  get_user_group, search_user, deactivate_reactivate_user, get_all_user, block_user, get_all_learner_detail,
  get_user_session_detail, get_course_createdby_admin, publishcourse, get_course_published, getgroup, get_user_group_hierarchy
  , getnotificationreports, get_draft_course, getcategoryadmin
} from "./operations/admin_query";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private Apollo: Apollo, private http: HttpClient) { }

  //for add user - group dropdown
  getUserGroup() {
    return this.Apollo.query({
      query: get_user_group,
    });
  }

  //Add user flow
  user_registration(email, full_name, termsandconditions, group_id?, group_name?, admin?) {
    return this.Apollo.query({
      query: user_registration,
      variables: {
        full_name: full_name,
        email: email,
        term_condition: termsandconditions,
        group_id: group_id,
        group_name: group_name,
        admin: admin
      }
    });
  }

  bulkuserupload(fb) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970' })
    };
    return this.http.post<any[]>(environment.apiUrlImg + 'bulkuserupload', fb, httpOptions);
  }
  // end of Add user flow

  // User Management
  getAllUsers(pagenumber, sort, groupname?) {
    return this.Apollo.query({
      query: get_all_user,
      variables: {
        pagenumber: pagenumber,
        sort: sort,
        group_name: groupname
      }
    });
  }
  //api current;y not used
  getLearnerDetail(user_id) {
    return this.Apollo.query({
      query: get_all_learner_detail,
      variables: {
        user_id: user_id,
      }
    });
  }

  getUserSession(user_id) {
    return this.Apollo.query({
      query: get_user_session_detail,
      variables: {
        user_id: user_id,
      }
    });
  }

  searchUser(search_string: String, pagination, sort) {
    return this.Apollo.query({
      query: search_user,
      variables: {
        search_string: search_string,
        pagination: pagination,
        sort: sort,
      }
    });
  }

  deActivate_And_reActivate_User(user_id, is_active) {
    return this.Apollo.query({
      query: deactivate_reactivate_user,
      variables: {
        user_id: user_id,
        is_active: is_active,
      }
    });
  }

  blockUser(user_id, is_blocked) {
    return this.Apollo.query({
      query: block_user,
      variables: {
        user_id: user_id,
        is_blocked: is_blocked,
      }
    });
  }
  // end of User Management

  //Group Management
  updateGroup(_id: String, group_name: String, group_id: String) {
    return this.Apollo.query({
      query: update_group,
      variables: {
        _id: _id,
        group_name: group_name,
        group_id: group_id
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
    console.log(group)
    return this.Apollo.query({
      query: createusergroup,
      variables: {
        group_name: group.group_name, group_type: group.group_type,
        parent_group_id: group.parent_group_id, hierarchy_id: group.hierarchy_id,
        admin_id: group.admin_id
      }
    });
  }

  changegroupstatus(groupid, status) {
    console.log(groupid)
    return this.Apollo.query({
      query: groupstatus,
      variables: {
        group_id: groupid,
        is_active: status
      }
    });
  }
  // end of Group Management

  //Notifications
  getNotificationData(admin_id) {
    return this.Apollo.query({
      query: getnotificationreports,
      variables: {
        admin_id: admin_id,
      }
    })
  }

  removeNotificationData(report_id) {
    return this.Apollo.query({
      query: update_notification,
      variables: {
        report_id: report_id,
      }
    })
  }
  // end of Notifications

  //Course Management
  getAllCourseCreated(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_course_createdby_admin,
      variables: {
        admin_id: user_id,
        pagenumber: pagenumber
      }
    });
  }

  getAllCoursePublished(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_course_published,
      variables: {
        admin_id: user_id,
        pagenumber: pagenumber
      }
    });
  }

  getAllDrafted(user_id, pagenumber) {
    return this.Apollo.query({
      query: get_draft_course,
      variables: {
        admin_id: user_id,
        pagenumber: pagenumber
      }
    });
  }

  publishCourse(course_id, is_published) {
    return this.Apollo.query({
      query: publishcourse,
      variables: {
        course_id: course_id,
        is_published: is_published
      }
    });
  }
  // end of COurse Management

  // Catalogue Management
  createCatalogue(category) {
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

  updateCatalogue(category) {
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

  // End of Catalogue Management
}


