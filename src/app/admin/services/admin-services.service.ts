import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { get_user_group } from "./operations/admin_query";
import { user_registration } from "./operations/admin_mutation"
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

  user_registration(email, full_name, termsandconditions,group_id?,group_name?,admin?) {
    console.log(email, full_name, termsandconditions,group_id,group_name,admin)
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
}
