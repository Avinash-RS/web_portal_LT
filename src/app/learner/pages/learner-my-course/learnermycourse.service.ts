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
    if (this.route.url !== '/' && this.route.url !== '/Learner/login' && this.route.url !== '/Learner' &&
    this.route.url !== '/Admin/login') {

    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
    // console.log(userDetail);
    if ((this.userDetail != null && this.userDetail !== undefined)) {
      return this.userDetail;
      // } else if ((adminDetails != null || adminDetails !== undefined) && role === 'admin') {
      //   return adminDetails;
    } else {
      this.alert.openAlert('Logged Out!', 'You have been logged out. Please login to continue');
      this.route.navigate(['/Learner/login']);
    }
  }
   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

this.userObjId = this.userDetail._id;
console.log('learnerDetail', learnerDetail);
console.log('userObjId', this.userObjId);
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
