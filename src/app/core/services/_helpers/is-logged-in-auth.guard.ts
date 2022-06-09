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
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    // !role ||
    if (state.url === '/Learner/authentication') {
      if (token) {
        return true;
      } else {
        this.router.navigate(['/Learner/login']);
        return false;
      }
    }
    if (!token) {
      return true;
    } else {
      this.router.navigate(['/Landing/MyCourse']);
      return false;
    }
  }
}
