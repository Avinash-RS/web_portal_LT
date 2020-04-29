import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { user_registration ,createusergroup} from "./operations/admin_mutation"
import { get_user_group, search_user, deactivate_reactivate_user, get_all_user, block_user, get_all_learner_detail,
  get_user_session_detail, get_course_createdby_admin, publishcourse,get_course_published,getgroup,get_user_group_hierarchy
,getnotificationreports} from "./operations/admin_query";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private Apollo: Apollo, private http: HttpClient) { }

  getUserGroup() {
    return this.Apollo.query({
      query: get_user_group,
    });
  }

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

  getAllUsers(pagenumber, sort) {
    return this.Apollo.query({
      query: get_all_user,
      variables: {
        pagenumber: pagenumber,
        sort: sort,
      }
    });
  }

  getLearnerDetail(user_id) {
    return this.Apollo.query({
      query: get_all_learner_detail,
      variables: {
        user_id: user_id,
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

  bulkuserupload(fb) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970' })
    };
    return this.http.post<any[]>(environment.apiUrlImg + 'bulkuserupload', fb, httpOptions);
  }

  getUserSession(user_id) {
    return this.Apollo.query({
      query: get_user_session_detail,
      variables: {
        user_id: user_id,
      }
    });
  }

  getNotificationData(admin_id){
    return this.Apollo.query({
      query: getnotificationreports,
      variables: {
        admin_id : admin_id,
      }

    })
  }
  // removeNotificationData(report_id){
  //   return this.Apollo.query({
  //     query: update_notification,
  //     variables: {
  //       report_id : report_id,
  //     }

  //   })
  // }
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

  publishCourse(course_id, is_published) {
    return this.Apollo.query({
      query: publishcourse,
      variables: {
        course_id: course_id,
        is_published: is_published
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
}




