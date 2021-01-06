import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AlertServiceService } from '../handlers/alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInAuthGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private alert: AlertServiceService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('role')) {
      return true;
    } else {
      this.router.navigate(['/Learner/MyCourse']);
      return false;
    }
  }
}
