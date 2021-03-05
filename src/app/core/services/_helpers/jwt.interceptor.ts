import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminServicesService } from '../../../admin/services/admin-services.service';

// import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AdminServicesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // const currentUser = localStorage.getItem('token');
        // let currentUser = this.auth.getToken;
        // if (currentUser && currentUser.token) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }

        return next.handle(request);
    }

}
