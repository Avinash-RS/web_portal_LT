import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { login } from "./operations/learner_query";

@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {

  constructor(private Apollo: Apollo,) { }

  login(username, password) {
    console.log('inside services', username, password)
    return this.Apollo.query({
      query: login,
      variables: {
        username: username,
        password: password
      }
    });
  }
}
