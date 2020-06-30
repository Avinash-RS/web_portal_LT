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

    getauditlogreports(pgnumber): Observable<any> {
        const auditlog = require('assets/mockdata/admin/auditlog.json');
        return of(auditlog);
    }

    publishCourse(course_id,  level, selectedCategory_category_id,
                  selectedSubCategory_sub_category_id ): Observable<any> {
        const publishcourse = require('assets/mockdata/admin/publishcourse.json');
        return of(publishcourse);
    }

}
