import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { login } from "./operations/learner_query";

@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {

  constructor(private Apollo: Apollo,) { }

  login(username, password, is_admin) {
    console.log('inside services', username, password,is_admin)
    return this.Apollo.query({
      query: login,
      variables: {
        username: username,
        password: password,
        is_admin : is_admin
      }
    });
  }
}
