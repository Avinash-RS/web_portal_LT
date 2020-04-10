import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { get_user_group } from "./operations/admin_query"
import { map_user_group } from "./operations/admin_mutation"
@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private Apollo: Apollo,) { }

  getUserGroup() {
    return this.Apollo.query({
      query: get_user_group,
    });
  }

  postUserGroup(user_id, admin, group_name,group_id) {
    return this.Apollo.query({
      query: map_user_group,
      variables: {
        user_id: user_id,
        admin: admin,
        group_name: group_name,
        group_id: group_id
      }
    });
  }

}
