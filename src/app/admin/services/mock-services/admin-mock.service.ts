import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminMockService {
    constructor() { }

    getAllCoursePublished(type, pagenumber): Observable<any> {
        const admincourse = require('assets/mockdata/wca/admin-courses.json');
        return of(admincourse);
    }
    getCourseInCatalogue(catalogue_id, pagenumberCourse  ): Observable<any> {
        const admincourse = require('assets/mockdata/wca/catalogue-management.json');
        return of(admincourse);
    }

}
