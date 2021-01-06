import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SocketioService } from './socketio.service';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { result } from 'underscore';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  loginDetails: any;
  constructor(
    public toast: ToastrService, public socketService: SocketioService,
    public router: Router, public services: CommonServicesService
  ) {
    this.loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(clone).pipe(
      map((event: HttpEvent<any>) => {
        console.log(event);        
        return event;
      }),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        console.log('eror', error);
        if (error && error.status == 401) {
          this.toast.warning('Unauthorized entry..');
          this.logout();
        } else {
          this.toast.warning('Please try again later..');
        }
        
        return throwError(error);
    })
    );
  }
  logout() {
        // this.loading = true;
        //SOCKET DISCONNECTION START
        //SOCKET DISCONNECTION COMPLETE
        if (this.loginDetails?._id) {
          this.services.logout(this.loginDetails._id, false).subscribe((logout: any) => {
            this.socketService.Connectsocket({ type: 'disconnect' }).subscribe(quote => {
            });
            this.socketService.closeSocket();  
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/Learner/login']);
          }, (err)=> {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/Learner/login']);
          });  
        } else {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/Learner/login']);
        }

  }

}