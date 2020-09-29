import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getCountForCategories } from '../../services/operations/learner_query';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LearnermycourseService implements Resolve<any> {
userObjId: any;
  constructor(private apollo: Apollo) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
this.userObjId = learnerDetail._id;
return this.getCountForCategories(this.userObjId);
  }
  getCountForCategories(userObjId) {
    return this.apollo.query({
      query: getCountForCategories,
      variables: {
        userObjId
      }
    });
  }
}
