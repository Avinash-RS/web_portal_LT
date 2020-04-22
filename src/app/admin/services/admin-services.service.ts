import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { get_user_group, search_user, deactivate_reactivate_user, get_all_user,block_user,get_all_learner_detail } from "./operations/admin_query";
import { user_registration } from "./operations/admin_mutation"
@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private Apollo: Apollo, ) { }

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

  deActivate_And_reActivate_User(user_id,is_active) {
    return this.Apollo.query({
      query: deactivate_reactivate_user,
      variables: {
        user_id: user_id,
        is_active: is_active,
      }
    });
  }

  getAllUsers(pagenumber ,sort) {
    return this.Apollo.query({
      query: get_all_user,
      variables: {
        pagenumber : pagenumber ,
        sort: sort,
      }
    });
  }

  getAllLearner(pagenumber ,sort) {
    return this.Apollo.query({
      query: get_all_learner_detail,
      variables: {
        pagenumber : pagenumber ,
        sort: sort,
      }
    });
  }

  blockUser(user_id,is_blocked) {
    return this.Apollo.query({
      query: block_user,
      variables: {
        user_id: user_id,
        is_blocked: is_blocked,
      }
    });
  }
}