import { Injectable } from '@angular/core';
import { WcaService } from './wca.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class MockWcaService extends WcaService {

    dashboardData = require("../../../assets/mockdata/wca/dashboard.json");
    createTemplateData = require("../../../assets/mockdata/wca/create-template.json");
    chooseTemplateData = require("../../../assets/mockdata/wca/choose-template.json");

    //Dashboard
    getCreatedCourse(): Observable<any> {
        return of(this.dashboardData.createdCourse);
    }

    getPublishedCourse(): Observable<any> {
        return of(this.dashboardData.publishedCourse);
    }

    getDraftCourse(): Observable<any> {
        return of(this.dashboardData.draftCourse);
    }
    //Create Template
    createTemplate(): Observable<any> {
        return of(this.createTemplateData.templateDetail);
    }
    //Choose Template
    getAllTemplates(): Observable<any> {
        return of(this.chooseTemplateData.getTemplate);
    }

}