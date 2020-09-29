import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getCountForCategories } from '../../services/operations/learner_query';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
@Injectable({
  providedIn: 'root'
})
export class LearnermycourseService implements Resolve<any> {
userObjId: any;
userDetail: any;

  constructor(private apollo: Apollo, private gs: GlobalServiceService, public route: Router, public alert: AlertServiceService) {


    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

this.userObjId = this.userDetail._id;
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
