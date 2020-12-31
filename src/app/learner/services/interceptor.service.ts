import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    public toast: ToastrService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(clone).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      retry(3),
      catchError((error: HttpErrorResponse) => {
        console.log('eror', error);
        if (error && error.status == 401) {
          this.toast.warning('Unauthorized entry..');
        } else {
          this.toast.warning('Please try again later..');
        }
        
        return throwError(error);
    })
    );
  }
}