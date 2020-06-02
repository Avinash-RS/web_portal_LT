import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminMockService {
    constructor() { }

    getAllCoursePublished(type, pagenumber): Observable<any> {
        let admincourse = require("assets/mockdata/wca/admin-courses.json");
        return of(admincourse)
    }


}
