import { Injectable } from '@angular/core';
import { WcaService } from './wca.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class MockAuthService extends WcaService {

    dashboardData = require("../../../assets/mockdata/wca/dashboard.json");

    getCreatedCourse(): Observable<any> {
        return of(this.dashboardData.createdCourse);
    }
}