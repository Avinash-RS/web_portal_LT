import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonServicesService } from '../common-services.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
  constructor(private CommonService: CommonServicesService) { }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
          (err: any) => {
            this.onEnd();
          }));
      }
      private onEnd(): void {
        this.hideLoader();
      }
      private showLoader(): void {
        const isLoad = this.CommonService.isLoad;
        this.CommonService.loader$.next(isLoad);
      }
      private hideLoader(): void {
        this.CommonService.loader$.next(false);
        this.CommonService.isLoad = true;
      }
    }